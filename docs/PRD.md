# PRD.md: Apresentacao Web sobre SDD com AI Coding Agents

## 1. Visao Geral

Este documento descreve os requisitos de produto da apresentacao web interativa sobre **Spec-Driven Development (SDD)** mantida neste repositorio. A palestra deixa de ser posicionada como "SDD com GitHub Copilot" e passa a ser posicionada como **SDD com AI Coding Agents**, preservando o foco principal em metodologia, contexto, previsibilidade e governanca.

A mudanca e motivada pelo amadurecimento do mercado de agentes de desenvolvimento e pelo movimento recente para modelos de cobranca baseados em consumo. Para a edicao Maio/2026 da palestra, a narrativa considera a transicao anunciada pela GitHub para usage-based billing em 1 de junho de 2026: interacoes passam a consumir input tokens, output tokens e cached tokens; o custo depende do modelo usado e da quantidade de tokens; e 1 GitHub AI Credit equivale a US$0.01. Esse contexto torna ainda mais importante ensinar SDD como pratica para reduzir retrabalho, ruido de contexto e custo operacional.

A apresentacao continua sendo uma experiencia web com Reveal.js, carregamento dinamico de slides, TypeScript incremental, Mermaid, Lucide, quiz e efeitos visuais. O objetivo nao e trocar uma dependencia de ferramenta por outra, mas mostrar que SDD e uma camada de engenharia aplicavel a GitHub Copilot, Codex App/CLI, Claude Code, Cursor, Gemini CLI e outros agentes compativeis com artefatos como `PRD.md`, `AGENTS.md`, Rules, Skills e checks automatizados.

**Versao do Documento**: 2.0

**Data de Criacao**: 19 de Fevereiro de 2026

**Ultima Atualizacao**: Maio de 2026

**Autora da Palestra**: Glaucia Lemos, @glaucia_lemos86

**Stakeholders**: Desenvolvedores, tech leads, equipes de engenharia, entusiastas de IA e comunidades tecnicas que adotam AI Coding Agents.

## 2. Objetivos

### Objetivo Principal

Fornecer uma apresentacao educativa, visual e pratica sobre SDD como metodologia para trabalhar com AI Coding Agents de forma previsivel, rastreavel, segura e economicamente consciente.

### Objetivos Secundarios

- Explicar SDD de forma introdutoria e progressiva, sem assumir conhecimento previo.
- Mostrar como specs, PRDs, `AGENTS.md`, Rules, Skills e testes reduzem ambiguidade para agentes.
- Reposicionar a secao de ferramenta para uma abordagem agnostica, usando GitHub Copilot e Codex como exemplos concretos.
- Manter GitHub Copilot, Copilot CLI e Codex App/CLI como trilhas opcionais de apresentacao, navegaveis pelo sumario.
- Incluir o Codex App/CLI como bloco relevante da palestra, com foco em `AGENTS.md`, Skills, sandbox, approvals, worktrees, automacoes e `codex exec`.
- Explicar custo de contexto e token-based billing como motivo pratico para Progressive Disclosure e arquitetura de contexto.
- Explicar que billing baseado em uso deve ser tratado como disciplina de engenharia: contexto menor, tarefas mais bem especificadas, validacao objetiva e menor retrabalho.
- Preservar a experiencia visual e interativa atual, sem redesign amplo nesta fase documental.

### Metricas de Sucesso

- A audiencia entende SDD como pratica independente de fornecedor.
- A capa e a narrativa deixam de depender exclusivamente do GitHub Copilot, mas o sumario permite pular diretamente para GitHub Copilot, Copilot CLI ou Codex App/CLI conforme o contexto da palestra.
- O conteudo tecnico sobre Codex e billing aponta para fontes oficiais ou para revisao antes da implementacao.
- A apresentacao continua carregando em menos de 5 segundos e sem erros de console apos a futura implementacao.
- A revisao humana confirma que a mensagem ficou mais duravel, pragmatica e alinhada ao contexto atual de custos.

## 3. Escopo

### Incluido

