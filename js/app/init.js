import { bootstrapPresentation } from './bootstrap.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toSafeId(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function buildLoadErrorSlide(title, details, sourcePath, slideId = 'load-error', sectionLabel = 'Erro de Carregamento') {
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
      Origem: <code>${escapeHtml(sourcePath)}</code>
    </p>
  </section>
`;
}

async function loadSlidesAndBootstrap() {
  const slidesRoot = document.querySelector('.reveal .slides');
  if (!slidesRoot) {
    throw new Error('Unable to find .reveal .slides root element.');
  }

  const manifestSrc = slidesRoot?.dataset?.slidesManifest;
  const slidesSrc = slidesRoot?.dataset?.slidesSrc;

  if (manifestSrc) {
    let parts = [];
    try {
      const manifestResponse = await fetch(manifestSrc, { cache: 'no-store' });
      if (!manifestResponse.ok) {
        throw new Error(`HTTP ${manifestResponse.status} while loading manifest`);
      }
      const manifest = await manifestResponse.json();
      parts = Array.isArray(manifest.parts) ? manifest.parts : [];
    } catch (error) {
      console.error('Failed to load slide manifest:', {
        manifestSrc,
        error,
      });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        'Não foi possível carregar o manifesto de slides',
        'A apresentação iniciou em modo degradado. Verifique a conectividade/local server.',
        manifestSrc,
        'load-error-manifest',
        'Erro de Bootstrap',
      );
      bootstrapPresentation();
      return;
    }

    if (!parts.length) {
      console.error('Slide manifest has no parts:', { manifestSrc });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        'Manifesto sem seções',
        'Nenhuma seção de slide foi encontrada no manifesto informado.',
        manifestSrc,
        'load-error-manifest-empty',
        'Erro de Bootstrap',
      );
      bootstrapPresentation();
      return;
    }

    const partResults = await Promise.allSettled(
      parts.map(async (part) => {
        const partResponse = await fetch(part, { cache: 'no-store' });
        if (!partResponse.ok) {
          throw new Error(`HTTP ${partResponse.status} while loading slide part`);
        }
        return {
          path: part,
          content: await partResponse.text(),
        };
      }),
    );

    const loadedSections = [];
    const failedSections = [];

    partResults.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        loadedSections.push(result.value.content);
        return;
      }

      const partPath = parts[idx];
      const reason = result.reason?.message || 'Erro desconhecido';
      failedSections.push(
        buildLoadErrorSlide(
          'Erro ao carregar seção',
          `A seção #${idx + 1} não pôde ser carregada (${reason}).`,
          partPath,
          `load-error-part-${idx + 1}-${toSafeId(partPath)}`,
          `Erro de Seção ${idx + 1}`,
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
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while loading slides source`);
      }
      slidesRoot.innerHTML = await response.text();
    } catch (error) {
      console.error('Failed to load fallback slides source:', {
        slidesSrc,
        error,
      });
      slidesRoot.innerHTML = buildLoadErrorSlide(
        'Não foi possível carregar os slides',
        'A apresentação iniciou em modo degradado. Verifique a origem dos slides.',
        slidesSrc,
        'load-error-slides-src',
        'Erro de Bootstrap',
      );
    }
  }

  bootstrapPresentation();
}

loadSlidesAndBootstrap().catch((err) => {
  console.error('Presentation bootstrap failed:', err);
});
