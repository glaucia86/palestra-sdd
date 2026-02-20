export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizValidationResult {
  ok: boolean;
  errors: string[];
  friendlyError: string;
}

export interface QuizDomRefs {
  question: HTMLElement | null;
  options: HTMLElement | null;
  feedback: HTMLElement | null;
  score: HTMLElement | null;
  btnNext: HTMLButtonElement | null;
  btnFinish: HTMLButtonElement | null;
}
