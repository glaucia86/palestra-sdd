import { initMermaid } from './config/mermaid-config.js';
import { revealConfig } from './config/reveal-config.js';
import { createStarfield } from './features/starfield.js';
import { createParticles } from './features/particles.js';
import { createSectionCosmics } from './features/section-cosmos.js';
import { syncSpecialSlideBackgrounds } from './features/special-backgrounds.js';
import { syncDemoExperience } from './features/demo-experience.js';
import { quizData } from './quiz/data.js';
import { QuizController } from './quiz/controller.js';

export function bootstrapPresentation() {
  initMermaid();

  const quiz = new QuizController(quizData);
  quiz.bindGlobals();

  Reveal.initialize(revealConfig);

  Reveal.on('ready', () => {
    createStarfield();
    createParticles();
    createSectionCosmics();
    syncSpecialSlideBackgrounds(Reveal.getCurrentSlide());
    syncDemoExperience(Reveal.getCurrentSlide());

    if (typeof lucide !== 'undefined') lucide.createIcons();

    const runMermaid = () => mermaid.run({ querySelector: '.mermaid' });
    if (document.fonts && document.fonts.load) {
      document.fonts.load('14px "DM Sans"').then(runMermaid).catch(runMermaid);
    } else {
      runMermaid();
    }

    quiz.renderQuestion(0);
  });

  Reveal.on('slidechanged', (event) => {
    syncSpecialSlideBackgrounds(event.currentSlide);
    syncDemoExperience(event.currentSlide);
    const unrendered = event.currentSlide.querySelectorAll('.mermaid:not([data-processed])');
    if (unrendered.length) mermaid.run({ nodes: Array.from(unrendered) });
  });
}
