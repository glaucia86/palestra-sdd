import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const locales = [
  {
    locale: 'pt-BR',
    manifest: 'slides/manifest.pt-BR.json',
    intro: 'slides/parts/pt-BR/01-intro-sdd.html',
    date: 'Julho de 2026',
    title: 'com AI Coding Agents',
  },
  {
    locale: 'en-US',
    manifest: 'slides/manifest.en-US.json',
    intro: 'slides/parts/en-US/01-intro-sdd.html',
    date: 'July 2026',
    title: 'with AI Coding Agents',
  },
  {
    locale: 'es-ES',
    manifest: 'slides/manifest.es-ES.json',
    intro: 'slides/parts/es-ES/01-intro-sdd.html',
    date: 'Julio de 2026',
    title: 'con AI Coding Agents',
  },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function getManifestPaths(manifest) {
  if (Array.isArray(manifest.parts)) return manifest.parts;
  if (Array.isArray(manifest.slides)) return manifest.slides.map((entry) => entry.path);
  return [];
}

function extractIds(html) {
  return new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
}

function extractStackIds(html) {
  return new Set(Array.from(html.matchAll(/<section\s+[^>]*\bid="([^"]+)"[^>]*>\s*<section\b/g), (match) => match[1]));
}

function getSummaryLinks(introHtml, locale) {
  const summary = introHtml.match(/<section id="sumario">([\s\S]*?)<\/section>/)?.[1];
  assert(summary, `[${locale}] sumario section not found`);
  return Array.from(summary.matchAll(/class="sumario-card" href="#\/([^"]+)"/g), (match) => match[1]);
}

async function getMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await getMarkdownFiles(entryPath)));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }
  return files;
}

const expectedLinks = [
  'o-que-e-sdd',
  'spec-kit',
  'ai-coding-agents',
  'context-engineering',
  'economia-contexto',
  'progressive-disclosure',
  'harness-engineering',
  'loop-engineering',
  'demo-talk-code',
];

for (const config of locales) {
  const intro = await read(config.intro);
  assert(intro.includes(config.date), `[${config.locale}] July 2026 date is missing`);
  assert(intro.includes(config.title), `[${config.locale}] localized public title is missing`);
  assert(!/\b(?:April|Abril|May|Maio|Mayo) 2026\b/i.test(intro), `[${config.locale}] stale public month found`);
  assert((intro.match(/id="capa"/g) ?? []).length === 1, `[${config.locale}] capa ID changed or duplicated`);
  assert((intro.match(/id="sumario"/g) ?? []).length === 1, `[${config.locale}] sumario ID changed or duplicated`);

  const manifest = JSON.parse(await read(config.manifest));
  const partPaths = getManifestPaths(manifest);
  assert(partPaths.length > 0, `[${config.locale}] manifest has no parts`);
  const fullDeck = (await Promise.all(partPaths.map((partPath) => read(partPath)))).join('\n');
  const ids = extractIds(fullDeck);
  const stackIds = extractStackIds(fullDeck);
  const links = getSummaryLinks(intro, config.locale);

  assert(links.length <= 12, `[${config.locale}] summary has ${links.length} cards; expected at most 12`);
  assert(JSON.stringify(links) === JSON.stringify(expectedLinks), `[${config.locale}] summary mechanism order differs`);
  for (const link of links) assert(ids.has(link), `[${config.locale}] broken summary deep link: #/${link}`);
  for (const leafLink of ['context-engineering', 'progressive-disclosure']) {
    assert(!stackIds.has(leafLink), `[${config.locale}] summary deep link targets a vertical stack instead of a slide: #/${leafLink}`);
  }

  console.log(`PASS ${config.locale}: cover, stable IDs, ${links.length} mechanism cards, valid deep links`);
}

const indexHtml = await read('index.html');
assert(indexHtml.includes('<title>Spec-Driven Development com AI Coding Agents | Julho 2026 | Glaucia Lemos</title>'), 'Static fallback title is stale');
assert(indexHtml.includes('content="Apresentação técnica sobre Spec-Driven Development (SDD) com AI Coding Agents:'), 'Static fallback description is Copilot-first or missing');

const messages = await read('src-ts/app/i18n/messages.ts');
for (const expectedTitle of [
  'Spec-Driven Development com AI Coding Agents | Julho 2026',
  'Spec-Driven Development with AI Coding Agents | July 2026',
  'Spec-Driven Development con AI Coding Agents | Julio de 2026',
]) {
  assert(messages.includes(expectedTitle), `Localized runtime metadata is missing: ${expectedTitle}`);
}

const agents = await read('AGENTS.md');
const readme = await read('README.md');
assert(agents.includes('Spec-Driven Development (SDD) com AI Coding Agents'), 'AGENTS.md is still Copilot-first');
assert(readme.startsWith('# 🎤 Spec-Driven Development com AI Coding Agents'), 'README title is still Copilot-first');
assert(agents.includes('.github/skills/reveal-js/SKILL.md'), 'AGENTS.md does not point to the existing Reveal.js skill');
await read('.github/skills/reveal-js/SKILL.md');

const contentDocs = await read('docs/agents/content.md');
const runtimeDocs = await read('docs/architecture-js.md');
assert(contentDocs.includes('star-wars-final-song.mp3') && contentDocs.includes('demo-experience.ts'), 'Content docs do not reflect current audio features');
assert(runtimeDocs.includes('pt-BR|en-US|es-ES') && runtimeDocs.includes('the-end-experience.js'), 'Runtime docs do not reflect localized architecture/features');

const publicDocs = ['AGENTS.md', 'README.md', ...(await getMarkdownFiles(path.join(root, 'docs'))).map((file) => path.relative(root, file))];
for (const relativePath of publicDocs) {
  const markdown = await read(relativePath);
  assert(!/(?:criar|create|crear).{0,100}palestra-sdd-codex/is.test(markdown), `${relativePath} instructs creating palestra-sdd-codex`);
}

console.log('PASS static/runtime metadata, public docs, existing skill target, localized architecture, and audio documentation');
