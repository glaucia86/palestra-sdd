import type { QuizQuestion, QuizValidationResult } from './types.js';

export function validateQuizData(quizData: QuizQuestion[]): QuizValidationResult {
  const errors = [];

  if (!Array.isArray(quizData) || quizData.length === 0) {
    errors.push('Nenhuma questão foi encontrada no quiz.');
  } else {
    quizData.forEach((q: QuizQuestion, idx: number) => {
      const qNum = idx + 1;

      if (!q || typeof q !== 'object') {
        errors.push(`Questão ${qNum}: formato inválido.`);
        return;
      }

      if (typeof q.question !== 'string' || !q.question.trim()) {
        errors.push(`Questão ${qNum}: campo "question" inválido.`);
      }

      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Questão ${qNum}: "options" deve ter ao menos 2 itens.`);
      } else if (q.options.some((opt: string) => typeof opt !== 'string' || !opt.trim())) {
        errors.push(`Questão ${qNum}: todas as "options" devem ser texto.`);
      }

      if (!Number.isInteger(q.correct)) {
        errors.push(`Questão ${qNum}: campo "correct" deve ser inteiro.`);
      } else if (Array.isArray(q.options) && (q.correct < 0 || q.correct >= q.options.length)) {
        errors.push(`Questão ${qNum}: índice "correct" fora do intervalo de "options".`);
      }

      if (typeof q.explanation !== 'string' || !q.explanation.trim()) {
        errors.push(`Questão ${qNum}: campo "explanation" inválido.`);
      }
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    friendlyError: errors.length ? `Quiz indisponível: ${errors[0]}` : '',
  };
}
