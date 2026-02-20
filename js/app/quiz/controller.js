import { validateQuizData } from './validate.js';

export class QuizController {
  static selectors = {
    wrapper: '.quiz-wrapper',
    question: '.quiz-question',
    options: '.quiz-options',
    feedback: '.quiz-feedback',
    score: '.quiz-score',
    btnNext: '.quiz-btn-next',
    btnFinish: '.quiz-btn-finish',
  };

  constructor(quizData) {
    this.quizData = quizData;
    this.qIndex = 0;
    this.qScore = 0;
    this.qAnswered = false;
    this.rootEl = null;
    this.dom = null;
    this.onRootClick = null;
    this.validationError = '';

    this.validateData();
  }

  mount(rootEl = document.querySelector(QuizController.selectors.wrapper)) {
    if (this.rootEl && this.rootEl !== rootEl) {
      this.unbindEvents();
    }
    this.rootEl = rootEl || null;
    this.cacheDomRefs();
    this.bindEvents();
    return !!this.rootEl;
  }

  cacheDomRefs() {
    if (!this.rootEl) {
      this.dom = null;
      return;
    }

    this.dom = {
      question: this.rootEl.querySelector(QuizController.selectors.question),
      options: this.rootEl.querySelector(QuizController.selectors.options),
      feedback: this.rootEl.querySelector(QuizController.selectors.feedback),
      score: this.rootEl.querySelector(QuizController.selectors.score),
      btnNext: this.rootEl.querySelector(QuizController.selectors.btnNext),
      btnFinish: this.rootEl.querySelector(QuizController.selectors.btnFinish),
    };
  }

  bindEvents() {
    if (!this.rootEl || this.onRootClick) return;

    this.onRootClick = (event) => {
      const optEl = event.target.closest('.quiz-options li[data-idx]');
      if (optEl && this.rootEl.contains(optEl)) {
        const selected = Number(optEl.dataset.idx);
        if (Number.isInteger(selected)) this.pickAnswer(selected);
        return;
      }

      const actionEl = event.target.closest('[data-quiz-action]');
      if (!actionEl || !this.rootEl.contains(actionEl)) return;

      const action = actionEl.dataset.quizAction;
      if (action === 'next') this.nextQuestion();
      else if (action === 'finish') this.showFinalScore();
      else if (action === 'restart') this.restartQuiz();
    };

    this.rootEl.addEventListener('click', this.onRootClick);
  }

  unbindEvents() {
    if (!this.rootEl || !this.onRootClick) return;
    this.rootEl.removeEventListener('click', this.onRootClick);
    this.onRootClick = null;
  }

  validateData() {
    const result = validateQuizData(this.quizData);
    this.validationError = result.friendlyError;
    if (!result.ok) console.error('Quiz data validation failed:', result.errors);
  }

  renderValidationError() {
    if (!this.rootEl || !this.validationError) return;

    this.rootEl.innerHTML = `
    <div style="text-align:center; padding:1em;">
      <div style="font-size:2.2em; margin-bottom:0.25em;">⚠️</div>
      <h3 class="text-blue" style="font-size:1.05em; margin-bottom:0.3em;">Falha ao carregar o quiz</h3>
      <p style="color:var(--text-muted); font-size:0.78em;">${this.validationError}</p>
      <p style="color:var(--text-muted); font-size:0.68em; margin-top:0.45em;">Verifique o arquivo de dados do quiz e tente novamente.</p>
    </div>
  `;
  }

  renderQuestion(i) {
    const q = this.quizData[i];
    const letters = ['A', 'B', 'C', 'D'];
    if (!this.dom && !this.mount()) return;
    if (this.validationError) {
      this.renderValidationError();
      return;
    }
    if (!q) return;

    const { question, options, feedback, score, btnNext, btnFinish } = this.dom;
    if (!question || !options) return;

    this.qAnswered = false;
    question.textContent = q.question;

    options.innerHTML = q.options
      .map(
        (opt, idx) => `
    <li data-idx="${idx}">
      <span class="quiz-letter">${letters[idx]}</span>
      <span>${opt}</span>
    </li>
  `,
      )
      .join('');

    if (feedback) {
      feedback.className = 'quiz-feedback';
      feedback.textContent = '';
    }
    if (score) score.textContent = `Questão ${i + 1} de ${this.quizData.length}`;
    if (btnNext) btnNext.style.display = i < this.quizData.length - 1 ? 'inline-block' : 'none';
    if (btnFinish) btnFinish.style.display = i === this.quizData.length - 1 ? 'inline-block' : 'none';
  }

