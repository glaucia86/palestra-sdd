export const SUPPORTED_LOCALES = ['pt-BR', 'en-US', 'es-ES'];
export const DEFAULT_LOCALE = 'pt-BR';
const MANIFEST_BY_LOCALE = {
    'pt-BR': 'slides/manifest.pt-BR.json',
    'en-US': 'slides/manifest.en-US.json',
    'es-ES': 'slides/manifest.es-ES.json',
};
const DISPLAY_NAME_BY_LOCALE = {
    'pt-BR': 'Português (Brasil)',
    'en-US': 'English (US)',
    'es-ES': 'Español',
};
function normalizeLocale(raw) {
    if (!raw)
        return '';
    return raw.trim().toLowerCase().replaceAll('_', '-');
}
export function toLocale(raw) {
    const normalized = normalizeLocale(raw);
    if (normalized === 'pt' || normalized === 'pt-br')
        return 'pt-BR';
    if (normalized === 'en' || normalized === 'en-us')
        return 'en-US';
    if (normalized === 'es' || normalized === 'es-es')
        return 'es-ES';
    return null;
}
export function resolveLocaleFromQuery(search = window.location.search) {
    const params = new URLSearchParams(search);
    return toLocale(params.get('lang'));
}
export function withLocaleQuery(locale, href = window.location.href) {
    const url = new URL(href);
    url.searchParams.set('lang', locale);
    return url.toString();
}
export function getSlidesManifestPath(locale) {
    return MANIFEST_BY_LOCALE[locale];
}
export function getLocaleDisplayName(locale) {
    return DISPLAY_NAME_BY_LOCALE[locale];
}
//# sourceMappingURL=language.js.map