import { isReducedMotionPreferred } from './motion-preferences.js';

function attachSobreMimBackgroundFx(backgroundEl: HTMLElement): void {
  if (isReducedMotionPreferred()) return;

  const content = backgroundEl.querySelector<HTMLElement>('.slide-background-content');
  if (!content || content.querySelector('.sm-bg-cosmos')) return;

  const cosmos = document.createElement('div');
  cosmos.className = 'sm-bg-cosmos';
  cosmos.setAttribute('aria-hidden', 'true');
  const starsFragment = document.createDocumentFragment();

  for (let i = 0; i < 24; i++) {
    const star = document.createElement('span');
    star.className = i < 4 ? 'sm-bg-star lg' : 'sm-bg-star';
    star.style.left = `${(3 + Math.random() * 94).toFixed(1)}%`;
    star.style.top = `${(4 + Math.random() * 90).toFixed(1)}%`;
    star.animate(
      [
        { opacity: 0.04, transform: 'scale(1)' },
        { opacity: i < 4 ? 0.7 : 0.45, transform: 'scale(1.45)' },
        { opacity: 0.04, transform: 'scale(1)' },
      ],
      {
        duration: 2800 + Math.random() * 5200,
        delay: -(Math.random() * 7000),
        iterations: Infinity,
        easing: 'ease-in-out',
      },
    );
    starsFragment.appendChild(star);
  }
  cosmos.appendChild(starsFragment);

  const cometsFragment = document.createDocumentFragment();
  [
    { top: '12%', len: 190, delay: 2, dur: 28000, angle: -24, color: 'rgba(255,255,255,0.9)' },
    { top: '34%', len: 140, delay: 9, dur: 34000, angle: -27, color: 'rgba(56,200,250,0.8)' },
    { top: '58%', len: 110, delay: 16, dur: 30000, angle: -22, color: 'rgba(0,221,179,0.72)' },
  ].forEach(({ top, len, delay, dur, angle, color }) => {
    const comet = document.createElement('span');
    comet.className = 'sm-bg-comet';
    comet.style.top = top;
    comet.style.width = `${len}px`;
    comet.style.background = `linear-gradient(to right, rgba(255,255,255,0.96) 0%, ${color} 35%, transparent 100%)`;
    comet.animate(
      [
        { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0 },
        { transform: `rotate(${angle}deg) translateX(320px)`, opacity: 0.85, offset: 0.04 },
        { transform: `rotate(${angle}deg) translateX(1750px)`, opacity: 0, offset: 0.12 },
        { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0, offset: 0.13 },
        { transform: `rotate(${angle}deg) translateX(0px)`, opacity: 0 },
      ],
      { duration: dur, delay: delay * 1000, iterations: Infinity, easing: 'ease-out' },
    );
    cometsFragment.appendChild(comet);
  });
  cosmos.appendChild(cometsFragment);

  content.appendChild(cosmos);
}

export function syncSpecialSlideBackgrounds(currentSlide: HTMLElement | null): void {
  const bgPresent =
    typeof Reveal.getSlideBackground === 'function' && currentSlide
      ? Reveal.getSlideBackground(currentSlide)
      : document.querySelector<HTMLElement>('.reveal .backgrounds .slide-background.present');

  document
    .querySelectorAll<HTMLElement>('.reveal .backgrounds .slide-background.bg-sobre-mim')
    .forEach((el: HTMLElement) => el.classList.remove('bg-sobre-mim'));

  if (currentSlide && currentSlide.id === 'sobre-mim' && bgPresent) {
    bgPresent.classList.add('bg-sobre-mim');
    attachSobreMimBackgroundFx(bgPresent);
  }
}
