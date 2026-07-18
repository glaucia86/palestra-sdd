import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contracts = {
  'pt-BR': {
    part: 'slides/parts/pt-BR/03-copilot.html', manifest: 'slides/manifest.pt-BR.json',
    noteLabels: ['Mensagem técnica:', 'Mensagem executiva:', 'KPI sugerido:'],
    claimFields: ['Fonte oficial:', 'Data de verificação:', 'Superfície:', 'Plano/status:', 'Caveats:'],
    date14: '14 jul. 2026', date15: '15 jul. 2026', desktop: 'Devin Desktop — antigo Windsurf',
    disclosure: 'Sou Devin Ambassador e Codex Ambassador.', cta: /compre|assine|experimente|cadastre-se/i,
  },
  'en-US': {
    part: 'slides/parts/en-US/03-copilot.html', manifest: 'slides/manifest.en-US.json',
    noteLabels: ['Technical message:', 'Executive message:', 'Suggested KPI:'],
    claimFields: ['Official source:', 'Verification date:', 'Surface:', 'Plan/status:', 'Caveats:'],
    date14: 'Jul 14, 2026', date15: 'Jul 15, 2026', desktop: 'Devin Desktop — formerly Windsurf',
    disclosure: 'I am a Devin Ambassador and Codex Ambassador.', cta: /\bbuy\b|subscribe|sign up|try it/i,
  },
  'es-ES': {
    part: 'slides/parts/es-ES/03-copilot.html', manifest: 'slides/manifest.es-ES.json',
    noteLabels: ['Mensaje técnico:', 'Mensaje ejecutivo:', 'KPI sugerido:'],
    claimFields: ['Fuente oficial:', 'Fecha de verificación:', 'Superficie:', 'Plan/status:', 'Caveats:'],
    date14: '14 jul. 2026', date15: '15 jul. 2026', desktop: 'Devin Desktop — antes Windsurf',
    disclosure: 'Soy Devin Ambassador y Codex Ambassador.', cta: /compra|suscríbete|regístrate|pruébalo/i,
  },
};

const requiredIds = [
  'ai-coding-agents', 'agents-autonomia', 'copilot-sdd-verificavel', 'copilot-modos',
  'github-copilot-intro', 'github-copilot', 'copilot-cli', 'codex-intro', 'codex-app-cli',
  'codex-fluxo-sdd', 'claude-code-intro', 'claude-code', 'claude-code-contexto',
  'devin-intro', 'devin-superficies', 'devin-sdd', 'agent-handoff-intro', 'agent-handoff',
  'agent-security-intro', 'agent-security', 'agent-model-routing-intro', 'agent-model-routing',
  'agent-topology-choice-intro', 'agent-topology-choice', 'agent-loop-economy-intro',
  'agent-loop-economy', 'agent-claims-ledger-intro', 'agent-claims-ledger',
];
const requiredCopy = [
  'GitHub Copilot', 'Codex', 'Claude Code', 'CLAUDE.md', 'Subagents', '/compact', 'Devin Cloud',
  'Devin CLI', 'Devin Review', 'AGENTS.md', 'Skills', 'sandbox', 'approvals', 'worktrees',
  'Automations', '/handoff', 'GitHub AI Credits', 'ChatGPT/Codex credits', 'OpenAI API', 'ACUs',
];
const approvedToolCoverLogos = new Map([
  ['github-copilot-intro', 'resources/images/github-copilot-icon.png'],
  ['codex-intro', 'resources/images/codex-color.png'],
  ['claude-code-intro', 'resources/images/claude-code.png'],
  ['devin-intro', 'resources/images/devin.png'],
]);

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

