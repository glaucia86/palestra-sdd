import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const protectedIds = ['demo-talk-code', 'referencias', 'conclusao', 'quiz', 'sobre-mim', 'the-end'];
const contracts = [
  {
    locale: 'pt-BR',
    disclosure: 'Transparência:',
    fallback: 'Fallback:',
    humanReview: 'Revisão humana antes de merge, release ou deploy',
    conclusion: ['Spec', 'Contexto', 'Slice', 'Handoff', 'Harness', 'Loop', 'IDE', 'terminal', 'VM cloud', 'pessoas continuam responsáveis'],
  },
  {
    locale: 'en-US',
    disclosure: 'Disclosure:',
    fallback: 'Fallback:',
    humanReview: 'Human review before merge, release, or deploy',
    conclusion: ['Spec', 'Context', 'Slice', 'Handoff', 'Harness', 'Loop', 'IDE', 'terminal', 'cloud VM', 'people remain accountable'],
  },
  {
    locale: 'es-ES',
    disclosure: 'Transparencia:',
    fallback: 'Fallback:',
    humanReview: 'Revisión humana antes de merge, release o deploy',
    conclusion: ['Spec', 'Contexto', 'Slice', 'Handoff', 'Harness', 'Loop', 'IDE', 'terminal', 'VM cloud', 'personas siguen responsables'],
  },
];

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

function idOf(tag) {
  return tag.match(/\bid="([^"]+)"/i)?.[1] ?? null;
}

function notesOf(section) {
  return section.match(/<aside\s+class="notes"[^>]*>([\s\S]*?)<\/aside>/i)?.[1] ?? '';
}

function visibleOf(section) {
  return section.split(/<aside\s+class="notes"/i, 1)[0];
}

function firstNoteParagraph(section) {
  return notesOf(section).match(/<p>([\s\S]*?)<\/p>/i)?.[1] ?? '';
}

function assertIncludes(content, values, label) {
  const normalized = content.toLocaleLowerCase();
  for (const value of values) {
    assert.ok(normalized.includes(value.toLocaleLowerCase()), `${label} sem "${value}".`);
  }
}

