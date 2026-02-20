# Spec-Driven Development com GitHub Copilot

<p align="center">
  <strong>Uma palestra interativa sobre como transformar specs em software previsível com IA.</strong><br />
  por <strong>Glaucia Lemos</strong> · <a href="https://x.com/glaucia_lemos86">@glaucia_lemos86</a>
</p>

<p align="center">
  <a href="https://glaucia86.github.io/palestra-sdd/"><strong>▶ Ver apresentação online (GitHub Pages)</strong></a>
</p>

<p align="center">
  <img src="./resources/images/palestra-banner.png" alt="Banner da palestra Spec-Driven Development com GitHub Copilot" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Reveal.js-5.1.0-111827?style=for-the-badge&logo=reveal.js" alt="Reveal.js" />
  <img src="https://img.shields.io/badge/Mermaid-11.x-0f172a?style=for-the-badge&logo=mermaid" alt="Mermaid" />
  <img src="https://img.shields.io/badge/JavaScript-ESM-f59e0b?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript ESM" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live-0b1220?style=for-the-badge&logo=github" alt="GitHub Pages" />
</p>

---

## O que você vai encontrar aqui

Esta apresentação cobre, de forma prática:

- fundamentos de **Spec-Driven Development (SDD)**;
- uso de **spec-kit** no fluxo de desenvolvimento;
- **GitHub Copilot** (modos, capacidades e boas práticas);
- arquitetura de contexto com `PRD.md`, `AGENTS.md`, Rules e Skills;
- **Progressive Disclosure** para reduzir ruído e custo de contexto;
- seção de **Demo** com efeitos interativos;
- quiz final e referências para aprofundamento.

> Projeto sem build step: roda direto no navegador.

---

## Rodando localmente

### Pré-requisitos
- Node.js 18+
- npm

### Start
```bash
npm install
npm run start
```

Abra em: `http://127.0.0.1:3000/index.html`

---

## Estrutura rápida do projeto

```text
palestra-sdd/
├── index.html
├── slides/
│   ├── manifest.json
│   └── parts/
├── css/
│   └── custom.css
├── js/
│   └── app/
│       ├── init.js
│       ├── bootstrap.js
│       ├── config/
│       ├── features/
│       └── quiz/
├── resources/
│   ├── images/
│   └── sounds/
└── server/
```

Como funciona:
- `index.html` aponta para `slides/manifest.json`;
- o app carrega `slides/parts/*.html` dinamicamente antes do `Reveal.initialize(...)`.

---

## Stack

- **Slides:** Reveal.js 5.1 (CDN)
- **Diagramas:** Mermaid 11 (CDN)
- **Ícones:** Lucide (CDN)
- **Estilos:** design system em `css/custom.css`
- **Lógica:** ESM modular em `js/app/*`
- **Publicação:** GitHub Pages via GitHub Actions

---

## Publicação (GitHub Pages)

Este repositório já está preparado para deploy automático com GitHub Actions.

- Workflow: `.github/workflows/deploy-pages.yml`
- URL de produção: `https://glaucia86.github.io/palestra-sdd/`

Basta fazer push na `main`.

---

## Navegação durante a palestra

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
