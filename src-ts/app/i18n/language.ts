export const SUPPORTED_LOCALES = ['pt-BR', 'en-US', 'es-ES'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt-BR';

const MANIFEST_BY_LOCALE: Record<Locale, string> = {
  'pt-BR': 'slides/manifest.pt-BR.json',
  'en-US': 'slides/manifest.en-US.json',
  'es-ES': 'slides/manifest.es-ES.json',
};

const DISPLAY_NAME_BY_LOCALE: Record<Locale, string> = {
  'pt-BR': 'Português (Brasil)',
  'en-US': 'English (US)',
  'es-ES': 'Español',
};

function normalizeLocale(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw.trim().toLowerCase().replaceAll('_', '-');
}

export function toLocale(raw: string | null | undefined): Locale | null {
  const normalized = normalizeLocale(raw);

  if (normalized === 'pt' || normalized === 'pt-br') return 'pt-BR';
  if (normalized === 'en' || normalized === 'en-us') return 'en-US';
  if (normalized === 'es' || normalized === 'es-es') return 'es-ES';

  return null;
}

export function resolveLocaleFromQuery(search: string = window.location.search): Locale | null {
  const params = new URLSearchParams(search);
  return toLocale(params.get('lang'));
}

export function withLocaleQuery(locale: Locale, href: string = window.location.href): string {
  const url = new URL(href);
  url.searchParams.set('lang', locale);
  return url.toString();
}

export function getSlidesManifestPath(locale: Locale): string {
  return MANIFEST_BY_LOCALE[locale];
}

export function getLocaleDisplayName(locale: Locale): string {
  return DISPLAY_NAME_BY_LOCALE[locale];
}