- Atualizacao do posicionamento da palestra para **SDD com AI Coding Agents**.
- Manutencao da arquitetura atual baseada em Reveal.js, manifests, slides em HTML, CSS proprio e TypeScript emitido para `js/app/*`.
- Adaptacao futura de capa, sumario, secao de ferramentas, demo, referencias e quiz.
- Inclusao de Codex App/CLI/IDE Extension como exemplo forte de agente moderno.
- Inclusao do contexto de billing baseado em uso como motivacao para economia de tokens e qualidade de contexto, incluindo GitHub AI Credits, token consumption e model pricing como referencias oficiais.
- Conteudo sobre:
  - SDD e spec-first development.
  - spec-kit como ferramenta agnostica para operacionalizar SDD.
  - Arquitetura de Contexto.
  - Progressive Disclosure.
  - `AGENTS.md`, Rules e Skills.
  - Harness Engineering.
  - Governanca, sandbox, approvals e validacao.
- Preservacao do idioma principal pt-BR, com estrutura existente para en-US e es-ES.

### Nao Incluido

- Criar um novo repositorio `palestra-sdd-codex`.
- Transformar a palestra em uma apresentacao exclusiva sobre Codex.
- Criar uma secao comparativa extensa "Codex vs Copilot vs outros".
- Redesenhar a identidade visual nesta fase documental.
- Remover assets aprovados, easter eggs ou tema visual sem alinhamento explicito da autora.
- Alterar slides, CSS, TypeScript, assets ou README durante a etapa de revisao documental.
- Criar backend, banco de dados, analytics, autenticacao ou tracking.

## 4. Personas

| Persona | Necessidade |
|---------|-------------|
| Dev Junior/Pleno | Entender por que specs melhoram resultados com agentes e como iniciar sem sobrecarga. |
| Dev Senior/Tech Lead | Estruturar um workflow replicavel para time, com contexto, validacao e governanca. |
| Engineering Manager | Entender riscos, custo, previsibilidade e impacto de adocao de agentes. |
| Comunidade tecnica | Ver exemplos praticos, demo, referencias e caminhos de estudo. |

## 5. Narrativa da Palestra

A narrativa principal deve ser:

1. **O problema mudou**: agentes ficaram mais autonomos, caros e poderosos.
2. **Prompt solto nao escala**: sem contexto persistente, cada sessao reinventa decisoes.
3. **SDD cria contrato**: PRD, spec, instructions, skills e testes reduzem variabilidade.
4. **Ferramentas sao substituiveis**: Copilot, Codex e outros agentes podem consumir os mesmos principios.
5. **Contexto tem custo**: token-based billing torna Progressive Disclosure uma pratica economica, nao apenas tecnica.
6. **Harness fecha o ciclo**: guides orientam; sensors validam; CI, testes e revisoes reduzem risco.

## 6. Billing, Custo de Contexto e SDD

A palestra deve tratar billing como motivacao tecnica para melhores praticas, nao como comparacao comercial entre ferramentas.

Pontos que podem virar slide ou speaker notes:

- A partir de 1 de junho de 2026, GitHub Copilot migra de request-based billing para usage-based billing.
- Interacoes com Copilot consomem input tokens, output tokens e cached tokens.
- O custo de uma interacao depende do modelo usado e da quantidade de tokens consumidos.
- O uso excedente e convertido em GitHub AI Credits, onde 1 AI Credit equivale a US$0.01.
- Code completions e next edit suggestions continuam nao sendo cobradas em AI credits nos planos pagos, segundo a documentacao oficial.
- Copilot Code Review tem uma consideracao adicional: alem de token consumption, a infraestrutura agentica passa a consumir GitHub Actions minutes em runners GitHub-hosted a partir de 1 de junho de 2026.

Mensagem principal para a audiencia: SDD nao elimina custo de inferencia, mas reduz desperdicio por diminuir ambiguidade, repeticao de contexto e ciclos de retrabalho.

## 7. Estrutura de Conteudo Esperada

