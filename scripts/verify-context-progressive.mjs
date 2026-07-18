import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const expectedSectionIds = [
  'arquitetura',
  'context-engineering',
  'context-architecture-flow',
  'context-instructions',
  'context-map',
  'agent-skills-intro',
  'agent-skills',
  'progressive-disclosure',
  'progressive-disclosure-loading',
  'context-subagents-intro',
  'context-subagents',
  'context-state-memory-intro',
  'context-state-memory',
  'economia-contexto-ponte',
];
const expectedLeafIds = expectedSectionIds.slice(1);
const contracts = {
  'pt-BR': {
    part: 'slides/parts/pt-BR/04-context-progressive.html',
    manifest: 'slides/manifest.pt-BR.json',
    nativeCommand: 'comando nativo',
    architectureCopy: ['Desenvolvedor', 'Contexto persistente', 'Skills sob demanda', 'Comandos explícitos', 'Sistemas externos', 'Agent Runtime', 'Contexto ativo'],
    stateCopy: ['State atual', 'Memory curada', 'Transcript Inteiro'],
    bridgeCopy: ['Curadoria', 'Context Engineering', 'Limites', 'Context Economy', 'Saída', 'quanto cabe', 'por quanto tempo', 'qual sinal encerra o ciclo'],
    progressiveCopy: ['princípio de revelar', 'AGENTS.md raiz', 'Skills especializadas', 'Context Window', 'Qualidade', 'Analogia'],
  },
  'en-US': {
    part: 'slides/parts/en-US/04-context-progressive.html',
    manifest: 'slides/manifest.en-US.json',
    nativeCommand: 'native command',
    architectureCopy: ['Developer', 'Persistent context', 'On-demand skills', 'Explicit commands', 'External systems', 'Agent Runtime', 'Active context'],
    stateCopy: ['Current state', 'Curated memory', 'Entire Transcript'],
    bridgeCopy: ['Curation', 'Context Engineering', 'Limits', 'Context Economy', 'Exit', 'how much fits', 'for how long', 'what signal ends the cycle'],
    progressiveCopy: ['principle of revealing', 'Root AGENTS.md', 'Specialized Skills', 'Context Window', 'Quality', 'Analogy'],
  },
  'es-ES': {
    part: 'slides/parts/es-ES/04-context-progressive.html',
    manifest: 'slides/manifest.es-ES.json',
    nativeCommand: 'comando nativo',
    architectureCopy: ['Desarrollador', 'Contexto persistente', 'Skills bajo demanda', 'Comandos explícitos', 'Sistemas externos', 'Agent Runtime', 'Contexto activo'],
    stateCopy: ['State actual', 'Memory curada', 'Transcript Completo'],
    bridgeCopy: ['Curaduría', 'Context Engineering', 'Límites', 'Context Economy', 'Salida', 'cuánto cabe', 'durante cuánto tiempo', 'qué señal cierra el ciclo'],
    progressiveCopy: ['principio de revelar', 'AGENTS.md raíz', 'Skills especializadas', 'Context Window', 'Calidad', 'Analogía'],
  },
};

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
    } else {
      const section = stack.pop();
      assert.ok(section, `[${locale}] fechamento </section> sem abertura.`);
      sections.push({ ...section, content: html.slice(section.start, token.index + token[0].length) });
    }
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

function assertLinks(source, locale) {
  assert.doesNotMatch(source, /href="http:\/\//i, `[${locale}] link externo sem HTTPS.`);
  for (const match of source.matchAll(/<a\b[^>]*>/gi)) {
    if (!/target="_blank"/i.test(match[0])) continue;
    const rel = attribute(match[0], 'rel')?.toLowerCase().split(/\s+/) ?? [];
    assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), `[${locale}] target=_blank sem noopener noreferrer.`);
  }
}

function assertInOrder(content, values, locale, slideId) {
  let lastIndex = -1;
  for (const value of values) {
    const index = content.indexOf(value);
    assert.ok(index > lastIndex, `[${locale}] ${slideId} não segue ${values.join(' → ')}.`);
    lastIndex = index;
  }
}

function filesUnder(path) {
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = resolve(path, entry.name);
    return entry.isDirectory() ? filesUnder(child) : [child];
  });
}

