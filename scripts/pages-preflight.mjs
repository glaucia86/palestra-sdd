import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, relative, resolve, sep } from 'node:path';

import { CANONICAL_PART_FILES, validateManifest } from './deck-contracts-lib.mjs';

const PUBLIC_FILES = ['index.html'];
const PUBLIC_DIRECTORIES = ['css', 'js', 'resources', 'slides'];
const PUBLIC_TOP_LEVEL = new Set([...PUBLIC_FILES, ...PUBLIC_DIRECTORIES]);
const REQUIRED_ARTIFACT_PATHS = [
  'index.html',
  'css/custom.css',
  'js/app/bootstrap.js',
  'slides/manifest.json',
  'slides/manifest.pt-BR.json',
  'slides/manifest.en-US.json',
  'slides/manifest.es-ES.json',
];
const FORBIDDEN_SEGMENTS = new Set([
  '.git',
  '.github',
  '.harness',
  'doc-specs',
  'docs',
  'node_modules',
  'scripts',
  'server',
  'src-ts',
]);
const SECRET_NAME = /(^|\/)(?:\.env(?:\.|$)|[^/]*(?:credential|secret|token)[^/]*)/i;

function normalizePath(value) {
  return value.split(sep).join('/');
}

function walkFiles(root, directory = root, entries = []) {
  for (const name of readdirSync(directory)) {
    const absolute = join(directory, name);
    const stats = lstatSync(absolute);
    const path = normalizePath(relative(root, absolute));
    assert.equal(stats.isSymbolicLink(), false, `Artifact cannot contain symbolic links: ${path}`);
    if (stats.isDirectory()) walkFiles(root, absolute, entries);
    else entries.push(path);
  }
  return entries.sort();
}

export function validateArtifact(root) {
  assert.ok(existsSync(root), `Artifact directory does not exist: ${root}`);
  for (const required of REQUIRED_ARTIFACT_PATHS) {
    assert.ok(existsSync(join(root, ...required.split('/'))), `Artifact missing required path: ${required}`);
  }

  const entries = walkFiles(root);
  for (const entry of entries) {
    const segments = entry.split('/');
    assert.ok(PUBLIC_TOP_LEVEL.has(segments[0]), `Artifact entry is outside the public allowlist: ${entry}`);
    assert.equal(segments.some((segment) => FORBIDDEN_SEGMENTS.has(segment)), false, `Artifact contains forbidden path: ${entry}`);
    assert.equal(SECRET_NAME.test(entry), false, `Artifact contains a credential-like filename: ${entry}`);
  }
  return entries;
}

export function stageArtifact(sourceRoot, destinationRoot) {
  const source = resolve(sourceRoot);
  const destination = resolve(destinationRoot);
  assert.notEqual(destination, source, 'Artifact destination cannot be the repository root.');
  assert.equal(existsSync(destination), false, `Refusing to overwrite existing artifact directory: ${destination}`);

  mkdirSync(destination, { recursive: false });
  for (const file of PUBLIC_FILES) cpSync(join(source, file), join(destination, file));
  for (const directory of PUBLIC_DIRECTORIES) {
    cpSync(join(source, directory), join(destination, directory), { recursive: true, dereference: false });
  }
  return validateArtifact(destination);
}

function requireInOrder(workflow, tokens) {
  let previous = -1;
  for (const token of tokens) {
    const position = workflow.indexOf(token);
    assert.ok(position >= 0, `Workflow missing required token: ${token}`);
    assert.ok(position > previous, `Workflow token is out of order: ${token}`);
    previous = position;
  }
}

export function validateWorkflow(workflow) {
  requireInOrder(workflow, [
    'build:',
    'uses: actions/setup-node@v6',
    'run: npm ci',
    'run: npm run typecheck',
    'run: npm run build:ts',
    'run: git diff --exit-code -- js/app',
    'run: npm run verify:deck',
    'run: node scripts/verify-quiz.mjs',
    'run: npm run verify:pages',
    'run: npm run build:pages',
    'uses: actions/upload-pages-artifact@v4',
    'deploy:',
    'needs: build',
    'uses: actions/deploy-pages@v4',
  ]);

  assert.match(workflow, /^permissions: \{\}$/m, 'Default workflow permissions must be empty.');
  assert.match(workflow, /build:[\s\S]*?permissions:\s*\n\s+contents: read/, 'Build job must have contents: read only.');
  assert.match(workflow, /deploy:[\s\S]*?permissions:\s*\n\s+pages: write\s*\n\s+id-token: write/, 'Deploy job must have Pages and OIDC permissions.');
  assert.match(workflow, /node-version: 24/, 'Workflow must pin the compatible Node major.');
  assert.match(workflow, /cache: npm/, 'Workflow must use the npm lockfile cache.');
  assert.match(workflow, /path: _site/, 'Pages must upload the staged public artifact.');
  assert.doesNotMatch(workflow, /path: \./, 'Pages cannot upload the repository root.');
  assert.doesNotMatch(workflow, /^\s*pull_request:/m, 'Deploy workflow cannot publish from pull requests.');
  assert.doesNotMatch(workflow, /^\s*tags:/m, 'Deploy workflow cannot create or react to tags.');
  assert.doesNotMatch(workflow, /continue-on-error:\s*true/, 'Preflight gates cannot ignore failures.');
  assert.doesNotMatch(workflow, /if:\s*always\(\)/, 'Upload/deploy cannot run after a failed preflight.');
}

