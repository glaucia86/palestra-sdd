# AGENTS.md

> **Progressive Disclosure** — este arquivo é intencionalmente enxuto. Instruções especializadas
> ficam em `docs/agents/` e devem ser carregadas apenas quando necessário.

---

## Projeto

Apresentação web interativa sobre **Spec-Driven Development (SDD) com GitHub Copilot**,
construída com Reveal.js. Roda no navegador, sem build step. Pública via `npm run start`
(live-server na porta 3000, abrindo `index.html`).

**Autora:** Glaucia Lemos — @glaucia_lemos86

---

## Stack

| Camada     | Tecnologia                                  |
|------------|---------------------------------------------|
| Slides     | Reveal.js 5.1 (CDN)                         |
| Estilos    | `css/custom.css` — design system próprio    |
| Lógica     | `js/custom.js` — quiz, Mermaid, starfield, particles e section-cosmos |
| Diagramas  | Mermaid 11 (CDN)                            |
| Ícones     | Lucide (CDN, `lucide.createIcons()`)        |
| Assets     | `resources/images/`                          |

---

## Regras Essenciais

### ✅ Sempre fazer
- Use as classes do design system existente — `card`, `highlight-box`, `two-cols`, `tag`, etc.
- Mantenha `font-size` em `em` relativo (não `px`) nos slides para escalar com Reveal.js.
- Use variáveis CSS definidas em `:root` (`var(--accent-green)`, `var(--bg-card)`, etc.).
- Ícones sempre via `<i data-lucide="nome"></i>` — nunca SVG inline ou emoji substituindo ícone.
- Ao adicionar slides, siga o padrão de `.section-header` + `<h2>` existente.
- Preserve a ordem de inicialização em `custom.js`: Mermaid -> Reveal -> `ready` (`createStarfield`, `createParticles`, `createSectionCosmics`, Lucide, Mermaid, Quiz) -> `slidechanged`.

### ❌ Nunca fazer
- Não adicione dependências externas novas sem aprovação explícita.
- Não use `px` fixo em tamanhos de fonte nos slides.
- Não quebre a estrutura `<div class="reveal"><div class="slides">...</div></div>`.
- Não remova `id` de slides referenciados por navegação/lógica (`#capa`, `#sumario`, `#quiz`, `#sobre-mim`, `#the-end`).
- Não edite `node_modules/` nem arquivos de CDN.

---

## Contexto Especializado — carregar sob demanda

| Quando trabalhar com…      | Carregar este arquivo              |
|----------------------------|------------------------------------|
| CSS, design system, layout | `docs/agents/styling.md`           |
| JavaScript, Reveal.js, Mermaid, quiz e animações | `docs/agents/javascript.md` |
| Estrutura e conteúdo dos slides | `docs/agents/content.md`      |
| Skill de design frontend do repositório | `.github/skills/frontend-design/SKILL.md` |

---

## Limites do Agente

- Não altere o tema de cores (paleta "Oceanic Precision") sem o OK da autora.
- Não modifique arquivos em `resources/images/` — assets finais aprovados.
- Qualquer novo slide deve ser revisado pela autora antes de ir para produção.
