# Spec-Driven Development com GitHub Copilot

<p align="center">
  <strong>Apresentação web interativa (Reveal.js)</strong><br />
  por <strong>Glaucia Lemos</strong> · <a href="https://x.com/glaucia_lemos86">@glaucia_lemos86</a>
</p>

<p align="center">
  <img src="./resources/images/palestra-banner.png" alt="Banner da palestra Spec-Driven Development com GitHub Copilot" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Reveal.js-5.1.0-111827?style=for-the-badge&logo=reveal.js" alt="Reveal.js" />
  <img src="https://img.shields.io/badge/Mermaid-11.x-0f172a?style=for-the-badge&logo=mermaid" alt="Mermaid" />
  <img src="https://img.shields.io/badge/JavaScript-ESM-f59e0b?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript ESM" />
  <img src="https://img.shields.io/badge/live--server-1.2.2-0b1220?style=for-the-badge&logo=nodedotjs" alt="live-server" />
  <img src="https://img.shields.io/badge/Lucide-Icons-0b1220?style=for-the-badge" alt="Lucide" />
</p>

---

## Sobre

Palestra técnica sobre **Spec-Driven Development (SDD)** com **GitHub Copilot**, cobrindo:
- fundamentos de SDD;
- uso de `spec-kit`;
- modos e capacidades do Copilot;
- arquitetura de contexto com `AGENTS.md`, Rules e Skills;
- Progressive Disclosure;
- referências, conclusão e quiz interativo.

> Projeto sem build step: roda direto no navegador com servidor local.
> O conteúdo dos slides fica em `slides/parts/*.html` e é carregado dinamicamente via `slides/manifest.json`.

---

## Como executar

### Pré-requisitos
- Node.js 18+
- npm

### Desenvolvimento local
```bash
npm install
npm run start
```

Abra: `http://127.0.0.1:3000/index.html`

Observação:
- o servidor local usa middleware de **no-cache** para reduzir problemas de atualização durante edição.

---

## Estrutura do projeto

```text
palestra-sdd/
├── index.html
├── slides/
│   ├── manifest.json
│   └── parts/
│       ├── 01-intro-sdd.html
│       ├── 02-spec-kit.html
│       ├── 03-copilot.html
│       ├── 04-context-progressive.html
│       └── 05-refs-end.html
├── css/
│   └── custom.css
├── js/
│   └── app/
│       ├── init.js
│       ├── bootstrap.js
│       ├── config/
│       │   ├── mermaid-config.js
│       │   └── reveal-config.js
│       ├── features/
│       │   ├── starfield.js
│       │   ├── particles.js
│       │   ├── section-cosmos.js
│       │   └── special-backgrounds.js
│       └── quiz/
│           ├── data.js
│           └── controller.js
├── server/
│   ├── dev-server.js
│   └── no-cache-middleware.js
├── docs/
│   ├── agents/
│   └── architecture-js.md
└── resources/
    └── images/
```

Observações:
- `index.html` carrega `slides/manifest.json`.
- O manifesto define os arquivos em `slides/parts/` e o app concatena os blocos antes do `Reveal.initialize(...)`.

---

## Seções da palestra

1. Capa
2. Sumário interativo
3. Seção 01 · O que é SDD?
4. Seção 02 · spec-kit
5. Seção 03 · GitHub Copilot
6. Seção 04 · Arquitetura de Contexto
7. Seção 05 · Progressive Disclosure
8. Referências
9. Conclusão
10. Quiz
11. Sobre a palestrante
12. The End

---

## Stack e recursos

- **Slides:** Reveal.js 5.1 (CDN)
- **Diagramas:** Mermaid 11 (CDN)
- **Ícones:** Lucide (CDN)
- **Tipografia:** Google Fonts (Bebas Neue, Exo 2, DM Sans, JetBrains Mono)
- **Estilo:** Design system próprio em `css/custom.css`
- **Interatividade:** quiz, starfield, particles e efeitos de background por slide

---

## Arquitetura JavaScript

A lógica foi refatorada em módulos por responsabilidade (clean by feature):
- `config`: setup de Mermaid e Reveal;
- `features`: efeitos visuais e backgrounds especiais;
- `quiz`: dados e controller;
- `bootstrap`: orquestração da inicialização.

Detalhes: `docs/architecture-js.md`.

---

## Navegação durante a apresentação

- `→` / `Espaço`: próximo slide
- `←`: slide anterior
- `↓` / `↑`: sub-slides verticais
- `Esc`: visão geral
- `F`: tela cheia
- `S`: speaker notes

---

## Créditos

- **Autora:** Glaucia Lemos
- **GitHub:** https://github.com/glaucia86
- **LinkedIn:** https://www.linkedin.com/in/glaucialemos/
- **YouTube:** https://www.youtube.com/@GlauciaLemos

---

## Licença

MIT
