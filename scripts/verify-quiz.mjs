import { QuizController } from '../js/app/quiz/controller.js';
import { getQuizData } from '../js/app/quiz/data.js';
import { getQuizUiMessages, getQuizValidationMessages } from '../js/app/quiz/messages.js';
import { QUIZ_OPTION_COUNT, QUIZ_QUESTION_COUNT } from '../js/app/quiz/types.js';
import { validateQuizData } from '../js/app/quiz/validate.js';

const locales = ['pt-BR', 'en-US', 'es-ES'];
const expectedCorrectIndexes = [1, 1, 2, 1, 2, 1, 1, 2, 3, 2, 2, 1];
const volatileCatalogPattern = /\b(?:GPT-|Claude\s+(?:Opus|Sonnet)|Gemini\s+\d|Copilot Free|February 20\d\d|fevereiro de 20\d\d|febrero de 20\d\d)\b/i;

const conceptPatterns = {
  'pt-BR': [
    /artefato primário.*SDD/i,
    /SDD.*AI Coding Agents/i,
    /papel de AGENTS\.md/i,
    /Agent Skill.*SKILL\.md/i,
    /Progressive Disclosure/i,
    /janela máxima.*contexto útil/i,
    /Smart Zone/i,
    /Vertical Slice/i,
    /AI Handoff/i,
    /model routing/i,
    /Harness Engineering/i,
    /Loop Engineering/i,
  ],
  'en-US': [
    /primary artifact.*SDD/i,
    /SDD.*AI Coding Agents/i,
    /role of AGENTS\.md/i,
    /Agent Skill.*SKILL\.md/i,
    /Progressive Disclosure/i,
    /maximum context window.*useful context/i,
    /Smart Zone/i,
    /Vertical Slice/i,
    /AI Handoff/i,
    /model-routing/i,
    /Harness Engineering/i,
    /Loop Engineering/i,
  ],
  'es-ES': [
    /artefacto principal.*SDD/i,
    /SDD.*AI Coding Agents/i,
    /papel de AGENTS\.md/i,
    /Agent Skill.*SKILL\.md/i,
    /Progressive Disclosure/i,
    /ventana máxima.*contexto útil/i,
    /Smart Zone/i,
    /Vertical Slice/i,
    /AI Handoff/i,
    /model routing/i,
    /Harness Engineering/i,
    /Loop Engineering/i,
  ],
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

class FakeClassList {
  values = new Set();

  add(...names) {
    names.forEach((name) => this.values.add(name));
  }

  contains(name) {
    return this.values.has(name);
  }
}

class FakeElement {
  constructor({ options = false } = {}) {
    this.className = '';
    this.classList = new FakeClassList();
    this.dataset = {};
    this.style = {};
    this.textContent = '';
    this.listeners = new Map();
    this.isOptions = options;
    this.optionItems = [];
    this._innerHTML = '';
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (this.isOptions) {
      const itemCount = (value.match(/<li\s/g) ?? []).length;
      this.optionItems = Array.from({ length: itemCount }, () => new FakeElement());
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }

  querySelectorAll(selector) {
    return selector === 'li' ? this.optionItems : [];
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  removeEventListener(type) {
    this.listeners.delete(type);
  }
}

class FakeQuizRoot extends FakeElement {
  constructor() {
    super();
    this.refs = {
      '.quiz-question': new FakeElement(),
      '.quiz-options': new FakeElement({ options: true }),
      '.quiz-feedback': new FakeElement(),
      '.quiz-score': new FakeElement(),
      '.quiz-btn-next': new FakeElement(),
      '.quiz-btn-finish': new FakeElement(),
    };
  }

  querySelector(selector) {
    return this.refs[selector] ?? null;
  }

  contains(element) {
    return Object.values(this.refs).includes(element);
  }
}

function verifyData(locale) {
  const data = getQuizData(locale);
  const validation = validateQuizData(data, getQuizValidationMessages(locale));
  assert(validation.ok, `[${locale}] valid quiz data rejected: ${validation.errors.join('; ')}`);
  assert(data.length === QUIZ_QUESTION_COUNT, `[${locale}] expected ${QUIZ_QUESTION_COUNT} questions`);

  data.forEach((question, index) => {
    assert(question.options.length === QUIZ_OPTION_COUNT, `[${locale}] question ${index + 1} must have four options`);
    assert(question.correct === expectedCorrectIndexes[index], `[${locale}] question ${index + 1} changed semantic answer index`);
    assert(conceptPatterns[locale][index].test(question.question), `[${locale}] question ${index + 1} does not match its conceptual position`);
    assert(!volatileCatalogPattern.test(JSON.stringify(question)), `[${locale}] question ${index + 1} depends on a volatile model catalog`);
  });
}

function verifyController(locale) {
  const data = getQuizData(locale);
  const controller = new QuizController(data, getQuizUiMessages(locale), getQuizValidationMessages(locale));
  const root = new FakeQuizRoot();

  assert(controller.mount(root), `[${locale}] controller did not mount`);
  controller.renderQuestion(0);
  assert(root.refs['.quiz-btn-next'].style.display === 'inline-block', `[${locale}] Next must be visible before the last question`);
  assert(root.refs['.quiz-btn-finish'].style.display === 'none', `[${locale}] Finish must be hidden before the last question`);

  controller.pickAnswer(data[0].correct);
  controller.pickAnswer(data[0].correct);
  assert(controller.qScore === 1, `[${locale}] repeated answer incremented score more than once`);
  assert(root.refs['.quiz-options'].optionItems[data[0].correct].classList.contains('correct'), `[${locale}] correct option was not marked`);

  controller.qIndex = data.length - 1;
  controller.renderQuestion(controller.qIndex);
  assert(root.refs['.quiz-btn-next'].style.display === 'none', `[${locale}] Next must be hidden on the last question`);
  assert(root.refs['.quiz-btn-finish'].style.display === 'inline-block', `[${locale}] Finish must be visible on the last question`);

  controller.showFinalScore();
  controller.restartQuiz();
  assert(controller.qIndex === 0 && controller.qScore === 0 && controller.qAnswered === false, `[${locale}] restart did not reset state`);
  assert(root.refs['.quiz-question'].textContent.startsWith('1.'), `[${locale}] restart did not render the first question`);
}

function verifyInvalidFixture(locale) {
  const invalidData = structuredClone(getQuizData(locale));
  invalidData[0].options = invalidData[0].options.slice(0, 3);
  const uiMessages = getQuizUiMessages(locale);
  const validationMessages = getQuizValidationMessages(locale);
  const capturedErrors = [];
  const originalConsoleError = console.error;
  console.error = (...args) => capturedErrors.push(args);

  let controller;
  try {
    controller = new QuizController(invalidData, uiMessages, validationMessages);
  } finally {
    console.error = originalConsoleError;
  }

  const root = new FakeQuizRoot();
  controller.mount(root);
  controller.renderQuestion(0);
  assert(capturedErrors.length === 1, `[${locale}] invalid fixture details were not logged`);
  assert(root.innerHTML.includes(uiMessages.validationTitle), `[${locale}] invalid fixture did not render a localized friendly title`);
  assert(root.innerHTML.includes(validationMessages.friendlyPrefix), `[${locale}] invalid fixture did not render a localized friendly error`);
}

for (const locale of locales) {
  verifyData(locale);
  verifyController(locale);
  verifyInvalidFixture(locale);
  console.log(`PASS ${locale}: 12 concepts, four options, controller lifecycle, and localized invalid-data fallback`);
}

console.log('PASS S04 quiz verification');