function writeFixtureSource(root) {
  for (const directory of PUBLIC_DIRECTORIES) mkdirSync(join(root, directory), { recursive: true });
  mkdirSync(join(root, 'js', 'app'), { recursive: true });
  writeFileSync(join(root, 'index.html'), '<!doctype html><title>fixture</title>');
  writeFileSync(join(root, 'css', 'custom.css'), ':root {}');
  writeFileSync(join(root, 'js', 'app', 'bootstrap.js'), 'export {};');
  for (const manifest of ['manifest.json', 'manifest.pt-BR.json', 'manifest.en-US.json', 'manifest.es-ES.json']) {
    writeFileSync(join(root, 'slides', manifest), '{"parts":[]}');
  }
}

function runSelfTest(workflow) {
  const tempRoot = mkdtempSync(join(tmpdir(), 'palestra-sdd-pages-'));
  try {
    const source = join(tempRoot, 'source');
    const artifact = join(tempRoot, 'artifact');
    mkdirSync(source);
    writeFixtureSource(source);
    assert.ok(stageArtifact(source, artifact).length >= REQUIRED_ARTIFACT_PATHS.length);

    const forbiddenArtifact = join(tempRoot, 'forbidden-artifact');
    cpSync(artifact, forbiddenArtifact, { recursive: true });
    mkdirSync(join(forbiddenArtifact, 'node_modules'));
    writeFileSync(join(forbiddenArtifact, 'node_modules', 'package.js'), 'x');
    assert.throws(() => validateArtifact(forbiddenArtifact), /outside the public allowlist|forbidden path/);

    const secretArtifact = join(tempRoot, 'secret-artifact');
    cpSync(artifact, secretArtifact, { recursive: true });
    writeFileSync(join(secretArtifact, 'resources', '.env.production'), 'SECRET=x');
    assert.throws(() => validateArtifact(secretArtifact), /credential-like filename/);

    assert.throws(() => validateWorkflow(workflow.replace('run: npm run typecheck', 'run: true')), /npm run typecheck/);
    assert.throws(() => validateWorkflow(workflow.replace('run: npm run build:ts', 'run: true')), /npm run build:ts/);
    assert.throws(() => validateWorkflow(workflow.replace('run: git diff --exit-code -- js\/app', 'run: true')), /git diff --exit-code/);
    assert.throws(() => validateWorkflow(workflow.replace('path: _site', 'path: .')), /staged public artifact|repository root/);
    assert.throws(() => validateWorkflow(workflow.replace('needs: build', 'needs: []')), /needs: build/);

    const invalidTypeScript = join(tempRoot, 'invalid-typescript');
    mkdirSync(invalidTypeScript);
    writeFileSync(join(invalidTypeScript, 'broken.ts'), 'const result: string = 42;\n');
    writeFileSync(join(invalidTypeScript, 'tsconfig.json'), JSON.stringify({ compilerOptions: { noEmit: true, strict: true }, files: ['broken.ts'] }));
    const typecheck = spawnSync(
      process.execPath,
      [join(repositoryRoot, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', join(invalidTypeScript, 'tsconfig.json')],
      { encoding: 'utf8' },
    );
    assert.notEqual(typecheck.status, 0, 'Invalid TypeScript fixture must fail typecheck.');
    assert.match(`${typecheck.stdout}${typecheck.stderr}`, /TS2322/);

    const expectedJs = join(tempRoot, 'expected.js');
    const generatedJs = join(tempRoot, 'generated.js');
    writeFileSync(expectedJs, 'export const value = 1;\n');
    writeFileSync(generatedJs, 'export const value = 2;\n');
    const generatedDiff = spawnSync('git', ['diff', '--no-index', '--exit-code', '--', expectedJs, generatedJs], { encoding: 'utf8' });
    assert.equal(generatedDiff.status, 1, 'Unexpected generated JavaScript must produce a failing git diff.');

    const parts = CANONICAL_PART_FILES.map((file) => `slides/parts/pt-BR/${file}`);
    const manifestErrors = validateManifest(
      { parts: [...parts, 'slides/parts/pt-BR/../private.html'] },
      { locale: 'pt-BR', exists: () => true },
    );
    assert.match(manifestErrors.join('|'), /unsafe|canonical order/);
  } finally {
    assert.equal(normalizePath(tempRoot).startsWith(normalizePath(tmpdir())), true);
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

const command = process.argv[2];
const argument = process.argv[3];
const repositoryRoot = resolve(new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1'));
const workflowPath = join(repositoryRoot, '.github', 'workflows', 'deploy-pages.yml');
const workflow = readFileSync(workflowPath, 'utf8');

switch (command) {
  case 'stage': {
    const destination = resolve(repositoryRoot, argument || '_site');
    const entries = stageArtifact(repositoryRoot, destination);
    console.log(`PASS Pages artifact staged: ${entries.length} files in ${basename(destination)}.`);
    break;
  }
  case 'verify': {
    const destination = resolve(repositoryRoot, argument || '_site');
    const entries = validateArtifact(destination);
    console.log(`PASS Pages artifact allowlist: ${entries.length} public files.`);
    break;
  }
  case 'verify-workflow':
    validateWorkflow(workflow);
    console.log('PASS S16 workflow: build gates precede upload and deploy depends on build.');
    break;
  case 'self-test':
    runSelfTest(workflow);
    console.log('PASS S16 negative fixtures: typecheck, build/diff, manifest, artifact and dependency gates fail closed.');
    break;
  default:
    throw new Error('Usage: node scripts/pages-preflight.mjs <stage|verify|verify-workflow|self-test> [artifact-dir]');
}