function audit(locale, contract) {
  const source = readFileSync(resolve(root, contract.part), 'utf8');
  const sections = sectionsOf(source, locale);
  const leafSlides = sections.filter(({ children }) => children === 0);
  const sectionIds = sections.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);
  const leafIds = leafSlides.map(({ tag }) => attribute(tag, 'id')).filter(Boolean);

  assert.equal(leafSlides.length, 28, `[${locale}] deve possuir 28 leaf slides.`);
  assert.equal(new Set(sectionIds).size, sectionIds.length, `[${locale}] possui IDs duplicados.`);
  assert.deepEqual([...sectionIds].sort(), [...requiredIds].sort(), `[${locale}] diverge nos IDs funcionais.`);

  for (const [index, slide] of leafSlides.entries()) {
    const slideId = attribute(slide.tag, 'id');
    const ideaCount = Number.parseInt(attribute(slide.tag, 'data-idea-count') ?? '', 10);
    assert.ok(Number.isInteger(ideaCount) && ideaCount >= 1 && ideaCount <= 3, `[${locale}] slide ${index + 1} sem data-idea-count válido.`);
    const notes = notesOf(slide.content);
    assert.ok(notes, `[${locale}] slide ${index + 1} sem note direta.`);
    for (const label of contract.noteLabels) assert.ok(notes.includes(label), `[${locale}] slide ${index + 1} sem ${label}`);

    const visible = visibleOf(slide.content);
    assert.ok((visible.match(/<article\s+class="card\b/gi) ?? []).length <= 3, `[${locale}] slide ${index + 1} excede três cards.`);
    const approvedLogo = approvedToolCoverLogos.get(slideId);
    if (approvedLogo) {
      assert.ok(visible.includes(`src="${approvedLogo}"`), `[${locale}] ${slideId} sem logo aprovado.`);
      assert.match(visible, /<img\b[^>]*class="tool-cover-logo\b[^>]*alt="[^"]+"/i, `[${locale}] ${slideId} sem classe ou alt do logo.`);
      assert.equal((visible.match(/<img\b/gi) ?? []).length, 1, `[${locale}] ${slideId} deve possuir um único logo.`);
    } else {
      assert.doesNotMatch(visible, /<img\b/i, `[${locale}] slide ${index + 1} introduz asset não aprovado.`);
    }
    assert.doesNotMatch(visible, /<svg\b/i, `[${locale}] slide ${index + 1} introduz SVG inline.`);
    assert.doesNotMatch(visible, /font-size\s*:\s*[^;"']*px/i, `[${locale}] slide ${index + 1} usa fonte em px.`);
    if (attribute(slide.tag, 'data-volatile-claim') === 'true') {
      for (const field of contract.claimFields) assert.ok(notes.includes(field), `[${locale}] claim volátil sem ${field}`);
    }
  }

  const visibleRoute = leafSlides.map((slide) => visibleOf(slide.content)).join('\n');
  assert.doesNotMatch(visibleRoute, /copilot-timeline|copilot-modelos-pricing|copilot-cli-preview-ga|copilot-cli-metricas/i);
  assert.doesNotMatch(visibleRoute, /\bGPT-\d|Claude\s+(?:Sonnet|Opus|Fable)|\b\d+(?:[.,]\d+)?\s*[×x]\b/i);
  assert.doesNotMatch(visibleRoute, /<table\b/i, `[${locale}] possui tabela fixa de catálogo ou billing.`);
  for (const copy of [...requiredCopy, contract.desktop]) assert.ok(source.includes(copy), `[${locale}] conteúdo obrigatório ausente: ${copy}`);

  const byId = new Map(leafSlides.map((slide) => [attribute(slide.tag, 'id'), slide]));
  for (const id of ['github-copilot', 'copilot-cli', 'codex-app-cli', 'codex-fluxo-sdd']) {
    assert.ok(byId.get(id)?.content.includes(contract.date14), `[${locale}] ${id} sem data equivalente.`);
  }
  for (const id of ['claude-code', 'claude-code-contexto', 'devin-superficies', 'devin-sdd']) {
    assert.ok(byId.get(id)?.content.includes(contract.date15), `[${locale}] ${id} sem data equivalente.`);
  }

  const firstDevin = byId.get('devin-superficies');
  assert.ok(firstDevin?.content.includes(contract.disclosure), `[${locale}] disclosure Devin/Codex ausente.`);
  assert.doesNotMatch(firstDevin.content, contract.cta, `[${locale}] abertura Devin contém CTA comercial.`);
  assertLinks(source, locale);

  const manifest = JSON.parse(readFileSync(resolve(root, contract.manifest), 'utf8'));
  assert.ok(manifest.parts.includes(contract.part), `[${locale}] manifest não aponta para a parte 03.`);
  return { sectionIds, leafIds };
}

const audited = Object.entries(contracts).map(([locale, contract]) => [locale, audit(locale, contract)]);
const reference = audited[0][1];
for (const [locale, result] of audited.slice(1)) {
  assert.deepEqual(result.sectionIds, reference.sectionIds, `[${locale}] ordem de IDs diverge de PT-BR.`);
  assert.deepEqual(result.leafIds, reference.leafIds, `[${locale}] ordem de leaf slides diverge de PT-BR.`);
}

console.log('PASS S06: 28 leaf slides por locale, aberturas de ferramentas e tópicos, IDs, notes, claims, disclosure, links e guardrails verificados.');
