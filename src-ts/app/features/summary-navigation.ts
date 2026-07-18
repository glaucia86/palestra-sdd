const SUMMARY_LINK_SELECTOR = '#sumario a.sumario-card[href^="#/"]';

function getTargetSlide(link: HTMLAnchorElement): HTMLElement | null {
  const href = link.getAttribute('href');
  if (!href?.startsWith('#/')) return null;

  const targetId = decodeURIComponent(href.slice(2));
  const target = document.getElementById(targetId);
  return target instanceof HTMLElement ? target : null;
}

export function bindSummaryNavigation(): void {
  const summary = document.getElementById('sumario');
  if (!summary || summary.dataset.navigationBound === 'true') return;

  summary.dataset.navigationBound = 'true';
  summary.addEventListener('click', (event: MouseEvent) => {
    const origin = event.target;
    if (!(origin instanceof Element)) return;

    const link = origin.closest<HTMLAnchorElement>(SUMMARY_LINK_SELECTOR);
    if (!link) return;

    const targetSlide = getTargetSlide(link);
    if (!targetSlide) return;

    const indices = Reveal.getIndices(targetSlide);
    if (!Number.isInteger(indices.h)) return;

    event.preventDefault();
    Reveal.slide(indices.h as number, indices.v, indices.f);
  });
}
