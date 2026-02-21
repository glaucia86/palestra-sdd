type RevealEventName = 'ready' | 'slidechanged';

interface RevealSlideChangedEvent {
  currentSlide: HTMLElement;
}

interface RevealGlobal {
  initialize(config: unknown): void;
  on(event: 'ready', callback: () => void): void;
  on(event: 'slidechanged', callback: (event: RevealSlideChangedEvent) => void): void;
  getCurrentSlide(): HTMLElement;
  getSlideBackground?(slide: HTMLElement): HTMLElement | null;
}

interface MermaidGlobal {
  initialize(config: unknown): void;
  run(options: { querySelector?: string; nodes?: Element[] }): Promise<void> | void;
}

interface LucideGlobal {
  createIcons(): void;
}

declare const Reveal: RevealGlobal;
declare const RevealMarkdown: unknown;
declare const RevealHighlight: unknown;
declare const RevealNotes: unknown;
declare const mermaid: MermaidGlobal;
declare const lucide: LucideGlobal | undefined;

interface Window {
  renderQuestion: (i: number) => void;
  pickAnswer: (selected: number) => void;
  nextQuestion: () => void;
  showFinalScore: () => void;
  restartQuiz: () => void;
  createDemoLightsaberThree?: (container: HTMLElement) => DemoLightsaberThreeController;
}

interface DemoLightsaberThreeController {
  setOn(nextOn: boolean): void;
  setDuelMode(nextDuelMode: boolean): void;
  setActive(nextActive: boolean): void;
  resize(): void;
  dispose(): void;
}
