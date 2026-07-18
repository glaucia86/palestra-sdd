import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const partsOnly = process.argv.includes('--parts-only');
const partName = '04a-context-economy.html';
const expectedLeafIds = [
  'economia-contexto',
  'capacidade-contexto',
  'smart-zone-contexto',
  'cache-nao-atencao',
  'context-budget',
  'vertical-slices',
  'ai-handoff',
  'economia-outcome',
];
const expectedSectionIds = ['context-economy', ...expectedLeafIds];
const requiredSliceFields = [
  'id', 'title', 'outcome', 'status', 'execution_mode', 'owner', 'model_class',
  'context_budget', 'depends_on', 'in_scope', 'out_of_scope', 'acceptance_criteria',
  'relevant_interfaces', 'validation_commands', 'manual_validation', 'risks',
  'rollback', 'handoff_required', 'terminal_states',
];
const locales = [
  {
    code: 'pt-BR',
    path: `slides/parts/pt-BR/${partName}`,
    notes: ['Técnica:', 'Impacto executivo:', 'Controle e KPI:', 'Caveat:'],
    localized: ['Contexto é', 'Janela máxima', 'Zona de alerta', 'janela de contexto', 'Tentativas', 'Próxima ação'],
  },
  {
    code: 'en-US',
    path: `slides/parts/en-US/${partName}`,
    notes: ['Technical:', 'Executive impact:', 'Control and KPI:', 'Caveat:'],
    localized: ['Context Is', 'Maximum window', 'Warning zone', 'context window', 'Attempts', 'next action'],
  },
  {
    code: 'es-ES',
    path: `slides/parts/es-ES/${partName}`,
    notes: ['Técnica:', 'Impacto ejecutivo:', 'Control y KPI:', 'Salvedad:'],
    localized: ['El Contexto es', 'Ventana máxima', 'Zona de alerta', 'ventana de contexto', 'Intentos', 'próxima acción'],
  },
];
const manifestEntries = [
  ['slides/manifest.json', 'pt-BR'],
  ['slides/manifest.pt-BR.json', 'pt-BR'],
  ['slides/manifest.en-US.json', 'en-US'],
  ['slides/manifest.es-ES.json', 'es-ES'],
];

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
}

function sectionsOf(html, label) {
  const stack = [];
  const sections = [];
  for (const token of html.matchAll(/<section\b[^>]*>|<\/section>/gi)) {
    if (/^<section\b/i.test(token[0])) {
      if (stack.length) stack.at(-1).children += 1;
      stack.push({ children: 0, tag: token[0], start: token.index });
      continue;
    }
    const section = stack.pop();
    assert.ok(section, `${label}: fechamento </section> sem abertura.`);
    sections.push({ ...section, content: html.slice(section.start, token.index + token[0].length) });
  }
  assert.equal(stack.length, 0, `${label}: <section> sem fechamento.`);
  return sections;
}

function notesOf(section) {
  return section.match(/<aside\s+class="notes"[^>]*>([\s\S]*?)<\/aside>/i)?.[1] ?? '';
}

function visibleOf(section) {
  return section.split(/<aside\s+class="notes"/i, 1)[0];
}

function assertIncludes(content, values, label) {
  const normalized = content.toLocaleLowerCase();
  for (const value of values) {
    assert.ok(normalized.includes(value.toLocaleLowerCase()), `${label} sem "${value}".`);
  }
}

function assertSafeLinks(source, label) {
  assert.doesNotMatch(source, /href="http:\/\//i, `${label}: link externo sem HTTPS.`);
  for (const match of source.matchAll(/<a\b[^>]*>/gi)) {
    if (!/target="_blank"/i.test(match[0])) continue;
    const rel = attribute(match[0], 'rel')?.toLowerCase().split(/\s+/) ?? [];
    assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), `${label}: target=_blank sem noopener noreferrer.`);
  }
}

