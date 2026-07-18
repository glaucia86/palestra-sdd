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

export const QUIZ_QUESTION_COUNT = 12;
export const QUIZ_OPTION_COUNT = 4;

export interface QuizValidationMessages {
  noneFound: string;
  invalidQuestionCount: string;
  invalidFormat: (qNum: number) => string;
  invalidQuestion: (qNum: number) => string;
  invalidOptionsCount: (qNum: number) => string;
  invalidOptionsValue: (qNum: number) => string;
  invalidCorrectType: (qNum: number) => string;
  invalidCorrectRange: (qNum: number) => string;
  invalidExplanation: (qNum: number) => string;
  friendlyPrefix: string;
}

export interface QuizUiMessages {
  validationTitle: string;
  validationHint: string;
  progressLabel: (current: number, total: number) => string;
  incorrectPrefix: string;
  nextLabel: string;
  finishLabel: string;
  restartLabel: string;
  perfectMessage: string;
  goodMessage: string;
  improveMessage: string;
  scoreSummaryTemplate: string;
}
