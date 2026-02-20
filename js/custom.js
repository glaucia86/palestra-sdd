/* =============================================================================
   custom.js — SDD Presentation Logic
   Autor: Glaucia Lemos (@glaucia_lemos86)
   ============================================================================= */

/* ---------------------------------------------------------------------------
   1. Mermaid Initialization
   --------------------------------------------------------------------------- */
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'DM Sans, sans-serif',
  themeVariables: {
    background:        '#04091b',
    mainBkg:           '#09102a',
    primaryColor:      '#09102a',
    primaryTextColor:  '#edf2ff',
    primaryBorderColor:'#00ddb3',
    lineColor:         '#38c8fa',
    secondaryColor:    '#0f1c3e',
    tertiaryColor:     '#04091b',
    nodeBorder:        '#00ddb3',
    clusterBkg:        '#0f1c3e',
    titleColor:        '#edf2ff',
    edgeLabelBackground: '#09102a',
    fontSize:          '14px',
    nodeTextColor:     '#edf2ff',
  },
  flowchart: {
    useMaxWidth: true,
    curve: 'basis',
    nodeSpacing: 45,
    rankSpacing: 55,
    htmlLabels: true,
  }
});

/* ---------------------------------------------------------------------------
   2. Starfield Background — ambient galaxy with layered parallax
   --------------------------------------------------------------------------- */
function createStarfield() {
  const viewport = document.querySelector('.reveal-viewport');
  if (!viewport) return;

  // Nebula (back layer)
  const nb = document.createElement('div');
  nb.className = 'nebula';
  nb.setAttribute('aria-hidden', 'true');

  // Star field container
  const sf = document.createElement('div');
  sf.className = 'starfield';
  sf.setAttribute('aria-hidden', 'true');

  // Three parallax depth layers
  const layerFar  = document.createElement('div'); layerFar.className  = 'stars-far';
  const layerMid  = document.createElement('div'); layerMid.className  = 'stars-mid';
  const layerNear = document.createElement('div'); layerNear.className = 'stars-near';

  // Color variants — realistic starfield: 56% white, 20% cool, 15% warm, 5% violet, 4% lg/xl
  const colorTints = [
    '', '', '', '', '',        // white — most common
    'star-cool', 'star-cool', // blue-white
    'star-warm', 'star-warm', // amber
    'star-violet',            // rare violet
  ];

  // Layer config: [layer, sm, md, lg, xl]
  const layers = [
    { el: layerFar,  sm: 120, md: 25, lg:  6, xl: 2 },
    { el: layerMid,  sm:  70, md: 22, lg:  8, xl: 3 },
    { el: layerNear, sm:  35, md: 14, lg:  7, xl: 2 },
  ];

  layers.forEach(({ el, sm, md, lg, xl }) => {
    const addStars = (count, sizeCls, durMin, durMax, baseMin, baseMax, maxMin, maxMax) => {
      for (let i = 0; i < count; i++) {
        const s     = document.createElement('span');
        const tint  = colorTints[Math.floor(Math.random() * colorTints.length)];
        s.className = `star ${sizeCls}${tint ? ' ' + tint : ''}`;
        const dur   = (durMin  + Math.random() * (durMax  - durMin)).toFixed(2);
        const del   = (Math.random() * 18).toFixed(2);
        const base  = (baseMin + Math.random() * (baseMax - baseMin)).toFixed(2);
        const max   = (maxMin  + Math.random() * (maxMax  - maxMin)).toFixed(2);
        s.style.cssText =
          `left:${(Math.random() * 110 - 5).toFixed(2)}%;` +
          `top:${(Math.random()  * 110 - 5).toFixed(2)}%;` +
          `--star-dur:${dur}s;--star-del:-${del}s;` +
          `--star-base:${base};--star-max:${max};`;
        el.appendChild(s);
      }
    };
    addStars(sm, 'star-sm', 4.5, 10,  0.12, 0.28, 0.42, 0.70);
    addStars(md, 'star-md', 4.0,  9,  0.15, 0.32, 0.50, 0.78);
    addStars(lg, 'star-lg', 3.5,  7,  0.20, 0.38, 0.58, 0.86);
    addStars(xl, 'star-xl', 3.0,  6,  0.25, 0.45, 0.68, 0.90);
    sf.appendChild(el);
  });

  // Three shooting stars — rare & surprising (25s, 58s, 97s initial delay)
  const shots = [
    { left: '12%', top: '8%',  dur: 2.1, del: 25,  len: 140, dist: 580, angle: -25 },
    { left: '61%', top: '5%',  dur: 1.9, del: 58,  len: 115, dist: 530, angle: -28 },
    { left: '38%', top: '12%', dur: 2.4, del: 97,  len: 160, dist: 640, angle: -23 },
  ];
  shots.forEach(({ left, top, dur, del, len, dist, angle }) => {
    const ss = document.createElement('span');
    ss.className = 'shooting-star';
    ss.style.cssText =
      `left:${left};top:${top};` +
      `--shoot-dur:${dur}s;--shoot-del:${del}s;` +
      `--shoot-len:${len}px;--shoot-dist:${dist}px;--angle:${angle}deg;`;
    sf.appendChild(ss);
  });

  // Insert: nebula deepest → starfield → .reveal (z-index:1) above both
  viewport.prepend(sf);
  viewport.prepend(nb);
}

