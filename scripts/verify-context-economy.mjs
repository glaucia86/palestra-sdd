import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const partPath = 'slides/parts/pt-BR/04a-context-economy.html';
const cssPath = 'css/custom.css';
const expectedSectionIds = [
  'context-economy',
  'economia-contexto',
  'capacidade-contexto',
  'smart-zone-contexto',
  'cache-nao-atencao',
  'context-budget',
  'vertical-slices',
  'ai-handoff',
  'economia-outcome',
];
const expectedLeafIds = expectedSectionIds.slice(1);
const requiredSliceFields = [
  'id', 'title', 'outcome', 'status', 'execution_mode', 'owner', 'model_class',
  'context_budget', 'depends_on', 'in_scope', 'out_of_scope', 'acceptance_criteria',
  'relevant_interfaces', 'validation_commands', 'manual_validation', 'risks',
  'rollback', 'handoff_required', 'terminal_states',
];
const budgetDimensions = ['contexto', 'custo', 'tempo', 'tentativas', 'paralelismo', 'diff'];

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
}

function sectionsOf(html) {
  const stack = [];
  const sections = [];
  for (const token of html.matchAll(/<section\b[^>]*>|<\/section>/gi)) {
    if (/^<section\b/i.test(token[0])) {
      if (stack.length) stack.at(-1).children += 1;
      stack.push({ children: 0, tag: token[0], start: token.index });
      continue;
    }
    const section = stack.pop();
    assert.ok(section, 'Fechamento </section> sem abertura em S08.');
    sections.push({ ...section, content: html.slice(section.start, token.index + token[0].length) });
  }
  assert.equal(stack.length, 0, 'S08 possui <section> sem fechamento.');
  return sections;
}

function notesOf(section) {
  return section.match(/<aside\s+class="notes"[^>]*>([\s\S]*?)<\/aside>/i)?.[1] ?? '';
}

function visibleOf(section) {
  return section.split(/<aside\s+class="notes"/i, 1)[0];
}

function textIncludes(content, values, label) {
  const normalized = content.toLocaleLowerCase('pt-BR');
  for (const value of values) {
    assert.ok(normalized.includes(value.toLocaleLowerCase('pt-BR')), `${label} sem "${value}".`);
  }
}

function assertLinks(source) {
  assert.doesNotMatch(source, /href="http:\/\//i, 'S08 possui link externo sem HTTPS.');
  for (const match of source.matchAll(/<a\b[^>]*>/gi)) {
    if (!/target="_blank"/i.test(match[0])) continue;
    const rel = attribute(match[0], 'rel')?.toLowerCase().split(/\s+/) ?? [];
    assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), 'S08 possui target=_blank sem noopener noreferrer.');
  }
}

const source = readFileSync(resolve(root, partPath), 'utf8');
const css = readFileSync(resolve(root, cssPath), 'utf8');
const sections = sectionsOf(source);
const leafSlides = sections.filter(({ children }) => children === 0);
const sectionIds = sections.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
const leafIds = leafSlides.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
const byId = new Map(leafSlides.map((slide) => [attribute(slide.tag, 'id'), slide]));

assert.equal(sections.length, 9, 'S08 deve possuir uma stack e exatamente oito leaf slides.');
assert.equal(leafSlides.length, 8, 'S08 deve possuir exatamente oito leaf slides.');
assert.deepEqual([...sectionIds].sort(), [...expectedSectionIds].sort(), 'S08 diverge no conjunto de IDs.');
assert.deepEqual(leafIds, expectedLeafIds, 'S08 diverge na ordem dos oito leaf slides.');
assert.equal(new Set(sectionIds).size, sectionIds.length, 'S08 possui IDs duplicados internamente.');
assert.equal(sections.find(({ tag }) => attribute(tag, 'id') === 'context-economy')?.children, 8, 'A stack context-economy deve conter exatamente oito folhas.');

