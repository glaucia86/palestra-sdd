# PRD-palestra-codex.md: Incorporacao do Codex na palestra SDD

## 1. Resumo Executivo

Este documento consolida a pesquisa e os requisitos especificos para incorporar **Codex App/CLI, da OpenAI** na palestra existente `palestra-sdd`. Ele nao define um novo produto nem um novo repositorio. O objetivo e reaproveitar o material pesquisado para enriquecer a palestra principal, agora reposicionada como **Spec-Driven Development com AI Coding Agents**.

Codex deve aparecer como um exemplo moderno e relevante de AI Coding Agent, especialmente por sua relacao direta com `AGENTS.md`, Skills, sandboxing, approval policies, automacoes, worktrees e modo nao interativo via `codex exec`. O foco continua sendo SDD: Codex e uma demonstracao concreta de como bons artefatos de contexto aumentam previsibilidade, reduzem retrabalho e ajudam a controlar custo de uso.

## 2. Problema

Desenvolvedores estao repensando o uso de assistentes de codigo devido a modelos de cobranca baseados em consumo e a maior autonomia dos agentes. Para a edicao Maio/2026 da palestra, a transicao anunciada pela GitHub para GitHub AI Credits a partir de 1 de junho de 2026 explicita que agentes multi-etapas geram maior demanda de inferencia e precisam de uma disciplina de uso mais madura. A documentacao oficial de models and pricing reforca o ponto: interacoes consomem input tokens, output tokens e cached tokens, e o custo depende do modelo e da quantidade de tokens.

Sem SDD, equipes tendem a:

- repetir contexto em cada sessao;
- escrever prompts longos e inconsistentes;
- gastar tokens com informacao irrelevante;
- aceitar diffs sem contrato de validacao;
- depender de comportamento especifico de uma ferramenta;
- ter dificuldade de auditar decisoes e resultados.

Codex e uma boa lente para explicar esse problema porque seu fluxo torna visiveis varias decisoes de engenharia: instrucoes persistentes, permissao de comandos, sandbox, leitura de arquivos, uso de skills, validacao e automacao.

## 3. Solucao Proposta

Adicionar uma secao ou bloco Codex dentro da palestra atual, sem transformar a apresentacao em "palestra sobre Codex".

A solucao deve:

- apresentar Codex App/CLI como um dos agentes compativeis com SDD;
- explicar como Codex usa `AGENTS.md` e Skills para contexto persistente e Progressive Disclosure;
- mostrar como sandbox e approvals ajudam a governar execucao;
- conectar `codex exec` a automacoes, CI e tarefas repetiveis;
- atualizar referencias e quiz para incluir Codex;
- preservar arquitetura e design system existentes.

## 4. Publico e Necessidades

| Persona | Necessidade |
|---------|-------------|
| Dev que usa Codex ocasionalmente | Entender como transformar uso ad-hoc em fluxo guiado por specs. |
| Dev que usa Copilot e esta avaliando alternativas | Perceber que SDD e portavel entre ferramentas. |
| Tech Lead | Definir um contrato de contexto para o time, independente do agente escolhido. |
| Engineering Manager | Conectar custo, governanca e produtividade a praticas tecnicas concretas. |

## 5. User Stories

- **US01**: Como participante, quero entender onde Codex se encaixa no fluxo SDD para avaliar se posso usar os mesmos artefatos em diferentes agentes.
- **US02**: Como desenvolvedor, quero ver como `AGENTS.md` e Skills reduzem repeticao de contexto no Codex.
- **US03**: Como tech lead, quero entender sandbox e approvals para permitir uso de agentes sem abrir mao de seguranca.
- **US04**: Como pessoa responsavel por produtividade, quero entender por que token-based billing aumenta a importancia de contexto enxuto.
- **US05**: Como palestrante, quero um roteiro de demo Codex que possa ser executado ao vivo ou substituido por fallback gravado.

## 6. Conteudo Codex Recomendado

### 6.1 Visao Geral

Codex deve ser apresentado como o agente de coding da OpenAI para escrever, entender, revisar, depurar e automatizar tarefas de desenvolvimento. A documentacao oficial descreve Codex como "one agent for everywhere you code", disponivel em experiencias como App, CLI, IDE Extension e Web/Cloud.

