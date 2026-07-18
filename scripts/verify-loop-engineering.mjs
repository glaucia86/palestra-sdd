import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const partPath = 'slides/parts/pt-BR/04c-loop-engineering.html';
const source = readFileSync(resolve(root, partPath), 'utf8');
const styles = readFileSync(resolve(root, 'css/custom.css'), 'utf8');
const expectedIds = [
  'loop-engineering',
  'loop-evolution',
  'loop-blocks',
  'loop-control-plane',
  'loop-anatomy',
  'loop-levels',
  'loop-cases',
  'loop-guardrails',
  'loop-talk-refresh',
];

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
    assert.ok(section, 'Fechamento </section> sem abertura.');
    sections.push({ ...section, content: html.slice(section.start, token.index + token[0].length) });
  }
  assert.equal(stack.length, 0, 'Seção sem fechamento.');
  return sections;
}

function notesOf(section) {
  return section.match(/<aside\s+class="notes"[^>]*>([\s\S]*?)<\/aside>/i)?.[1] ?? '';
}

function visibleOf(section) {
  return section.split(/<aside\s+class="notes"/i, 1)[0];
}

function assertIncludes(content, values, label) {
  const normalized = content.toLocaleLowerCase('pt-BR');
  for (const value of values) {
    assert.ok(normalized.includes(value.toLocaleLowerCase('pt-BR')), `${label} sem "${value}".`);
  }
}

const sections = sectionsOf(source);
const leaves = sections.filter(({ children }) => children === 0);
const leafIds = leaves.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
const byId = new Map(leaves.map((section) => [attribute(section.tag, 'id'), section]));

assert.equal(sections.length, 10, 'S11 deve conter um stack e nove leaf slides.');
assert.equal(leaves.length, 9, 'S11 deve conter exatamente nove leaf slides.');
assert.deepEqual(leafIds, expectedIds, 'Ordem ou conjunto dos nove IDs diverge do contrato.');
assert.equal(new Set(leafIds).size, leafIds.length, 'Há IDs duplicados na S11.');
assert.equal((source.match(/<aside\s+class="notes"/gi) ?? []).length, 9, 'Cada leaf deve ter note direta.');

for (const id of expectedIds) {
  const leaf = byId.get(id);
  assert.ok(leaf, `Leaf ${id} ausente.`);
  assert.equal(attribute(leaf.tag, 'data-idea-count'), '3', `${id} sem data-idea-count="3".`);
  assertIncludes(notesOf(leaf.content), ['Técnica:', 'Impacto executivo:', 'Controle e KPI:', 'Fonte/caveat:', 'Transição:'], `Notes de ${id}`);
  assert.doesNotMatch(visibleOf(leaf.content), /<img\b|<svg\b|font-size\s*:\s*[^;"']*px|<style\b/i, `${id} contém asset inline, fonte px ou CSS local.`);
}

assertIncludes(visibleOf(byId.get('loop-engineering').content), ['termo emergente', 'dispara', 'observa', 'age', 'verifica', 'para'], 'Abertura');
assertIncludes(visibleOf(byId.get('loop-evolution').content), ['O prompt permanece', 'scheduler humano', 'loop delimitado', 'terminal state', 'Não é “prompt morreu”'], 'Evolução Prompt vs Loop');

assertIncludes(visibleOf(byId.get('loop-blocks').content), ['Trigger', 'Observer', 'Skills', 'Tools', 'Verifier', 'State / memória operacional', 'sobrevive à sessão'], 'Blocos e state');

const controlPlane = visibleOf(byId.get('loop-control-plane').content);
assertIncludes(controlPlane, ['desired state', 'observe', 'diff', 'act', 'verify', 'reconcile', 'probabilísticos', 'não determinísticos', 'gates humanos'], 'Analogia Kubernetes');
assert.match(controlPlane, /role="table"[^>]*aria-label="[^"]+"/i, 'Tabela de control plane sem descrição acessível.');

const anatomy = visibleOf(byId.get('loop-anatomy').content);
assertIncludes(anatomy, [
  'Trigger', 'Observe', 'Execute', 'Verify', 'Decide',
  'iterações ≤ 5', 'tempo ≤ 30 min', 'custo ≤ budget', 'paralelismo ≤ 2',
  'DONE_VERIFIED', 'NEEDS_HUMAN_REVIEW', 'BLOCKED', 'BUDGET_EXHAUSTED', 'NO_SAFE_CHANGE', 'FAILED_VERIFICATION',
], 'Anatomia, budgets e terminal states');
assert.match(anatomy, /role="img"[^>]*aria-label="[^"]+"/i, 'Anatomia sem descrição acessível.');

assertIncludes(visibleOf(byId.get('loop-levels').content), ['Agent loop', 'Verification loop', 'Event-driven', 'Hill-climbing', 'rápido', 'médio', 'lento'], 'Taxonomias');

const cases = visibleOf(byId.get('loop-cases').content);
assert.equal((cases.match(/loop-evidence-label/g) ?? []).length, 4, 'Cada case deve marcar o resultado publicado.');
assert.equal((cases.match(/loop-editorial-label/g) ?? []).length, 4, 'Cada case deve separar a leitura editorial.');
assertIncludes(cases, ['Bun', '1 milhão de linhas', 'menos de 2 semanas', 'US$ 165 mil', 'Custo / risco', 'regressões', 'LangChain', 'AutoResearch', 'Coding agents'], 'Cases e ledger de claims');

assertIncludes(visibleOf(byId.get('loop-guardrails').content), ['Smart Zone', 'Context budget', 'Isolation', 'WIP = 1', 'Maker / Checker', 'Human gate', 'Sem retry infinito', 'registre state e pare'], 'Guardrails');

const refresh = visibleOf(byId.get('loop-talk-refresh').content);
assertIncludes(refresh, ['content-refresh', 'Trigger', 'Observe', 'Research', 'Verify', 'Draft PR', 'NEEDS_HUMAN_REVIEW', 'sem auto-merge', 'release', 'deploy', 'FAIL → state + handoff'], 'Demo content-refresh');

assert.doesNotMatch(source, /while\s*\(\s*true\s*\)|git\s+merge|gh\s+release|npm\s+publish/i, 'S11 contém automação executável proibida.');
assertIncludes(source, ['termo emergente', 'não um padrão formal consolidado', 'Não é “prompt morreu”'], 'Caveats de terminologia');
assertIncludes(notesOf(byId.get('loop-cases').content), ['Anthropic', '16 jul. 2026', 'LangChain', 'karpathy/autoresearch', 'OpenAI', 'GitHub Docs'], 'Fontes primárias dos cases');
assertIncludes(styles, ['@media (prefers-reduced-motion: reduce)', '.loop-opening-contract *', '.loop-anatomy *', '.loop-refresh-flow *', 'animation: none !important', 'transition: none !important'], 'Contrato de reduced motion');

console.log('PASS S11: nove leaves PT-BR, loop bounded, cases, guardrails, notes e gate humano verificados.');
