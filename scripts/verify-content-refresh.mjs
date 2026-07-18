import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const requiredHandoffFields = [
  'completed',
  'remaining',
  'branchWorktree',
  'files',
  'decisions',
  'assumptions',
  'checks',
  'blockers',
  'risk',
  'budget',
  'nextAction',
];

const handoff = (overrides = {}) => ({
  completed: ['claim classified'],
  remaining: [],
  branchWorktree: 'current branch / current worktree; no branch created by simulation',
  files: [],
  decisions: [],
  assumptions: [],
  checks: ['npm run verify:deck'],
  blockers: [],
  risk: 'low',
  budget: { iterations: 1, maxIterations: 3, parallelTasks: 1, maxParallelTasks: 3 },
  nextAction: 'record terminal state',
  ...overrides,
});

const scenarios = {
  'no-op': {
    terminalState: 'NO_OP',
    changed: false,
    draftPr: false,
    handoff: handoff({ decisions: ['official source confirms current claim'] }),
  },
  changed: {
    terminalState: 'NEEDS_HUMAN_REVIEW',
    changed: true,
    draftPr: true,
    handoff: handoff({
      completed: ['primary source verified', 'localized diff proposed', 'deterministic checks passed'],
      remaining: ['author review'],
      files: ['docs/research/claim-ledger.md', 'slides/parts/{pt-BR,en-US,es-ES}/affected.html'],
      decisions: ['draft PR is the maximum automated outcome'],
      budget: { iterations: 2, maxIterations: 3, parallelTasks: 3, maxParallelTasks: 3 },
      nextAction: 'request author review of the draft diff',
    }),
  },
  'source-unavailable': {
    terminalState: 'BLOCKED',
    changed: false,
    draftPr: false,
    handoff: handoff({
      remaining: ['verify claim from an accessible primary source'],
      blockers: ['primary source unavailable'],
      assumptions: ['secondary sources were not promoted to evidence'],
      budget: { iterations: 1, maxIterations: 3, parallelTasks: 2, maxParallelTasks: 3 },
      nextAction: 'wait for source access or author direction',
    }),
  },
  exhausted: {
    terminalState: 'BUDGET_EXHAUSTED',
    changed: false,
    draftPr: false,
    handoff: handoff({
      remaining: ['resolve contradictory primary sources'],
      blockers: ['iteration and research budget exhausted'],
      risk: 'medium: unresolved volatile claim',
      budget: { iterations: 3, maxIterations: 3, parallelTasks: 3, maxParallelTasks: 3 },
      nextAction: 'stop retries and escalate to the author',
    }),
  },
};

const ledger = readFileSync(new URL('../docs/research/claim-ledger.md', import.meta.url), 'utf8');
const operation = readFileSync(new URL('../docs/operations/content-refresh.md', import.meta.url), 'utf8');

for (const marker of ['ID', 'Verificado em', 'Superfície', 'Plano/status', 'Caveats', 'Locales/slides', 'Owner']) {
  assert.match(ledger, new RegExp(marker.replace('/', '\\/'), 'i'), `Ledger sem campo obrigatório: ${marker}`);
}
for (const prefix of ['CLM-COP-', 'CLM-OAI-', 'CLM-DEV-']) assert.match(ledger, new RegExp(prefix));
for (const state of ['NO_OP', 'NEEDS_HUMAN_REVIEW', 'BLOCKED', 'BUDGET_EXHAUSTED', 'DONE_VERIFIED']) {
  assert.match(operation, new RegExp(state), `Contrato sem terminal state: ${state}`);
}
assert.match(operation, /no máximo 3 iterações/i);
assert.match(operation, /3 tarefas de pesquisa em paralelo/i);
assert.match(operation, /nunca a merge\/release\/deploy automático/i);

const selected = process.argv[2] ? { [process.argv[2]]: scenarios[process.argv[2]] } : scenarios;
assert.ok(Object.values(selected).every(Boolean), `Cenário inválido: ${process.argv[2]}`);

for (const [name, scenario] of Object.entries(selected)) {
  const { budget } = scenario.handoff;
  assert.ok(budget.iterations <= budget.maxIterations && budget.maxIterations === 3);
  assert.ok(budget.parallelTasks <= budget.maxParallelTasks && budget.maxParallelTasks === 3);
  for (const field of requiredHandoffFields) assert.ok(field in scenario.handoff, `${name}: handoff sem ${field}`);
  if (scenario.terminalState === 'NO_OP') assert.equal(scenario.changed, false, 'NO_OP não pode criar diff artificial.');
  if (scenario.terminalState === 'BLOCKED') assert.ok(scenario.handoff.blockers.length > 0);
  if (scenario.terminalState === 'BUDGET_EXHAUSTED') assert.equal(budget.iterations, 3);
  if (scenario.draftPr) assert.equal(scenario.terminalState, 'NEEDS_HUMAN_REVIEW');
  console.log(`PASS ${name}: ${scenario.terminalState}; iterations=${budget.iterations}/3; parallel=${budget.parallelTasks}/3; draftPR=${scenario.draftPr}`);
}

console.log('PASS S15: ledger, bounded content-refresh contract, handoff and four terminal simulations verified.');

