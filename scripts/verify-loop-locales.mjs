import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const partsOnly = process.argv.includes('--parts-only');
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
const terminalStates = [
  'DONE_VERIFIED',
  'NEEDS_HUMAN_REVIEW',
  'BLOCKED',
  'BUDGET_EXHAUSTED',
  'NO_SAFE_CHANGE',
  'FAILED_VERIFICATION',
];
const contracts = [
  {
    locale: 'pt-BR',
    part: 'slides/parts/pt-BR/04c-loop-engineering.html',
    intro: 'slides/parts/pt-BR/01-intro-sdd.html',
    manifest: 'slides/manifest.pt-BR.json',
    notes: ['Técnica:', 'Impacto executivo:', 'Controle e KPI:', 'Fonte/caveat:', 'Transição:'],
    term: ['termo emergente', 'não um padrão formal consolidado'],
    prompt: ['O prompt permanece', 'Não é “prompt morreu”'],
    caveat: ['probabilísticos', 'não determinísticos', 'gates humanos'],
    limits: ['iterações ≤ 5', 'tempo ≤ 30 min', 'custo ≤ budget', 'paralelismo ≤ 2'],
    caseLabels: ['Publicado', 'Leitura editorial', 'Custo / risco'],
    bun: ['1 milhão de linhas', 'menos de 2 semanas', 'US$ 165 mil', 'regressões'],
    stop: ['Sem retry infinito', 'registre state e pare'],
    demo: ['A autora publica', 'sem auto-merge', 'FAIL → state + handoff'],
    sourceDate: '16 jul. 2026',
    summaryTitle: 'Loop: reconciliação e gates',
  },
  {
    locale: 'en-US',
    part: 'slides/parts/en-US/04c-loop-engineering.html',
    intro: 'slides/parts/en-US/01-intro-sdd.html',
    manifest: 'slides/manifest.en-US.json',
    notes: ['Technical:', 'Executive impact:', 'Control and KPI:', 'Source/caveat:', 'Transition:'],
    term: ['emerging term', 'not a consolidated formal standard'],
    prompt: ['The prompt remains', 'the prompt is dead'],
    caveat: ['probabilistic', 'non-deterministic', 'human gates'],
    limits: ['iterations ≤ 5', 'time ≤ 30 min', 'cost ≤ budget', 'parallelism ≤ 2'],
    caseLabels: ['Published', 'Editorial reading', 'Cost / risk'],
    bun: ['1 million lines', 'under 2 weeks', 'US$165K', 'regressions'],
    stop: ['No infinite retry', 'record state and stop'],
    demo: ['The author publishes', 'no auto-merge', 'FAIL → state + handoff'],
    sourceDate: 'Jul. 16, 2026',
    summaryTitle: 'Loop: reconciliation and gates',
  },
  {
    locale: 'es-ES',
    part: 'slides/parts/es-ES/04c-loop-engineering.html',
    intro: 'slides/parts/es-ES/01-intro-sdd.html',
    manifest: 'slides/manifest.es-ES.json',
    notes: ['Técnica:', 'Impacto ejecutivo:', 'Control y KPI:', 'Fuente/salvedad:', 'Transición:'],
    term: ['término emergente', 'no un estándar formal consolidado'],
    prompt: ['El prompt permanece', 'No significa que “el prompt murió”'],
    caveat: ['probabilísticos', 'no deterministas', 'gates humanos'],
    limits: ['iteraciones ≤ 5', 'tiempo ≤ 30 min', 'costo ≤ budget', 'paralelismo ≤ 2'],
    caseLabels: ['Publicado', 'Lectura editorial', 'Costo / riesgo'],
    bun: ['1 millón de líneas', 'menos de 2 semanas', 'US$165 mil', 'regresiones'],
    stop: ['Sin retry infinito', 'registre state y deténgase'],
    demo: ['La autora publica', 'sin auto-merge', 'FAIL → state + handoff'],
    sourceDate: '16 jul. 2026',
    summaryTitle: 'Loop: reconciliación y gates',
  },
];

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
}