| Secao | Intencao |
|-------|----------|
| Capa | Reposicionar para "Spec-Driven Development com AI Coding Agents". |
| Sumario | Trocar cards dependentes de Copilot por cards agnosticos e Codex-aware. |
| O que e SDD? | Manter base conceitual, reforcando portabilidade entre agentes. |
| Por que SDD hoje? | Adicionar custo de contexto, billing por tokens e autonomia agentica. |
| spec-kit | Manter como ferramenta agnostica de operacionalizacao de SDD. |
| AI Coding Agents | Mostrar categorias: IDE agent, CLI agent, app desktop, cloud agent e automacao. |
| Codex | Inserir bloco especifico com App/CLI, `AGENTS.md`, Skills, sandbox, approvals e `codex exec`. |
| Economia de Contexto | Explicar GitHub AI Credits, tokens, model pricing e por que Progressive Disclosure reduz desperdicio. |
| Arquitetura de Contexto | Atualizar diagrama para nao depender apenas de Copilot. |
| Progressive Disclosure | Conectar economia de tokens, Skills e manutencao de contexto. |
| Harness Engineering | Manter como ponte entre SDD, guias, sensores e validacao. |
| Demo | Planejar demo que possa usar Codex CLI ou outro agente, sem travar a palestra em fornecedor unico. |
| Referencias | Atualizar links oficiais de GitHub billing, Codex, agents.md, Skills, spec-kit e SDD. |
| Quiz | Atualizar perguntas para SDD + agentes, incluindo Codex e custos de contexto. |

## 8. Requisitos Funcionais

- **RF01**: A apresentacao deve carregar slides sequencialmente com navegacao por teclado, mouse e touch.
- **RF02**: O sistema deve manter carregamento dinamico via `slides/manifest.json`.
- **RF03**: O conteudo deve continuar usando HTML, Reveal.js, Mermaid, Lucide e blocos de codigo destacados.
- **RF04**: O sumario deve permitir navegacao direta para as secoes principais.
- **RF05**: A palestra deve apresentar SDD como metodologia agnostica para AI Coding Agents.
- **RF06**: A palestra deve incluir um bloco sobre Codex App/CLI baseado em fontes oficiais.
- **RF07**: A palestra deve explicar como `AGENTS.md`, Rules e Skills funcionam como artefatos de contexto.
- **RF08**: A palestra deve incluir pelo menos uma referencia explicita ao impacto de token-based billing na necessidade de contexto enxuto.
- **RF09**: O quiz deve ser atualizado para cobrir SDD, agentes, Progressive Disclosure, Codex e governanca.
- **RF10**: Speaker notes devem orientar a autora sobre pontos de atualizacao tecnica antes de apresentacoes futuras.
- **RF11**: A palestra deve explicar billing de forma conceitual e referenciada, sem copiar tabelas completas de precos ou multipliers para evitar desatualizacao rapida.
- **RF12**: A palestra deve registrar a pagina publica do Codex como referencia de narrativa visual, sem baixar ou incorporar assets oficiais sem validacao de direitos.

## 9. Requisitos Nao Funcionais

- **Performance**: carregamento inicial menor que 5 segundos e animacoes sem lag perceptivel.
- **Manutenibilidade**: preservar estrutura modular de slides e TypeScript incremental.
- **Compatibilidade**: priorizar Chrome e Edge, com degradacao aceitavel em outros browsers modernos.
- **Acessibilidade**: preservar navegacao por teclado, contraste e textos alternativos quando imagens forem adicionadas.
- **Seguranca**: nao incluir segredos, tokens, credenciais ou dados sensiveis em exemplos.
- **Portabilidade**: evitar linguagem que prenda SDD a um unico fornecedor.
- **Atualizacao**: marcar conteudos de ferramentas e modelos como sujeitos a revisao antes de cada palestra.

## 10. Restricoes de Implementacao

- Nao adicionar dependencias externas sem aprovacao explicita.
- Nao alterar a paleta "Oceanic Precision" sem OK da autora.
- Nao remover `id`s especiais: `#capa`, `#sumario`, `#quiz`, `#sobre-mim`, `#the-end`.
- Nao usar SVG inline para icones; usar Lucide com `<i data-lucide="nome"></i>`.
- Nao usar `px` fixo para tamanhos de fonte nos slides.
- Nao substituir assets aprovados sem alinhamento explicito.
- Qualquer novo slide deve ser revisado pela autora antes de producao.
- Nao copiar tabelas completas de pricing/multipliers para os slides; preferir conceitos estaveis e link para a fonte oficial.
- Nao usar imagens oficiais do Codex por hotlink ou download sem validar direitos, fonte, data e atribuicao.

## 11. Criterios de Aceite

