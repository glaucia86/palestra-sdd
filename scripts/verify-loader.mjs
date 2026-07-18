import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  getManifestPartEntries,
  loadSlides,
  normalizePartPath,
} from '../js/app/slide-loader.js';

const MANIFEST_PATH = 'slides/manifest.test.json';
const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function jsonResponse(value, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return value;
    },
    async text() {
      return JSON.stringify(value);
    },
  };
}

function textResponse(value, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return JSON.parse(value);
    },
    async text() {
      return value;
    },
  };
}

async function runLoader({ locale = 'pt-BR', manifest, fetchSlides }) {
  const slidesRoot = { dataset: {}, innerHTML: '' };
  const logs = [];
  let bootstrapCount = 0;
  const observedRequests = [];

  const loaderFetch = fetchSlides ?? (async (path, init) => {
    observedRequests.push({ path, init });
    if (path === MANIFEST_PATH) return jsonResponse(manifest);
    throw new Error(`Unexpected fetch: ${path}`);
  });

  await loadSlides({
    locale,
    slidesRoot,
    manifestSrc: MANIFEST_PATH,
    fetchSlides: async (path, init) => {
      const response = await loaderFetch(path, init);
      assert.equal(init.cache, 'no-store');
      return response;
    },
    bootstrap: () => {
      bootstrapCount += 1;
    },
    logError: (message, details) => logs.push({ message, details }),
  });

  return { bootstrapCount, logs, observedRequests, slidesRoot };
}

async function verifyManifestContracts() {
  assert.deepEqual(
    getManifestPartEntries({ parts: ['primary.html'], slides: [{ path: 'legacy.html' }] }),
    ['primary.html'],
  );
  assert.deepEqual(getManifestPartEntries({ slides: [{ path: 'legacy.html' }] }), ['legacy.html']);
  assert.deepEqual(getManifestPartEntries({ parts: 'invalid', slides: [{ path: 'legacy.html' }] }), []);

  const requested = [];
  const result = await runLoader({
    manifest: { parts: ['primary.html'], slides: [{ path: 'legacy.html' }] },
    fetchSlides: async (path) => {
      requested.push(path);
      if (path === MANIFEST_PATH) {
        return jsonResponse({ parts: ['primary.html'], slides: [{ path: 'legacy.html' }] });
      }
      return textResponse('<section id="primary"></section>');
    },
  });

  assert.deepEqual(requested, [MANIFEST_PATH, 'primary.html']);
  assert.match(result.slidesRoot.innerHTML, /id="primary"/);
  assert.equal(result.bootstrapCount, 1);
}

async function verifyUnsafePaths() {
  const rejectedPaths = [
    '',
    '   ',
    '/absolute.html',
    '\\absolute.html',
    'C:\\absolute.html',
    '//cdn.example/part.html',
    'https://example.com/part.html',
    'data:text/html,unsafe',
    'javascript:alert(1)',
    '../secret.html',
    'slides/../secret.html',
    'slides\\..\\secret.html',
    'slides/%2e%2e/secret.html',
    '%2Fabsolute.html',
    'slides/part\u0000.html',
  ];

  for (const path of rejectedPaths) assert.equal(normalizePartPath(path), null, path);
  assert.equal(normalizePartPath(' slides/parts/pt-BR/01-intro-sdd.html '), 'slides/parts/pt-BR/01-intro-sdd.html');

  const fetchedParts = [];
  const result = await runLoader({
    manifest: { parts: ['first.html', '../secret.html', 'third.html'] },
    fetchSlides: async (path) => {
      if (path === MANIFEST_PATH) {
        return jsonResponse({ parts: ['first.html', '../secret.html', 'third.html'] });
      }
      fetchedParts.push(path);
      return textResponse(`<section id="${path === 'first.html' ? 'first' : 'third'}"></section>`);
    },
  });

  assert.deepEqual(fetchedParts, ['first.html', 'third.html']);
  const firstPosition = result.slidesRoot.innerHTML.indexOf('id="first"');
  const errorPosition = result.slidesRoot.innerHTML.indexOf('data-error-index="2"');
  const thirdPosition = result.slidesRoot.innerHTML.indexOf('id="third"');
  assert.ok(firstPosition < errorPosition && errorPosition < thirdPosition);
  assert.equal(result.bootstrapCount, 1);
}

