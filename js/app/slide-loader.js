import { getAppMessages } from './i18n/messages.js';
const EXECUTABLE_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const WINDOWS_ABSOLUTE_PATH = /^[a-z]:[\\/]/i;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;
const HAS_CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;
function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
function toSafeId(value) {
    const normalized = String(value)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80);
    return normalized || 'unknown';
}
function normalizeReason(reason, fallback) {
    const value = reason instanceof Error ? reason.message : typeof reason === 'string' ? reason : fallback;
    return value.replace(CONTROL_CHARACTERS, ' ').trim().slice(0, 240) || fallback;
}
function toDisplayPath(value) {
    const path = typeof value === 'string' ? value : String(value ?? '');
    return path.replace(CONTROL_CHARACTERS, ' ').split(/[?#]/, 1)[0].trim().slice(0, 240);
}
export function normalizePartPath(value) {
    if (typeof value !== 'string')
        return null;
    const path = value.trim();
    if (!path || HAS_CONTROL_CHARACTER.test(path))
        return null;
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(path);
    }
    catch {
        return null;
    }
    if (decodedPath.startsWith('/') || decodedPath.startsWith('\\') || decodedPath.startsWith('//'))
        return null;
    if (WINDOWS_ABSOLUTE_PATH.test(decodedPath) || EXECUTABLE_SCHEME.test(decodedPath))
        return null;
    if (decodedPath.split(/[\\/]/).includes('..'))
        return null;
    return path;
}
export function getManifestPartEntries(manifestValue) {
    if (!manifestValue || typeof manifestValue !== 'object' || Array.isArray(manifestValue))
        return [];
    const manifest = manifestValue;
    if (Object.prototype.hasOwnProperty.call(manifest, 'parts')) {
        return Array.isArray(manifest.parts) ? manifest.parts : [];
    }
    if (!Array.isArray(manifest.slides))
        return [];
    return manifest.slides.map((slide) => {
        if (!slide || typeof slide !== 'object' || Array.isArray(slide))
            return undefined;
        return slide.path;
    });
}
function buildLoadErrorSlide(options) {
    const messages = getAppMessages(options.locale);
    const errorIndexAttribute = options.errorIndex === undefined
        ? ''
        : ` data-error-index="${escapeHtml(options.errorIndex)}"`;
    const errorReasonAttribute = options.errorReason === undefined
        ? ''
        : ` data-error-reason="${escapeHtml(options.errorReason)}"`;
    return `
  <section id="${escapeHtml(toSafeId(options.slideId))}" data-load-error="true" data-error-source="${escapeHtml(options.sourcePath)}"${errorIndexAttribute}${errorReasonAttribute} data-background-color="#04091b" data-background-gradient="radial-gradient(ellipse 70% 50% at 20% 30%, rgba(255,92,122,0.08) 0%, transparent 60%)">
    <div class="section-header">
      <span class="section-icon"><i data-lucide="triangle-alert"></i></span>
      <span class="section-label">${escapeHtml(options.sectionLabel)}</span>
    </div>
    <h2>${escapeHtml(options.title)}</h2>
    <div class="highlight-box orange" style="margin-top:0.7em; font-size:0.78em;">
      ${escapeHtml(options.details)}
    </div>
    <p style="font-size:0.68em; color:var(--text-muted); margin-top:0.7em;">
      ${escapeHtml(messages.sourceLabel)}: <code>${escapeHtml(options.sourcePath)}</code>
    </p>
  </section>
`;
}
async function fetchPart(entry, fetchSlides, invalidPathReason, emptyPartReason) {
    const path = normalizePartPath(entry);
    if (!path)
        throw new Error(invalidPathReason);
    const response = await fetchSlides(path, { cache: 'no-store' });
    if (!response.ok)
        throw new Error(`HTTP ${response.status} while loading slide part`);
    const content = await response.text();
    if (!content.trim())
        throw new Error(emptyPartReason);
    return { path, content };
}
async function loadManifestContent(locale, manifestSrc, fetchSlides, logError) {
    const messages = getAppMessages(locale);
    let manifest;
    try {
        const response = await fetchSlides(manifestSrc, { cache: 'no-store' });
        if (!response.ok)
            throw new Error(`HTTP ${response.status} while loading manifest`);
        manifest = await response.json();
    }
    catch (error) {
        const reason = normalizeReason(error, messages.unknownPartReason);
        logError('Failed to load slide manifest:', { manifestSrc: toDisplayPath(manifestSrc), reason });
        return buildLoadErrorSlide({
            locale,
            title: messages.manifestLoadTitle,
            details: messages.manifestLoadDetails,
            sourcePath: toDisplayPath(manifestSrc),
            slideId: 'load-error-manifest',
            sectionLabel: messages.bootstrapErrorSection,
            errorReason: reason,
        });
    }
    const entries = getManifestPartEntries(manifest);
    if (!entries.length) {
        logError('Slide manifest has no parts:', { manifestSrc: toDisplayPath(manifestSrc) });
        return buildLoadErrorSlide({
            locale,
            title: messages.manifestEmptyTitle,
            details: messages.manifestEmptyDetails,
            sourcePath: toDisplayPath(manifestSrc),
            slideId: 'load-error-manifest-empty',
            sectionLabel: messages.bootstrapErrorSection,
        });
    }
    const results = await Promise.allSettled(entries.map((entry) => fetchPart(entry, fetchSlides, messages.invalidPartPathReason, messages.emptyPartReason)));
    return results.map((result, index) => {
        if (result.status === 'fulfilled')
            return result.value.content;
        const sourcePath = toDisplayPath(entries[index]);
        const reason = normalizeReason(result.reason, messages.unknownPartReason);
        const logicalIndex = index + 1;
        logError('Failed to load slide part:', { path: sourcePath, index: logicalIndex, reason });
        return buildLoadErrorSlide({
            locale,
            title: messages.partLoadTitle,
            details: messages.partLoadDetails(logicalIndex, reason),
            sourcePath,
            slideId: `load-error-part-${logicalIndex}-${toSafeId(sourcePath)}`,
            sectionLabel: `${messages.loadErrorSection} ${logicalIndex}`,
            errorIndex: logicalIndex,
            errorReason: reason,
        });
    }).join('\n');
}
async function loadFallbackContent(locale, slidesSrc, fetchSlides, logError) {
    const messages = getAppMessages(locale);
    try {
        const response = await fetchSlides(slidesSrc, { cache: 'no-store' });
        if (!response.ok)
            throw new Error(`HTTP ${response.status} while loading slides source`);
        return await response.text();
    }
    catch (error) {
        const reason = normalizeReason(error, messages.unknownPartReason);
        logError('Failed to load fallback slides source:', { slidesSrc: toDisplayPath(slidesSrc), reason });
        return buildLoadErrorSlide({
            locale,
            title: messages.slidesLoadTitle,
            details: messages.slidesLoadDetails,
            sourcePath: toDisplayPath(slidesSrc),
            slideId: 'load-error-slides-src',
            sectionLabel: messages.bootstrapErrorSection,
            errorReason: reason,
        });
    }
}
export async function loadSlides(options) {
    const fetchSlides = options.fetchSlides ?? fetch;
    const logError = options.logError ?? ((message, details) => console.error(message, details));
    options.slidesRoot.dataset.slidesManifest = options.manifestSrc;
    if (options.manifestSrc) {
        options.slidesRoot.innerHTML = await loadManifestContent(options.locale, options.manifestSrc, fetchSlides, logError);
    }
    else if (options.slidesSrc) {
        options.slidesRoot.innerHTML = await loadFallbackContent(options.locale, options.slidesSrc, fetchSlides, logError);
    }
    options.bootstrap();
}
//# sourceMappingURL=slide-loader.js.map