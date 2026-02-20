const DEMO_SLIDE_ID = 'demo-talk-code';
const REAL_SABER_SOUND = 'resources/sounds/lightsaber-sound.mp3';

let soundEl = null;
let soundBurstEl = null;
let soundUnlocked = false;
let humUserEnabled = false;
let toggleBound = false;
let loopStartTimer = 0;

let activeSlide = null;
let rafId = 0;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

function ensureRealSound() {
  if (soundEl) return;
  soundEl = new Audio(REAL_SABER_SOUND);
  soundEl.preload = 'auto';
  soundEl.loop = true;
  soundEl.volume = 0.7;

  soundBurstEl = new Audio(REAL_SABER_SOUND);
  soundBurstEl.preload = 'auto';
  soundBurstEl.loop = false;
  soundBurstEl.volume = 0.82;
}

function updateAudioStateClass(slide) {
  if (!slide) return;
  slide.classList.toggle('demo-audio-ready', soundUnlocked);
  slide.classList.toggle('demo-audio-locked', !soundUnlocked);
  slide.classList.toggle('demo-hum-muted', !humUserEnabled);
  slide.classList.toggle('demo-hum-on', humUserEnabled);
  slide.classList.remove('demo-audio-fallback');
}

async function playRealSoundWithIgnition() {
  ensureRealSound();
  if (!soundEl || !soundBurstEl) return false;
  if (loopStartTimer) {
    clearTimeout(loopStartTimer);
    loopStartTimer = 0;
  }
  try {
    soundBurstEl.currentTime = 0;
    await soundBurstEl.play();
    soundUnlocked = true;
    loopStartTimer = window.setTimeout(() => {
      if (!humUserEnabled) return;
      soundEl.currentTime = 0;
      void soundEl.play();
      loopStartTimer = 0;
    }, 220);
    return true;
  } catch {
    soundUnlocked = false;
    return false;
  }
}

function stopRealSound() {
  if (loopStartTimer) {
    clearTimeout(loopStartTimer);
    loopStartTimer = 0;
  }
  if (soundBurstEl) {
    soundBurstEl.pause();
    soundBurstEl.currentTime = 0;
  }
  if (!soundEl) return;
  soundEl.pause();
  soundEl.currentTime = 0;
}

async function toggleHum(slide, forceState = null) {
  const shouldEnable = forceState === null ? !humUserEnabled : !!forceState;
  if (shouldEnable) {
    humUserEnabled = true;
    const ok = await playRealSoundWithIgnition();
    humUserEnabled = ok;
  } else {
    stopRealSound();
    humUserEnabled = false;
  }
  updateAudioStateClass(slide);
}

function animateParallax() {
  if (!activeSlide) return;

  const container = activeSlide.querySelector('.section-page-container');
  if (!container) return;

  currentX += (targetX - currentX) * 0.12;
  currentY += (targetY - currentY) * 0.12;

  container.style.transform = `translate3d(${(currentX * 0.8).toFixed(2)}px, ${(currentY * 0.65).toFixed(2)}px, 0)`;
  rafId = requestAnimationFrame(animateParallax);
}

function onSlideMouseMove(event) {
  if (!activeSlide) return;
  const rect = activeSlide.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  targetX = (x - 0.5) * 8;
  targetY = (y - 0.5) * 8;
}

function resetParallax(slide) {
  if (!slide) return;
  const container = slide.querySelector('.section-page-container');
  if (container) container.style.transform = '';
}

function startParallax(slide) {
  activeSlide = slide;
  targetX = 0;
  targetY = 0;
  currentX = 0;
  currentY = 0;
  slide.addEventListener('mousemove', onSlideMouseMove, { passive: true });
  if (!rafId) rafId = requestAnimationFrame(animateParallax);
}

function stopParallax(slide) {
  if (!slide) return;
  slide.removeEventListener('mousemove', onSlideMouseMove);
  resetParallax(slide);
  activeSlide = null;
  targetX = 0;
  targetY = 0;
  currentX = 0;
  currentY = 0;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

export function syncDemoExperience(currentSlide) {
  const demoSlide = document.getElementById(DEMO_SLIDE_ID);
  if (!demoSlide) return;

  if (!toggleBound) {
    const saber = demoSlide.querySelector('.demo-lightsaber');
    if (saber) {
      toggleBound = true;
      saber.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await toggleHum(demoSlide);
      });
    }
  }

  const isDemoSlide = currentSlide && currentSlide.id === DEMO_SLIDE_ID;
  if (isDemoSlide) {
    demoSlide.classList.add('demo-effects-active');
    updateAudioStateClass(demoSlide);
    if (activeSlide !== demoSlide) startParallax(demoSlide);
    return;
  }

  demoSlide.classList.remove('demo-effects-active');
  void toggleHum(demoSlide, false);
  if (activeSlide === demoSlide) stopParallax(demoSlide);
}
