import { bootstrapPresentation } from './bootstrap.js';
import { resolveRuntimeOptions } from './config/runtime-options.js';
import { getAppMessages } from './i18n/messages.js';
import { loadSlides } from './slide-loader.js';
import {
  DEFAULT_LOCALE,
  getSlidesManifestPath,
  resolveLocaleFromQuery,
  type Locale,
  withLocaleQuery,
} from './i18n/language.js';

function applyDocumentLocale(locale: Locale): void {
  const messages = getAppMessages(locale);
  document.documentElement.setAttribute('lang', locale);
  document.title = messages.documentTitle;

  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = messages.description;

  const backToSummaryButton = document.querySelector<HTMLElement>('.back-to-summary-btn');
  if (backToSummaryButton) backToSummaryButton.title = messages.backToSummaryTitle;

  const switcherLabel = document.querySelector<HTMLElement>('.language-switcher-label');
  if (switcherLabel) switcherLabel.textContent = messages.languageSwitcherLabel;

}

async function loadSlidesAndBootstrap(locale: Locale): Promise<void> {
  const slidesRoot = document.querySelector<HTMLElement>('.reveal .slides');
  if (!slidesRoot) {
    throw new Error('Unable to find .reveal .slides root element.');
  }

  const manifestSrc = getSlidesManifestPath(locale);
  const slidesSrc = slidesRoot.dataset?.slidesSrc;
  await loadSlides({
    locale,
    slidesRoot,
    manifestSrc,
    slidesSrc,
    bootstrap: () => bootstrapPresentation(locale, resolveRuntimeOptions()),
  });
}

function showPresentation(): void {
  const revealRoot = document.querySelector<HTMLElement>('.reveal');
  if (revealRoot) revealRoot.classList.remove('reveal-hidden');
}

function syncLanguageSwitcher(locale: Locale): void {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.language-switcher-option[data-locale]'));
  buttons.forEach((button: HTMLButtonElement) => {
    const isActive = button.dataset.locale === locale;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function startPresentation(locale: Locale, pushHistory = false): void {
  const runtimeOptions = resolveRuntimeOptions();
  document.body.classList.toggle('lite-mode', runtimeOptions.liteMode);

  applyDocumentLocale(locale);
  syncLanguageSwitcher(locale);
  showPresentation();

  const nextUrl = withLocaleQuery(locale);
  if (pushHistory) {
    window.history.pushState({}, '', nextUrl);
  } else {
    window.history.replaceState({}, '', nextUrl);
  }

  loadSlidesAndBootstrap(locale).catch((err: unknown) => {
    console.error('Presentation bootstrap failed:', err);
  });
}

function bindLanguageSwitcher(): void {
  const buttons = Array.from(document.querySelectorAll<HTMLElement>('.language-switcher-option[data-locale]'));
  buttons.forEach((button: HTMLElement) => {
    button.addEventListener('click', () => {
      const rawLocale = button.dataset.locale;
      if (rawLocale !== 'pt-BR' && rawLocale !== 'en-US' && rawLocale !== 'es-ES') return;
      if (rawLocale === resolveLocaleFromQuery()) return;

      // Full reload keeps Reveal state clean and guarantees localized slide-part bootstrap.
      window.location.assign(withLocaleQuery(rawLocale));
    });
  });
}

const initialLocale = resolveLocaleFromQuery() ?? DEFAULT_LOCALE;
bindLanguageSwitcher();
startPresentation(initialLocale);
