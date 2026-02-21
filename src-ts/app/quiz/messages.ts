import type { Locale } from '../i18n/language.js';
import type { QuizUiMessages, QuizValidationMessages } from './types.js';

const UI_MESSAGES: Record<Locale, QuizUiMessages> = {
  'pt-BR': {
    validationTitle: 'Falha ao carregar o quiz',
    validationHint: 'Verifique o arquivo de dados do quiz e tente novamente.',
    progressLabel: (current: number, total: number): string => `Questão ${current} de ${total}`,
    incorrectPrefix: '❌ Incorreto.',
    nextLabel: 'Próxima →',
    finishLabel: 'Ver Resultado 🏆',
    restartLabel: 'Tentar Novamente',
    perfectMessage: 'Perfeito! Você domina os conceitos de SDD! 🚀',
    goodMessage: 'Ótimo trabalho! Pratique mais com spec.md! 💪',
    improveMessage: 'Continue estudando! SDD tem muito a oferecer! 📖',
    scoreSummaryTemplate: 'Você acertou {pct} das questões!',
  },
  'en-US': {
    validationTitle: 'Failed to load quiz',
    validationHint: 'Check the quiz data file and try again.',
    progressLabel: (current: number, total: number): string => `Question ${current} of ${total}`,
    incorrectPrefix: '❌ Incorrect.',
    nextLabel: 'Next →',
    finishLabel: 'View Result 🏆',
    restartLabel: 'Try Again',
    perfectMessage: 'Perfect! You mastered the SDD concepts! 🚀',
    goodMessage: 'Great job! Practice more with spec.md! 💪',
    improveMessage: 'Keep studying! SDD has a lot to offer! 📖',
    scoreSummaryTemplate: 'You got {pct} of the questions right!',
  },
  'es-ES': {
    validationTitle: 'Error al cargar el quiz',
    validationHint: 'Verifica el archivo de datos del quiz e inténtalo de nuevo.',
    progressLabel: (current: number, total: number): string => `Pregunta ${current} de ${total}`,
    incorrectPrefix: '❌ Incorrecto.',
    nextLabel: 'Siguiente →',
    finishLabel: 'Ver Resultado 🏆',
    restartLabel: 'Intentar de nuevo',
    perfectMessage: '¡Perfecto! ¡Dominas los conceptos de SDD! 🚀',
    goodMessage: '¡Muy buen trabajo! Practica más con spec.md. 💪',
    improveMessage: 'Sigue estudiando: SDD tiene mucho que ofrecer. 📖',
    scoreSummaryTemplate: '¡Acertaste {pct} de las preguntas!',
  },
};

const VALIDATION_MESSAGES: Record<Locale, QuizValidationMessages> = {
  'pt-BR': {
    noneFound: 'Nenhuma questão foi encontrada no quiz.',
    invalidFormat: (qNum: number): string => `Questão ${qNum}: formato inválido.`,
    invalidQuestion: (qNum: number): string => `Questão ${qNum}: campo "question" inválido.`,
    invalidOptionsCount: (qNum: number): string => `Questão ${qNum}: "options" deve ter ao menos 2 itens.`,
    invalidOptionsValue: (qNum: number): string => `Questão ${qNum}: todas as "options" devem ser texto.`,
    invalidCorrectType: (qNum: number): string => `Questão ${qNum}: campo "correct" deve ser inteiro.`,
    invalidCorrectRange: (qNum: number): string => `Questão ${qNum}: índice "correct" fora do intervalo de "options".`,
    invalidExplanation: (qNum: number): string => `Questão ${qNum}: campo "explanation" inválido.`,
    friendlyPrefix: 'Quiz indisponível',
  },
  'en-US': {
    noneFound: 'No quiz questions were found.',
    invalidFormat: (qNum: number): string => `Question ${qNum}: invalid format.`,
    invalidQuestion: (qNum: number): string => `Question ${qNum}: invalid "question" field.`,
    invalidOptionsCount: (qNum: number): string => `Question ${qNum}: "options" must have at least 2 entries.`,
    invalidOptionsValue: (qNum: number): string => `Question ${qNum}: every "option" must be text.`,
    invalidCorrectType: (qNum: number): string => `Question ${qNum}: "correct" must be an integer.`,
    invalidCorrectRange: (qNum: number): string => `Question ${qNum}: "correct" index is out of the "options" range.`,
    invalidExplanation: (qNum: number): string => `Question ${qNum}: invalid "explanation" field.`,
    friendlyPrefix: 'Quiz unavailable',
  },
  'es-ES': {
    noneFound: 'No se encontraron preguntas en el quiz.',
    invalidFormat: (qNum: number): string => `Pregunta ${qNum}: formato inválido.`,
    invalidQuestion: (qNum: number): string => `Pregunta ${qNum}: campo "question" inválido.`,
    invalidOptionsCount: (qNum: number): string => `Pregunta ${qNum}: "options" debe tener al menos 2 elementos.`,
    invalidOptionsValue: (qNum: number): string => `Pregunta ${qNum}: todas las "options" deben ser texto.`,
    invalidCorrectType: (qNum: number): string => `Pregunta ${qNum}: el campo "correct" debe ser entero.`,
    invalidCorrectRange: (qNum: number): string => `Pregunta ${qNum}: índice "correct" fuera del rango de "options".`,
    invalidExplanation: (qNum: number): string => `Pregunta ${qNum}: campo "explanation" inválido.`,
    friendlyPrefix: 'Quiz no disponible',
  },
};

export function getQuizUiMessages(locale: Locale): QuizUiMessages {
  return UI_MESSAGES[locale];
}

export function getQuizValidationMessages(locale: Locale): QuizValidationMessages {
  return VALIDATION_MESSAGES[locale];
}
