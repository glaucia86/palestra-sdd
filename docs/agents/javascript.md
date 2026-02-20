# JavaScript — Reveal.js, Mermaid, Quiz e Animações

> Carregue este arquivo quando for modificar `js/custom.js` ou lógica de apresentação.

---

## Inicialização — ordem de execução

```
mermaid.initialize()        ← antes do Reveal
Reveal.initialize()         ← plugins: Markdown, Highlight, Notes
Reveal.on('ready', ...)     ← createStarfield, createParticles, createSectionCosmics, Lucide, Mermaid, Quiz
Reveal.on('slidechanged', .)← Mermaid lazy para nós ainda não processados
```

---

## Configuração do Reveal.js

```js
width: 1200, height: 760, margin: 0.04
minScale: 0.18, maxScale: 2.0
navigationMode: 'linear'
transition: 'zoom', backgroundTransition: 'fade'
hash: true, slideNumber: 'c/t', center: true
```

**Não altere `width`/`height` sem ajustar o CSS** — valores sincronizados com `.speaker-photo`,
`.hero-orb` e outras dimensões absolutas.

---

## Animações de Fundo

- `createStarfield()` injeta `.nebula` + `.starfield` na `.reveal-viewport` (camada global).
- `createParticles()` injeta partículas no `#particles` (slide `#capa`).
- `createSectionCosmics()` injeta cometas e micro-estrelas em cada `.section-page-container`.
- Essas funções rodam apenas em `Reveal.on('ready')`. Evite chamadas duplicadas.

## Quiz

### Estrutura de dados
```js
const quizData = [
  {
    question: '1. Pergunta?',
    options: ['A', 'B', 'C', 'D'],   // sempre 4 opções, letras A–D
    correct: 1,                        // índice 0-based da correta
    explanation: '✅ Correto! ...'    // exibido como feedback
  }
];
```

### Funções públicas
| Função            | Descrição                                 |
|-------------------|-------------------------------------------|
| `renderQuestion(i)` | Renderiza questão de índice `i`         |
| `pickAnswer(idx)` | Chamada pelo `onclick` das opções         |
| `nextQuestion()`  | Avança para próxima (chamada pelo botão)  |
| `showFinalScore()`| Exibe pontuação final                     |
| `restartQuiz()`   | Reinicia do zero                          |

**Estado**: `qIndex`, `qScore`, `qAnswered` — variáveis globais, não renomear.

---

## Mermaid

- `mermaid.initialize()` roda com `startOnLoad: false` — renderização é manual
- `mermaid.run({ querySelector: '.mermaid' })` renderiza todos de uma vez no `ready`
- Em `slidechanged`, renderiza somente diagramas sem `[data-processed]` para economia
- Tema configurado com variáveis que correspondem à paleta "Oceanic Precision"

---

## Lucide Icons

```js
if (typeof lucide !== 'undefined') lucide.createIcons();
```
Chamado uma vez no `ready`. Se adicionar ícones em elementos criados dinamicamente
(ex: `quizData`, funções JS), chame `lucide.createIcons()` novamente após injetar o HTML.

---

## Navegação auxiliar

- Existe um botão fixo global no `index.html`: `.back-to-summary-btn` (`href="#/sumario"`).
- Se alterar comportamento de navegação no JS, preserve esse atalho para retorno rápido ao sumário.
