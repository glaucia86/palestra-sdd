import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const consultationDate = '2026-07-15';

const locales = [
  {
    locale: 'pt-BR',
    file: 'slides/parts/pt-BR/02-spec-kit.html',
    prdCaveat: /não é output canônico obrigatório/i,
  },
  {
    locale: 'en-US',
    file: 'slides/parts/en-US/02-spec-kit.html',
    prdCaveat: /not a required canonical output/i,
  },
  {
    locale: 'es-ES',
    file: 'slides/parts/es-ES/02-spec-kit.html',
    prdCaveat: /no es un output canónico obligatorio/i,
  },
];

const bannedCurrentSyntax = [
  { pattern: /--ai(?=\s|=|&|<|$)/, label: '--ai' },
  { pattern: /--ai-skills\b/, label: '--ai-skills' },
  { pattern: /Skills\.md/i, label: 'Skills.md' },
  { pattern: /Devin Desktop/i, label: 'Devin Desktop' },
  { pattern: /Roo Code/i, label: 'Roo Code' },
  { pattern: /Windsurf/i, label: 'Windsurf' },
];

const requiredCurrentContent = [
  '--integration',
  '--integration-options="--skills"',
  'specify integration list',
  '/speckit.converge',
  'SKILL.md',
  'spec.md',
  'plan.md',
  'tasks.md',
  'Devin for Terminal',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countMatches(value, pattern) {
  return Array.from(value.matchAll(pattern)).length;
}

function extractIds(html) {
  return Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]).sort();
}

let baselineStructure;

for (const config of locales) {
  const html = await readFile(path.join(root, config.file), 'utf8');

  for (const banned of bannedCurrentSyntax) {
    assert(!banned.pattern.test(html), `[${config.locale}] stale current syntax/integration found: ${banned.label}`);
  }

  for (const required of requiredCurrentContent) {
    assert(html.includes(required), `[${config.locale}] missing current spec-kit content: ${required}`);
  }

  assert(config.prdCaveat.test(html), `[${config.locale}] PRD.md is not clearly separated from canonical plan output`);
  assert(!/speckit\.plan.{0,100}(?:gera|generates|genera).{0,40}PRD/is.test(html), `[${config.locale}] /speckit.plan is still described as generating a PRD`);
  assert(countMatches(html, /<!--\s*spec-kit\s+[1-7]\b/g) === 7, `[${config.locale}] expected seven ordered spec-kit leaf markers`);
  assert(countMatches(html, /<aside class="notes">/g) === 8, `[${config.locale}] expected one opening note plus seven direct leaf notes`);
  assert(countMatches(html, /2026-07-15/g) >= 7, `[${config.locale}] mutable claims are missing dated official-source notes`);
  assert(!/font-size\s*:\s*\d+(?:\.\d+)?px/i.test(html), `[${config.locale}] fixed px font size found`);
  assert(!/<svg\b/i.test(html), `[${config.locale}] inline SVG found`);

  const structure = {
    ids: extractIds(html),
    leaves: countMatches(html, /<!--\s*spec-kit\s+[1-7]\b/g),
    notes: countMatches(html, /<aside class="notes">/g),
  };

  baselineStructure ??= structure;
  assert(JSON.stringify(structure) === JSON.stringify(baselineStructure), `[${config.locale}] IDs, leaves, or notes differ from locale baseline`);

  console.log(`PASS ${config.locale}: current syntax, canonical artifacts, converge, Agent Skills, dated notes, and structural parity`);
}

console.log('PASS S03 spec-kit verification');
