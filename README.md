# 🎤 Spec-Driven Development com AI Coding Agents

<p align="center">
  <img src="./resources/images/palestra-banner.png" alt="Banner da palestra Spec-Driven Development com AI Coding Agents" />
</p>

<p align="center">
  <strong>Apresentação web interativa sobre SDD (Spec-Driven Development) com foco em contexto, previsibilidade e fluxo com AI Coding Agents.</strong>
</p>

<p align="center">
  <a href="https://glaucia86.github.io/palestra-sdd/"><strong>🌐 Ver apresentação online</strong></a>
  ·
  <a href="#-quick-start">🚀 Quick Start</a>
  ·
  <a href="#-estrutura-do-projeto">📁 Estrutura</a>
  ·
  <a href="#-autora">👩‍💻 Autora</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Reveal.js-5.1.0-0f172a?style=for-the-badge&logo=reveal.js" alt="Reveal.js" />
  <img src="https://img.shields.io/badge/Mermaid-11.x-111827?style=for-the-badge&logo=mermaid" alt="Mermaid" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-0f172a?style=for-the-badge&logo=typescript" alt="TypeScript 5.x" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deploy-0b1220?style=for-the-badge&logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="MIT" />
  <img src="https://img.shields.io/github/last-commit/glaucia86/palestra-sdd?style=for-the-badge&color=0ea5e9" alt="Last Commit" />
</p>

---

## 📖 Visão Geral

Este repositório contém a apresentação da **Glaucia Lemos** sobre **Spec-Driven Development (SDD) com AI Coding Agents**, edição de **julho de 2026**.

A experiência foi desenvolvida como slides web localizados com Reveal.js e runtime ESM gerado de TypeScript, com:

- 🔄 **Carregamento localizado** de seções em PT-BR, EN-US e ES-ES (`slides/manifest.<locale>.json` + `slides/parts/<locale>/*.html`);
- 🎨 **Design system** próprio em `css/custom.css`;
- 🧩 **App JS modular** em `js/app/*`;
- ✨ **Recursos interativos** como quiz localizado, Mermaid, starfield, particles, demo e trilha final opt-in.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Slides Interativos
- **Reveal.js 5.1** — Framework moderno de apresentações
- **Navegação Intuitiva** — Suporte a slides verticais e horizontais
- **Speaker Notes** — Notas para o palestrante

</td>
<td width="50%">

### 🎨 Recursos Visuais
- **Diagramas Mermaid** — Diagramas técnicos interativos
- **Ícones Lucide** — Biblioteca de ícones moderna
- **Animações** — Starfield, particles e backgrounds especiais

</td>
</tr>
<tr>
<td width="50%">

### 🧪 Elementos Interativos
- **Quiz Interativo** — Consolidação de conceitos
- **Carregamento Localizado** — Partes carregadas por manifest, com fallback PT-BR
- **Design System** — Estilos customizados e consistentes

</td>
<td width="50%">

### 🚀 Experiência do Desenvolvedor
- **TypeScript incremental** — Migração segura com saída ESM para browser
- **Runtime sem bundler** — Arquivos JS servidos direto pelo live-server
- **Hot Reload** — Atualização automática durante desenvolvimento

</td>
</tr>
</table>

---

## 📚 Conteúdo da Palestra

| Tópico | Descrição |
|--------|-----------|
| 🎯 **Fundamentos SDD** | Conceitos básicos de Spec-Driven Development |
| 🛠️ **spec-kit** | Como usar spec-kit no fluxo de desenvolvimento |
| 🤖 **AI Coding Agents** | Superfícies de execução para um contrato SDD portátil |
| 📐 **Context Engineering** | AGENTS.md, Rules, Skills e conhecimento ativo |
| 💰 **Economia de Contexto** | Budget, custo, latência e qualidade |
| 🔄 **Progressive Disclosure** | Profundidade carregada sob demanda |
| 🛡️ **Harness Engineering** | Ambiente, sinais, guardrails e verificação |
| 🎬 **Demo Prática** | Da spec à evidência em uma rota demonstrável |
| 🏆 **Quiz Final** | Consolidação dos conceitos apresentados |

---

## 🚀 Quick Start

### Pré-requisitos

> [!IMPORTANT]
> - **Node.js** — Versão 18.0.0 ou superior
> - **npm** — Gerenciador de pacotes

### Instalação

```bash
# Clone o repositório
git clone https://github.com/glaucia86/palestra-sdd.git
cd palestra-sdd

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run start
```

### Fluxo TypeScript (breaking change branch)

```bash
# type-check sem emitir arquivos
npm run typecheck

# compila src-ts/** para js/app/**
npm run build:ts

# compila em watch mode durante desenvolvimento
npm run build:ts:watch
```

### Acesso

A aplicação será aberta automaticamente em `http://127.0.0.1:3000/index.html`

> [!TIP]
> Use `npm run start -- --no-browser` para iniciar sem abrir o navegador automaticamente.

---

## 🏗️ Tech Stack

