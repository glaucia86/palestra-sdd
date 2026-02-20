# Styling — Design System

> Carregue este arquivo quando for modificar `css/custom.css` ou qualquer aspecto visual.

---

## Paleta "Oceanic Precision"

```css
--bg-primary:    #04091b   /* fundo principal (quase preto) */
--bg-secondary:  #09102a   /* fundo secundário */
--bg-card:       rgba(9,16,42,0.92)

--accent-green:  #00ddb3   /* PRIMARY — teal bioluminescente */
--accent-blue:   #38c8fa   /* links, info */
--accent-purple: #9277ff   /* Copilot violet */
--accent-orange: #ff7849   /* destaque quente */
--accent-red:    #ff5c7a   /* erros */
--accent-gold:   #ffcd47   /* ouro */

--accent-copilot:       #7c5cfc
--accent-copilot-light: #b8a4ff
```

---

## Componentes do Design System

### Cards
```html
<div class="card">               <!-- borda verde, hover sobe 4px -->
<div class="card-grid-2">        <!-- 2 colunas -->
<div class="card-grid-3">        <!-- 3 colunas -->
<span class="card-icon">         <!-- ícone grande em cima do h3 -->
```
- `card h3` herda `color: var(--accent-blue)` por padrão (sobrescreva com `.text-green` etc.)
- Borda customizada: `style="border-color: var(--accent-purple)"` inline no card

### Highlight Boxes
```html
<div class="highlight-box">          <!-- verde (padrão) -->
<div class="highlight-box blue">     <!-- azul -->
<div class="highlight-box purple">   <!-- violeta -->
<div class="highlight-box orange">   <!-- laranja -->
```

### Tags / Badges
```html
<span class="tag">           <!-- verde (padrão) -->
<span class="tag blue">
<span class="tag purple">
<span class="tag orange">
<span class="tag red">
```

### Layouts
```html
<div class="two-cols">       <!-- 1fr 1fr -->
<div class="two-cols-60">    <!-- 60% 40% -->
<div class="two-cols-65">    <!-- 65% 35% -->
<div class="card-grid-2">    <!-- 2 colunas iguais -->
<div class="card-grid-3">    <!-- 3 colunas iguais -->
```

### Tipografia utilitária
```html
<span class="gradient-text">        <!-- gradiente teal→azul -->
<span class="gradient-text-purple"> <!-- gradiente violeta→azul -->
<span class="text-green">           <!-- cor sólida -->
<span class="text-blue">
<span class="text-muted">
<span class="accent">               <!-- dentro de h2 — aplica gradient-text -->
```

### Estruturas de seção e navegação
```html
<div class="section-page-container"> <!-- slide de abertura de seção -->
<a class="back-to-summary-btn" href="#/sumario">...</a> <!-- botão fixo global -->
```

---

## Regras CSS Críticas

- **Fontes em slides**: sempre `em`, nunca `px`. Base = 1.55rem no `.reveal`.
- **Gradientes de texto**: sempre par `background-clip: text` + `-webkit-background-clip: text`.
- **Ícones Lucide**: dimensionados via `.section-icon svg.lucide`, `.card-icon svg.lucide` etc. —
  não adicione `width/height` inline em `<i data-lucide>`.
- **`!important`**: no projeto atual ele aparece em overrides de Reveal e hotfixes (`#sobre-mim`, `#the-end`).
  Evite adicionar novos `!important` fora desses cenários.
- **`.nebula` / `.starfield`**: sempre `pointer-events: none` — nunca remover ou os controles ficam bloqueados.
- **`.section-cosmos` / `.comet` / `.sp-star`**: manter `pointer-events: none` e camadas abaixo do conteúdo.
- **Botão fixo de sumário**: manter acima do conteúdo sem bloquear controles do Reveal.
- **Controles Reveal**: `.reveal .controls` tem `z-index: 100` — nunca coloque elementos com z-index ≥ 100 sem `pointer-events: none`.
- **Reveal viewport**: `height: 760px`, `width: 1200px`. Conteúdo que exceder é cortado.

---

## Adicionando Novas Variáveis

1. Declare sempre em `:root` no topo de `custom.css`.
2. Use convenção `--categoria-nome` (ex: `--accent-gold`, `--shadow-card`).
3. Documente aqui se for reutilizável.
