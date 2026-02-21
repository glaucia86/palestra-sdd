import { DEFAULT_LOCALE, toLocale } from '../i18n/language.js';
const DEMO_SLIDE_ID = 'demo-talk-code';
const REAL_SABER_SOUND = 'resources/sounds/lightsaber-sound.mp3';
const EASTER_TAP_WINDOW_MS = 1200;
const EASTER_MODE_DURATION_MS = 6000;
const EASTER_NUDGE_MS = 1200;
let soundEl = null;
let soundBurstEl = null;
let soundUnlocked = false;
let lightsaberEnabled = false;
let duelModeEnabled = false;
let humUserEnabled = false;
let toggleBound = false;
let toggleThreeBound = false;
let loopStartTimer = 0;
let shakeTimer = 0;
let easterModeTimer = 0;
let easterTapTimes = [];
let easterNudgeTimer = 0;
let demoEasterNudge = false;
let threeSaber = null;
let threeToggleBtn = null;
let demoHintEl = null;
let activeSlide = null;
let rafId = 0;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let wasDemoSlideVisible = false;
const DEMO_HINT_MESSAGES = {
    'pt-BR': {
        easter: 'Easter egg ativado.',
        nudge: 'Quase la... tente mais rapido.',
        default: 'Dica: alguns comandos respondem a cliques em sequencia.',
    },
    'en-US': {
        easter: 'Easter egg activated.',
        nudge: 'Almost there... try faster.',
        default: 'Tip: some commands react to click sequences.',
    },
    'es-ES': {
        easter: 'Easter egg activado.',
        nudge: 'Casi listo... intenta mas rapido.',
        default: 'Tip: algunos comandos reaccionan a secuencias de clics.',
    },
};
function getCurrentLocale() {
    return toLocale(document.documentElement.getAttribute('lang')) ?? DEFAULT_LOCALE;
}
function ensureRealSound() {
    if (soundEl)
        return;
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
    slide.classList.toggle('demo-audio-ready', soundUnlocked);
    slide.classList.toggle('demo-audio-locked', !soundUnlocked);
    slide.classList.toggle('demo-hum-muted', !humUserEnabled);
    slide.classList.toggle('demo-hum-on', lightsaberEnabled);
    slide.classList.toggle('demo-duel-mode', duelModeEnabled);
    slide.classList.toggle('demo-easter-nudge', demoEasterNudge);
    slide.classList.remove('demo-audio-fallback');
}
function updateDemoHintText(slide) {
    if (!demoHintEl)
        return;
    const copy = DEMO_HINT_MESSAGES[getCurrentLocale()];
    if (duelModeEnabled) {
        demoHintEl.textContent = copy.easter;
    }
    else if (demoEasterNudge) {
        demoHintEl.textContent = copy.nudge;
    }
    else {
        demoHintEl.textContent = copy.default;
    }
    updateAudioStateClass(slide);
}
function syncThreeToggleButtonState() {
    if (!threeToggleBtn)
        return;
    threeToggleBtn.textContent = lightsaberEnabled ? 'ON' : 'OFF';
    threeToggleBtn.setAttribute('aria-pressed', String(lightsaberEnabled));
}
function syncThreeSaberState(slide) {
    syncThreeToggleButtonState();
    if (!threeSaber)
        return;
    slide.classList.add('demo-three-ready');
    threeSaber.setOn(lightsaberEnabled);
    threeSaber.setDuelMode(duelModeEnabled);
}
function ensureThreeSaber(slide) {
    if (threeSaber)
        return;
    const host = slide.querySelector('[data-lightsaber-three-canvas]');
    const createThreeSaber = window.createDemoLightsaberThree;
    if (!host || !createThreeSaber)
        return;
    try {
        threeSaber = createThreeSaber(host);
        slide.classList.add('demo-three-ready');
        syncThreeSaberState(slide);
    }
    catch {
        slide.classList.remove('demo-three-ready');
        threeSaber = null;
    }
}
function clearEasterTapWindow() {
    easterTapTimes = [];
    if (easterNudgeTimer) {
        clearTimeout(easterNudgeTimer);
        easterNudgeTimer = 0;
    }
    demoEasterNudge = false;
}
function setDuelMode(slide, enabled) {
    duelModeEnabled = enabled;
    if (enabled)
        demoEasterNudge = false;
    if (easterModeTimer) {
        clearTimeout(easterModeTimer);
        easterModeTimer = 0;
    }
    if (enabled) {
        easterModeTimer = window.setTimeout(() => {
            duelModeEnabled = false;
            updateAudioStateClass(slide);
            syncThreeSaberState(slide);
            updateDemoHintText(slide);
            easterModeTimer = 0;
        }, EASTER_MODE_DURATION_MS);
    }
    updateAudioStateClass(slide);
    syncThreeSaberState(slide);
    updateDemoHintText(slide);
}
function triggerIgniteShake(slide) {
    const target = slide.querySelector('.demo-lightsaber-three-canvas') ??
        slide.querySelector('.demo-lightsaber');
    if (!target)
        return;
    if (shakeTimer) {
        clearTimeout(shakeTimer);
        shakeTimer = 0;
    }
    target.classList.remove('demo-ignite-shake');
    // Force reflow to restart keyframe on repeated activations.
    void target.offsetWidth;
    target.classList.add('demo-ignite-shake');
    shakeTimer = window.setTimeout(() => {
        target.classList.remove('demo-ignite-shake');
        shakeTimer = 0;
    }, 180);
}
function registerEasterEggTap(slide) {
    const now = Date.now();
    easterTapTimes.push(now);
    easterTapTimes = easterTapTimes.filter((time) => now - time <= EASTER_TAP_WINDOW_MS);
    if (easterTapTimes.length === 2) {
        demoEasterNudge = true;
        updateDemoHintText(slide);
        if (easterNudgeTimer)
            clearTimeout(easterNudgeTimer);
        easterNudgeTimer = window.setTimeout(() => {
            demoEasterNudge = false;
            updateDemoHintText(slide);
            easterNudgeTimer = 0;
        }, EASTER_NUDGE_MS);
    }
    if (easterTapTimes.length < 3)
        return false;
    clearEasterTapWindow();
    setDuelMode(slide, true);
    return true;
}
async function playRealSoundWithIgnition() {
    ensureRealSound();
    if (!soundEl || !soundBurstEl)
        return false;
    if (loopStartTimer) {
        clearTimeout(loopStartTimer);
        loopStartTimer = 0;
    }
    try {
        soundBurstEl.currentTime = 0;
        await soundBurstEl.play();
        soundUnlocked = true;
        loopStartTimer = window.setTimeout(() => {
            if (!humUserEnabled || !soundEl)
                return;
            soundEl.currentTime = 0;
            void soundEl.play();
            loopStartTimer = 0;
        }, 220);
        return true;
    }
    catch {
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
    if (!soundEl)
        return;
    soundEl.pause();
    soundEl.currentTime = 0;
}
async function toggleHum(slide, forceState = null) {
    const previousState = lightsaberEnabled;
    const shouldEnable = forceState === null ? !lightsaberEnabled : Boolean(forceState);
    lightsaberEnabled = shouldEnable;
    if (shouldEnable) {
        if (!previousState)
            triggerIgniteShake(slide);
        humUserEnabled = true;
        updateAudioStateClass(slide);
        syncThreeSaberState(slide);
        const ok = await playRealSoundWithIgnition();
        humUserEnabled = ok;
    }
    else {
        stopRealSound();
        humUserEnabled = false;
        setDuelMode(slide, false);
    }
    updateAudioStateClass(slide);
    syncThreeSaberState(slide);
}
function animateParallax() {
    if (!activeSlide)
        return;
    const container = activeSlide.querySelector('.section-page-container');
    if (!container)
        return;
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    container.style.transform = `translate3d(${(currentX * 0.8).toFixed(2)}px, ${(currentY * 0.65).toFixed(2)}px, 0)`;
    rafId = requestAnimationFrame(animateParallax);
}
function onSlideMouseMove(event) {
    if (!activeSlide)
        return;
    const rect = activeSlide.getBoundingClientRect();
    if (!rect.width || !rect.height)
        return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    targetX = (x - 0.5) * 8;
    targetY = (y - 0.5) * 8;
}
function resetParallax(slide) {
    const container = slide.querySelector('.section-page-container');
    if (container)
        container.style.transform = '';
}
function startParallax(slide) {
    activeSlide = slide;
    targetX = 0;
    targetY = 0;
    currentX = 0;
    currentY = 0;
    slide.addEventListener('mousemove', onSlideMouseMove, { passive: true });
    if (!rafId)
        rafId = requestAnimationFrame(animateParallax);
}
function stopParallax(slide) {
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
    if (!demoSlide)
        return;
    if (!toggleBound) {
        const saber = demoSlide.querySelector('.demo-lightsaber');
        if (saber) {
            toggleBound = true;
            saber.addEventListener('click', async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (registerEasterEggTap(demoSlide)) {
                    await toggleHum(demoSlide, true);
                    return;
                }
                await toggleHum(demoSlide);
            });
        }
    }
    if (!toggleThreeBound) {
        const threeCanvas = demoSlide.querySelector('[data-lightsaber-three-canvas]');
        const toggleBtn = demoSlide.querySelector('[data-lightsaber-toggle]');
        demoHintEl = demoSlide.querySelector('[data-demo-easter-hint]');
        if (threeCanvas && toggleBtn) {
            toggleThreeBound = true;
            threeToggleBtn = toggleBtn;
            const onToggle = async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (registerEasterEggTap(demoSlide)) {
                    await toggleHum(demoSlide, true);
                    return;
                }
                await toggleHum(demoSlide);
            };
            threeCanvas.addEventListener('click', onToggle);
            toggleBtn.addEventListener('click', onToggle);
            syncThreeToggleButtonState();
            updateDemoHintText(demoSlide);
        }
    }
    const isDemoSlide = currentSlide?.id === DEMO_SLIDE_ID;
    if (isDemoSlide) {
        if (!wasDemoSlideVisible) {
            // Every time the user enters the demo slide, start from OFF + silent.
            clearEasterTapWindow();
            setDuelMode(demoSlide, false);
            void toggleHum(demoSlide, false);
            wasDemoSlideVisible = true;
        }
        ensureThreeSaber(demoSlide);
        demoSlide.classList.add('demo-effects-active');
        updateAudioStateClass(demoSlide);
        syncThreeSaberState(demoSlide);
        threeSaber?.setActive(true);
        threeSaber?.resize();
        if (activeSlide !== demoSlide)
            startParallax(demoSlide);
        return;
    }
    demoSlide.classList.remove('demo-effects-active');
    clearEasterTapWindow();
    setDuelMode(demoSlide, false);
    updateDemoHintText(demoSlide);
    void toggleHum(demoSlide, false);
    threeSaber?.setActive(false);
    wasDemoSlideVisible = false;
    if (activeSlide === demoSlide)
        stopParallax(demoSlide);
}
//# sourceMappingURL=demo-experience.js.map