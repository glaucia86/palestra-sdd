import { bootstrapPresentation } from './bootstrap.js';

async function loadSlidesAndBootstrap() {
  const slidesRoot = document.querySelector('.reveal .slides');
  const manifestSrc = slidesRoot?.dataset?.slidesManifest;
  const slidesSrc = slidesRoot?.dataset?.slidesSrc;

  if (slidesRoot && manifestSrc) {
    const manifestResponse = await fetch(manifestSrc, { cache: 'no-store' });
    if (!manifestResponse.ok) {
      throw new Error(`Failed to load manifest from ${manifestSrc} (${manifestResponse.status})`);
    }

    const manifest = await manifestResponse.json();
    const parts = Array.isArray(manifest.parts) ? manifest.parts : [];
    if (!parts.length) {
      throw new Error(`Manifest ${manifestSrc} has no slide parts.`);
    }

    const partContents = await Promise.all(
      parts.map(async (part) => {
        const partResponse = await fetch(part, { cache: 'no-store' });
        if (!partResponse.ok) {
          throw new Error(`Failed to load slide part ${part} (${partResponse.status})`);
        }
        return partResponse.text();
      }),
    );
    slidesRoot.innerHTML = partContents.join('\n');
  } else if (slidesRoot && slidesSrc) {
    const response = await fetch(slidesSrc, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load slides from ${slidesSrc} (${response.status})`);
    }
    slidesRoot.innerHTML = await response.text();
  }

  bootstrapPresentation();
}

loadSlidesAndBootstrap().catch((err) => {
  console.error('Presentation bootstrap failed:', err);
});
