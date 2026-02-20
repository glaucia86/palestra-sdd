import { isReducedMotionPreferred } from './motion-preferences.js';
function createParticlesIn(containerId, count, color) {
    const container = document.getElementById(containerId);
    if (!container)
        return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 1 + Math.random() * 3;
        p.style.left = `${Math.random() * 100}%`;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.setProperty('--dur', `${7 + Math.random() * 10}s`);
        p.style.setProperty('--del', `${Math.random() * 9}s`);
        p.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
        p.style.opacity = `${0.15 + Math.random() * 0.5}`;
        if (color)
            p.style.background = color;
        fragment.appendChild(p);
    }
    container.appendChild(fragment);
}
export function createParticles() {
    if (isReducedMotionPreferred())
        return;
    createParticlesIn('particles', 35);
    createParticlesIn('particles-the-end', 28, 'var(--accent-green)');
}
//# sourceMappingURL=particles.js.map