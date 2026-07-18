import { QUIZ_OPTION_COUNT, QUIZ_QUESTION_COUNT, } from './types.js';
function containsHtml(value) {
    return /<[^>]*>/.test(value);
}
export function validateQuizData(quizData, messages) {
    const errors = [];
    if (!Array.isArray(quizData) || quizData.length === 0) {
        errors.push(messages.noneFound);
    }
    else {
        if (quizData.length !== QUIZ_QUESTION_COUNT) {
            errors.push(messages.invalidQuestionCount);
        }
        quizData.forEach((q, idx) => {
            const qNum = idx + 1;
            if (!q || typeof q !== 'object') {
                errors.push(messages.invalidFormat(qNum));
                return;
            }
            if (typeof q.question !== 'string' ||
                !q.question.trim() ||
                !q.question.trim().startsWith(`${qNum}.`) ||
                containsHtml(q.question)) {
                errors.push(messages.invalidQuestion(qNum));
            }
            if (!Array.isArray(q.options) || q.options.length !== QUIZ_OPTION_COUNT) {
                errors.push(messages.invalidOptionsCount(qNum));
            }
            else if (q.options.some((opt) => typeof opt !== 'string' || !opt.trim() || containsHtml(opt))) {
                errors.push(messages.invalidOptionsValue(qNum));
            }
            if (!Number.isInteger(q.correct)) {
                errors.push(messages.invalidCorrectType(qNum));
            }
            else if (q.correct < 0 || q.correct >= QUIZ_OPTION_COUNT) {
                errors.push(messages.invalidCorrectRange(qNum));
            }
            if (typeof q.explanation !== 'string' ||
                !q.explanation.trim() ||
                containsHtml(q.explanation)) {
                errors.push(messages.invalidExplanation(qNum));
            }
        });
    }
    return {
        ok: errors.length === 0,
        errors,
        friendlyError: errors.length ? `${messages.friendlyPrefix}: ${errors[0]}` : '',
    };
}
//# sourceMappingURL=validate.js.map