# Content — Estrutura dos Slides

> Carregue este arquivo quando for adicionar, editar ou reorganizar slides em `index.html`.

---

## Anatomia de um Slide Simples

```html
<section id="meu-slide">
  <!-- 1. Cabeçalho de seção -->
  <div class="section-header">
    <span class="section-icon"><i data-lucide="nome-icone"></i></span>
    <span class="section-label">XX / Nome da Seção</span>
  </div>

  <!-- 2. Título principal -->
  <h2>Título do <span class="accent">Slide</span></h2>

  <!-- 3. Corpo -->
  <!-- ... conteúdo ... -->
</section>
```

---

## Grupo Vertical (sub-slides com ↓)

```html
<!-- Slide de transição de seção (sem ID) -->
<section data-background-color="#04091b">
  <div class="section-page-container">
    <div class="section-page-label">Seção XX</div>
    <h2 class="section-page-title gradient-text">Nome</h2>
    <p class="section-page-desc">Subtítulo</p>
    <div class="section-page-icon"><i data-lucide="target"></i></div>
  </div>
</section>

<!-- Grupo vertical -->
<section id="meu-grupo">
  <section> <!-- sub-slide 1 -->
    ...
    <p style="font-size:0.5em; color:var(--text-muted); text-align:center;">
      ↓ pressione ↓ para continuar nesta seção
    </p>
  </section>
  <section> <!-- sub-slide 2 --> ... </section>
</section>
```

---

## Slides com ID Especial (não alterar)

| ID          | Função                                  |
|-------------|-----------------------------------------|
| `#capa`     | Entrada principal + `#particles`        |
| `#sumario`  | Destino do botão fixo de retorno        |
| `#quiz`     | Referenciado pelo JS do quiz            |
| `#sobre-mim`| Slide de bio com layout dedicado        |
| `#the-end`  | Slide final com layout dedicado         |

---

## Componentes de Conteúdo — Referência Rápida

### Definição estilizada
```html
<div class="definition">
  <p>Texto em itálico com aspas decorativas.</p>
</div>
```

### Tabela comparativa
```html
<table>
  <thead><tr><th>Coluna A</th><th>Coluna B</th></tr></thead>
  <tbody>
    <tr><td>...</td><td>...</td></tr>
  </tbody>
</table>
```

### Lista com ícone
```html
<ul class="icon-list">
  <li>
    <span class="icon"><i data-lucide="check"></i></span>
    <div><strong>Título</strong><br/><span class="text-muted">Descrição</span></div>
  </li>
</ul>
```

### Checklist DO/DON'T
```html
<ul class="checklist">
  <li class="check">Item correto</li>
  <li class="cross">Item incorreto</li>
</ul>
```

### Bloco de código com `pre`
```html
<pre><code class="language-bash">comando aqui</code></pre>
```
Linguagens suportadas pelo Monokai: `bash`, `javascript`, `typescript`,
`markdown`, `text`, `python`, `json`.

---

## Tamanhos de Fonte — Convenções

| Uso                        | Tamanho sugerido |
|----------------------------|-----------------|
| Texto de cards/listas      | `0.72em–0.82em` |
| Código dentro de card       | `0.68em–0.72em` |
| Highlight box              | `0.75em–0.82em` |
| Rodapé de navegação (↓)    | `0.5em`         |
| Section label              | `0.52em`        |

---

## Fragmentos (animações de entrada)

```html
<div class="fragment">aparece com avanço</div>
<div class="card fragment">card que aparece</div>
<li class="fragment">item de lista que aparece</li>
```
Reveal.js controla a ordem. Cada `fragment` = 1 pressão de tecla.

---

## Assets Disponíveis

| Arquivo                          | Uso                       |
|----------------------------------|---------------------------|
| `resources/images/foto_perfil.png`      | Foto da palestrante       |
| `resources/images/github-copilot-icon.png` | Ícone usado no bloco dedicado ao GitHub Copilot |
| `resources/images/codex-color.png` | Logo usado na capa da ferramenta Codex |
| `resources/images/harness-engineering-five-subsystems.png` | Diagrama dos cinco subsistemas de Harness Engineering no deck pt-BR |

> A experiência final usa `resources/sounds/star-wars-final-song.mp3` somente após ação explícita
> no botão do slide `#the-end`. `resources/sounds/lightsaber-sound.mp3` pertence ao easter egg da demo.
> A lógica fica em `src-ts/app/features/the-end-experience.ts` e `demo-experience.ts`.
