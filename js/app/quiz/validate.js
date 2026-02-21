export function validateQuizData(quizData, messages) {
    const errors = [];
    if (!Array.isArray(quizData) || quizData.length === 0) {
        errors.push(messages.noneFound);
    }
    else {
        quizData.forEach((q, idx) => {
            const qNum = idx + 1;
            if (!q || typeof q !== 'object') {
                errors.push(messages.invalidFormat(qNum));
                return;
            }
            if (typeof q.question !== 'string' || !q.question.trim()) {
                errors.push(messages.invalidQuestion(qNum));
            }
            if (!Array.isArray(q.options) || q.options.length < 2) {
                errors.push(messages.invalidOptionsCount(qNum));
            }
            else if (q.options.some((opt) => typeof opt !== 'string' || !opt.trim())) {
                errors.push(messages.invalidOptionsValue(qNum));
            }
            if (!Number.isInteger(q.correct)) {
                errors.push(messages.invalidCorrectType(qNum));
            }
            else if (Array.isArray(q.options) && (q.correct < 0 || q.correct >= q.options.length)) {
                errors.push(messages.invalidCorrectRange(qNum));
            }
            if (typeof q.explanation !== 'string' || !q.explanation.trim()) {
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