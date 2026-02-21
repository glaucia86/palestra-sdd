# SKILL.md — reveal.js

## O que é esta skill?

Esta skill ensina como criar apresentações HTML com **reveal.js**, o framework open source de apresentações baseado em tecnologias web. Use esta skill sempre que precisar criar slides interativos, exportar apresentações para PDF, usar animações, Markdown, code highlighting ou speaker view.

---

## Quando usar esta skill

- Criar apresentações (`index.html`) usando reveal.js
- Adicionar slides horizontais e verticais
- Aplicar transições, temas, backgrounds e animações
- Usar Fragments para revelar conteúdo progressivamente
- Implementar Auto-Animate entre slides
- Configurar o `Reveal.initialize()` com opções avançadas
- Integrar syntax highlighting com highlight.js
- Preparar apresentações técnicas com código, LaTeX ou iframes

---

## Estrutura base obrigatória
````html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="dist/reveal.css" />
    <link rel="stylesheet" href="dist/theme/black.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
    <script src="dist/reveal.js"></script>
    <script>
      Reveal.initialize();
    </script>
  </body>
</html>
````

> A hierarquia mandatória é: `.reveal > .slides > section`

---

## Slides horizontais e verticais
````html
<div class="slides">
  <!-- Slide horizontal -->
  <section>Slide A</section>

  <!-- Slides verticais (stack) -->
  <section>
    <section>Topo do stack vertical</section>
    <section>Basement Level 1</section>
    <section>Basement Level 2</section>
  </section>

  <!-- Próximo slide horizontal -->
  <section>Slide B</section>
</div>
````

> O primeiro `<section>` de um stack vertical é o "root" e aparece na sequência horizontal.

---

## Markdown nos slides
````html
<section data-markdown>
  <textarea data-template>
    ## Título do Slide

    - Item 1
    - Item 2
```typescript
    const greet = (name: string): string => `Hello, ${name}!`;
```
  </textarea>
</section>
````

Ou via arquivo externo:
````html
<section
  data-markdown="slides.md"
  data-separator="^\n---\n"
  data-separator-vertical="^\n--\n"
></section>
````

---

## Temas disponíveis

Troque o CSS do tema em `dist/theme/`:

| Tema       | Arquivo                  |
|------------|--------------------------|
| Black      | `theme/black.css`        |
| White      | `theme/white.css`        |
| League     | `theme/league.css`       |
| Beige      | `theme/beige.css`        |
| Sky        | `theme/sky.css`          |
| Night      | `theme/night.css`        |
| Serif      | `theme/serif.css`        |
| Simple     | `theme/simple.css`       |
| Solarized  | `theme/solarized.css`    |
| Moon       | `theme/moon.css`         |
| Dracula    | `theme/dracula.css`      |

---

## Backgrounds
````html
<!-- Cor sólida -->
<section data-background="#3498db">Fundo azul</section>

<!-- Imagem -->
<section data-background="assets/image.png">Imagem de fundo</section>

<!-- Imagem em tile -->
<section
  data-background="assets/pattern.png"
  data-background-repeat="repeat"
  data-background-size="100px"
></section>

<!-- Vídeo -->
<section
  data-background-video="assets/video.mp4,assets/video.webm"
  data-background-video-loop
  data-background-opacity="0.4"
></section>

<!-- Iframe -->
<section data-background-iframe="https://example.com" data-background-opacity="0.2">
  Conteúdo sobre o iframe
</section>
````

---

## Transições
````html
<!-- Por slide -->
<section data-transition="zoom">Zoom neste slide</section>
<section data-transition="fade">Fade neste slide</section>
````

Opções: `none` | `fade` | `slide` | `convex` | `concave` | `zoom`

Ou globalmente via config:
````js
Reveal.initialize({
  transition: 'slide',
  transitionSpeed: 'default', // default | fast | slow
  backgroundTransition: 'fade',
});
````

---

## Fragments (revelação progressiva)
````html
<section>
  <p class="fragment">Aparece primeiro</p>
  <p class="fragment fade-out">Aparece e desaparece</p>
  <p class="fragment highlight-red">Fica vermelho</p>
  <p class="fragment fade-in-then-out">Entra e sai</p>
  <p class="fragment fade-up">Sobe enquanto aparece</p>
</section>
````

**Classes disponíveis:** `fade-out`, `fade-right`, `fade-left`, `fade-up`, `fade-down`, `fade-in-then-out`, `fade-in-then-semi-out`, `highlight-red`, `highlight-green`, `highlight-blue`, `grow`, `shrink`

**Ordem customizada:**
````html
<ul>
  <li class="fragment" data-fragment-index="2">Aparece por último</li>
  <li class="fragment" data-fragment-index="1">Aparece primeiro</li>
</ul>
````

**Fragment customizado com CSS:**
````html
<style>
  .fragment.blur { filter: blur(5px); }
  .fragment.blur.visible { filter: none; }
</style>
<p class="fragment custom blur">Desfocado até ser revelado</p>
````

---

## Auto-Animate

Adicione `data-auto-animate` em dois slides adjacentes. Elementos com o mesmo `data-id` serão animados automaticamente entre eles.
````html
<section data-auto-animate>
  <h2 data-id="titulo">Título pequeno</h2>
</section>

<section data-auto-animate>
  <h2 data-id="titulo" style="font-size: 3em">Título grande</h2>
  <p>Novo conteúdo aparece suavemente</p>
</section>
````