for (const [index, slide] of leafSlides.entries()) {
  const id = leafIds[index];
  const ideaCount = Number.parseInt(attribute(slide.tag, 'data-idea-count') ?? '', 10);
  const note = notesOf(slide.content);
  const visible = visibleOf(slide.content);
  assert.ok(Number.isInteger(ideaCount) && ideaCount >= 1 && ideaCount <= 3, `${id} sem data-idea-count válido.`);
  assert.ok(note, `${id} sem note direta.`);
  textIncludes(note, ['Técnica:', 'Impacto executivo:', 'Controle e KPI:', 'Caveat:'], `Note de ${id}`);
  assert.match(visible, /class="[^"]*context-economy-visual[^"]*"[^>]*(?:role="(?:img|list|group)"[^>]*aria-label|aria-label="[^"]+"[^>]*role="(?:img|list|group)")/i, `${id} sem redraw com role e descrição acessível.`);
  assert.doesNotMatch(visible, /<img\b|<svg\b/i, `${id} reutiliza screenshot ou SVG inline.`);
  assert.doesNotMatch(visible, /font-size\s*:\s*[^;"']*px/i, `${id} usa font-size em px.`);
}

assert.equal((source.match(/<aside\s+class="notes"/gi) ?? []).length, 8, 'S08 deve possuir oito notes diretas.');
assert.equal((source.match(/context-economy-visual/gi) ?? []).length, 8, 'S08 deve possuir um redraw acessível por leaf slide.');
const textualContent = source.replace(/<[^>]+>/g, ' ');
assert.doesNotMatch(textualContent, /Dumb Zone|30\s*[–—-]\s*40\s*%|75\s*k|85\s*[–—-]\s*90\s*%|\d+(?:[.,]\d+)?\s*%/i, 'S08 contém percentual ou limite apresentado na parte PT-BR.');
assert.doesNotMatch(source, /Itaú|(?:sk|ghp|cog)_[A-Za-z0-9]{8,}|Bearer\s+[A-Za-z0-9._-]{8,}/i, 'S08 contém dado interno ou valor com formato de credencial.');

const capacity = visibleOf(byId.get('capacidade-contexto').content);
textIncludes(capacity, ['Janela máxima', 'Contexto ativo', 'Contexto útil', 'janela máxima ≠ contexto ativo ≠ contexto útil'], 'Slide de capacidade');

const smartZone = visibleOf(byId.get('smart-zone-contexto').content);
textIncludes(smartZone, ['Smart Zone', 'Zona de alerta', 'Zona de degradação', 'Heurística calibrável', 'objetivos concorrentes', 'retries', 'outputs volumosos'], 'Slide Smart Zone');

const cache = visibleOf(byId.get('cache-nao-atencao').content);
textIncludes(cache, ['Cache', 'janela de contexto', 'tokens lidos do cache', 'reduzir custo e latência', 'quanto custa reprocessar', 'o que ainda precisa estar na janela'], 'Slide de cache');

const budget = byId.get('context-budget');
assert.deepEqual(attribute(budget.content, 'data-budget-dimensions')?.split(','), budgetDimensions, 'Context budget diverge nas seis dimensões.');
textIncludes(visibleOf(budget.content), [...budgetDimensions, 'sucesso resumido', 'falha preserva evidência', 'reserve para verificar e sair'], 'Slide de context budget');

const slice = byId.get('vertical-slices');
assert.deepEqual(attribute(slice.content, 'data-contract-fields')?.split(','), requiredSliceFields, 'Vertical Slice não declara todos os campos do contrato 21.3.');
textIncludes(visibleOf(slice.content), [...requiredSliceFields, 'VS-042', 'HITL', 'npm test -- order', 'Rejeitado:', 'tarefa horizontal ampla', 'não é end-to-end', 'independentemente verificável'], 'Slide de Vertical Slice');

const handoff = visibleOf(byId.get('ai-handoff').content);
textIncludes(handoff, ['estado', 'evidência', 'falhas', 'decisões', 'risco', 'próxima ação', 'owner', 'terminal state'], 'Slide de AI Handoff');

const routing = visibleOf(byId.get('economia-outcome').content);
textIncludes(routing, ['risco', 'especificar', 'implementar', 'verificar', 'revisar', 'escalar', 'verificabilidade', 'Custo total', 'outcomes aceitos'], 'Slide de model routing');

for (const className of ['context-zone-bar', 'context-budget-grid', 'slice-contract', 'handoff-envelope', 'routing-lane']) {
  assert.match(css, new RegExp(`\\.${className}\\b`), `CSS sem .${className}.`);
}
const economyCss = css.slice(css.indexOf('Context Economy — accessible redraws'));
assert.doesNotMatch(economyCss, /font-size\s*:\s*[^;\n]*px/i, 'CSS da S08 usa font-size em px.');
assert.match(economyCss, /@media\s*\(max-width:\s*768px\)/i, 'CSS da S08 sem ajuste responsivo.');
assert.match(economyCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.context-economy-visual/i, 'CSS da S08 sem reduced motion explícito.');

assert.ok(existsSync(resolve(root, 'doc-specs/smart-dumb-zone.png')), 'Referência autoral Smart Zone foi removida.');
assertLinks(source);

console.log('PASS S08: oito leaf slides PT-BR, contratos, notes, caveats e redraws verificados.');
