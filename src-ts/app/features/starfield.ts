import { isReducedMotionPreferred } from './motion-preferences.js';

export function createStarfield(): void {
  if (isReducedMotionPreferred()) return;

  const viewport = document.querySelector('.reveal-viewport');
  if (!viewport) return;

  const nb = document.createElement('div');
  nb.className = 'nebula';
  nb.setAttribute('aria-hidden', 'true');

  const sf = document.createElement('div');
  sf.className = 'starfield';
  sf.setAttribute('aria-hidden', 'true');

  const layerFar = document.createElement('div');
  layerFar.className = 'stars-far';
  const layerMid = document.createElement('div');
  layerMid.className = 'stars-mid';
  const layerNear = document.createElement('div');
  layerNear.className = 'stars-near';

  const colorTints = ['', '', '', '', '', 'star-cool', 'star-cool', 'star-warm', 'star-warm', 'star-violet'];
  const layers = [
    { el: layerFar, sm: 120, md: 25, lg: 6, xl: 2 },
    { el: layerMid, sm: 70, md: 22, lg: 8, xl: 3 },
    { el: layerNear, sm: 35, md: 14, lg: 7, xl: 2 },
  ];

  layers.forEach(({ el, sm, md, lg, xl }) => {
    const addStars = (
      count: number,
      sizeCls: string,
      durMin: number,
      durMax: number,
      baseMin: number,
      baseMax: number,
      maxMin: number,
      maxMax: number,
    ) => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        const tint = colorTints[Math.floor(Math.random() * colorTints.length)];
        s.className = `star ${sizeCls}${tint ? ` ${tint}` : ''}`;
        const dur = (durMin + Math.random() * (durMax - durMin)).toFixed(2);
        const del = (Math.random() * 18).toFixed(2);
        const base = (baseMin + Math.random() * (baseMax - baseMin)).toFixed(2);
        const max = (maxMin + Math.random() * (maxMax - maxMin)).toFixed(2);
        s.style.left = `${(Math.random() * 110 - 5).toFixed(2)}%`;
        s.style.top = `${(Math.random() * 110 - 5).toFixed(2)}%`;
        s.style.setProperty('--star-dur', `${dur}s`);
        s.style.setProperty('--star-del', `-${del}s`);
        s.style.setProperty('--star-base', base);
        s.style.setProperty('--star-max', max);
        fragment.appendChild(s);
      }
      el.appendChild(fragment);
    };

    addStars(sm, 'star-sm', 4.5, 10, 0.12, 0.28, 0.42, 0.7);
    addStars(md, 'star-md', 4.0, 9, 0.15, 0.32, 0.5, 0.78);
    addStars(lg, 'star-lg', 3.5, 7, 0.2, 0.38, 0.58, 0.86);
    addStars(xl, 'star-xl', 3.0, 6, 0.25, 0.45, 0.68, 0.9);
    sf.appendChild(el);
  });

  [
    { left: '12%', top: '8%', dur: 2.1, del: 25, len: 140, dist: 580, angle: -25 },
    { left: '61%', top: '5%', dur: 1.9, del: 58, len: 115, dist: 530, angle: -28 },
    { left: '38%', top: '12%', dur: 2.4, del: 97, len: 160, dist: 640, angle: -23 },
  ].forEach(({ left, top, dur, del, len, dist, angle }) => {
    const ss = document.createElement('span');
    ss.className = 'shooting-star';
    ss.style.left = left;
    ss.style.top = top;
    ss.style.setProperty('--shoot-dur', `${dur}s`);
    ss.style.setProperty('--shoot-del', `${del}s`);
    ss.style.setProperty('--shoot-len', `${len}px`);
    ss.style.setProperty('--shoot-dist', `${dist}px`);
    ss.style.setProperty('--angle', `${angle}deg`);
    sf.appendChild(ss);
  });

  viewport.prepend(sf);
  viewport.prepend(nb);
}