Configurações de Auto-Animate:
````js
Reveal.initialize({
  autoAnimateEasing: 'ease',
  autoAnimateDuration: 1.0,
  autoAnimateUnmatched: true,
});
````

---

## Syntax Highlighting (highlight.js)

````html
<section>
  <pre><code data-trim data-noescape class="typescript">
    const fetchWeather = async (city: string): Promise<WeatherData> => {
      const response = await fetch(`/api/weather?city=${city}`);
      return response.json();
    };
  </code></pre>
</section>
````

> Use `data-trim` para remover espaços em branco extras e `data-noescape` quando usar `<mark>` para highlight de linhas.

**Highlight de linhas específicas:**
````html
<pre><code data-trim data-line-numbers="1|3-4">
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class AppService {}
</code></pre>
````

---

## Speaker Notes
````html
<section>
  <h2>Slide visível</h2>
  <aside class="notes">
    Estas notas aparecem apenas no Speaker View (pressione S).
  </aside>
</section>
````

Acesse o Speaker View pressionando **`S`** durante a apresentação.

---

## Layout utilitário
````html
<!-- Texto que ocupa todo o espaço disponível -->
<h2 class="r-fit-text">FIT TEXT</h2>

<!-- Stack de elementos sobrepostos (ideal com fragments) -->
<div class="r-stack">
  <img src="img1.png" class="fragment" />
  <img src="img2.png" class="fragment" />
</div>

<!-- Centralização vertical do slide -->
<section class="center">Conteúdo centralizado</section>
````

---

## Configuração completa do Reveal.initialize()
````js
Reveal.initialize({
  // Interface
  controls: true,
  progress: true,
  slideNumber: false,          // false | true | 'c/t' | 'h/v'
  center: true,
  overview: true,

  // Navegação
  keyboard: true,
  touch: true,
  loop: false,
  rtl: false,
  navigationMode: 'default',   // default | linear | grid
  shuffle: false,
  mouseWheel: false,

  // Fragments
  fragments: true,
  fragmentInURL: true,

  // Auto-Slide
  autoSlide: 0,                // ms entre slides (0 = desabilitado)
  autoSlideStoppable: true,

  // Transições
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',

  // Tamanho
  width: 960,
  height: 700,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,

  // Outros
  help: true,
  pause: true,
  showNotes: false,
  previewLinks: false,

  // Auto-Animate
  autoAnimateEasing: 'ease',
  autoAnimateDuration: 1.0,
  autoAnimateUnmatched: true,

  // Plugins
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath],
});
````

---

## Plugins built-in
````js
import RevealMarkdown from 'plugin/markdown/markdown.js';
import RevealHighlight from 'plugin/highlight/highlight.js';
import RevealNotes from 'plugin/notes/notes.js';
import RevealMath from 'plugin/math/math.js';
import RevealSearch from 'plugin/search/search.js';
import RevealZoom from 'plugin/zoom/zoom.js';

Reveal.initialize({
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath, RevealSearch, RevealZoom],
});
````

---

## API JavaScript
````js
// Navegação programática
Reveal.next();
Reveal.prev();
Reveal.slide(indexH, indexV, fragmentIndex);

// Estado atual
const { h, v, f } = Reveal.getState();

// Configuração em runtime
Reveal.configure({ transition: 'zoom' });

// Eventos
Reveal.on('slidechanged', (event) => {
  console.log(event.currentSlide, event.previousSlide);
});

Reveal.on('fragmentshown', (event) => {
  console.log(event.fragment);
});

// Auto-slide
Reveal.configure({ autoSlide: 5000 }); // iniciar
Reveal.configure({ autoSlide: 0 });    // parar
````

---

## Atalhos de teclado

| Tecla        | Ação                          |
|--------------|-------------------------------|
| `→` / `Space`| Próximo slide                 |
| `←`          | Slide anterior                |
| `↑` / `↓`   | Slides verticais              |
| `S`          | Speaker View                  |
| `F`          | Fullscreen                    |
| `ESC` / `O`  | Overview (mapa de slides)     |
| `B` / `.`    | Pausar (blackout)             |
| `?`          | Help overlay                  |

---

## Exportar para PDF

Adicione `?print-pdf` na URL antes de imprimir:
````
http://localhost:8080/index.html?print-pdf
````

Use `Ctrl+P` (ou `Cmd+P`) no Chrome e escolha "Salvar como PDF". Configure no `Reveal.initialize()`:
````js
pdfMaxPagesPerSlide: 1,
pdfSeparateFragments: true,
````

---

## State global por slide
````html
<section data-state="meu-estado">Slide com estado especial</section>

<script>
  Reveal.on('meu-estado', () => {
    document.body.classList.add('tema-especial');
  });
</script>
````

---

## Boas práticas

- Sempre use `data-trim` em blocos `<code>` para manter o HTML limpo
- Prefira `data-auto-animate` com `data-id` explícito para transições previsíveis
- Use slides verticais para sub-tópicos, mantendo o fluxo horizontal para o conteúdo principal
- Para apresentações técnicas, combine `RevealHighlight` + `data-line-numbers` para guiar o audience pelo código
- Exporte para PDF sempre via Chrome com `?print-pdf` para resultado consistente
- Use `Reveal.on('slidechanged')` para integrar analytics ou comportamentos dinâmicos

---

## Referências

- Documentação oficial: [https://revealjs.com](https://revealjs.com)
- GitHub: [https://github.com/hakimel/reveal.js](https://github.com/hakimel/reveal.js)
- Editor visual online: [https://slides.com](https://slides.com)