function audit(contract) {
  const relative = `slides/parts/${contract.locale}/05-refs-end.html`;
  const path = resolve(root, relative);
  assert.ok(existsSync(path), `[${contract.locale}] parte final ausente.`);
  const source = readFileSync(path, 'utf8');
  const sections = sectionsOf(source, contract.locale);
  const ids = sections.map(({ tag }) => idOf(tag)).filter(Boolean);
  const byId = new Map(sections.map((section) => [idOf(section.tag), section]));

  for (const id of protectedIds) {
    assert.equal(ids.filter((candidate) => candidate === id).length, 1, `[${contract.locale}] ${id} deve existir uma vez.`);
    assert.ok(notesOf(byId.get(id).content), `[${contract.locale}] ${id} sem note direta.`);
  }

  const demo = byId.get('demo-talk-code').content;
  const demoVisible = visibleOf(demo);
  assertIncludes(demoVisible, ['PASS → draft PR', 'FAIL → BLOCKED', 'BUDGET → STOP', contract.humanReview], `[${contract.locale}] contrato visível da demo`);
  assertIncludes(notesOf(demo), [contract.disclosure, 'Codex Ambassador', 'Devin Ambassador', contract.fallback, 'draft PR', 'BLOCKED'], `[${contract.locale}] notes/fallback da demo`);
  assertIncludes(demo, ['darth-vader.gif', 'data-lightsaber-three', 'data-lightsaber-toggle', 'data-demo-easter-hint'], `[${contract.locale}] lifecycle/easter egg da demo`);

  const references = byId.get('referencias').content;
  const referenceCards = [...visibleOf(references).matchAll(/<div class="refs-category">([\s\S]*?)<\/div>/gi)].map((match) => match[1]);
  assert.equal(referenceCards.length, 7, `[${contract.locale}] referências devem ter sete cards curados.`);
  for (const card of referenceCards) {
    const links = (card.match(/<a\b/gi) ?? []).length;
    assert.ok(links > 0 && links <= 5, `[${contract.locale}] card de referência deve ter entre um e cinco links; recebeu ${links}.`);
  }
  const devinCard = referenceCards.find((card) => card.includes('Devin Desktop FAQ')) ?? '';
  assert.equal((devinCard.match(/<a\b/gi) ?? []).length, 5, `[${contract.locale}] card Devin deve expor cinco fontes oficiais.`);
  assertIncludes(notesOf(references), [contract.disclosure, 'Codex Ambassador', 'Devin Ambassador', 'doc-specs/atualizacao-julho.md', '14–15'], `[${contract.locale}] notes/ledger das referências`);

  const conclusion = byId.get('conclusao').content;
  assertIncludes(visibleOf(conclusion), contract.conclusion, `[${contract.locale}] arco da conclusão`);
  assertIncludes(notesOf(conclusion), ['spec', 'context', 'slice', 'handoff', 'harness', 'loop', 'merge', 'release', 'deploy'], `[${contract.locale}] responsabilidade humana na conclusão`);

  const bio = byId.get('sobre-mim').content;
  const bioVisible = visibleOf(bio);
  assert.equal((bioVisible.match(/>Codex Ambassador</g) ?? []).length, 2, `[${contract.locale}] Codex Ambassador deve ter dois badges equivalentes.`);
  assert.equal((bioVisible.match(/>Devin Ambassador</g) ?? []).length, 2, `[${contract.locale}] Devin Ambassador deve ter dois badges equivalentes.`);
  assertIncludes(firstNoteParagraph(bio), [contract.disclosure, 'Codex Ambassador', 'Devin Ambassador'], `[${contract.locale}] primeira note da bio`);

  const ending = byId.get('the-end').content;
  assertIncludes(ending, ['star-wars.gif', 'data-end-audio-toggle', 'data-end-audio-text', 'data-end-audio-hint'], `[${contract.locale}] lifecycle do encerramento`);
  assert.doesNotMatch(source, /font-size\s*:\s*[^;"']*px|<svg\b|<style\b/i, `[${contract.locale}] parte final contém fonte px, SVG ou CSS local.`);

  return ids;
}

const idOrders = contracts.map(audit);
for (const ids of idOrders.slice(1)) assert.deepEqual(ids, idOrders[0], 'Ordem de IDs diverge entre os locales finais.');

const styles = readFileSync(resolve(root, 'css/custom.css'), 'utf8');
assertIncludes(styles, ['#demo-talk-code .demo-loop-contract', '#demo-talk-code .demo-loop-boundary'], 'CSS do contrato bounded da demo');
assertIncludes(styles, ['@media (prefers-reduced-motion: reduce)', 'body.lite-mode #demo-talk-code .demo-lightsaber-three-canvas'], 'Contratos lite/reduced motion');

const demoRuntime = readFileSync(resolve(root, 'src-ts/app/features/demo-experience.ts'), 'utf8');
assertIncludes(demoRuntime, [
  "addEventListener('click'",
  'if (liteMode)',
  'stopRealSound()',
  'clearTimeout(loopStartTimer)',
  'cancelAnimationFrame(rafId)',
  'void toggleHum(demoSlide, false)',
], 'Lifecycle da demo');

const endingRuntime = readFileSync(resolve(root, 'src-ts/app/features/the-end-experience.ts'), 'utf8');
assertIncludes(endingRuntime, [
  "toggleButton.addEventListener('click'",
  'clearTimeout(hyperdriveTimer)',
  'clearTimeout(hyperdriveExitTimer)',
  'finalSongEl.pause()',
  'void toggleTheEndSong(theEndSlide, false, true)',
], 'Lifecycle de áudio do finale');

for (const contract of contracts) {
  const source = readFileSync(resolve(root, `slides/parts/${contract.locale}/05-refs-end.html`), 'utf8');
  assert.doesNotMatch(source, /(?:api[_-]?key|client[_-]?secret|password|authorization)\s*[:=]\s*["'][^"']+/i, `[${contract.locale}] possível secret na parte final.`);
}

console.log('PASS S13: demo bounded, referências curadas, disclosure, bio, conclusão e experiências finais em paridade.');