  pickAnswer(selected) {
    if (this.qAnswered) return;
    if (!this.dom && !this.mount()) return;
    if (this.validationError) return;
    this.qAnswered = true;

    const q = this.quizData[this.qIndex];
    if (!q) return;

    const opts = this.dom?.options?.querySelectorAll('li') || [];
    const fbEl = this.dom?.feedback;

    opts.forEach((li, i) => {
      if (i === q.correct) li.classList.add('correct');
      else if (i === selected) li.classList.add('wrong');
    });

    if (selected === q.correct) {
      this.qScore++;
      if (fbEl) {
        fbEl.className = 'quiz-feedback correct show';
        fbEl.textContent = q.explanation;
      }
      return;
    }

    if (fbEl) {
      fbEl.className = 'quiz-feedback wrong show';
      fbEl.textContent = `❌ Incorreto. ${q.explanation}`;
    }
  }

  nextQuestion() {
    if (this.validationError) return;
    if (this.qIndex < this.quizData.length - 1) {
      this.qIndex++;
      this.renderQuestion(this.qIndex);
    }
  }

  showFinalScore() {
    if (!this.rootEl && !this.mount()) return;
    if (!this.rootEl) return;
    if (this.validationError) {
      this.renderValidationError();
      return;
    }

    const pct = Math.round((this.qScore / this.quizData.length) * 100);
    const icon = this.qScore === this.quizData.length ? '🏆' : this.qScore >= 2 ? '🎯' : '📚';
    const msg =
      this.qScore === this.quizData.length
        ? 'Perfeito! Você domina os conceitos de SDD! 🚀'
        : this.qScore >= 2
          ? 'Ótimo trabalho! Pratique mais com spec.md! 💪'
          : 'Continue estudando! SDD tem muito a oferecer! 📖';

    this.rootEl.innerHTML = `
    <div style="text-align:center; padding:1em;">
      <div style="font-size:3em; margin-bottom:0.3em;">${icon}</div>
      <h2 class="gradient-text" style="font-size:1.8em; margin-bottom:0.2em;">${this.qScore}/${this.quizData.length}</h2>
      <p style="color:var(--text-secondary); font-size:0.85em;">
        Você acertou <strong style="color:var(--accent-green)">${pct}%</strong> das questões!
      </p>
      <p style="color:var(--text-muted); font-size:0.72em; margin-top:0.5em;">${msg}</p>
      <button class="quiz-btn" style="margin-top:1.2em;" data-quiz-action="restart">Tentar Novamente</button>
    </div>
  `;
  }

  restartQuiz() {
    if (this.validationError) {
      if (!this.rootEl && !this.mount()) return;
      this.renderValidationError();
      return;
    }

    this.qIndex = 0;
    this.qScore = 0;
    this.qAnswered = false;

    if (!this.rootEl && !this.mount()) return;
    if (!this.rootEl) return;

    this.rootEl.innerHTML = `
    <div class="quiz-question"></div>
    <ul class="quiz-options"></ul>
    <div class="quiz-feedback"></div>
    <div class="quiz-nav">
      <span class="quiz-score"></span>
      <div style="display:flex; gap:0.5em;">
        <button class="quiz-btn quiz-btn-next" data-quiz-action="next">Próxima →</button>
        <button class="quiz-btn quiz-btn-finish purple" data-quiz-action="finish" style="display:none">Ver Resultado 🏆</button>
      </div>
    </div>
  `;
    this.cacheDomRefs();
    this.renderQuestion(0);
  }

  bindGlobals() {
    window.renderQuestion = (i) => this.renderQuestion(i);
    window.pickAnswer = (selected) => this.pickAnswer(selected);
    window.nextQuestion = () => this.nextQuestion();
    window.showFinalScore = () => this.showFinalScore();
    window.restartQuiz = () => this.restartQuiz();
  }
}
