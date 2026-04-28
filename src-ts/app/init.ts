import { bootstrapPresentation } from './bootstrap.js';
import { resolveRuntimeOptions } from './config/runtime-options.js';
import { getAppMessages } from './i18n/messages.js';
import {
  DEFAULT_LOCALE,
  getSlidesManifestPath,
  resolveLocaleFromQuery,
  type Locale,
  withLocaleQuery,
} from './i18n/language.js';

interface SlidesManifest {
  parts?: string[];
  slides?: Array<{ path?: string }>;
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toSafeId(value: unknown): string {
  return String(value).toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function buildLoadErrorSlide(
  locale: Locale,
  title: string,
  details: string,
  sourcePath: string,
  slideId = 'load-error',
  sectionLabel = getAppMessages(locale).loadErrorSection,
): string {
  const messages = getAppMessages(locale);
  return `
  <section id="${escapeHtml(slideId)}" data-load-error="true" data-error-source="${escapeHtml(sourcePath)}" data-background-color="#04091b" data-background-gradient="radial-gradient(ellipse 70% 50% at 20% 30%, rgba(255,92,122,0.08) 0%, transparent 60%)">
    <div class="section-header">
      <span class="section-icon"><i data-lucide="triangle-alert"></i></span>
      <span class="section-label">${escapeHtml(sectionLabel)}</span>
    </div>
    <h2>${escapeHtml(title)}</h2>
    <div class="highlight-box orange" style="margin-top:0.7em; font-size:0.78em;">
      ${escapeHtml(details)}
    </div>
    <p style="font-size:0.68em; color:var(--text-muted); margin-top:0.7em;">
      ${escapeHtml(messages.sourceLabel)}: <code>${escapeHtml(sourcePath)}</code>
    </p>
  </section>
`;
}

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
  const messages = getAppMessages(locale);

  slidesRoot.dataset.slidesManifest = manifestSrc;

  if (manifestSrc) {
    let parts: string[] = [];
    try {
      const manifestResponse = await fetch(manifestSrc, { cache: 'no-store' });
      if (!manifestResponse.ok) throw new Error(`HTTP ${manifestResponse.status} while loading manifest`);
      const manifest = (await manifestResponse.json()) as SlidesManifest;
      parts = Array.isArray(manifest.parts)
        ? manifest.parts
        : Array.isArray(manifest.slides)
          ? manifest.slides.map((slide) => slide.path).filter((path): path is string => typeof path === 'string')
          : [];
    } catch (error) {
      console.error('Failed to load slide manifest:', { manifestSrc, error });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        locale,
        messages.manifestLoadTitle,
        messages.manifestLoadDetails,
        manifestSrc,
        'load-error-manifest',
        messages.bootstrapErrorSection,
      );
      bootstrapPresentation(locale, resolveRuntimeOptions());
      return;
    }

    if (!parts.length) {
      console.error('Slide manifest has no parts:', { manifestSrc });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        locale,
        messages.manifestEmptyTitle,
        messages.manifestEmptyDetails,
        manifestSrc,
        'load-error-manifest-empty',
        messages.bootstrapErrorSection,
      );
      bootstrapPresentation(locale, resolveRuntimeOptions());
      return;
    }

    const partResults = await Promise.allSettled(
      parts.map(async (part: string) => {
        const partResponse = await fetch(part, { cache: 'no-store' });
        if (!partResponse.ok) throw new Error(`HTTP ${partResponse.status} while loading slide part`);
        return {
          path: part,
          content: await partResponse.text(),
        };
      }),
    );

    const loadedSections: string[] = [];
    const failedSections: string[] = [];

    partResults.forEach((result: PromiseSettledResult<{ path: string; content: string }>, idx: number) => {
      if (result.status === 'fulfilled') {
        loadedSections.push(result.value.content);
        return;
      }

      const partPath = parts[idx];
      const reason = result.reason instanceof Error ? result.reason.message : 'Erro desconhecido';
      failedSections.push(
        buildLoadErrorSlide(
          locale,
          messages.partLoadTitle,
          messages.partLoadDetails(idx + 1, reason),
          partPath,
          `load-error-part-${idx + 1}-${toSafeId(partPath)}`,
          `${messages.loadErrorSection} ${idx + 1}`,
        ),
      );
      console.error('Failed to load slide part:', {
        part: partPath,
        reason: result.reason,
      });
    });

    slidesRoot.innerHTML = [...loadedSections, ...failedSections].join('\n');
  } else if (slidesSrc) {
    try {
      const response = await fetch(slidesSrc, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status} while loading slides source`);
      slidesRoot.innerHTML = await response.text();
    } catch (error) {
      console.error('Failed to load fallback slides source:', {
        slidesSrc,
        error,
      });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        locale,
        messages.slidesLoadTitle,
        messages.slidesLoadDetails,
        slidesSrc,
        'load-error-slides-src',
        messages.bootstrapErrorSection,
      );
    }
  }

  bootstrapPresentation(locale, resolveRuntimeOptions());
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
