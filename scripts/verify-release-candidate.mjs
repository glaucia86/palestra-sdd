import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, resolve, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const reportPath = join(root, 'docs', 'release-candidate-2026-07.md');
const report = readFileSync(reportPath, 'utf8');
const acMatrix = readFileSync(join(root, 'docs', 'release-ac-matrix-2026-07.md'), 'utf8');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const index = readFileSync(join(root, 'index.html'), 'utf8');
const slices = readFileSync(join(root, 'doc-specs', 'implementation-slice.md'), 'utf8');
const specification = readFileSync(join(root, 'doc-specs', 'spec.md'), 'utf8');

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

function filesUnder(entry) {
  const path = join(root, entry);
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((item) => {
    const child = join(path, item.name);
    return item.isDirectory() ? filesUnder(relative(root, child)) : [child];
  });
}

for (const marker of [
  'DONE_VERIFIED',
  'Cobertura dos Source IDs e ACs P0',
  'Decisões DEC-001..010',
  'Gates humanos',
  'Segurança, direitos e publicação',
  'Limitações aceitas',
  'DEC-006 — Lucide',
]) assert.match(report, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

const acceptanceSection = specification.split('## 24. Critérios de aceite detalhados')[1]
  ?.split('## 25. Estratégia de testes e automação')[0] ?? '';
const normativeAcIds = [...acceptanceSection.matchAll(/\*\*(AC-[A-Z]+-\d{3})\*\*/g)].map((match) => match[1]);
const matrixRows = [...acMatrix.matchAll(/^\| (AC-[A-Z]+-\d{3}) \| (PASS|NEEDS_HUMAN_REVIEW|APPROVED_DEFERRAL) \|/gm)];
assert.equal(normativeAcIds.length, 50, 'A seção 24 deve conter 50 ACs normativos.');
assert.deepEqual(matrixRows.map((row) => row[1]), normativeAcIds, 'Matriz deve cobrir cada AC normativo uma única vez e na ordem da spec.');
assert.equal(matrixRows.filter((row) => row[2] === 'PASS').length, 49, 'Esperados 49 ACs tecnicamente aprovados.');
assert.deepEqual(matrixRows.filter((row) => row[2] === 'NEEDS_HUMAN_REVIEW').map((row) => row[1]), []);
assert.deepEqual(matrixRows.filter((row) => row[2] === 'APPROVED_DEFERRAL').map((row) => row[1]), ['AC-REL-003']);

const requiredChecks = [
  'verify:loader', 'verify:identity', 'verify:spec-kit', 'verify:quiz', 'verify:agents',
  'verify:context', 'verify:economy', 'verify:economy-locales', 'verify:harness',
  'verify:loop', 'verify:loop-locales', 'verify:closing', 'verify:deck',
  'verify:content-refresh', 'verify:pages', 'verify:release',
];
for (const check of requiredChecks) {
  assert.ok(packageJson.scripts[check], `package.json sem script ${check}`);
  assert.ok(report.includes(check), `relatório sem evidência ${check}`);
}

const completedSlices = [...slices.matchAll(/^## Slice S(0[0-9]|1[0-6])\b[\s\S]*?(?=^## Slice S)/gm)];
assert.equal(completedSlices.length, 17, 'Plano deve conter S00–S16 antes da release candidate.');
for (const [, id] of completedSlices) {
  const section = completedSlices.find((match) => match[1] === id)?.[0] ?? '';
  const acceptance = section.match(/### Acceptance criteria[\s\S]*?(?=^### )/m)?.[0] ?? '';
  assert.ok(acceptance, `S${id} sem seção de acceptance criteria.`);
  assert.doesNotMatch(acceptance, /^\s*- \[ \]/m, `S${id} ainda possui acceptance criteria sem evidência.`);
}

const headPackage = JSON.parse(git('show', 'HEAD:package.json'));
assert.equal(packageJson.version, headPackage.version, 'Versão mudou antes da aprovação final.');
assert.equal(git('diff', '--name-only', '--', 'CHANGELOG.md'), '', 'CHANGELOG mudou antes da aprovação final.');
assert.equal(git('status', '--porcelain=v1', '--', 'resources'), '', 'Assets em resources foram alterados sem registro de direitos.');

assert.match(index, /lucide@latest/, 'DEC-006 aprovada exige manter lucide@latest nesta release candidate.');
assert.match(report, /DEC-006 — Lucide \| Aprovada \| `APROVO_DEC_006_MANTER_LATEST_NESTA_RC`/);

const publicRoots = ['index.html', 'css', 'js', 'resources', 'slides'];
const textExtensions = new Set(['.html', '.css', '.js', '.ts', '.mjs', '.json', '.map', '.md', '.txt', '.xml', '.svg', '.yml', '.yaml']);
const tokenPattern = /\b(?:sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{16,}|Bearer\s+[A-Za-z0-9._-]{16,})\b/i;
const assignedSecretPattern = /\b(?:api[_-]?key|client[_-]?secret|password|authorization)\s*[:=]\s*["'][^"'\r\n]{8,}["']/i;

let scanned = 0;
for (const file of publicRoots.flatMap(filesUnder)) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const content = readFileSync(file, 'utf8');
  const label = relative(root, file).replaceAll('\\', '/');
  scanned += 1;
  assert.doesNotMatch(content, tokenPattern, `${label}: possível token público.`);
  assert.doesNotMatch(content, assignedSecretPattern, `${label}: possível credencial atribuída.`);
}

const worktreeFiles = git('ls-files', '-co', '--exclude-standard').split(/\r?\n/).filter(Boolean);
let worktreeScanned = 0;
for (const label of worktreeFiles) {
  if (!textExtensions.has(extname(label).toLowerCase())) continue;
  const content = readFileSync(join(root, label), 'utf8');
  worktreeScanned += 1;
  assert.doesNotMatch(content, tokenPattern, `${label}: possível token no worktree versionável.`);
  assert.doesNotMatch(content, assignedSecretPattern, `${label}: possível credencial no worktree versionável.`);
}

const approvedPublicEmployerMentions = new Set([
  'README.md',
  'slides/parts/pt-BR/05-refs-end.html',
  'slides/parts/en-US/05-refs-end.html',
  'slides/parts/es-ES/05-refs-end.html',
]);
const publicEmployerMentions = worktreeFiles.filter((label) => {
  const normalized = label.replaceAll('\\', '/');
  if (!approvedPublicEmployerMentions.has(normalized)) return false;
  return /Ita(?:u|ú)/iu.test(readFileSync(join(root, label), 'utf8'));
});
assert.equal(publicEmployerMentions.length, 4, 'Bio pública do Itaú deve permanecer limitada ao README e aos três locales aprovados.');

assert.match(report.match(/^\*\*Estado:\*\*.*$/m)?.[0] ?? '', /DONE_VERIFIED/, 'Release aprovada deve estar DONE_VERIFIED.');
assert.match(report, /APROVO_S17_COM_ADIAMENTOS/, 'Aprovação humana final da S17 deve estar registrada.');

console.log(`PASS S17 release candidate: ${scanned} arquivos públicos e ${worktreeScanned} arquivos versionáveis de texto verificados.`);
console.log('PASS matriz de ACs: 50/50 rastreados; 49 PASS; AC-REL-003 em APPROVED_DEFERRAL.');
console.log('PASS versão/changelog/assets preservados; estado DONE_VERIFIED e aprovação S17 registrados.');