async function verifyParallelFetchAndCanonicalOrder() {
  const parts = ['first.html', 'second.html', 'third.html'];
  const pending = new Map();
  const calls = [];
  const slidesRoot = { dataset: {}, innerHTML: '' };
  let bootstrapCount = 0;

  const loadPromise = loadSlides({
    locale: 'pt-BR',
    slidesRoot,
    manifestSrc: MANIFEST_PATH,
    fetchSlides: async (path, init) => {
      calls.push(path);
      assert.equal(init.cache, 'no-store');
      if (path === MANIFEST_PATH) return jsonResponse({ parts });
      return await new Promise((resolve) => pending.set(path, resolve));
    },
    bootstrap: () => {
      bootstrapCount += 1;
    },
    logError: () => {},
  });

  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(calls, [MANIFEST_PATH, ...parts]);
  assert.equal(pending.size, 3);

  pending.get('third.html')(textResponse('<section id="third"></section>'));
  pending.get('second.html')(textResponse('<section id="second"></section>', 404));
  pending.get('first.html')(textResponse('<section id="first"></section>'));
  await loadPromise;

  const firstPosition = slidesRoot.innerHTML.indexOf('id="first"');
  const errorPosition = slidesRoot.innerHTML.indexOf('data-error-index="2"');
  const thirdPosition = slidesRoot.innerHTML.indexOf('id="third"');
  assert.ok(firstPosition < errorPosition && errorPosition < thirdPosition);
  assert.match(slidesRoot.innerHTML, /id="load-error-part-2-second-html"/);
  assert.equal(bootstrapCount, 1);
}

async function verifyEscapingAndEmptyPart() {
  const unsafePath = 'slides/parts/<img src=x onerror=alert(1)>.html';
  const escaped = await runLoader({
    manifest: { parts: [unsafePath] },
    fetchSlides: async (path) => {
      if (path === MANIFEST_PATH) return jsonResponse({ parts: [unsafePath] });
      throw new Error('<strong>boom</strong>');
    },
  });

  assert.doesNotMatch(escaped.slidesRoot.innerHTML, /<img src=x/);
  assert.doesNotMatch(escaped.slidesRoot.innerHTML, /<strong>boom<\/strong>/);
  assert.match(escaped.slidesRoot.innerHTML, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(escaped.slidesRoot.innerHTML, /&lt;strong&gt;boom&lt;\/strong&gt;/);
  assert.match(escaped.slidesRoot.innerHTML, /id="load-error-part-1-slides-parts-img-src-x-onerror-alert-1-html"/);
  assert.equal(escaped.bootstrapCount, 1);

  const empty = await runLoader({
    manifest: { parts: ['empty.html'] },
    fetchSlides: async (path) => path === MANIFEST_PATH
      ? jsonResponse({ parts: ['empty.html'] })
      : textResponse('   '),
  });
  assert.match(empty.slidesRoot.innerHTML, /data-error-index="1"/);
  assert.equal(empty.bootstrapCount, 1);
}

async function verifyManifestDegradationForAllLocales() {
  const localizedTitles = {
    'pt-BR': 'Não foi possível carregar o manifesto de slides',
    'en-US': 'Could not load the slide manifest',
    'es-ES': 'No se pudo cargar el manifiesto de diapositivas',
  };

  for (const locale of Object.keys(localizedTitles)) {
    const missing = await runLoader({
      locale,
      fetchSlides: async () => textResponse('', 404),
    });
    assert.match(missing.slidesRoot.innerHTML, /id="load-error-manifest"/);
    assert.ok(missing.slidesRoot.innerHTML.includes(localizedTitles[locale]));
    assert.equal(missing.bootstrapCount, 1);

    const empty = await runLoader({ locale, manifest: { parts: [] } });
    assert.match(empty.slidesRoot.innerHTML, /id="load-error-manifest-empty"/);
    assert.equal(empty.bootstrapCount, 1);
  }
}

async function verifyCurrentLocaleManifests() {
  const manifests = {
    'pt-BR': 'slides/manifest.pt-BR.json',
    'en-US': 'slides/manifest.en-US.json',
    'es-ES': 'slides/manifest.es-ES.json',
  };

  for (const [locale, manifestSrc] of Object.entries(manifests)) {
    const slidesRoot = { dataset: {}, innerHTML: '' };
    let bootstrapCount = 0;

    await loadSlides({
      locale,
      slidesRoot,
      manifestSrc,
      fetchSlides: async (requestedPath, init) => {
        assert.equal(init.cache, 'no-store');
        const content = await readFile(path.resolve(REPOSITORY_ROOT, requestedPath), 'utf8');
        return requestedPath.endsWith('.json') ? jsonResponse(JSON.parse(content)) : textResponse(content);
      },
      bootstrap: () => {
        bootstrapCount += 1;
      },
      logError: () => {},
    });

    assert.equal(bootstrapCount, 1, locale);
    assert.doesNotMatch(slidesRoot.innerHTML, /data-load-error="true"/, locale);
    assert.match(slidesRoot.innerHTML, /id="capa"/, locale);
    assert.match(slidesRoot.innerHTML, /id="the-end"/, locale);
  }
}

await verifyManifestContracts();
await verifyUnsafePaths();
await verifyParallelFetchAndCanonicalOrder();
await verifyEscapingAndEmptyPart();
await verifyManifestDegradationForAllLocales();
await verifyCurrentLocaleManifests();

console.log('S01 loader verification: PASS');
