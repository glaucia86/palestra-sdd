const UI_MESSAGES = {
    'pt-BR': {
        validationTitle: 'Falha ao carregar o quiz',
        validationHint: 'Verifique o arquivo de dados do quiz e tente novamente.',
        progressLabel: (current, total) => `Questão ${current} de ${total}`,
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
        progressLabel: (current, total) => `Question ${current} of ${total}`,
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
        progressLabel: (current, total) => `Pregunta ${current} de ${total}`,
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
const VALIDATION_MESSAGES = {
    'pt-BR': {
        noneFound: 'Nenhuma questão foi encontrada no quiz.',
        invalidQuestionCount: 'O quiz deve ter exatamente 12 questões.',
        invalidFormat: (qNum) => `Questão ${qNum}: formato inválido.`,
        invalidQuestion: (qNum) => `Questão ${qNum}: campo "question" inválido.`,
        invalidOptionsCount: (qNum) => `Questão ${qNum}: "options" deve ter exatamente 4 itens.`,
        invalidOptionsValue: (qNum) => `Questão ${qNum}: todas as "options" devem ser textos não vazios.`,
        invalidCorrectType: (qNum) => `Questão ${qNum}: campo "correct" deve ser inteiro.`,
        invalidCorrectRange: (qNum) => `Questão ${qNum}: índice "correct" fora do intervalo de "options".`,
        invalidExplanation: (qNum) => `Questão ${qNum}: campo "explanation" inválido.`,
        friendlyPrefix: 'Quiz indisponível',
    },
    'en-US': {
        noneFound: 'No quiz questions were found.',
        invalidQuestionCount: 'The quiz must contain exactly 12 questions.',
        invalidFormat: (qNum) => `Question ${qNum}: invalid format.`,
        invalidQuestion: (qNum) => `Question ${qNum}: invalid "question" field.`,
        invalidOptionsCount: (qNum) => `Question ${qNum}: "options" must contain exactly 4 entries.`,
        invalidOptionsValue: (qNum) => `Question ${qNum}: every "option" must be non-empty text.`,
        invalidCorrectType: (qNum) => `Question ${qNum}: "correct" must be an integer.`,
        invalidCorrectRange: (qNum) => `Question ${qNum}: "correct" index is out of the "options" range.`,
        invalidExplanation: (qNum) => `Question ${qNum}: invalid "explanation" field.`,
        friendlyPrefix: 'Quiz unavailable',
    },
    'es-ES': {
        noneFound: 'No se encontraron preguntas en el quiz.',
        invalidQuestionCount: 'El quiz debe contener exactamente 12 preguntas.',
        invalidFormat: (qNum) => `Pregunta ${qNum}: formato inválido.`,
        invalidQuestion: (qNum) => `Pregunta ${qNum}: campo "question" inválido.`,
        invalidOptionsCount: (qNum) => `Pregunta ${qNum}: "options" debe contener exactamente 4 elementos.`,
        invalidOptionsValue: (qNum) => `Pregunta ${qNum}: todas las "options" deben ser textos no vacíos.`,
        invalidCorrectType: (qNum) => `Pregunta ${qNum}: el campo "correct" debe ser entero.`,
        invalidCorrectRange: (qNum) => `Pregunta ${qNum}: índice "correct" fuera del rango de "options".`,
        invalidExplanation: (qNum) => `Pregunta ${qNum}: campo "explanation" inválido.`,
        friendlyPrefix: 'Quiz no disponible',
    },
};
export function getQuizUiMessages(locale) {
    return UI_MESSAGES[locale];
}
export function getQuizValidationMessages(locale) {
    return VALIDATION_MESSAGES[locale];
}
//# sourceMappingURL=messages.js.map