/* ---------------------------------------------------------------------------
   3. Particles (Cover Slide)
   --------------------------------------------------------------------------- */
function createParticlesIn(containerId, count, color) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1 + Math.random() * 3;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --dur: ${7 + Math.random() * 10}s;
      --del: ${Math.random() * 9}s;
      --dx: ${(Math.random() - 0.5) * 80}px;
      opacity: ${0.15 + Math.random() * 0.5};
      ${color ? 'background:' + color + ';' : ''}
    `;
    container.appendChild(p);
  }
}

function createParticles() {
  createParticlesIn('particles', 35);
  createParticlesIn('particles-sobre-mim', 22, 'var(--accent-blue)');
  createParticlesIn('particles-the-end', 28, 'var(--accent-green)');
}

/* ---------------------------------------------------------------------------
   3b. Section Cosmos — cometas + micro-estrelas nas páginas de seção
       Ângulo 132–143 deg CW (approx. NE→SW diagonal no slide Reveal 1200×760)
   --------------------------------------------------------------------------- */
function createSectionCosmics() {
  document.querySelectorAll('.section-page-container').forEach(container => {
    const slide = container.closest('section');
    if (!slide) return;

    const cosmos = document.createElement('div');
    cosmos.className = 'section-cosmos';
    cosmos.setAttribute('aria-hidden', 'true');

    // Herda cor de acento do primeiro orb do slide
    const orb = slide.querySelector('.section-orb-1');
    let accent = 'rgba(0,221,179,0.65)';
    if (orb) {
      const v = orb.style.getPropertyValue('--orb-color');
      if (v) accent = v.replace('0.15)', '0.65)');
    }
    const accentDim = accent.replace('0.65)', '0.35)');

    // Definição dos cometas [ângulo-deg, largura-px, delay-s, ciclo-ms, cor, top]
    // rotate(angle) + translateX(1650px) = movimento rumo SW (baixo-esquerda)
    [
      { angle: 132, w: 220, del: 2,  dur: 32000, color: 'rgba(255,255,255,0.85)', top: '4%'  },
      { angle: 138, w: 155, del: 19, dur: 40000, color: accent,                   top: '26%' },
      { angle: 128, w: 95,  del: 47, dur: 37000, color: 'rgba(255,255,255,0.55)', top: '55%' },
      { angle: 143, w: 65,  del: 28, dur: 44000, color: accentDim,                top: '16%' },
    ].forEach(({ angle, w, del, dur, color, top }) => {
      const el = document.createElement('span');
      el.className = 'comet';
      el.style.cssText =
        `top:${top};width:${w}px;` +
        `background:linear-gradient(to right,rgba(255,255,255,0.95) 0%,${color} 30%,transparent 100%);`;
      el.animate([
        { transform: `rotate(${angle}deg) translateX(0px)`,    opacity: 0                    },
        { transform: `rotate(${angle}deg) translateX(260px)`,  opacity: 0.85, offset: 0.025 },
        { transform: `rotate(${angle}deg) translateX(1650px)`, opacity: 0,    offset: 0.090 },
        { transform: `rotate(${angle}deg) translateX(0px)`,    opacity: 0,    offset: 0.092 },
        { transform: `rotate(${angle}deg) translateX(0px)`,    opacity: 0                    },
      ], { duration: dur, delay: del * 1000, iterations: Infinity, easing: 'ease-out' });
      cosmos.appendChild(el);
    });

    // Micro estrelas tintilantes para profundidade
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      const isLg = i < 2;
      s.className = isLg ? 'sp-star lg' : 'sp-star';
      s.style.cssText =
        `left:${(2 + Math.random() * 94).toFixed(1)}%;` +
        `top:${(5  + Math.random() * 88).toFixed(1)}%;`;
      s.animate([
        { opacity: 0.04, transform: 'scale(1)'   },
        { opacity: isLg ? 0.7 : (0.25 + Math.random() * 0.4), transform: 'scale(1.5)' },
        { opacity: 0.04, transform: 'scale(1)'   },
      ], {
        duration:   3000 + Math.random() * 5000,
        delay:    -(Math.random() * 8000),
        iterations: Infinity,
        easing:     'ease-in-out',
      });
      cosmos.appendChild(s);
    }

    slide.prepend(cosmos);
  });
}

/* ---------------------------------------------------------------------------
   3. Quiz Logic
   --------------------------------------------------------------------------- */
const quizData = [
  {
    question: '1. Qual é o principal artefato no Spec-Driven Development (SDD)?',
    options: [
      'Código-fonte da aplicação',
      'Especificações estruturadas (Specs)',
      'Testes unitários automatizados',
      'Documentação técnica gerada por IA'
    ],
    correct: 1,
    explanation: '✅ Correto! No SDD as Especificações (Specs) são o artefato primário — elas guiam tudo o mais: código, testes e documentação.'
  },
  {
    question: '2. Qual é a principal função do arquivo AGENTS.md?',
    options: [
      'Configurar plugins do VS Code',
      'Definir schemas de banco de dados',
      'Guiar AI agents com contexto, regras e comportamentos',
      'Gerar relatórios de código automaticamente'
    ],
    correct: 2,
    explanation: '✅ Correto! AGENTS.md é um "contrato vivo" que guia o comportamento dos AI agents com contexto, regras e restrições do projeto.'
  },
  {
    question: '3. O que é Progressive Disclosure no contexto do Skills.md?',
    options: [
      'Exibir animações progressivas nos slides',
      'Mostrar toda a documentação de uma só vez',
      'Carregar habilidades especializadas sob demanda',
      'Revelar o código-fonte gradualmente ao usuário'
    ],
    correct: 2,
    explanation: '✅ Correto! Progressive Disclosure é carregar apenas as Skills necessárias para cada tarefa, evitando sobrecarga de contexto no agente.'
  },
  {
    question: '4. Qual comando do spec-kit gera o plano técnico de implementação (PRD.md)?',
    options: [
      '/speckit.specify',
      '/speckit.tasks',
      '/speckit.plan',
      '/speckit.implement'
    ],
    correct: 2,
    explanation: '✅ Correto! O /speckit.plan gera o PRD.md — documento vivo que serve como fonte única de verdade para o AI agent durante a implementação.'
  },
  {
    question: '5. O que o specify init configura automaticamente no projeto?',
    options: [
      'Apenas o arquivo AGENTS.md',
      'Templates, slash commands (/speckit.*) e estrutura de pastas',
      'Somente as dependências no package.json',
      'Apenas os testes unitários iniciais'
    ],
    correct: 1,
    explanation: '✅ Correto! O specify init baixa os templates do spec-kit, instala os slash commands (/speckit.*) e cria a estrutura de pastas do projeto. AGENTS.md não é gerado automaticamente.'  
  },
  {
    question: '6. Qual modo do GitHub Copilot cria um plano de implementação SEM modificar código?',
    options: [
      'Agent Mode',
      'Ask Mode',
      'Explore Mode',
      'Plan Mode'
    ],
    correct: 3,
    explanation: '✅ Correto! O Plan Mode (public preview) cria um plano detalhado para revisão humana antes de qualquer alteração no código — perfeito para o fluxo SDD.'
  },
  {
    question: '7. Quais modelos estão incluídos gratuitamente no plano Free do GitHub Copilot?',
    options: [
      'Claude Opus 4.6 e GPT-5.2',
      'GPT-4.1 e GPT-5 mini',
      'Gemini 3.1 Pro e Claude Sonnet 4.6',
      'Apenas modelos internos sem nome público'
    ],
    correct: 1,
    explanation: '✅ Correto! O plano Free inclui GPT-4.1 e GPT-5 mini sem custo de créditos. Claude Haiku 4.5 é premium com multiplicador de 0.33x.'
  },
  {
    question: '8. Para que serve o padrão agentskills.io adotado pelo GitHub Copilot em Dezembro/2025?',
    options: [
      'Definir schemas de banco de dados para agentes IA',
      'Padronizar diretórios com SKILL.md para carregar conhecimento especializado sob demanda',
      'Configurar pipelines de CI/CD automatizados com IA',
      'Criar extensões para o VS Code Marketplace'
    ],
    correct: 1,
    explanation: '✅ Correto! O agentskills.io define o padrão de diretórios com SKILL.md como entrypoint — habilidades que os agentes carregam sob demanda, implementando Progressive Disclosure na prática.'
  }
];

let qIndex    = 0;
let qScore    = 0;
let qAnswered = false;

function renderQuestion(i) {
  const q   = quizData[i];
  const letters = ['A', 'B', 'C', 'D'];

  const qEl      = document.querySelector('.quiz-question');
  const optEl    = document.querySelector('.quiz-options');
  const fbEl     = document.querySelector('.quiz-feedback');
  const scoreEl  = document.querySelector('.quiz-score');
  const btnNext  = document.querySelector('.quiz-btn-next');
  const btnFinish= document.querySelector('.quiz-btn-finish');

  if (!qEl) return;

  qAnswered = false;
  qEl.textContent = q.question;

  optEl.innerHTML = q.options.map((opt, idx) => `
    <li onclick="pickAnswer(${idx})" data-idx="${idx}">
      <span class="quiz-letter">${letters[idx]}</span>
      <span>${opt}</span>
    </li>
  `).join('');

  if (fbEl)     { fbEl.className = 'quiz-feedback'; fbEl.textContent = ''; }
  if (scoreEl)  { scoreEl.textContent = `Questão ${i + 1} de ${quizData.length}`; }
  if (btnNext)  { btnNext.style.display = i < quizData.length - 1 ? 'inline-block' : 'none'; }
  if (btnFinish){ btnFinish.style.display = i === quizData.length - 1 ? 'inline-block' : 'none'; }
}

function pickAnswer(selected) {
  if (qAnswered) return;
  qAnswered = true;

  const q    = quizData[qIndex];
  const opts = document.querySelectorAll('.quiz-options li');
  const fbEl = document.querySelector('.quiz-feedback');

  opts.forEach((li, i) => {
    if (i === q.correct) li.classList.add('correct');
    else if (i === selected) li.classList.add('wrong');
  });

  if (selected === q.correct) {
    qScore++;
    if (fbEl) { fbEl.className = 'quiz-feedback correct show'; fbEl.textContent = q.explanation; }
  } else {
    if (fbEl) { fbEl.className = 'quiz-feedback wrong show'; fbEl.textContent = '❌ Incorreto. ' + q.explanation; }
  }
}

function nextQuestion() {
  if (qIndex < quizData.length - 1) {
    qIndex++;
    renderQuestion(qIndex);
  }
}

function showFinalScore() {
  const wrapper = document.querySelector('.quiz-wrapper');
  if (!wrapper) return;

  const pct  = Math.round((qScore / quizData.length) * 100);
  const icon = qScore === quizData.length ? '🏆' : qScore >= 2 ? '🎯' : '📚';
  const msg  = qScore === quizData.length
    ? 'Perfeito! Você domina os conceitos de SDD! 🚀'
    : qScore >= 2
      ? 'Ótimo trabalho! Pratique mais com spec.md! 💪'
      : 'Continue estudando! SDD tem muito a oferecer! 📖';

  wrapper.innerHTML = `
    <div style="text-align:center; padding:1em;">
      <div style="font-size:3em; margin-bottom:0.3em;">${icon}</div>
      <h2 class="gradient-text" style="font-size:1.8em; margin-bottom:0.2em;">${qScore}/${quizData.length}</h2>
      <p style="color:var(--text-secondary); font-size:0.85em;">
        Você acertou <strong style="color:var(--accent-green)">${pct}%</strong> das questões!
      </p>
      <p style="color:var(--text-muted); font-size:0.72em; margin-top:0.5em;">${msg}</p>
      <button class="quiz-btn" style="margin-top:1.2em;" onclick="restartQuiz()">Tentar Novamente</button>
    </div>
  `;
}

function restartQuiz() {
  qIndex = 0; qScore = 0; qAnswered = false;

  const wrapper = document.querySelector('.quiz-wrapper');
  wrapper.innerHTML = `
    <div class="quiz-question"></div>
    <ul class="quiz-options"></ul>
    <div class="quiz-feedback"></div>
    <div class="quiz-nav">
      <span class="quiz-score"></span>
      <div style="display:flex; gap:0.5em;">
        <button class="quiz-btn quiz-btn-next"   onclick="nextQuestion()">Próxima →</button>
        <button class="quiz-btn quiz-btn-finish purple" onclick="showFinalScore()" style="display:none">Ver Resultado 🏆</button>
      </div>
    </div>
  `;
  renderQuestion(0);
}

/* ---------------------------------------------------------------------------
   4. Reveal.js — Initialize
   --------------------------------------------------------------------------- */
Reveal.initialize({
  hash:                true,
  slideNumber:         'c/t',
  touch:               true,
  transition:          'zoom',
  transitionSpeed:     'default',
  backgroundTransition:'fade',
  center:              true,
  width:               1200,
  height:              760,
  margin:              0.04,
  minScale:            0.18,
  maxScale:            2.0,
  navigationMode:      'linear',
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
  highlight: { highlightOnLoad: true }
});

/* ---------------------------------------------------------------------------
   5. Post-init: particles, mermaid, quiz
   --------------------------------------------------------------------------- */
Reveal.on('ready', () => {
  createStarfield();
  createParticles();
  createSectionCosmics();
  // Init Lucide professional icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
  // Wait for DM Sans to be available before running Mermaid — without this,
  // Mermaid measures text with the fallback font, creating undersized node boxes.
  const runMermaid = () => mermaid.run({ querySelector: '.mermaid' });
  if (document.fonts && document.fonts.load) {
    document.fonts.load('14px "DM Sans"').then(runMermaid).catch(runMermaid);
  } else {
    runMermaid();
  }
  renderQuestion(0);
});

// Re-run mermaid only for diagrams not yet rendered when navigating
Reveal.on('slidechanged', (event) => {
  const unrendered = event.currentSlide.querySelectorAll('.mermaid:not([data-processed])');
  if (unrendered.length) mermaid.run({ nodes: Array.from(unrendered) });
});
