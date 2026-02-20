export class QuizController {
  constructor(quizData) {
    this.quizData = quizData;
    this.qIndex = 0;
    this.qScore = 0;
    this.qAnswered = false;
  }

  renderQuestion(i) {
    const q = this.quizData[i];
    const letters = ['A', 'B', 'C', 'D'];

    const qEl = document.querySelector('.quiz-question');
    const optEl = document.querySelector('.quiz-options');
    const fbEl = document.querySelector('.quiz-feedback');
    const scoreEl = document.querySelector('.quiz-score');
    const btnNext = document.querySelector('.quiz-btn-next');
    const btnFinish = document.querySelector('.quiz-btn-finish');

    if (!qEl || !optEl) return;

    this.qAnswered = false;
    qEl.textContent = q.question;

    optEl.innerHTML = q.options
      .map(
        (opt, idx) => `
    <li onclick="pickAnswer(${idx})" data-idx="${idx}">
      <span class="quiz-letter">${letters[idx]}</span>
      <span>${opt}</span>
    </li>
  `,
      )
      .join('');

    if (fbEl) {
      fbEl.className = 'quiz-feedback';
      fbEl.textContent = '';
    }
    if (scoreEl) scoreEl.textContent = `Questão ${i + 1} de ${this.quizData.length}`;
    if (btnNext) btnNext.style.display = i < this.quizData.length - 1 ? 'inline-block' : 'none';
    if (btnFinish) btnFinish.style.display = i === this.quizData.length - 1 ? 'inline-block' : 'none';
  }

  pickAnswer(selected) {
    if (this.qAnswered) return;
    this.qAnswered = true;

    const q = this.quizData[this.qIndex];
    const opts = document.querySelectorAll('.quiz-options li');
    const fbEl = document.querySelector('.quiz-feedback');

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
    if (this.qIndex < this.quizData.length - 1) {
      this.qIndex++;
      this.renderQuestion(this.qIndex);
    }
  }

  showFinalScore() {
    const wrapper = document.querySelector('.quiz-wrapper');
    if (!wrapper) return;

    const pct = Math.round((this.qScore / this.quizData.length) * 100);
    const icon = this.qScore === this.quizData.length ? '🏆' : this.qScore >= 2 ? '🎯' : '📚';
    const msg =
      this.qScore === this.quizData.length
        ? 'Perfeito! Você domina os conceitos de SDD! 🚀'
        : this.qScore >= 2
          ? 'Ótimo trabalho! Pratique mais com spec.md! 💪'
          : 'Continue estudando! SDD tem muito a oferecer! 📖';

    wrapper.innerHTML = `
    <div style="text-align:center; padding:1em;">
      <div style="font-size:3em; margin-bottom:0.3em;">${icon}</div>
      <h2 class="gradient-text" style="font-size:1.8em; margin-bottom:0.2em;">${this.qScore}/${this.quizData.length}</h2>
      <p style="color:var(--text-secondary); font-size:0.85em;">
        Você acertou <strong style="color:var(--accent-green)">${pct}%</strong> das questões!
      </p>
      <p style="color:var(--text-muted); font-size:0.72em; margin-top:0.5em;">${msg}</p>
      <button class="quiz-btn" style="margin-top:1.2em;" onclick="restartQuiz()">Tentar Novamente</button>
    </div>
  `;
  }

  restartQuiz() {
    this.qIndex = 0;
    this.qScore = 0;
    this.qAnswered = false;

    const wrapper = document.querySelector('.quiz-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
    <div class="quiz-question"></div>
    <ul class="quiz-options"></ul>
    <div class="quiz-feedback"></div>
    <div class="quiz-nav">
      <span class="quiz-score"></span>
      <div style="display:flex; gap:0.5em;">
        <button class="quiz-btn quiz-btn-next" onclick="nextQuestion()">Próxima →</button>
        <button class="quiz-btn quiz-btn-finish purple" onclick="showFinalScore()" style="display:none">Ver Resultado 🏆</button>
      </div>
    </div>
  `;
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
