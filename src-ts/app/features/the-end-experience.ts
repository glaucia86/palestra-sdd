const THE_END_SLIDE_ID = 'the-end';
const FINAL_SONG = 'resources/sounds/star-wars-final-song.mp3';
const HYPERDRIVE_TAP_WINDOW_MS = 1800;
const HYPERDRIVE_DURATION_MS = 12000;
const HYPERDRIVE_EXIT_MS = 1000;
const HYPERDRIVE_NUDGE_MS = 1300;

let finalSongEl: HTMLAudioElement | null = null;
let endAudioBound = false;
let endAudioEnabled = false;
let hyperdriveEnabled = false;
let hyperdriveExiting = false;
let wasTheEndVisible = false;
let hyperdriveTimer = 0;
let hyperdriveExitTimer = 0;
let hyperdriveNudgeTimer = 0;
let hyperdriveNudge = false;
let hyperdriveTapTimes: number[] = [];
let endAudioButton: HTMLButtonElement | null = null;
let endAudioTextEl: HTMLElement | null = null;
let endAudioHintEl: HTMLElement | null = null;

function ensureFinalSong(): void {
  if (finalSongEl) return;
  finalSongEl = new Audio(FINAL_SONG);
  finalSongEl.preload = 'auto';
  finalSongEl.loop = true;
  finalSongEl.volume = 0.62;
}

function updateTheEndUi(slide: HTMLElement): void {
  slide.classList.toggle('the-end-audio-on', endAudioEnabled);
  slide.classList.toggle('the-end-audio-off', !endAudioEnabled);
  slide.classList.toggle('the-end-hyperdrive', hyperdriveEnabled);
  slide.classList.toggle('the-end-hyperdrive-exit', hyperdriveExiting);
  slide.classList.toggle('the-end-hyperdrive-nudge', hyperdriveNudge);

  if (endAudioButton) endAudioButton.setAttribute('aria-pressed', String(endAudioEnabled));
  if (endAudioTextEl) endAudioTextEl.textContent = endAudioEnabled ? 'Pausar trilha final' : 'Ativar trilha final';
  if (endAudioHintEl) {
    endAudioHintEl.textContent = hyperdriveEnabled
      ? 'Hyperdrive ativo. Obrigada por embarcar nessa jornada.'
      : hyperdriveNudge
      ? 'Quase la... continue tocando nessa frequencia.'
      : endAudioEnabled
      ? 'Tema final tocando. Clique para pausar.'
      : 'Clique para iniciar o tema de encerramento. Dica: alguns segredos respondem a cliques rapidos.';
  }
}

function clearHyperdriveTapWindow(): void {
  hyperdriveTapTimes = [];
  if (hyperdriveNudgeTimer) {
    clearTimeout(hyperdriveNudgeTimer);
    hyperdriveNudgeTimer = 0;
  }
  hyperdriveNudge = false;
}

function setHyperdriveMode(slide: HTMLElement, enabled: boolean): void {
  hyperdriveEnabled = enabled;
  if (enabled) hyperdriveNudge = false;
  hyperdriveExiting = false;
  if (hyperdriveTimer) {
    clearTimeout(hyperdriveTimer);
    hyperdriveTimer = 0;
  }
  if (hyperdriveExitTimer) {
    clearTimeout(hyperdriveExitTimer);
    hyperdriveExitTimer = 0;
  }
  if (enabled) {
    hyperdriveTimer = window.setTimeout(() => {
      hyperdriveExiting = true;
      if (finalSongEl) finalSongEl.playbackRate = 1.015;
      updateTheEndUi(slide);
      hyperdriveExitTimer = window.setTimeout(() => {
        hyperdriveEnabled = false;
        hyperdriveExiting = false;
        if (finalSongEl) finalSongEl.playbackRate = 1;
        updateTheEndUi(slide);
        hyperdriveExitTimer = 0;
      }, HYPERDRIVE_EXIT_MS);
      hyperdriveTimer = 0;      
    }, HYPERDRIVE_DURATION_MS);
  }
  if (finalSongEl) finalSongEl.playbackRate = enabled ? 1.035 : 1;
  updateTheEndUi(slide);
}

function registerHyperdriveTap(slide: HTMLElement): boolean {
  const now = Date.now();
  hyperdriveTapTimes.push(now);
  hyperdriveTapTimes = hyperdriveTapTimes.filter((time) => now - time <= HYPERDRIVE_TAP_WINDOW_MS);
  if (hyperdriveTapTimes.length === 2) {
    hyperdriveNudge = true;
    updateTheEndUi(slide);
    if (hyperdriveNudgeTimer) clearTimeout(hyperdriveNudgeTimer);
    hyperdriveNudgeTimer = window.setTimeout(() => {
      hyperdriveNudge = false;
      updateTheEndUi(slide);
      hyperdriveNudgeTimer = 0;
    }, HYPERDRIVE_NUDGE_MS);
  }
  if (hyperdriveTapTimes.length < 3) return false;
  clearHyperdriveTapWindow();
  setHyperdriveMode(slide, true);
  return true;
}

async function toggleTheEndSong(slide: HTMLElement, forceState: boolean | null = null, resetOnStop = false): Promise<void> {
  const shouldEnable = forceState === null ? !endAudioEnabled : Boolean(forceState);

  if (shouldEnable) {
    ensureFinalSong();
    if (!finalSongEl) {
      endAudioEnabled = false;
      updateTheEndUi(slide);
      return;
    }
    try {
      await finalSongEl.play();
      endAudioEnabled = true;
    } catch {
      endAudioEnabled = false;
    }
  } else {
    if (finalSongEl) {
      finalSongEl.pause();
      if (resetOnStop) finalSongEl.currentTime = 0;
    }
    endAudioEnabled = false;
    setHyperdriveMode(slide, false);
  }

  updateTheEndUi(slide);
}

export function syncTheEndExperience(currentSlide: HTMLElement | null): void {
  const theEndSlide = document.getElementById(THE_END_SLIDE_ID);
  if (!theEndSlide) return;

  if (!endAudioBound) {
    const toggleButton = theEndSlide.querySelector<HTMLButtonElement>('[data-end-audio-toggle]');
    const textEl = theEndSlide.querySelector<HTMLElement>('[data-end-audio-text]');
    const hintEl = theEndSlide.querySelector<HTMLElement>('[data-end-audio-hint]');

    if (toggleButton && textEl && hintEl) {
      endAudioBound = true;
      endAudioButton = toggleButton;
      endAudioTextEl = textEl;
      endAudioHintEl = hintEl;
      toggleButton.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (registerHyperdriveTap(theEndSlide)) {
          await toggleTheEndSong(theEndSlide, true);
          return;
        }
        await toggleTheEndSong(theEndSlide);
      });
      updateTheEndUi(theEndSlide);
    }
  }

  const isTheEndSlide = currentSlide?.id === THE_END_SLIDE_ID;
  if (isTheEndSlide) {
    if (!wasTheEndVisible) {
      clearHyperdriveTapWindow();
      setHyperdriveMode(theEndSlide, false);
      void toggleTheEndSong(theEndSlide, false, true);
      wasTheEndVisible = true;
    }
    theEndSlide.classList.add('the-end-effects-active');
    updateTheEndUi(theEndSlide);
    return;
  }

  theEndSlide.classList.remove('the-end-effects-active');
  clearHyperdriveTapWindow();
  setHyperdriveMode(theEndSlide, false);
  void toggleTheEndSong(theEndSlide, false, true);
  wasTheEndVisible = false;
}
