import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { auditDeck, parseSections, validateManifest } from './deck-contracts-lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifests = [
  { label: 'default', locale: 'pt-BR', path: 'slides/manifest.json' },
  { label: 'pt-BR', locale: 'pt-BR', path: 'slides/manifest.pt-BR.json' },
  { label: 'en-US', locale: 'en-US', path: 'slides/manifest.en-US.json' },
  { label: 'es-ES', locale: 'es-ES', path: 'slides/manifest.es-ES.json' },
];

function leafIds(relativePath) {
  return parseSections(readFileSync(resolve(root, relativePath), 'utf8'))
    .filter((section) => section.directChildren === 0)
    .map((section) => section.id)
    .filter(Boolean);
}

for (const config of manifests) {
  const manifest = JSON.parse(readFileSync(resolve(root, config.path), 'utf8'));
  const manifestErrors = validateManifest(manifest, {
    locale: config.locale,
    exists: (relativePath) => existsSync(resolve(root, relativePath)),
  });
  assert.deepEqual(manifestErrors, [], `[${config.label}] manifest inválido:\n${manifestErrors.join('\n')}`);

  const html = manifest.parts.map((part) => readFileSync(resolve(root, part), 'utf8')).join('\n');
  const { report, errors } = auditDeck(html);
  assert.deepEqual(errors, [], `[${config.label}] contrato estrutural inválido:\n${errors.join('\n')}`);
  console.log(`REPORT ${config.label}: ${JSON.stringify(report)}`);
}

for (const file of ['04a-context-economy.html', '04c-loop-engineering.html']) {
  const baseline = leafIds(`slides/parts/pt-BR/${file}`);
  assert.deepEqual(leafIds(`slides/parts/en-US/${file}`), baseline, `${file}: IDs EN-US divergentes.`);
  assert.deepEqual(leafIds(`slides/parts/es-ES/${file}`), baseline, `${file}: IDs ES-ES divergentes.`);
}

console.log('PASS S14: quatro manifests, estrutura, notes, IDs, links, assets e paridade auditados.');