Conteudos a cobrir:

- **Codex App**: experiencia desktop para threads paralelas, projetos, worktrees, automacoes, Git integrado, terminal integrado e modos Local, Worktree e Cloud.
- **Codex CLI**: agente de terminal instalavel via `npm i -g @openai/codex@latest`, com suporte a macOS, Windows e Linux.
- **IDE Extension**: uso dentro do editor, aproveitando contexto local de arquivos e selecao de codigo.
- **Codex Cloud/Web**: execucao remota em ambientes configurados, quando aplicavel.
- **Codex Security**: governanca, sandbox, approvals e configuracoes administraveis.

### 6.2 Narrativa oficial do produto

A pagina publica do Codex em `openai.com/pt-BR/codex/` deve ser usada como fonte de narrativa, copy e inspiracao visual para a futura secao da palestra. Ela organiza Codex como um agente para desenvolver e lancar software com IA, com tecnologia do ChatGPT.

Pilares que podem virar slide:

- **Engenharia ponta a ponta**: features, refactors, migracoes, pull requests e tarefas dificeis.
- **Workflows multiagente**: Codex App como command center, com worktrees integrados e cloud environments para trabalho paralelo.
- **Skills alinhadas ao time**: Codex usa Skills para ir alem de escrever codigo e seguir padroes de equipe.
- **Automations**: tarefas recorrentes como triagem de issues, monitoramento de alertas e CI/CD.
- **Qualidade e entrega**: testes, revisao de codigo, commits, pull requests e deteccao antecipada de problemas.
- **Continuidade de superficie**: mesmo agente no App, no editor e no terminal.

Observacao visual: na pagina acessivel publicamente, os assets detectados sao imagens estaticas servidas pelo CDN/OpenAI, com conversao para WebP por query string. Nao foi detectado GIF ou video no HTML acessivel. Qualquer uso futuro deve validar direitos, origem, data de captura e atribuicao.

### 6.3 Contraste com Copilot billing

O billing do Copilot deve ser usado como motivacao para SDD, nao como ataque ao produto. A mensagem pedagogica e: quanto mais agentico, longo e contextual for o trabalho, mais importante se torna controlar contexto, escopo e validacao.

Pontos oficiais relevantes:

- A partir de 1 de junho de 2026, Copilot migra de request-based billing para usage-based billing.
- Interacoes consomem input tokens, output tokens e cached tokens.
- O custo depende do modelo usado e da quantidade de tokens consumidos.
- 1 GitHub AI Credit equivale a US$0.01.
- Planos individuais e Business/Enterprise possuem allowances, mas uso excedente e cobrado em GitHub AI Credits.
- Code completions e next edit suggestions continuam nao sendo cobradas em AI credits nos planos pagos.
- Copilot Code Review e uma excecao importante: o modelo pode ser selecionado automaticamente e, a partir de 1 de junho de 2026, runs em runners GitHub-hosted tambem consomem GitHub Actions minutes.
- Model multipliers para assinantes anuais Copilot Pro e Copilot Pro+ mudam em 1 de junho de 2026 e estao sujeitos a alteracao.

Aplicacao na palestra: explicar que SDD, PRDs curtos, `AGENTS.md`, Skills, Progressive Disclosure e checks automatizados ajudam a reduzir desperdicio por contexto irrelevante e repeticao de trabalho.

### 6.4 AGENTS.md

Pontos obrigatorios:

- Codex le `AGENTS.md` antes de trabalhar.
- A cadeia combina instrucoes globais, de projeto e de subdiretorios.
- `AGENTS.override.md` pode substituir instrucoes em um nivel especifico.
- `project_doc_fallback_filenames` permite nomes alternativos quando configurado.
- `project_doc_max_bytes` limita o tamanho combinado das instrucoes.
- Em SDD, `AGENTS.md` deve conter stack, comandos de validacao, convencoes, limites de seguranca e preferencias de revisao.

Exemplo conceitual para slide:

