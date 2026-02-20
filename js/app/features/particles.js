function createParticlesIn(containerId, count, color) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1 + Math.random() * 3;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --dur: ${7 + Math.random() * 10}s;
      --del: ${Math.random() * 9}s;
      --dx: ${(Math.random() - 0.5) * 80}px;
      opacity: ${0.15 + Math.random() * 0.5};
      ${color ? `background:${color};` : ''}
    `;
    container.appendChild(p);
  }
}

export function createParticles() {
  createParticlesIn('particles', 35);
  createParticlesIn('particles-the-end', 28, 'var(--accent-green)');
}
