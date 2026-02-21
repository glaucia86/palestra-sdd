import { initMermaid } from './config/mermaid-config.js';
import { revealConfig } from './config/reveal-config.js';
import { createStarfield } from './features/starfield.js';
import { createParticles } from './features/particles.js';
import { createSectionCosmics } from './features/section-cosmos.js';
import { syncSpecialSlideBackgrounds } from './features/special-backgrounds.js';
import { syncDemoExperience } from './features/demo-experience.js';
import { ensureSpeakerNotesParity } from './features/speaker-notes.js';
import { syncTheEndExperience } from './features/the-end-experience.js';
import type { RuntimeOptions } from './config/runtime-options.js';
import type { Locale } from './i18n/language.js';
import { getQuizData } from './quiz/data.js';
import { QuizController } from './quiz/controller.js';
import { getQuizUiMessages, getQuizValidationMessages } from './quiz/messages.js';

export function bootstrapPresentation(locale: Locale, runtimeOptions: RuntimeOptions): void {
  initMermaid();
  ensureSpeakerNotesParity(locale);

  const quiz = new QuizController(getQuizData(locale), getQuizUiMessages(locale), getQuizValidationMessages(locale));
  quiz.bindGlobals();

  Reveal.initialize(revealConfig);

  Reveal.on('ready', () => {
    createStarfield(runtimeOptions.liteMode);
    createParticles(runtimeOptions.liteMode);
    createSectionCosmics(runtimeOptions.liteMode);
    syncSpecialSlideBackgrounds(Reveal.getCurrentSlide(), runtimeOptions.liteMode);
    syncDemoExperience(Reveal.getCurrentSlide(), runtimeOptions.liteMode);
    syncTheEndExperience(Reveal.getCurrentSlide());

    if (typeof lucide !== 'undefined') lucide.createIcons();

    const runMermaid = (): void => {
      void mermaid.run({ querySelector: '.mermaid' });
    };

    if (document.fonts && document.fonts.load) {
      document.fonts.load('14px "DM Sans"').then(runMermaid).catch(runMermaid);
    } else {
      runMermaid();
    }

    quiz.mount();
    quiz.renderQuestion(0);
  });

  Reveal.on('slidechanged', (event: { currentSlide: HTMLElement }) => {
    syncSpecialSlideBackgrounds(event.currentSlide, runtimeOptions.liteMode);
    syncDemoExperience(event.currentSlide, runtimeOptions.liteMode);
    syncTheEndExperience(event.currentSlide);
    const unrendered = event.currentSlide.querySelectorAll<Element>('.mermaid:not([data-processed])');
    if (unrendered.length) void mermaid.run({ nodes: Array.from(unrendered) });
  });
}
