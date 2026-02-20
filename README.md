# Spec-Driven Development com GitHub Copilot

<p align="center">
  <strong>Apresentacao web interativa sobre SDD (Spec-Driven Development) com foco em contexto, previsibilidade e fluxo com AI Coding Agents.</strong>
</p>

<p align="center">
  <a href="https://glaucia86.github.io/palestra-sdd/"><strong>Ver apresentacao online</strong></a>
  ·
  <a href="#-rodando-localmente">Rodar localmente</a>
  ·
  <a href="#-estrutura-do-projeto">Estrutura</a>
</p>

<p align="center">
  <img src="./resources/images/palestra-banner.png" alt="Banner da palestra Spec-Driven Development com GitHub Copilot" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Reveal.js-5.1.0-0f172a?style=for-the-badge&logo=reveal.js" alt="Reveal.js" />
  <img src="https://img.shields.io/badge/Mermaid-11.x-111827?style=for-the-badge&logo=mermaid" alt="Mermaid" />
  <img src="https://img.shields.io/badge/JavaScript-ESM-f59e0b?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript ESM" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deploy-0b1220?style=for-the-badge&logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="MIT" />
</p>

---

## Visao Geral

Este repositorio contem a apresentacao da **Glaucia Lemos** sobre **Spec-Driven Development (SDD) com GitHub Copilot**.

A experiencia foi desenvolvida como slides web com Reveal.js, sem build step, com:

- carregamento dinamico de secoes (`slides/manifest.json` + `slides/parts/*.html`);
- design system proprio em `css/custom.css`;
- app JS modular em `js/app/*`;
- recursos interativos como quiz, Mermaid, starfield, particles e backgrounds especiais.

---

## Sumario

- [Objetivos da palestra](#-objetivos-da-palestra)
- [Stack tecnica](#-stack-tecnica)
- [Arquitetura da aplicacao](#-arquitetura-da-aplicacao)
- [Rodando localmente](#-rodando-localmente)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Deploy](#-deploy)
- [Navegacao durante a apresentacao](#-navegacao-durante-a-apresentacao)
- [Autora](#-autora)
- [Licenca](#-licenca)

---

## Objetivos da palestra

A apresentacao cobre de forma pratica:

- fundamentos de **Spec-Driven Development**;
- uso de **spec-kit** no fluxo de desenvolvimento;
- GitHub Copilot Agent Mode e qualidade de contexto;
- arquitetura de contexto com `PRD.md`, `AGENTS.md`, Rules e Skills;
- estrategia de **Progressive Disclosure** para reduzir ruido;
- demo com elementos visuais e interativos;
- quiz final com consolidacao dos conceitos.

---

## Stack tecnica

- **Slides:** Reveal.js 5.1 (CDN)
- **Diagramas:** Mermaid 11 (CDN)
- **Icones:** Lucide (CDN)
- **Estilos:** `css/custom.css`
- **Aplicacao JS:** ESM modular em `js/app/*`
- **Servidor local:** `live-server` via `server/dev-server.js`
- **Publicacao:** GitHub Pages via GitHub Actions

---

## Arquitetura da aplicacao

A pagina principal (`index.html`) inicia uma estrutura simples:

1. carrega estilos e bibliotecas CDN (Reveal, Mermaid, Lucide);
2. inicializa o app em `js/app/init.js`;
3. carrega os arquivos definidos em `slides/manifest.json`;
4. injeta os blocos de `slides/parts/*.html` dentro de `.reveal .slides`;
5. executa bootstrap de recursos visuais, quiz e hooks de evento do Reveal.

Esse desenho permite evoluir conteudo e features sem acoplamento forte entre slides e runtime.

---

## Rodando localmente

### Pre-requisitos

- Node.js 18+
- npm

### Instalacao

```bash
npm install
```

### Execucao

```bash
npm run start
```

A aplicacao sobe na porta `3000` e abre `index.html` automaticamente.

- URL local: `http://127.0.0.1:3000/index.html`
- sem abrir navegador automaticamente:

```bash
npm run start -- --no-browser
```

---

## Estrutura do projeto

```text
palestra-sdd/
|- index.html
|- README.md
|- AGENTS.md
|- css/
|  |- custom.css
|- js/
|  |- app/
|     |- init.js
|     |- bootstrap.js
|     |- config/
|     |- features/
|     |- quiz/
|- slides/
|  |- manifest.json
|  |- parts/
|- resources/
|  |- images/
|  |- sounds/
|- server/
|  |- dev-server.js
|  |- no-cache-middleware.js
|- docs/
|  |- PRD.md
|  |- architecture-js.md
|  |- prompt.md
```

---

## Deploy

O deploy para GitHub Pages e automatico via workflow:

- arquivo: `.github/workflows/deploy-pages.yml`
- gatilho: push para branch `main`
- URL publicada: `https://glaucia86.github.io/palestra-sdd/`

---

## Navegacao durante a apresentacao

- `->` / `Espaco`: proximo slide
- `<-`: slide anterior
- `setas vertical`: navegar sub-slides
- `Esc`: visao geral
- `F`: tela cheia
- `S`: speaker notes

---

## Autora

**Glaucia Lemos**

- GitHub: https://github.com/glaucia86
- X/Twitter: https://x.com/glaucia_lemos86
- LinkedIn: https://www.linkedin.com/in/glaucialemos/
- YouTube: https://www.youtube.com/@GlauciaLemos

---

## Licenca

Este projeto esta sob a licenca **MIT**. Veja `LICENSE` para detalhes.