function assertNoNormativeSkillsMd() {
  const roots = ['README.md', 'index.html', 'docs', 'slides/parts', 'src-ts'];
  const files = roots.flatMap((path) => filesUnder(resolve(root, path)));
  for (const file of files) {
    if (!/\.(?:html|md|ts)$/i.test(file)) continue;
    assert.doesNotMatch(readFileSync(file, 'utf8'), /Skills\.md/i, `Ocorrência normativa atual de Skills.md em ${file}.`);
  }
}

function audit(locale, contract) {
  const source = readFileSync(resolve(root, contract.part), 'utf8');
  const sections = sectionsOf(source, locale);
  const leafSlides = sections.filter(({ children }) => children === 0);
  const sectionIds = sections.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const leafIds = leafSlides.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const byId = new Map(leafSlides.map((slide) => [attribute(slide.tag, 'id'), slide]));

  assert.equal(leafSlides.length, 14, `[${locale}] deve possuir abertura + treze leaf slides.`);
  assert.equal(new Set(sectionIds).size, sectionIds.length, `[${locale}] possui IDs duplicados.`);
  assert.deepEqual([...sectionIds].sort(), [...expectedSectionIds].sort(), `[${locale}] diverge nos IDs da S07.`);
  assert.deepEqual(leafIds, expectedLeafIds, `[${locale}] diverge na ordem dos leaf IDs.`);

  for (const [index, slide] of leafSlides.entries()) {
    const ideaCount = Number.parseInt(attribute(slide.tag, 'data-idea-count') ?? '', 10);
    assert.ok(Number.isInteger(ideaCount) && ideaCount >= 1 && ideaCount <= 3, `[${locale}] slide ${index + 1} sem data-idea-count válido.`);
    assert.ok(notesOf(slide.content), `[${locale}] slide ${index + 1} sem note direta.`);
    const visible = visibleOf(slide.content);
    assert.ok((visible.match(/<article\s+class="card\b/gi) ?? []).length <= 3, `[${locale}] slide ${index + 1} excede três cards.`);
    assert.doesNotMatch(visible, /<img\b|<svg\b/i, `[${locale}] slide ${index + 1} introduz asset ou SVG inline.`);
    assert.doesNotMatch(visible, /font-size\s*:\s*[^;"']*px/i, `[${locale}] slide ${index + 1} usa fonte em px.`);
  }

  assert.doesNotMatch(source, /Skills\.md/i, `[${locale}] contém ocorrência normativa de Skills.md.`);
  assert.doesNotMatch(source, /Smart Zone|Dumb Zone|GitHub AI Credit|US\$0\.01|model routing|Vertical Slice/i, `[${locale}] antecipa conteúdo da Economy.`);
  assert.doesNotMatch(source, /economia-tokens|sdd-finops-agentes/i, `[${locale}] preserva ID antigo de Economy.`);

  const architecture = byId.get('context-architecture-flow');
  assert.ok(architecture, `[${locale}] diagrama de arquitetura de contexto ausente.`);
  const architectureVisible = visibleOf(architecture.content);
  assert.equal((architectureVisible.match(/class="context-source context-source--/g) ?? []).length, 4, `[${locale}] arquitetura deve possuir quatro canais de contexto.`);
  for (const copy of contract.architectureCopy) {
    assert.ok(architectureVisible.includes(copy), `[${locale}] arquitetura de contexto sem ${copy}.`);
  }
  assert.ok(architectureVisible.includes('context-agent-runtime'), `[${locale}] arquitetura sem runtime do agente.`);
  assert.ok(leafIds.indexOf('context-engineering') < leafIds.indexOf('context-architecture-flow'), `[${locale}] diagrama deve suceder a introdução de Context Engineering.`);
  assert.ok(leafIds.indexOf('context-architecture-flow') < leafIds.indexOf('context-instructions'), `[${locale}] diagrama deve anteceder Instructions.`);

  const progressiveCover = byId.get('progressive-disclosure');
  assert.ok(progressiveCover, `[${locale}] capa progressive-disclosure ausente.`);
  assert.match(visibleOf(progressiveCover.content), /Progressive\s*<br\s*\/?>\s*Disclosure/i, `[${locale}] capa não identifica Progressive Disclosure.`);
  assert.ok(leafIds.indexOf('progressive-disclosure') < leafIds.indexOf('progressive-disclosure-loading'), `[${locale}] capa deve anteceder o conteúdo de Progressive Disclosure.`);

  const topicCovers = [
    { cover: 'agent-skills-intro', content: 'agent-skills', copy: ['Agent', 'Skills'] },
    { cover: 'context-subagents-intro', content: 'context-subagents', copy: ['Subagents'] },
    { cover: 'context-state-memory-intro', content: 'context-state-memory', copy: ['State', 'Memory'] },
  ];
  for (const topic of topicCovers) {
    const cover = byId.get(topic.cover);
    assert.ok(cover, `[${locale}] capa ${topic.cover} ausente.`);
    const coverVisible = visibleOf(cover.content);
    assert.ok(coverVisible.includes('section-page-container'), `[${locale}] ${topic.cover} não usa o padrão de capa.`);
    for (const copy of topic.copy) assert.ok(coverVisible.includes(copy), `[${locale}] ${topic.cover} sem ${copy}.`);
    assert.ok(leafIds.indexOf(topic.cover) < leafIds.indexOf(topic.content), `[${locale}] ${topic.cover} deve anteceder ${topic.content}.`);
  }

  const progressive = byId.get('progressive-disclosure-loading');
  assert.ok(progressive, `[${locale}] slide progressive-disclosure-loading ausente.`);
  const progressiveVisible = visibleOf(progressive.content);
  assertInOrder(progressiveVisible, contract.progressiveCopy, locale, 'progressive-disclosure-loading');
  for (const copy of ['AGENTS.md', 'Skills', 'Context Window', '70%', 'stethoscope']) {
    assert.ok(progressiveVisible.toLowerCase().includes(copy.toLowerCase()), `[${locale}] Progressive Disclosure sem ${copy}.`);
  }
  assert.ok(progressive.content.includes('https://www.linkedin.com/pulse/como-reduzi-em-70-o-uso-do-context-window-github-copilot-lemos-cycnf'), `[${locale}] Progressive Disclosure sem referência do estudo da autora.`);
  assert.ok(progressive.content.includes('https://agentskills.io/specification#progressive-disclosure'), `[${locale}] Progressive Disclosure sem fonte oficial da especificação.`);

  const skill = byId.get('agent-skills');
  for (const copy of ['SKILL.md', 'scripts', 'assets']) {
    assert.ok(skill?.content.toLowerCase().includes(copy.toLowerCase()), `[${locale}] Agent Skills sem ${copy}.`);
  }
  assert.match(skill.content, /refer\w*/i, `[${locale}] Agent Skills sem referências localizadas.`);

  const subagents = byId.get('context-subagents');
  for (const copy of ['Subagent', 'Skill', contract.nativeCommand]) {
    assert.ok(subagents?.content.toLowerCase().includes(copy.toLowerCase()), `[${locale}] rotulagem ausente em subagents: ${copy}.`);
  }

  const state = byId.get('context-state-memory');
  for (const copy of [...contract.stateCopy, 'compaction', 'clearing', 'editing', 'isolation', 'caching']) {
    assert.ok(state?.content.includes(copy), `[${locale}] state/memory sem ${copy}.`);
  }

  const bridge = byId.get('economia-contexto-ponte');
  assert.equal(leafIds.at(-1), 'economia-contexto-ponte', `[${locale}] bridge não é o último leaf slide.`);
  for (const copy of contract.bridgeCopy) {
    assert.ok(bridge?.content.includes(copy), `[${locale}] bridge sem ${copy}.`);
  }
  const beforeBridge = source.replace(bridge.content, '');
  assert.doesNotMatch(beforeBridge, /\bbudget\b|\bbilling\b|\bhandoff\b/i, `[${locale}] budget, billing ou handoff aparecem antes da bridge.`);

  assertLinks(source, locale);
  const manifest = JSON.parse(readFileSync(resolve(root, contract.manifest), 'utf8'));
  assert.ok(manifest.parts.includes(contract.part), `[${locale}] manifest não aponta para a parte 04.`);
  return { leafIds, noteCount: leafSlides.filter((slide) => notesOf(slide.content)).length };
}

assertNoNormativeSkillsMd();
const audited = Object.entries(contracts).map(([locale, contract]) => [locale, audit(locale, contract)]);
const reference = audited[0][1];
for (const [locale, result] of audited.slice(1)) {
  assert.deepEqual(result.leafIds, reference.leafIds, `[${locale}] ordem de leaf IDs diverge de PT-BR.`);
  assert.equal(result.noteCount, reference.noteCount, `[${locale}] contagem de notes diverge de PT-BR.`);
}

console.log('PASS S07: 14 leaf slides por locale, diagrama de arquitetura, capas temáticas, conteúdo de contexto, IDs, notes e fronteira com Economy verificados.');
