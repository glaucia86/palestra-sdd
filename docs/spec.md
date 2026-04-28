---
title: "Especificacao tecnica — Atualizacao da palestra SDD para AI Coding Agents"
version: 1.0
date_created: 2026-04-27
last_updated: 2026-04-27
owner: "Glaucia Lemos (@glaucia_lemos86)"
scope: "Documentacao e futura implementacao incremental no repositorio palestra-sdd"
---

# Introduction

Esta especificacao tecnica define como a palestra existente `palestra-sdd` deve ser evoluida para uma abordagem mais agnostica: **Spec-Driven Development com AI Coding Agents**. O documento serve como contrato de implementacao futura apos revisao humana do PRD principal e do PRD complementar sobre Codex.

Esta especificacao substitui qualquer plano anterior de criar um repositorio separado chamado `palestra-sdd-codex`. Toda implementacao futura deve ocorrer no repositorio atual `C:\Labs\palestra-sdd`, preservando arquitetura, design system, assets aprovados e fluxo de validacao existentes.

## 1. Purpose & Scope

### Proposito

Orientar uma futura implementacao incremental para:

- atualizar a narrativa da palestra;
- tornar capa e sumario mais agnosticos;
- incorporar Codex App/CLI como exemplo estrategico;
- manter SDD como tema central;
- preservar qualidade tecnica e visual do projeto.

### Escopo desta especificacao

Inclui:

- contratos de conteudo para PRD, Codex e futura implementacao;
- contrato de conteudo para billing do Copilot e economia de contexto;
- restricoes de arquitetura e design;
- criterios de aceite;
- estrategia de validacao;
- mapeamento dos arquivos mais provaveis de mudanca futura.

Nao inclui:

- edicao imediata de slides;
- edicao de CSS;
- edicao de TypeScript;
- criacao de assets;
- mudanca de README;
- criacao de release/tag.

## 2. Sources of Truth

Os documentos devem ser lidos nesta ordem antes da implementacao futura:

1. `AGENTS.md`
2. `docs/PRD.md`
3. `docs/PRD-palestra-codex.md`
4. `docs/agents/content.md`
5. `docs/agents/styling.md`
6. `docs/agents/javascript.md`
7. `slides/manifest.json`
8. arquivos em `slides/parts/{locale}/`

## 3. Current Architecture Constraints

- O runtime usa Reveal.js 5.1 via CDN.
- `index.html` carrega slides via `slides/manifest.json`.
- Os slides ficam em `slides/parts/{locale}/`.
- O codigo fonte TypeScript fica em `src-ts/app/*`.
- O JavaScript final fica em `js/app/*` e e gerado por `npm run build:ts`.
- A validacao principal de TypeScript e `npm run typecheck`.
- Mermaid e Lucide sao carregados por CDN.
- O design system principal esta em `css/custom.css`.
- A paleta atual e "Oceanic Precision" e nao deve ser trocada sem aprovacao explicita.

## 4. Required Product Direction

### 4.1 Posicionamento

Substituir a mensagem:

```text
Spec-Driven Development com GitHub Copilot
```

por uma formulacao agnostica, como:

```text
Spec-Driven Development com AI Coding Agents
```

ou:

```text
Spec-Driven Development na era dos AI Coding Agents
```

O texto final deve ser aprovado pela autora antes de producao.

### 4.2 Papel do GitHub Copilot

GitHub Copilot deve continuar podendo aparecer como exemplo, especialmente porque o conteudo atual ja cobre Agent Mode, CLI, Skills e contexto. Porem, ele nao deve ser o unico eixo narrativo da palestra.

GitHub Copilot e Copilot CLI devem existir como blocos navegaveis e opcionais dentro da secao de AI Coding Agents. A palestrante deve poder pular diretamente para a ferramenta que deseja comentar, sem alterar a narrativa central de SDD.

### 4.3 Papel do Codex

Codex deve ser incorporado como exemplo moderno de agente com:

- App desktop;
- CLI;
- IDE Extension;
- Cloud/Web quando aplicavel;
- `AGENTS.md`;
- Skills;
- sandbox;
- approvals;
- worktrees;
- automacoes;
- slash commands relevantes para SDD;
- `codex exec`.

Tambem deve ser incorporada a narrativa oficial da pagina publica do Codex: engenharia ponta a ponta, workflows multiagente, Skills, Automations, qualidade com review/testes/PRs e continuidade entre App, editor e terminal.

### 4.4 Papel de outros agentes

Outros agentes podem ser mencionados brevemente para reforcar portabilidade, mas nao devem receber uma secao propria nesta iteracao.

## 5. Implementation Contracts

### 5.1 Conteudo

Ao editar slides futuramente:

- preservar a progressao pedagogica: problema -> SDD -> spec-kit -> agentes -> contexto -> Progressive Disclosure -> Harness -> demo -> quiz;
- limitar cada slide a no maximo tres ideias principais;
- manter speaker notes em slides tecnicos;
- incluir data de verificacao em speaker notes de conteudo Codex/billing;
- evitar listas extensas de modelos, precos ou numeros que envelhecem rapidamente;
- preferir links oficiais a estatisticas volateis.
- quando citar Codex CLI, curar comandos por funcao SDD em vez de copiar listas completas;
- incluir apenas slash commands que ajudem contexto, permissao, revisao, compactacao e validacao;
- criar um slide ou bloco "Economia de Contexto" antes ou depois de Progressive Disclosure;
- explicar Copilot usage-based billing com conceitos estaveis: input tokens, output tokens, cached tokens, modelo escolhido, GitHub AI Credits e allowances;
- mencionar que 1 GitHub AI Credit equivale a US$0.01 apenas como referencia oficial, com data de verificacao;
- mencionar que Code completions e next edit suggestions continuam fora de AI credits nos planos pagos, se isso ainda estiver confirmado na revisao pre-palestra;
- mencionar que Copilot Code Review pode envolver token consumption e GitHub Actions minutes em runners GitHub-hosted;
- nao copiar tabelas completas de pricing ou model multipliers nos slides;
- linkar a documentacao oficial de models and pricing para detalhes atualizados.

### 5.2 Slides e IDs

IDs que nao podem ser removidos:

- `#capa`
- `#sumario`
- `#quiz`
- `#sobre-mim`
- `#the-end`

Se a secao `03-copilot.html` for renomeada no futuro, o implementador deve:

- atualizar `slides/manifest.json`;
- atualizar manifest de idiomas se existirem manifestos especificos;
- revisar links internos do sumario;
- revisar IDs de destino;
- atualizar referencias nos arquivos en-US e es-ES ou registrar explicitamente que a traducao ficara para fase posterior.

### 5.3 Design

- Usar classes existentes: `card`, `highlight-box`, `two-cols`, `tag`, `definition`, `section-header`, `section-page-container`, `card-grid-2`, `card-grid-3`.
- Usar variaveis CSS existentes em `:root`.
- Manter font-size em `em` nos slides.
- Usar icones Lucide via `<i data-lucide="nome"></i>`.
- Nao adicionar tema Cyberpunk nesta atualizacao sem aprovacao explicita.
- Nao substituir assets Star Wars ou easter eggs sem alinhamento explicito.
- Usar a pagina publica do Codex como referencia visual, mas nao hotlinkar nem baixar assets oficiais sem validacao de direitos.
- Registrar que os visuais detectados na pagina publica do Codex eram imagens estaticas servidas por CDN/OpenAI, nao GIF ou video no HTML acessivel.
- Se algum asset oficial for aprovado futuramente, registrar URL fonte, data de captura, alt text e justificativa no PR ou changelog.

### 5.4 TypeScript e Runtime

Se houver mudancas futuras em `src-ts/app/*`:

- preservar a ordem de inicializacao indicada em `AGENTS.md`;
- rodar `npm run build:ts`;
- rodar `npm run typecheck`;
- garantir que `js/app/*` seja regenerado pelo compilador;
- nao editar manualmente arquivos gerados em `js/app/*` quando a origem estiver em `src-ts/app/*`.

### 5.5 Dependencias

Nao adicionar dependencias npm, bibliotecas CDN ou frameworks sem aprovacao explicita.

## 6. Planned Future File Touches

Esta etapa documental nao altera esses arquivos, mas a implementacao futura provavelmente tocara:

| Area | Arquivos provaveis | Mudanca esperada |
|------|--------------------|------------------|
| Capa e sumario | `slides/parts/pt-BR/01-intro-sdd.html` | Titulo e cards mais agnosticos. |
| Secao de agentes | `slides/parts/pt-BR/03-copilot.html` | Reposicionar para AI Coding Agents e incluir Codex. |
| Comandos Codex | `slides/parts/pt-BR/03-copilot.html` | Incluir slash commands relevantes para SDD sem transformar em tutorial de CLI. |
| Contexto | `slides/parts/pt-BR/04-context-progressive.html` | Ajustar diagrama e texto para portabilidade. |
| Economia de contexto | `slides/parts/pt-BR/04-context-progressive.html` | Explicar billing por tokens, GitHub AI Credits e Progressive Disclosure. |
| Harness | `slides/parts/pt-BR/04b-harness-engineering.html` | Conectar Codex, guides, sensors e automacoes. |
| Demo/referencias/quiz | `slides/parts/pt-BR/05-refs-end.html` | Atualizar demo, links e perguntas. |
| Quiz data | `src-ts/app/quiz/data.ts` | Atualizar perguntas se o quiz for data-driven. |
| Docs auxiliares | `docs/agents/content.md` | Atualizar orientacao se novos padroes de slide forem criados. |

## 7. Acceptance Criteria