```markdown
# AGENTS.md

## Projeto
Aplicacao web Reveal.js para palestra sobre SDD.

## Regras
- Use as classes do design system existente.
- Nao adicione dependencias sem aprovacao.
- Rode npm run typecheck quando alterar TypeScript.

## Validacao
- npm run build:ts
- npm run typecheck
```

### 6.5 Skills

Pontos obrigatorios:

- Uma Skill e um diretorio com `SKILL.md` e, opcionalmente, `scripts/`, `references/`, `assets/` e `agents/openai.yaml`.
- Codex usa Progressive Disclosure: comeca com nome, descricao e caminho da skill; carrega o `SKILL.md` completo apenas quando decide usar a skill.
- Skills podem ser invocadas explicitamente com `$skill-name` ou via `/skills`, ou implicitamente pela descricao.
- Skills no repositorio ficam em `.agents/skills`.
- Para SDD, Skills podem encapsular padroes de frontend, backend, testes, seguranca, docs e release.

### 6.6 Sandbox e Approvals

Pontos obrigatorios:

- `read-only`: Codex inspeciona arquivos, mas nao edita nem executa comandos sem aprovacao.
- `workspace-write`: Codex pode ler, editar dentro do workspace e rodar comandos locais de rotina.
- `danger-full-access`: remove restricoes de filesystem e rede; usar apenas em ambiente controlado.
- `untrusted`: pede aprovacao para comandos fora do conjunto confiavel.
- `on-request`: trabalha dentro do sandbox e pede aprovacao para sair do limite.
- `never`: nao pausa para pedir aprovacao.
- `--full-auto` e o preset de menor friccao local: `--sandbox workspace-write --ask-for-approval on-request`.

Mensagem pedagogica: sandbox e approvals sao parte do harness. Eles nao substituem testes e revisao, mas reduzem risco operacional.

### 6.7 codex exec

Pontos obrigatorios:

- `codex exec` e o modo nao interativo para pipelines, CI, scripts e workflows automatizados.
- Por padrao, roda em sandbox read-only.
- Para permitir edicoes, usar `codex exec --full-auto "<task>"`.
- Para saida machine-readable, usar `--json`.
- Para salvar a resposta final, usar `--output-last-message` ou `-o`.
- Para saida estruturada, usar `--output-schema`.
- Em CI, preferir credenciais via secret e tratar prompts/tool output como possivelmente sensiveis.

Exemplo seguro para slide:

```bash
codex exec --full-auto --json --output-last-message resumo.md \
  "Leia o PRD.md, implemente apenas o requisito RF01, rode os testes e pare."
```

### 6.8 Slash commands uteis para SDD

Nao listar todos os slash commands nos slides. A palestra deve destacar apenas os comandos que ajudam a explicar SDD, contexto enxuto, governanca e validacao:

- `/init`: cria um scaffold de `AGENTS.md` para instrucoes persistentes do repositorio.
- `/mention`: aponta arquivos relevantes como `PRD.md`, specs, diffs e arquivos de codigo.
- `/permissions`: ajusta autonomia, sandbox e approvals durante a sessao.
- `/status`: mostra modelo, approval policy, writable roots e uso de tokens.
- `/compact`: resume o historico e libera contexto mantendo informacoes criticas.
- `/diff`: revisa mudancas staged, unstaged e arquivos nao rastreados.
- `/review`: pede revisao do working tree com foco em comportamento, bugs e testes.

Mensagem pedagogica: comandos sao controles operacionais do fluxo. Eles nao substituem a spec; ajudam a tornar contexto, permissao, diff e revisao mais explicitos.

### 6.9 Codex App

Pontos obrigatorios:

- O App permite trabalhar com threads em paralelo.
- Worktree isola mudancas e ajuda a experimentar sem tocar diretamente no diretorio principal.
- Automacoes podem executar tarefas recorrentes.
- Terminal integrado permite validar mudancas sem sair do app.
- Git tools permitem revisar diff, stage, commit, push e PR dentro da experiencia.
- No Windows, ha suporte a sandbox nativo em PowerShell.

## 7. Estrutura Recomendada nos Slides

O conteudo Codex deve entrar como uma vertical section dentro da futura secao **AI Coding Agents**, ou como substituicao gradual da secao hoje centrada em Copilot.

Proposta compacta:

| Slide | Objetivo |
|-------|----------|
| Codex em uma frase | Mostrar App, CLI, IDE e Cloud como superficies de uso. |
| Codex como produto | Apresentar os pilares oficiais: engenharia ponta a ponta, multiagente, Skills, Automations e qualidade. |
| Codex + SDD | Mapear `PRD.md`, `AGENTS.md`, Skills, testes e CI para o fluxo do agente. |
| Billing e economia de contexto | Contrastar Copilot usage-based billing com a necessidade de contexto enxuto. |
| Sandbox e approvals | Explicar governanca sem entrar em detalhe excessivo de flags. |
| Comandos Codex no fluxo SDD | Curar slash commands para contexto, permissao, diff, review e compactacao. |
| Progressive Disclosure com Skills | Mostrar economia de contexto. |
| `codex exec` | Conectar SDD a automacao e CI. |

## 8. Demo Recomendada

### Objetivo

Demonstrar em menos de 10 minutos o ciclo:

`PRD.md` -> `AGENTS.md` -> Skill -> Codex CLI/App -> diff -> validacao.

### Roteiro

1. Mostrar `PRD.md` com um requisito pequeno.
2. Mostrar `AGENTS.md` com stack, comandos e restricoes.
3. Mostrar uma Skill simples em `.agents/skills`.
4. Executar Codex em modo interativo ou `codex exec --full-auto` em workspace isolado.
5. Revisar diff e logs de validacao.
6. Fechar com a tese: a spec reduz prompt, retrabalho e custo.

### Fallback

Manter screenshots ou video curto do fluxo, porque a demo depende de auth, rede, estado do CLI e ambiente local.

## 9. Riscos

| Risco | Mitigacao |
|-------|-----------|
| Codex muda comandos e flags rapidamente | Revisar docs oficiais e changelog antes da palestra. |
| A palestra virar tutorial de Codex | Limitar Codex a exemplo pratico de SDD. |
| Audiencia interpretar SDD como solucao de custo garantida | Explicar que SDD reduz desperdicio, mas nao elimina custo de inferencia. |
| Demo falhar por ambiente | Preparar fallback gravado. |
| Conteudo de modelos ficar datado | Evitar lista extensa de modelos; focar em capacidades e links oficiais. |
| Pricing do Copilot ficar desatualizado | Nao copiar tabelas completas; linkar documentacao oficial e revisar antes da palestra. |
| Assets oficiais do Codex gerarem risco de direito de uso | Usar como referencia visual ate validar permissao, atribuicao e alternativa propria. |

## 10. Criterios de Aceite

- Codex e apresentado como exemplo de AI Coding Agent, nao como tema principal.
- O documento nao instrui criar novo repositorio.
- O documento nao exige redesign Cyberpunk ou troca de paleta.
- As afirmacoes tecnicas apontam para fontes oficiais.
- A implementacao futura pode ser feita incrementalmente no repo atual.
- O billing do Copilot e tratado como motivacao economica para SDD, sem virar comparativo comercial.
- A pagina publica do Codex e registrada como referencia visual/narrativa, sem copiar assets automaticamente.

## 11. Referencias Oficiais

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
- [Non-interactive mode — Codex](https://developers.openai.com/codex/noninteractive)
- [Codex changelog](https://developers.openai.com/codex/changelog)
- [GitHub Copilot usage-based billing — GitHub Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Models and pricing for GitHub Copilot — GitHub Docs](https://docs.github.com/pt/copilot/reference/copilot-billing/models-and-pricing)

## 12. Politica de Atualizacao

Antes de transformar este PRD em slides:

- Revisar o changelog do Codex.
- Confirmar nomes e comportamento das flags.
- Confirmar instalacao atual do CLI.
- Confirmar status de Skills, plugins, MCP e App features.
- Validar se a noticia de billing teve atualizacoes apos a edicao Maio/2026.
- Revisar a documentacao de models and pricing do Copilot, especialmente GitHub AI Credits, model multipliers e Code Review.
- Revisar a pagina publica do Codex e confirmar se os assets continuam estaticos ou se houve mudanca para video/GIF.
- Registrar data de verificacao nas speaker notes dos slides tecnicos.
