# 🎤 Spec-Driven Development com GitHub Copilot

<p align="center">
  <img src="./resources/images/palestra-banner.png" alt="Banner da palestra Spec-Driven Development com GitHub Copilot" />
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
  <img src="https://img.shields.io/badge/JavaScript-ESM-f59e0b?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript ESM" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deploy-0b1220?style=for-the-badge&logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="MIT" />
  <img src="https://img.shields.io/github/last-commit/glaucia86/palestra-sdd?style=for-the-badge&color=0ea5e9" alt="Last Commit" />
</p>

---

## 📖 Visão Geral

Este repositório contém a apresentação da **Glaucia Lemos** sobre **Spec-Driven Development (SDD) com GitHub Copilot**.

A experiência foi desenvolvida como slides web com Reveal.js, sem build step, com:

- 🔄 **Carregamento dinâmico** de seções (`slides/manifest.json` + `slides/parts/*.html`);
- 🎨 **Design system** próprio em `css/custom.css`;
- 🧩 **App JS modular** em `js/app/*`;
- ✨ **Recursos interativos** como quiz, Mermaid, starfield, particles e backgrounds especiais.

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
- **Carregamento Dinâmico** — Slides carregados sob demanda
- **Design System** — Estilos customizados e consistentes

</td>
<td width="50%">

### 🚀 Experiência do Desenvolvedor
- **Zero Build** — Sem etapa de compilação
- **ESM Modular** — Código JavaScript moderno
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
| 🤖 **GitHub Copilot** | Agent Mode e otimização de contexto |
| 📐 **Arquitetura** | PRD.md, AGENTS.md, Rules e Skills |
| 🔄 **Progressive Disclosure** | Estratégias para reduzir ruído de contexto |
| 🎬 **Demo Prática** | Elementos visuais e interativos ao vivo |
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
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="48" height="48" alt="JavaScript"/>
</a>
<br><strong>JavaScript</strong>
<br><sub>ESM Modules</sub>
</td>
</tr>
</table>

---

## 🏛️ Arquitetura da Aplicação

A página principal (`index.html`) inicia uma estrutura simples:

1. carrega estilos e bibliotecas CDN (Reveal, Mermaid, Lucide);
2. inicializa o app em `js/app/init.js`;
3. carrega os arquivos definidos em `slides/manifest.json`;
4. injeta os blocos de `slides/parts/*.html` dentro de `.reveal .slides`;
5. executa bootstrap de recursos visuais, quiz e hooks de evento do Reveal.

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
  Feito com 💚 usando Reveal.js e GitHub Copilot
</p>

<p align="center">
  <a href="#-spec-driven-development-com-github-copilot">⬆️ Voltar ao Topo</a>
</p>