function sectionsOf(html, locale) {
  const stack = [];
  const sections = [];
  for (const token of html.matchAll(/<section\b[^>]*>|<\/section>/gi)) {
    if (/^<section\b/i.test(token[0])) {
      if (stack.length) stack.at(-1).children += 1;
      stack.push({ children: 0, tag: token[0], start: token.index });
      continue;
    }
    const section = stack.pop();
    assert.ok(section, `[${locale}] fechamento </section> sem abertura.`);
    sections.push({ ...section, content: html.slice(section.start, token.index + token[0].length) });
  }
  assert.equal(stack.length, 0, `[${locale}] seção sem fechamento.`);
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

function auditPart(contract) {
  assert.ok(existsSync(resolve(root, contract.part)), `[${contract.locale}] 04c ausente.`);
  const source = readFileSync(resolve(root, contract.part), 'utf8');
  const sections = sectionsOf(source, contract.locale);
  const leaves = sections.filter(({ children }) => children === 0);
  const leafIds = leaves.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const byId = new Map(leaves.map((section) => [attribute(section.tag, 'id'), section]));
  const icons = [...source.matchAll(/data-lucide="([^"]+)"/gi)].map((match) => match[1]);

  assert.equal(sections.length, 10, `[${contract.locale}] deve conter stack + nove leaves.`);
  assert.equal(leaves.length, 9, `[${contract.locale}] deve conter nove leaves.`);
  assert.deepEqual(leafIds, expectedIds, `[${contract.locale}] IDs ou ordem divergentes.`);
  assert.equal(new Set(leafIds).size, leafIds.length, `[${contract.locale}] IDs duplicados.`);
  assert.equal((source.match(/<aside\s+class="notes"/gi) ?? []).length, 9, `[${contract.locale}] deve ter nove notes diretas.`);

  for (const id of expectedIds) {
    const leaf = byId.get(id);
    assert.equal(attribute(leaf.tag, 'data-idea-count'), '3', `[${contract.locale}] ${id} sem data-idea-count=3.`);
    assertIncludes(notesOf(leaf.content), contract.notes, `[${contract.locale}] notes de ${id}`);
    assert.doesNotMatch(visibleOf(leaf.content), /<img\b|<svg\b|font-size\s*:\s*[^;"']*px|<style\b/i, `[${contract.locale}] ${id} contém asset inline, fonte px ou CSS local.`);
  }

  assertIncludes(visibleOf(byId.get('loop-engineering').content), [contract.term[0]], `[${contract.locale}] termo emergente visível`);
  assertIncludes(source, [contract.term[1]], `[${contract.locale}] caveat de terminologia`);
  assertIncludes(visibleOf(byId.get('loop-evolution').content), contract.prompt, `[${contract.locale}] Prompt vs Loop`);
  assertIncludes(visibleOf(byId.get('loop-control-plane').content), contract.caveat, `[${contract.locale}] caveat Kubernetes`);
  assertIncludes(visibleOf(byId.get('loop-anatomy').content), [...contract.limits, ...terminalStates], `[${contract.locale}] limites e terminal states`);

  const cases = visibleOf(byId.get('loop-cases').content);
  assertIncludes(cases, [...contract.caseLabels, ...contract.bun], `[${contract.locale}] cases`);
  assert.equal((cases.match(/loop-evidence-label/g) ?? []).length, 4, `[${contract.locale}] cada case deve marcar o resultado publicado.`);
  assert.equal((cases.match(/loop-editorial-label/g) ?? []).length, 4, `[${contract.locale}] cada case deve marcar a leitura editorial.`);
  assertIncludes(notesOf(byId.get('loop-cases').content), ['Anthropic', contract.sourceDate, 'LangChain', 'karpathy/autoresearch', 'OpenAI', 'GitHub Docs'], `[${contract.locale}] fontes dos cases`);

  assertIncludes(visibleOf(byId.get('loop-guardrails').content), ['Smart Zone', 'Context budget', 'Isolation', 'WIP = 1', 'Maker / Checker', 'Human gate', ...contract.stop], `[${contract.locale}] guardrails`);
  assertIncludes(visibleOf(byId.get('loop-talk-refresh').content), ['Draft PR', 'NEEDS_HUMAN_REVIEW', 'BUDGET_EXHAUSTED', ...contract.demo], `[${contract.locale}] content-refresh`);
  assert.doesNotMatch(source, /while\s*\(\s*true\s*\)|git\s+merge|gh\s+release|npm\s+publish/i, `[${contract.locale}] automação executável proibida.`);

  return { contract, icons, leafIds };
}

const results = contracts.map(auditPart);
for (const result of results.slice(1)) {
  assert.deepEqual(result.leafIds, results[0].leafIds, 'IDs divergem entre locales.');
  assert.deepEqual(result.icons, results[0].icons, `Ícones divergem em ${result.contract.locale}.`);
}

if (!partsOnly) {
  for (const { contract } of results) {
    const manifest = JSON.parse(readFileSync(resolve(root, contract.manifest), 'utf8'));
    const harness = `slides/parts/${contract.locale}/04b-harness-engineering.html`;
    const ending = `slides/parts/${contract.locale}/05-refs-end.html`;
    assert.equal(manifest.parts.filter((part) => part === contract.part).length, 1, `[${contract.locale}] 04c deve aparecer uma vez no manifest.`);
    assert.equal(manifest.parts.indexOf(contract.part), manifest.parts.indexOf(harness) + 1, `[${contract.locale}] 04c deve seguir 04b.`);
    assert.equal(manifest.parts.indexOf(ending), manifest.parts.indexOf(contract.part) + 1, `[${contract.locale}] 05 deve seguir 04c.`);
    for (const part of manifest.parts) assert.ok(existsSync(resolve(root, part)), `[${contract.locale}] parte ausente: ${part}`);

    const intro = readFileSync(resolve(root, contract.intro), 'utf8');
    assert.equal((intro.match(/href="#\/loop-engineering"/g) ?? []).length, 1, `[${contract.locale}] sumário deve ter um deep link Loop.`);
    assertIncludes(intro, [contract.summaryTitle, 'data-lucide="infinity"'], `[${contract.locale}] card Loop no sumário`);

    const ids = new Set();
    for (const part of manifest.parts) {
      const partSource = readFileSync(resolve(root, part), 'utf8');
      for (const match of partSource.matchAll(/\bid="([^"]+)"/gi)) ids.add(match[1]);
    }
    assert.ok(ids.has('loop-engineering'), `[${contract.locale}] destino loop-engineering ausente no deck.`);
  }

  const defaultManifest = JSON.parse(readFileSync(resolve(root, 'slides/manifest.json'), 'utf8'));
  const ptPart = 'slides/parts/pt-BR/04c-loop-engineering.html';
  assert.equal(defaultManifest.parts.filter((part) => part === ptPart).length, 1, '[default] 04c PT-BR deve aparecer uma vez.');
  assert.equal(defaultManifest.parts.indexOf(ptPart), defaultManifest.parts.indexOf('slides/parts/pt-BR/04b-harness-engineering.html') + 1, '[default] 04c deve seguir 04b.');
  assert.equal(defaultManifest.parts.indexOf('slides/parts/pt-BR/05-refs-end.html'), defaultManifest.parts.indexOf(ptPart) + 1, '[default] 05 deve seguir 04c.');
}

console.log(partsOnly
  ? 'PASS S12 parts: três locales com nove leaves, claims, notes, limites e ícones em paridade.'
  : 'PASS S12: três locales, quatro manifests, deep links, claims, notes e estrutura Loop em paridade.');
