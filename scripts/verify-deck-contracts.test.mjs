import assert from 'node:assert/strict';

import { CANONICAL_PART_FILES, auditDeck, validateManifest } from './deck-contracts-lib.mjs';
import {
  findDuplicateNoteKeys,
  getCuratedNoteBlock,
  resolveNoteSource,
} from '../js/app/features/speaker-notes.js';

const parts = CANONICAL_PART_FILES.map((file) => `slides/parts/pt-BR/${file}`);
const valid = { parts };
const options = { locale: 'pt-BR', exists: () => true };

assert.deepEqual(validateManifest(valid, options), []);
assert.match(validateManifest({ parts: [] }, options).join('|'), /non-empty/);
assert.match(validateManifest({ parts: [...parts, parts[0]] }, options).join('|'), /duplicate/);
assert.match(validateManifest(valid, { ...options, exists: (part) => part !== parts[3] }).join('|'), /missing part/);
assert.match(validateManifest({ parts: parts.map((part) => part.replace('pt-BR', 'en-US')) }, options).join('|'), /does not match/);
assert.match(validateManifest({ parts: [parts[1], parts[0], ...parts.slice(2)] }, options).join('|'), /canonical order/);
assert.match(validateManifest({ parts: ['slides/parts/pt-BR/../secret.html'] }, options).join('|'), /unsafe/);

const base = '<section id="capa"><a href="#/sumario">go</a><aside class="notes"><p>note</p></aside></section><section id="sumario"><aside class="notes"><p>note</p></aside></section>';
assert.deepEqual(auditDeck(base, { protectedIds: ['capa', 'sumario'] }).errors, []);
assert.match(auditDeck(`${base}<section id="capa"><aside class="notes"><p>x</p></aside></section>`, { protectedIds: [] }).errors.join('|'), /duplicate id/);
assert.match(auditDeck('<section id="capa"><a href="#/missing">go</a><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /deep link without target/);
assert.match(auditDeck('<section id="new-slide"><p>missing</p></section>', { protectedIds: [] }).errors.join('|'), /without direct note/);
assert.match(auditDeck('<section id="image"><img src="x.png"><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /without alt/);
assert.match(auditDeck('<section id="handler" onclick="x()"><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /inline event/);
assert.match(auditDeck('<section id="px"><p style="font-size:12px">x</p><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /font-size/);
assert.match(auditDeck('<section id="svg"><svg></svg><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /inline SVG/);
assert.match(auditDeck('<section id="a" data-note-key="same"><aside class="notes"><p>x</p></aside></section><section id="b" data-note-key="same"><aside class="notes"><p>x</p></aside></section>', { protectedIds: [] }).errors.join('|'), /duplicate note key/);

assert.deepEqual(findDuplicateNoteKeys(['a', 'b', 'a', null, 'b']), ['a', 'b']);
assert.equal(resolveNoteSource('en-US', 'missing', false), 'missing-essential');
assert.equal(resolveNoteSource('en-US', null, false), 'fallback');
assert.equal(resolveNoteSource('en-US', 'capa', true), 'direct');
assert.equal(resolveNoteSource('en-US', 'capa', false), 'curated');

const originalOrder = ['capa', 'sumario'];
const reordered = [...originalOrder].reverse();
const byKey = (keys) => Object.fromEntries(keys.map((key) => [key, getCuratedNoteBlock('en-US', key)]));
assert.deepEqual(byKey(reordered), byKey(originalOrder), 'Reordenar fixture não pode deslocar notes curadas por ID.');

console.log('PASS S14 negative fixtures: manifests, estrutura, note keys e reordenação rejeitam drift.');