- **CA01**: PRD e spec deixam claro que nao havera novo repositorio `palestra-sdd-codex`.
- **CA02**: A palestra e descrita como SDD com AI Coding Agents, nao como SDD com um unico fornecedor.
- **CA03**: Codex aparece como bloco estrategico, nao como substituto do tema principal.
- **CA04**: As referencias tecnicas sobre billing e Codex apontam para fontes oficiais.
- **CA05**: O documento complementar `docs/PRD-palestra-codex.md` concentra pesquisa especifica sobre Codex.
- **CA06**: A futura implementacao preserva arquitetura, design system e IDs criticos do projeto.
- **CA07**: A revisao humana consegue aprovar ou ajustar a direcao antes de mudancas em slides.
- **CA08**: O conteudo sobre billing explica tokens, modelo, AI Credits e limites de atualizacao com fonte oficial.
- **CA09**: O conteudo visual sobre Codex usa a pagina oficial como referencia, mas nao incorpora assets sem validacao.

## 12. Riscos e Mitigacoes

| Risco | Impacto | Mitigacao |
|-------|---------|-----------|
| Conteudo de Codex ficar desatualizado rapidamente | Medio | Revisar docs oficiais e changelog antes de cada apresentacao. |
| A palestra parecer propaganda de ferramenta | Alto | Manter SDD como eixo e Codex/Copilot como exemplos. |
| Mudanca de capa quebrar identidade visual existente | Medio | Atualizar texto primeiro; redesign so com aprovacao. |
| Billing gerar debate comercial excessivo | Medio | Usar billing como motivacao tecnica para contexto enxuto, nao como julgamento de produto. |
| Demo ao vivo falhar | Alto | Preparar roteiro alternativo e fallback gravado. |
| Tabela de pricing/multipliers ficar desatualizada | Alto | Nao copiar tabela completa; citar conceitos e linkar a documentacao oficial. |
| Uso indevido de assets oficiais do Codex | Medio | Usar como referencia visual ate validar direitos e atribuicao. |

## 13. Referencias

### Billing e Contexto de Mercado

- [GitHub Copilot is moving to usage-based billing — GitHub Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Models and pricing for GitHub Copilot — GitHub Docs](https://docs.github.com/pt/copilot/reference/copilot-billing/models-and-pricing)

### Codex

- [Codex — OpenAI](https://openai.com/pt-BR/codex/)
- [Codex — OpenAI Developers](https://developers.openai.com/codex/)
- [Codex CLI — OpenAI Developers](https://developers.openai.com/codex/cli/)
- [Command line options — Codex CLI](https://developers.openai.com/codex/cli/reference)
- [Slash commands — Codex CLI](https://developers.openai.com/codex/cli/slash-commands)
- [Codex app features](https://developers.openai.com/codex/app/features)
- [Codex Automations](https://developers.openai.com/codex/app/automations)
- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Agent Skills — Codex](https://developers.openai.com/codex/skills)
- [Sandboxing — Codex](https://developers.openai.com/codex/concepts/sandboxing)
- [Agent approvals & security — Codex](https://developers.openai.com/codex/agent-approvals-security)
- [Non-interactive mode: codex exec](https://developers.openai.com/codex/noninteractive)
- [Codex changelog](https://developers.openai.com/codex/changelog)

### SDD, Contexto e Agentes

- [github/spec-kit](https://github.com/github/spec-kit)
- [agents.md](https://agents.md/)
- [Agent Skills](https://agentskills.io/)
- [Context Engineering for Coding Agents — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
- [Harness Engineering at Scale — OpenAI](https://openai.com/index/harness-engineering/)

## 14. Politica de Atualizacao

Antes de cada apresentacao publica:

- Revisar o changelog do Codex.
- Revisar mudancas de pricing/billing das ferramentas citadas.
- Revisar a pagina de Models and pricing for GitHub Copilot, especialmente token pricing, GitHub AI Credits, Code Review e model multipliers.
- Revisar a pagina publica do Codex para confirmar se textos, imagens e narrativa visual continuam atuais.
- Confirmar comandos e flags do Codex CLI.
- Confirmar o comportamento atual de `AGENTS.md`, Skills, sandbox e approvals.
- Validar links do slide de referencias.
- Atualizar speaker notes com data de verificacao.