### Documentacao

- **AC-DOC-001**: `docs/PRD.md` descreve a palestra como SDD com AI Coding Agents.
- **AC-DOC-002**: `docs/PRD-palestra-codex.md` existe e concentra a pesquisa Codex.
- **AC-DOC-003**: `docs/spec.md` existe e descreve implementacao no repo atual.
- **AC-DOC-004**: Nenhum documento instrui criar `palestra-sdd-codex`.
- **AC-DOC-005**: A identidade "Oceanic Precision" permanece como padrao.
- **AC-DOC-006**: As referencias sobre Codex e billing usam fontes oficiais.
- **AC-DOC-007**: A documentacao explica Copilot billing de forma conceitual, sem copiar tabelas completas de precos.
- **AC-DOC-008**: A documentacao registra a pagina publica do Codex como referencia narrativa/visual e exige validacao antes de usar assets.

### Implementacao futura

- **AC-IMP-001**: A capa nao fica dependente de GitHub Copilot.
- **AC-IMP-002**: O sumario inclui uma entrada agnostica para AI Coding Agents ou equivalente.
- **AC-IMP-003**: Codex aparece como exemplo concreto de agente, nao como substituto do tema SDD.
- **AC-IMP-004**: O conteudo explica por que contexto enxuto reduz desperdicio em cenarios de token-based billing.
- **AC-IMP-005**: Slash commands do Codex aparecem como controles do fluxo SDD, nao como lista completa de comandos.
- **AC-IMP-006**: A apresentacao continua sem erros de console.
- **AC-IMP-007**: `npm run build:ts` e `npm run typecheck` passam quando houver mudanca TypeScript.
- **AC-IMP-008**: A futura palestra inclui speaker note com "dados verificados para a edicao Maio/2026" ou data mais recente para billing/model pricing.
- **AC-IMP-009**: A futura palestra nao apresenta pricing/multipliers como tabela fixa sem aviso de revisao.

## 8. Validation Strategy

### Validacao documental

Executar revisao manual procurando:

- referencias restantes a "palestra-sdd-codex" como projeto destino;
- afirmacoes que tornem Codex o tema principal;
- recomendacoes de redesign nao aprovadas;
- dados volateis sem fonte;
- copia de tabela completa de precos ou multipliers;
- uso de assets oficiais sem politica de direitos/autorizacao;
- contradicoes com `AGENTS.md`.

### Validacao tecnica futura

Quando houver implementacao nos slides:

```bash
npm run typecheck
npm run build:ts
npm run start
```

Validar manualmente:

- navegacao por teclado;
- sumario;
- slides verticais;
- speaker notes;
- quiz;
- console do navegador;
- renderizacao de Mermaid;
- icones Lucide;
- viewport desktop e mobile.

## 9. External References

- [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Models and pricing for GitHub Copilot](https://docs.github.com/pt/copilot/reference/copilot-billing/models-and-pricing)
- [Codex — OpenAI](https://openai.com/pt-BR/codex/)
- [Codex — OpenAI Developers](https://developers.openai.com/codex/)
- [Codex CLI](https://developers.openai.com/codex/cli/)
- [Command line options — Codex CLI](https://developers.openai.com/codex/cli/reference)
- [Slash commands — Codex CLI](https://developers.openai.com/codex/cli/slash-commands)
- [Codex app features](https://developers.openai.com/codex/app/features)
- [Codex Automations](https://developers.openai.com/codex/app/automations)
- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Agent Skills — Codex](https://developers.openai.com/codex/skills)
- [Sandboxing — Codex](https://developers.openai.com/codex/concepts/sandboxing)
- [Agent approvals & security — Codex](https://developers.openai.com/codex/agent-approvals-security)
- [Non-interactive mode — Codex](https://developers.openai.com/codex/noninteractive)
- [github/spec-kit](https://github.com/github/spec-kit)
- [agents.md](https://agents.md/)
- [Agent Skills](https://agentskills.io/)

## 10. Implementation Notes

- Este documento e deliberadamente conservador: documenta a direcao antes de alterar slides.
- O arquivo `resources/images/codex-color.png` existe no workspace, mas nao e usado por esta etapa.
- Qualquer uso de imagem de produto Codex deve respeitar direitos, fonte e contexto.
- A pagina publica do Codex deve ser tratada como referencia de narrativa e composicao visual; a implementacao deve preferir mockups proprios ou screenshots aprovados.
- Billing do Copilot deve ser usado para explicar economia de contexto, nao para criar uma secao comercial ou comparativo de fornecedores.
- Tabelas de pricing e model multipliers devem ser linkadas, nao duplicadas integralmente.
- Conteudo sobre modelos deve ser revisado perto da data da palestra, pois muda rapido.
- A decisao recomendada e evoluir a palestra atual, nao fragmentar a narrativa em uma segunda apresentacao.
