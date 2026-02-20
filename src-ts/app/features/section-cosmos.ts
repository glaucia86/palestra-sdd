import { isReducedMotionPreferred } from './motion-preferences.js';

export function createSectionCosmics(): void {
  if (isReducedMotionPreferred()) return;

  const slides = Array.from(document.querySelectorAll<HTMLElement>('.reveal .slides section')).filter(
    (section: HTMLElement) => !Array.from(section.children).some((child: Element) => child.tagName === 'SECTION'),
  );

  slides.forEach((slide: HTMLElement) => {
    if (Array.from(slide.children).some((child: Element) => child.classList.contains('section-cosmos'))) return;

    const cosmos = document.createElement('div');
    cosmos.className = 'section-cosmos';
    cosmos.setAttribute('aria-hidden', 'true');

    const orb = slide.querySelector<HTMLElement>('.section-orb-1');
    let accent = 'rgba(0,221,179,0.65)';
    if (orb) {
      const orbColor = orb.style.getPropertyValue('--orb-color');
      if (orbColor) accent = orbColor.replace('0.15)', '0.65)');
    }
    const accentDim = accent.replace('0.65)', '0.35)');
    const cometsFragment = document.createDocumentFragment();

    [
      { angle: 132, w: 220, dur: 18000, color: 'rgba(255,255,255,0.85)', top: '4%' },
      { angle: 138, w: 155, dur: 21000, color: accent, top: '26%' },
      { angle: 128, w: 95, dur: 19500, color: 'rgba(255,255,255,0.55)', top: '55%' },
      { angle: 143, w: 65, dur: 23000, color: accentDim, top: '16%' },
      { angle: 136, w: 120, dur: 17000, color: accent, top: '40%' },
      { angle: 130, w: 85, dur: 20500, color: 'rgba(255,255,255,0.65)', top: '68%' },
    ].forEach(({ angle, w, dur, color, top }) => {
      const el = document.createElement('span');
      el.className = 'comet';
      el.style.top = top;
      el.style.width = `${w}px`;
      el.style.background = `linear-gradient(to right,rgba(255,255,255,0.95) 0%,${color} 30%,transparent 100%)`;

      el.animate(
        [
          { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0 },
          { transform: `rotate(${angle}deg) translateX(260px)`, opacity: 0.85, offset: 0.025 },
          { transform: `rotate(${angle}deg) translateX(1650px)`, opacity: 0, offset: 0.14 },
          { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0, offset: 0.16 },
          { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0 },
        ],
        {
          duration: dur,
          delay: -(Math.random() * dur),
          iterations: Infinity,
          easing: 'ease-out',
        },
      );
      cometsFragment.appendChild(el);
    });
    cosmos.appendChild(cometsFragment);

    const starsFragment = document.createDocumentFragment();
    for (let i = 0; i < 14; i++) {
      const star = document.createElement('span');
      const isLg = i < 2;
      star.className = isLg ? 'sp-star lg' : 'sp-star';
      star.style.left = `${(2 + Math.random() * 94).toFixed(1)}%`;
      star.style.top = `${(5 + Math.random() * 88).toFixed(1)}%`;
      star.animate(
        [
          { opacity: 0.04, transform: 'scale(1)' },
          { opacity: isLg ? 0.7 : 0.25 + Math.random() * 0.4, transform: 'scale(1.5)' },
          { opacity: 0.04, transform: 'scale(1)' },
        ],
        {
          duration: 3000 + Math.random() * 5000,
          delay: -(Math.random() * 8000),
          iterations: Infinity,
          easing: 'ease-in-out',
        },
      );
      starsFragment.appendChild(star);
    }
    cosmos.appendChild(starsFragment);

    slide.prepend(cosmos);
  });
}
