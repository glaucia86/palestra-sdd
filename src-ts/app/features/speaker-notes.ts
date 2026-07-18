import type { Locale } from '../i18n/language.js';

type NoteBlock = string[];
type LocalizedNotes = Record<Exclude<Locale, 'pt-BR'>, Record<string, NoteBlock>>;

// Direct <aside class="notes"> blocks are authoritative. This map is only for
// deliberately curated, stable-key extensions and never depends on slide order.
const CURATED_NOTES_BY_ID: LocalizedNotes = {
  'en-US': {
    capa: [
      'Welcome everyone: this talk moves from loose prompting to specification-driven engineering.',
      'The practical goal is less rework, more traceability, and speed with quality.',
    ],
    sumario: [
      'Use this map to show the complete arc from specification to bounded loops.',
      'If time is short, preserve the order of the selected blocks.',
    ],
  },
  'es-ES': {
    capa: [
      'Bienvenidos: esta charla pasa del prompt suelto a la ingeniería guiada por especificación.',
      'El objetivo práctico es menos retrabajo, más trazabilidad y velocidad con calidad.',
    ],
    sumario: [
      'Usa este mapa para mostrar el arco completo desde la especificación hasta los loops bounded.',
      'Si falta tiempo, preserva el orden de los bloques seleccionados.',
    ],
  },
};

type FallbackCopy = {
  lead: string;
  close: string;
  focusLabel: string;
  keyPointsLabel: string;
  transitionLabel: string;
};

const FALLBACK_BY_LOCALE: Record<Exclude<Locale, 'pt-BR'>, FallbackCopy> = {
  'en-US': {
    lead: 'Presenter note: explain the core message of this non-critical slide.',
    close: 'Close with one practical takeaway before advancing.',
    focusLabel: 'Slide focus',
    keyPointsLabel: 'Key points',
    transitionLabel: 'Transition',
  },
  'es-ES': {
    lead: 'Nota para presentar: explica el mensaje central de esta diapositiva no crítica.',
    close: 'Cierra con una conclusión práctica antes de avanzar.',
    focusLabel: 'Enfoque',
    keyPointsLabel: 'Puntos clave',
    transitionLabel: 'Transición',
  },
};

function isLeafSection(section: HTMLElement): boolean {
  return !Array.from(section.children).some((child: Element) => child.tagName === 'SECTION');
}

function getSlideTitle(section: HTMLElement): string {
  const titleEl = section.querySelector<HTMLElement>('h2, h1, .section-label');
  return titleEl?.textContent?.trim() ?? '';
}

function normalizeText(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function collectKeyPoints(section: HTMLElement): string[] {
  const selectors = 'h3, .card h3, li, .highlight-box p, .card p, p';
  const candidates = Array.from(section.querySelectorAll<HTMLElement>(selectors))
    .map((element: HTMLElement) => normalizeText(element.textContent ?? ''))
    .filter((text: string) => text.length >= 24 && text.length <= 120);
  return [...new Set(candidates)].slice(0, 2);
}

function appendParagraph(note: HTMLElement, text: string): void {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  note.appendChild(paragraph);
}

function appendFallback(
  note: HTMLElement,
  copy: FallbackCopy,
  slide: HTMLElement,
  slides: HTMLElement[],
  index: number,
): void {
  const title = getSlideTitle(slide);
  const nextTitle = index < slides.length - 1 ? getSlideTitle(slides[index + 1]) : '';
  appendParagraph(note, copy.lead);
  if (title) appendParagraph(note, `${copy.focusLabel}: ${title}.`);
  const points = collectKeyPoints(slide);
  if (points.length) appendParagraph(note, `${copy.keyPointsLabel}: ${points.join(' | ')}`);
  if (nextTitle) appendParagraph(note, `${copy.transitionLabel}: ${nextTitle}.`);
  appendParagraph(note, copy.close);
}

export function getStableNoteKey(slide: Pick<HTMLElement, 'id' | 'dataset'>): string | null {
  const explicitKey = slide.dataset.noteKey?.trim();
  return explicitKey || slide.id.trim() || null;
}

export function getCuratedNoteBlock(locale: Locale, key: string): readonly string[] | null {
  if (locale === 'pt-BR') return null;
  return CURATED_NOTES_BY_ID[locale]?.[key] ?? null;
}

export function findDuplicateNoteKeys(keys: readonly (string | null)[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const key of keys) {
    if (!key) continue;
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }
  return [...duplicates].sort();
}

export function resolveNoteSource(
  locale: Locale,
  key: string | null,
  hasDirectNote: boolean,
): 'direct' | 'curated' | 'missing-essential' | 'fallback' {
  if (hasDirectNote) return 'direct';
  if (key && getCuratedNoteBlock(locale, key)) return 'curated';
  if (key) return 'missing-essential';
  return 'fallback';
}

function appendValidationError(slide: HTMLElement, message: string): void {
  if (slide.querySelector(':scope > [data-note-validation-error]')) return;
  const alert = document.createElement('div');
  alert.className = 'notes-validation-error';
  alert.dataset.noteValidationError = 'true';
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  slide.prepend(alert);
}

export function ensureSpeakerNotesParity(locale: Locale, validationMode = false): void {
  const slides = Array.from(document.querySelectorAll<HTMLElement>('.reveal .slides section')).filter(isLeafSection);
  const keys = slides.map(getStableNoteKey);
  const duplicateKeys = findDuplicateNoteKeys(keys);

  for (const duplicateKey of duplicateKeys) {
    const message = `Duplicate speaker-note key: ${duplicateKey}`;
    console.error(message);
    if (validationMode) {
      slides
        .filter((slide) => getStableNoteKey(slide) === duplicateKey)
        .forEach((slide) => appendValidationError(slide, message));
    }
  }

  slides.forEach((slide: HTMLElement, index: number) => {
    const key = getStableNoteKey(slide);
    const source = resolveNoteSource(locale, key, Boolean(slide.querySelector(':scope > aside.notes')));
    if (source === 'direct') return;

    const curated = source === 'curated' && key ? getCuratedNoteBlock(locale, key) : null;
    if (curated) {
      const note = document.createElement('aside');
      note.className = 'notes';
      curated.forEach((line) => appendParagraph(note, line));
      slide.appendChild(note);
      return;
    }

    if (source === 'missing-essential' && key) {
      const message = `Missing essential speaker note for stable key: ${key}`;
      console.error(message);
      if (validationMode) appendValidationError(slide, message);
      return;
    }

    if (locale === 'pt-BR') return;
    const fallback = FALLBACK_BY_LOCALE[locale];
    if (!fallback) return;
    console.warn('Generic speaker-note fallback used for an unkeyed, non-critical slide.');
    const note = document.createElement('aside');
    note.className = 'notes';
    appendFallback(note, fallback, slide, slides, index);
    slide.appendChild(note);
  });
}
