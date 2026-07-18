import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const expectedIds = [
  'harness-engineering',
  'harness-model',
  'harness-guides-sensors',
  'harness-controls',
  'harness-to-loop',
];
const expectedLeafIds = expectedIds.slice(1);
const ptBrDiagram = {
  id: 'harness-five-subsystems',
  image: 'resources/images/harness-engineering-five-subsystems.png',
};
const contracts = [
  {
    locale: 'pt-BR',
    path: 'slides/parts/pt-BR/04b-harness-engineering.html',
    diagram: ptBrDiagram,
    noteLabels: ['Técnica:', 'Impacto executivo:', 'Controle e KPI:', 'Caveat:'],
    modelComponents: ['instru', 'tool', 'ambiente', 'estado', 'feedback', 'observ'],
    limitProof: ['Sandbox', 'approvals', 'testes', 'review'],
    guideSensor: ['ANTES', 'APÓS', 'checker determinístico primeiro', 'nunca é o único oracle'],
    failure: ['Falha recorrente:', 'instrução', 'tool', 'ambiente', 'state', 'feedback', 'observabilidade', 'antes de trocar o modelo'],
    bridge: ['Intenção', 'Unidade', 'Continuidade', 'Execução', 'Tempo', 'Dimensão temporal:', 'quem dispara', 'como progride', 'sobrevive entre runs', 'quando deve parar'],
  },
  {
    locale: 'en-US',
    path: 'slides/parts/en-US/04b-harness-engineering.html',
    noteLabels: ['Technical:', 'Executive impact:', 'Control and KPI:', 'Caveat:'],
    modelComponents: ['instru', 'tool', 'environment', 'state', 'feedback', 'observ'],
    limitProof: ['Sandbox', 'approvals', 'tests', 'review'],
    guideSensor: ['BEFORE', 'AFTER', 'deterministic checker first', 'never the only oracle'],
    failure: ['Recurring failure:', 'instruction', 'tool', 'environment', 'state', 'feedback', 'observability', 'before changing the model'],
    bridge: ['Intent', 'Unit', 'Continuity', 'Execution', 'Time', 'Temporal dimension:', 'who triggers', 'progresses', 'survives across runs', 'when it must stop'],
  },
  {
    locale: 'es-ES',
    path: 'slides/parts/es-ES/04b-harness-engineering.html',
    noteLabels: ['Técnica:', 'Impacto ejecutivo:', 'Control y KPI:', 'Salvedad:'],
    modelComponents: ['instru', 'tool', 'ambiente', 'estado', 'feedback', 'observ'],
    limitProof: ['Sandbox', 'approvals', 'tests', 'revisión'],
    guideSensor: ['ANTES', 'DESPUÉS', 'checker determinístico primero', 'nunca es el único oracle'],
    failure: ['Fallo recurrente:', 'instrucción', 'tool', 'ambiente', 'estado', 'feedback', 'observabilidad', 'antes de cambiar el modelo'],
    bridge: ['Intención', 'Unidad', 'Continuidad', 'Ejecución', 'Tiempo', 'Dimensión temporal:', 'quién dispara', 'cómo progresa', 'sobrevive entre runs', 'cuándo debe parar'],
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
  for (const value of values) assert.ok(normalized.includes(value.toLocaleLowerCase()), `${label} sem "${value}".`);
}

function audit(contract) {
  const source = readFileSync(resolve(root, contract.path), 'utf8');
  const sections = sectionsOf(source, contract.locale);
  const leaves = sections.filter(({ children }) => children === 0);
  const ids = sections.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const leafIds = leaves.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const byId = new Map(leaves.map((section) => [attribute(section.tag, 'id'), section]));

  const localizedIds = contract.diagram ? [contract.diagram.id] : [];
  const contractIds = [...expectedIds, ...localizedIds];
  const contractLeafIds = contract.diagram
    ? [expectedLeafIds[0], contract.diagram.id, ...expectedLeafIds.slice(1)]
    : expectedLeafIds;

  assert.equal(sections.length, contract.diagram ? 7 : 6, `[${contract.locale}] quantidade de sections divergente.`);
  assert.equal(leaves.length, contract.diagram ? 6 : 5, `[${contract.locale}] quantidade de leaf slides divergente.`);
  assert.deepEqual([...ids].sort(), [...contractIds].sort(), `[${contract.locale}] conjunto de IDs divergente.`);
  assert.deepEqual(leafIds, contractLeafIds, `[${contract.locale}] leaf IDs divergentes.`);
  assert.equal(new Set(ids).size, ids.length, `[${contract.locale}] IDs duplicados.`);
  assert.equal((source.match(/<aside\s+class="notes"/gi) ?? []).length, contract.diagram ? 6 : 5, `[${contract.locale}] quantidade de notes diretas divergente.`);

  for (const leaf of leaves) {
    assert.ok(notesOf(leaf.content), `[${contract.locale}] leaf sem note direta.`);
    assert.doesNotMatch(visibleOf(leaf.content), /<img\b|<svg\b|font-size\s*:\s*[^;"']*px/i, `[${contract.locale}] asset inline ou fonte px detectada.`);
  }

  const model = byId.get('harness-model');
  assertIncludes(visibleOf(model.content), ['Agent =', 'Model', 'Harness', ...contract.modelComponents], `[${contract.locale}] Agent = Model + Harness`);

  if (contract.diagram) {
    const diagram = byId.get(contract.diagram.id);
    assert.equal(attribute(diagram.tag, 'data-background-image'), contract.diagram.image, `[${contract.locale}] imagem do diagrama divergente.`);
    assert.equal(attribute(diagram.tag, 'data-background-size'), 'contain', `[${contract.locale}] diagrama deve caber integralmente no viewport.`);
    assert.ok(attribute(diagram.tag, 'aria-label'), `[${contract.locale}] diagrama sem descrição acessível.`);
    assert.ok(existsSync(resolve(root, contract.diagram.image)), `[${contract.locale}] asset do diagrama não encontrado.`);
    assertIncludes(notesOf(diagram.content), contract.noteLabels, `[${contract.locale}] notes do diagrama`);
  }

  const guideSensor = byId.get('harness-guides-sensors');
  assertIncludes(visibleOf(guideSensor.content), ['Guides', 'Sensors', 'feedforward', 'feedback', 'Computational', 'Inferential', ...contract.guideSensor], `[${contract.locale}] Guides/Sensors`);

  const controls = byId.get('harness-controls');
  assertIncludes(visibleOf(controls.content), ['Agent Skills', 'SKILL.md', 'Maker / Checker', 'WIP = 1', ...contract.limitProof, ...contract.failure], `[${contract.locale}] controles do harness`);
  assert.match(visibleOf(controls.content), /State \+ Observabilidade|State \+ Observability|Estado \+ Observabilidad/i, `[${contract.locale}] state e observabilidade não aparecem juntos.`);

  const bridge = byId.get('harness-to-loop');
  assertIncludes(visibleOf(bridge.content), ['SDD', 'Slice', 'Handoff', 'Harness', 'Loop', ...contract.bridge], `[${contract.locale}] ponte para Loop`);
  assert.match(visibleOf(bridge.content), /role="list"[^>]*aria-label="[^"]+"/i, `[${contract.locale}] ponte sem descrição acessível.`);

  for (const id of expectedLeafIds) assertIncludes(notesOf(byId.get(id).content), contract.noteLabels, `[${contract.locale}] notes de ${id}`);
  assertIncludes(notesOf(leaves[0].content), ['2026', 'HumanLayer', 'Martin Fowler', 'OpenAI', 'Walking Labs'], `[${contract.locale}] note de abertura sem data/fontes`);

  assert.doesNotMatch(source, /Skills\.md|coined by|cunhado por|acuñado por|infinitamente mais barato|infinitely cheaper|cero intervención|zero intervention|zero manually|1 (?:milhão|millón|million)/i, `[${contract.locale}] terminologia ou claim obsoleto.`);
  assert.doesNotMatch(source, /🏎️|<style\b/i, `[${contract.locale}] emoji substituindo ícone ou CSS local.`);

  const manifestPath = contract.locale === 'pt-BR' ? 'slides/manifest.pt-BR.json' : `slides/manifest.${contract.locale}.json`;
  const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), 'utf8'));
  const economy = `slides/parts/${contract.locale}/04a-context-economy.html`;
  assert.ok(manifest.parts.includes(contract.path), `[${contract.locale}] manifest sem 04b.`);
  assert.equal(manifest.parts.indexOf(contract.path), manifest.parts.indexOf(economy) + 1, `[${contract.locale}] 04b deve seguir Economy.`);

  return {
    sharedIds: ids.filter((id) => expectedIds.includes(id)),
    icons: [...source.matchAll(/data-lucide="([^"]+)"/gi)].map((match) => match[1]),
  };
}

const results = contracts.map(audit);
for (const result of results.slice(1)) {
  assert.deepEqual(result.sharedIds, results[0].sharedIds, 'IDs compartilhados divergem entre locales.');
  assert.deepEqual(result.icons, results[0].icons, 'Ícones divergem entre locales.');
}

console.log('PASS S10: Harness localizado, guides/sensors, checks, controles, falhas e ponte temporal verificados.');
