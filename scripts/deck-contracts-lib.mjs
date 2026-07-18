import { posix as path } from 'node:path';

export const SUPPORTED_LOCALES = ['pt-BR', 'en-US', 'es-ES'];
export const CANONICAL_PART_FILES = [
  '01-intro-sdd.html',
  '02-spec-kit.html',
  '03-copilot.html',
  '04-context-progressive.html',
  '04a-context-economy.html',
  '04b-harness-engineering.html',
  '04c-loop-engineering.html',
  '05-refs-end.html',
];
export const PROTECTED_IDS = ['capa', 'sumario', 'demo-talk-code', 'sobre-mim', 'quiz', 'the-end'];

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
}

export function validateManifest(manifest, { locale, exists = () => true } = {}) {
  const errors = [];
  if (!SUPPORTED_LOCALES.includes(locale)) errors.push(`unsupported locale: ${locale}`);
  if (!manifest || !Array.isArray(manifest.parts) || manifest.parts.length === 0) {
    return [...errors, 'manifest parts must be a non-empty array'];
  }

  const seen = new Set();
  const files = [];
  for (const [index, rawPart] of manifest.parts.entries()) {
    if (typeof rawPart !== 'string' || rawPart.trim() !== rawPart || !rawPart) {
      errors.push(`part ${index + 1} must be a trimmed non-empty string`);
      continue;
    }
    const decoded = (() => {
      try { return decodeURIComponent(rawPart); } catch { return rawPart; }
    })();
    if (
      rawPart.includes('\\') ||
      path.isAbsolute(rawPart) ||
      /^(?:[a-z]+:|\/\/)/i.test(rawPart) ||
      rawPart.split('/').includes('..') ||
      decoded.split('/').includes('..')
    ) {
      errors.push(`unsafe part path: ${rawPart}`);
      continue;
    }
    if (seen.has(rawPart)) errors.push(`duplicate part path: ${rawPart}`);
    seen.add(rawPart);

    const match = rawPart.match(/^slides\/parts\/(pt-BR|en-US|es-ES)\/([^/]+\.html)$/);
    if (!match) {
      errors.push(`invalid localized part path: ${rawPart}`);
      continue;
    }
    if (match[1] !== locale) errors.push(`part locale ${match[1]} does not match ${locale}: ${rawPart}`);
    files.push(match[2]);
    if (!exists(rawPart)) errors.push(`missing part file: ${rawPart}`);
  }

  if (files.length === manifest.parts.length && files.join('|') !== CANONICAL_PART_FILES.join('|')) {
    errors.push(`parts are not in canonical order: ${files.join(', ')}`);
  }
  return errors;
}

export function parseSections(html) {
  const stack = [];
  const sections = [];
  for (const token of html.matchAll(/<section\b[^>]*>|<\/section>/gi)) {
    if (/^<section\b/i.test(token[0])) {
      if (stack.length) stack.at(-1).directChildren += 1;
      stack.push({ tag: token[0], start: token.index, depth: stack.length, directChildren: 0 });
      continue;
    }
    const section = stack.pop();
    if (!section) throw new Error('closing section without opening section');
    sections.push({
      ...section,
      end: token.index + token[0].length,
      content: html.slice(section.start, token.index + token[0].length),
      id: attribute(section.tag, 'id'),
      noteKey: attribute(section.tag, 'data-note-key') || attribute(section.tag, 'id'),
    });
  }
  if (stack.length) throw new Error('section without closing tag');
  return sections.sort((left, right) => left.start - right.start);
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}

export function auditDeck(html, { protectedIds = PROTECTED_IDS } = {}) {
  const sections = parseSections(html);
  const leaves = sections.filter((section) => section.directChildren === 0);
  const stacks = sections.filter((section) => section.directChildren > 0);
  const ids = sections.map((section) => section.id).filter(Boolean);
  const noteKeys = leaves.map((section) => section.noteKey).filter(Boolean);
  const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>/gi)].map((match) => match[1]);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const deepLinks = links.filter((href) => href.startsWith('#/')).map((href) => href.slice(2).split('/')[0]);
  const idSet = new Set(ids);
  const missingNotes = leaves.filter((section) => !/<aside\s+class="notes"(?:\s|>)/i.test(section.content)).map((section) => section.id || '(unkeyed)');
  const missingAlt = images.filter((tag) => !/\balt="[^"]*"/i.test(tag));
  const errors = [];

  for (const duplicate of duplicateValues(ids)) errors.push(`duplicate id: ${duplicate}`);
  for (const duplicate of duplicateValues(noteKeys)) errors.push(`duplicate note key: ${duplicate}`);
  for (const protectedId of protectedIds) if (!idSet.has(protectedId)) errors.push(`missing protected id: ${protectedId}`);
  for (const target of deepLinks) if (!idSet.has(target)) errors.push(`deep link without target: ${target}`);
  for (const id of missingNotes) errors.push(`leaf slide without direct note: ${id}`);
  if (missingAlt.length) errors.push(`${missingAlt.length} image(s) without alt`);
  if (/\son[a-z]+\s*=/i.test(html)) errors.push('inline event handler found');
  if (/font-size\s*:\s*[^;"']*px/i.test(html)) errors.push('authored font-size in px found');
  if (/<svg\b/i.test(html)) errors.push('inline SVG found');

  return {
    report: {
      sections: sections.length,
      stacks: stacks.length,
      leafSlides: leaves.length,
      horizontalSlides: sections.filter((section) => section.depth === 0).length,
      verticalSlides: sections.filter((section) => section.depth > 0).length,
      ids: ids.length,
      notes: leaves.length - missingNotes.length,
      links: links.length,
      images: images.length,
      missingAlt: missingAlt.length,
      lucide: (html.match(/data-lucide="[^"]+"/gi) ?? []).length,
      mermaid: (html.match(/class="[^"]*\bmermaid\b/gi) ?? []).length,
      fragments: (html.match(/class="[^"]*\bfragment\b/gi) ?? []).length,
      noteKeys: noteKeys.length,
    },
    errors,
    sections,
    leaves,
  };
}