<table>
<tr>
<td align="center" width="120">
<a href="https://revealjs.com/">
<img src="https://revealjs.com/images/logo/reveal-symbol.svg" width="48" height="48" alt="Reveal.js"/>
</a>
<br><strong>Reveal.js</strong>
<br><sub>Slides Framework</sub>
</td>
<td align="center" width="120">
<a href="https://mermaid.js.org/">
<img src="https://mermaid.js.org/assets/logo.svg" width="48" height="48" alt="Mermaid"/>
</a>
<br><strong>Mermaid</strong>
<br><sub>Diagramas</sub>
</td>
<td align="center" width="120">
<a href="https://lucide.dev/">
<img src="https://lucide.dev/logo.svg" width="48" height="48" alt="Lucide"/>
</a>
<br><strong>Lucide</strong>
<br><sub>Ícones</sub>
</td>
<td align="center" width="120">
<a href="https://www.javascript.com/">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript"/>
</a>
<br><strong>TypeScript</strong>
<br><sub>Incremental ESM</sub>
</td>
</tr>
</table>

---

## 🏛️ Arquitetura da Aplicação

A página principal (`index.html`) inicia uma estrutura simples:

1. carrega estilos e bibliotecas CDN (Reveal, Mermaid, Lucide);
2. inicializa o app em `js/app/init.js`;
3. resolve `?lang=pt-BR|en-US|es-ES`, usando PT-BR como fallback;
4. carrega o manifest localizado e injeta `slides/parts/<locale>/*.html` dentro de `.reveal .slides`;
5. aplica metadata e shell localizados;
6. executa bootstrap de recursos visuais, quiz, demo e encerramento com áudio opt-in.

Esse desenho permite evoluir conteúdo e features sem acoplamento forte entre slides e runtime.

---

## 📁 Estrutura do Projeto

```text
palestra-sdd/
|- index.html
|- README.md
|- AGENTS.md
|- css/
|  |- custom.css
|- js/
|  |- app/
|     |- init.js            # emitido pelo TypeScript
|     |- bootstrap.js       # emitido pelo TypeScript
|     |- config/
|     |- features/
|     |- quiz/
|- src-ts/
|  |- app/
|     |- init.ts
|     |- bootstrap.ts
|     |- config/
|     |- features/
|     |- quiz/
|  |- types/
|- tsconfig.json
|- tsconfig.typecheck-js.json
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

## 🎮 Navegação Durante a Apresentação

| Tecla | Ação |
|-------|------|
| `→` / `Espaço` | Próximo slide |
| `←` | Slide anterior |
| `↑` / `↓` | Navegar sub-slides |
| `Esc` | Visão geral |
| `F` | Tela cheia |
| `S` | Speaker notes |

---

## 📸 Screenshots

> [!NOTE]
> **Demo ao vivo:** [https://glaucia86.github.io/palestra-sdd/](https://glaucia86.github.io/palestra-sdd/)

---

## 🚢 Deploy

O deploy para GitHub Pages é automático via workflow:

- **Arquivo:** `.github/workflows/deploy-pages.yml`
- **Gatilho:** push para branch `main`
- **URL publicada:** [https://glaucia86.github.io/palestra-sdd/](https://glaucia86.github.io/palestra-sdd/)

---

## 👩‍💻 Autora

<div align="center">
  <a href="https://github.com/glaucia86">
    <img src="https://github.com/glaucia86.png" width="100px;" alt="Glaucia Lemos" style="border-radius: 50%;"/>
  </a>
  <br />
  <strong>Glaucia Lemos</strong>
  <br />
  <sub>A.I Developer at Zup Innovation/Itaú</sub>
  <br /><br />
  <a href="https://mvp.microsoft.com/pt-BR/MVP/profile/d3200941-395d-423b-a0ec-eb0577d3bb86">
    <img src="https://img.shields.io/badge/Microsoft%20MVP-Web%20Technologies-blue?logo=microsoft&logoColor=white" alt="Microsoft MVP"/>
  </a>
  <br /><br />
  <a href="https://x.com/glaucia_lemos86">🐦 Twitter</a> •
  <a href="https://www.linkedin.com/in/glaucialemos/">💼 LinkedIn</a> •
  <a href="https://github.com/glaucia86">🐙 GitHub</a> •
  <a href="https://www.youtube.com/@GlauciaLemos">📺 YouTube</a>
</div>

---

## ⭐ Apoie Este Projeto

Se você achou esta apresentação útil:

<table>
<tr>
<td>⭐ <strong>Star</strong> este repositório</td>
<td>🐛 <strong>Reporte</strong> problemas encontrados</td>
</tr>
<tr>
<td>💡 <strong>Sugira</strong> melhorias</td>
<td>🔀 <strong>Contribua</strong> via pull requests</td>
</tr>
</table>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja `LICENSE` para detalhes.

---

<p align="center">
  Feito com 💚 usando Reveal.js, TypeScript e AI Coding Agents
</p>

<p align="center">
  <a href="#-spec-driven-development-com-ai-coding-agents">⬆️ Voltar ao Topo</a>
</p>