function inspectLocale(locale) {
  const source = readFileSync(resolve(root, locale.path), 'utf8');
  const sections = sectionsOf(source, locale.code);
  const leaves = sections.filter(({ children }) => children === 0);
  const sectionIds = sections.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const leafIds = leaves.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);

  assert.equal(sections.length, 9, `${locale.code}: deve ter uma stack e oito folhas.`);
  assert.equal(leaves.length, 8, `${locale.code}: deve ter exatamente oito leaf slides.`);
  assert.deepEqual(sectionIds.sort(), [...expectedSectionIds].sort(), `${locale.code}: conjunto de IDs divergente.`);
  assert.deepEqual(leafIds, expectedLeafIds, `${locale.code}: ordem de leaf slides divergente.`);
  assert.equal(new Set(sectionIds).size, sectionIds.length, `${locale.code}: IDs duplicados dentro de 04a.`);

  for (const [index, leaf] of leaves.entries()) {
    const id = leafIds[index];
    const visible = visibleOf(leaf.content);
    const notes = notesOf(leaf.content);
    assert.equal(attribute(leaf.tag, 'data-idea-count'), '3', `${locale.code}/${id}: data-idea-count divergente.`);
    assert.ok(notes, `${locale.code}/${id}: sem note direta.`);
    assertIncludes(notes, locale.notes, `${locale.code}/${id}: notes`);
    assert.match(visible, /class="[^"]*context-economy-visual[^"]*"[^>]*(?:role="(?:img|list|group)"[^>]*aria-label|aria-label="[^"]+"[^>]*role="(?:img|list|group)")/i, `${locale.code}/${id}: redraw sem role e aria-label.`);
    assert.doesNotMatch(visible, /<img\b|<svg\b|<style\b/i, `${locale.code}/${id}: screenshot, SVG inline ou CSS local detectado.`);
    assert.doesNotMatch(visible, /font-size\s*:\s*[^;"']*px/i, `${locale.code}/${id}: font-size em px.`);
  }

  assert.equal((source.match(/<aside\s+class="notes"/gi) ?? []).length, 8, `${locale.code}: deve ter oito notes.`);
  assert.equal((source.match(/context-economy-visual/gi) ?? []).length, 8, `${locale.code}: deve ter oito redraws acessíveis.`);
  assertIncludes(source, locale.localized, `${locale.code}: localização`);
  assert.doesNotMatch(source.replace(/<[^>]+>/g, ' '), /Dumb Zone|30\s*[–—-]\s*40\s*%|75\s*k|85\s*[–—-]\s*90\s*%|\d+(?:[.,]\d+)?\s*%/i, `${locale.code}: limite universal detectado.`);
  assert.doesNotMatch(source, /Itaú|(?:sk|ghp|cog)_[A-Za-z0-9]{8,}|Bearer\s+[A-Za-z0-9._-]{8,}/i, `${locale.code}: dado sensível detectado.`);

  const contract = source.match(/data-contract-fields="([^"]+)"/i)?.[1]?.split(',') ?? [];
  assert.deepEqual(contract, requiredSliceFields, `${locale.code}: contrato da Vertical Slice divergente.`);
  assert.equal(source.match(/data-budget-dimensions="([^"]+)"/i)?.[1]?.split(',').length, 6, `${locale.code}: context budget deve ter seis dimensões.`);
  assertSafeLinks(source, locale.code);

  return {
    icons: [...source.matchAll(/data-lucide="([^"]+)"/gi)].map((match) => match[1]),
    links: [...source.matchAll(/href="(https:[^"]+)"/gi)].map((match) => match[1]),
  };
}

const structures = locales.map(inspectLocale);
for (const structure of structures.slice(1)) {
  assert.deepEqual(structure.icons, structures[0].icons, 'Ícones Lucide divergem entre locales.');
  assert.deepEqual(structure.links, structures[0].links, 'Referências externas divergem entre locales.');
}

for (const locale of locales) {
  const progressive = readFileSync(resolve(root, `slides/parts/${locale.code}/04-context-progressive.html`), 'utf8');
  const summary = readFileSync(resolve(root, `slides/parts/${locale.code}/01-intro-sdd.html`), 'utf8');
  assert.equal((progressive.match(/id="economia-contexto-ponte"/g) ?? []).length, 1, `${locale.code}: ponte migrada ausente.`);
  assert.doesNotMatch(progressive, /id="economia-contexto"/, `${locale.code}: ponte ainda duplica o deep link.`);
  assert.match(summary, /href="#\/economia-contexto"/, `${locale.code}: sumário não aponta ao novo primeiro slide.`);
}

const css = readFileSync(resolve(root, 'css/custom.css'), 'utf8');
const economyCss = css.slice(css.indexOf('Context Economy — accessible redraws'));
assert.doesNotMatch(economyCss, /\.(?:pt-BR|en-US|es-ES)|\[lang(?:=|\])/i, 'CSS da seção possui regra específica por idioma.');
assert.match(economyCss, /@media\s*\(max-width:\s*768px\)/i, 'CSS compartilhado sem responsividade.');
assert.match(economyCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.context-economy-visual/i, 'CSS compartilhado sem reduced motion explícito.');

if (!partsOnly) {
  let relativeOrder = null;
  for (const [manifestPath, locale] of manifestEntries) {
    const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), 'utf8'));
    assert.ok(Array.isArray(manifest.parts), `${manifestPath}: parts deve ser array.`);
    assert.equal(new Set(manifest.parts).size, manifest.parts.length, `${manifestPath}: paths duplicados.`);
    for (const path of manifest.parts) assert.ok(existsSync(resolve(root, path)), `${manifestPath}: path inexistente ${path}.`);

    const expected = `slides/parts/${locale}/${partName}`;
    const economyIndex = manifest.parts.indexOf(expected);
    assert.ok(economyIndex > 0, `${manifestPath}: 04a ausente.`);
    assert.equal(basename(manifest.parts[economyIndex - 1]), '04-context-progressive.html', `${manifestPath}: 04a não está depois de 04.`);
    assert.equal(basename(manifest.parts[economyIndex + 1]), '04b-harness-engineering.html', `${manifestPath}: 04a não está antes de 04b.`);
    assert.equal(manifest.parts.filter((path) => basename(path) === partName).length, 1, `${manifestPath}: 04a deve aparecer uma vez.`);

    const currentOrder = manifest.parts.map((path) => basename(path));
    relativeOrder ??= currentOrder;
    assert.deepEqual(currentOrder, relativeOrder, `${manifestPath}: sequência relativa divergente.`);

    const loaded = manifest.parts.map((path) => readFileSync(resolve(root, path), 'utf8')).join('\n');
    assert.equal((loaded.match(/id="economia-contexto"/g) ?? []).length, 1, `${manifestPath}: deep link economia-contexto deve ser único.`);
  }
}

console.log(partsOnly
  ? 'PASS S09 pre-activation: três partes localizadas, paridade, notes, redraws e deep-link migration verificados.'
  : 'PASS S09: três locales, quatro manifests, paridade estrutural e deep link atômico verificados.');
