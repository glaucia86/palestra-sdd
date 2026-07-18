# Release candidate de julho de 2026 — evidências S17

**Estado:** `DONE_VERIFIED`  
**Data da consolidação:** 2026-07-17  
**Escopo:** master deck técnico localizado; nenhuma tag, release, merge ou publicação executada.

**Aprovação final:** `APROVO_S17_COM_ADIAMENTOS` — ratifica DEC-002/007 e aprova o adiamento explícito de Speaker View, print/PDF e rehearsals de duração.

Este documento consolida as evidências técnicas das slices S00–S16 e a aprovação humana final da S17. Limitações de ambiente permanecem registradas e foram aceitas explicitamente; não foram convertidas em evidência técnica inexistente.

## Pirâmide de validação

| Nível | Evidência | Resultado |
|---|---|---|
| L0 — contrato | `doc-specs/spec.md`, `doc-specs/implementation-slice.md`, handoffs S01–S16 | PASS; Source IDs e ACs estão ligados às slices e aos verificadores abaixo |
| L1 — TypeScript | `npm run typecheck` | PASS em 2026-07-17 |
| L2 — emissão | `npm run build:ts` | PASS em 2026-07-17; emissão precisou rodar fora do sandbox por bloqueio `EPERM`, sem erro TypeScript |
| L3 — dados/estrutura | `verify:loader`, `verify:identity`, `verify:spec-kit`, `verify:quiz`, `verify:agents`, `verify:context`, `verify:economy`, `verify:economy-locales`, `verify:harness`, `verify:loop`, `verify:loop-locales`, `verify:closing`, `verify:deck`, `verify:content-refresh`, `verify:pages` | PASS |
| L4/L5 — browser/features | matriz executada na S14 para locales, deep links, notes, normal/lite, demo e finale | PASS no escopo executado; nova tentativa S17 não anexou a webview |
| L6 — visual/a11y | viewport de palco e modos normal/lite amostrados nas slices; checks estruturais de alt, notes, IDs, Lucide e reduced motion | Aprovado com adiamento explícito de Speaker View, print/PDF e rehearsals |
| L7 — editorial | ledger oficial, datas, caveats e paridade localizada | Aprovado pela autora em `APROVO_S17_COM_ADIAMENTOS` |

O comando informativo `npx tsc -p tsconfig.typecheck-js.json --pretty` continua reportando 37 diagnósticos preexistentes: a configuração isolada do JavaScript não inclui as declarações globais do runtime e perde os tipos DOM preservados na fonte TypeScript. O gate autoritativo da fonte (`npm run typecheck`) e a emissão (`npm run build:ts`) passam. Corrigir esse checker exige uma slice própria; desabilitar `checkJs` apenas esconderia o problema.

## Cobertura dos Source IDs e ACs P0

A matriz requisito a requisito está em `docs/release-ac-matrix-2026-07.md`: ela contém os 50 ACs normativos da seção 24, com 49 em `PASS` e `AC-REL-003` em `APPROVED_DEFERRAL`.

| Família | Evidência autoritativa |
|---|---|
| Shell, loader e degradação (`AC-RUN-*`, `ARQ-*`, `LOD-*`) | `verify:loader`, `verify:deck`, browser S14 |
| Identidade, julho e narrativa (`AC-CNT-001..005`) | `verify:identity`, aprovações S02/S05, três capas localizadas |
| spec-kit e Agent Skills (`AC-CNT-006..008`) | `verify:spec-kit` |
| AI Coding Agents e localização (`JUL-AC-DEVIN-*`, `JUL-AC-I18N-*`) | `verify:agents`, `verify:deck`, aprovação S06 |
| Context, Economy, slices, handoffs e routing (`AC-CTX-*`) | `verify:context`, `verify:economy`, `verify:economy-locales` |
| Harness e Loop (`AC-LOOP-*`) | `verify:harness`, `verify:loop`, `verify:loop-locales`, `verify:content-refresh` |
| Quiz e lifecycle (`AC-QUIZ-*`, `AC-MOT-*`) | `verify:quiz`, `verify:closing`, browser S14 |
| Release, segurança e direitos (`AC-SEC-*`, `AC-REL-*`) | `verify:deck`, `verify:pages`, `verify:release`, ausência de diff em `resources/` |

`04a-context-economy.html` e `04c-loop-engineering.html` existem em PT-BR, EN-US e ES-ES e aparecem na ordem canônica dos quatro manifests. IDs protegidos, notes, deep links, alt text e quiz são auditados deterministicamente por `verify:deck` e pelos validadores especializados.

## Decisões DEC-001..010

| Decisão | Estado S17 | Evidência/ação |
|---|---|---|
| DEC-001 — título | Aprovada | `SDD com AI Coding Agents`, aprovação S02 |
| DEC-002 — rotas | Aprovada | ratificada em `APROVO_S17_COM_ADIAMENTOS`; master deck preservado e nenhum runtime novo introduzido |
| DEC-003 — notes por ID | Aprovada | `APROVO_DEC_003_004`; `verify:deck` e fixtures negativas |
| DEC-004 — script Node | Aprovada | `APROVO_DEC_003_004`; validadores sem dependência nova |
| DEC-005 — preflight Pages | Aprovada | `APROVO_DEC_005`; workflow e fixtures fail-closed |
| DEC-006 — Lucide | Aprovada | `APROVO_DEC_006_MANTER_LATEST_NESTA_RC`; `index.html` permanece em `lucide@latest` nesta candidata |
| DEC-007 — posição de erro | Aprovada | ratificada em `APROVO_S17_COM_ADIAMENTOS`; posição original preservada e `verify:loader` passa |
| DEC-008 — asset Codex | Aprovada como “não usar” | aprovação S05; nenhum asset novo foi adicionado |
| DEC-009 — nome `03-copilot.html` | Aprovada | nome preservado para reduzir churn; conteúdo agnóstico validado |
| DEC-010 — derivação executiva | Adiada conforme contrato | somente após aprovação do master deck; nenhum derivado criado |

## Gates humanos

| Gate | Owner | Estado | Evidência/pendência |
|---|---|---|---|
| Correção factual | Revisor técnico/autora | Aprovado | ledger, fontes primárias e datas 2026-07-15/16/17; aprovação S17 |
| Narrativa | Autora | Aprovado | aprovações incrementais e `APROVO_S17_COM_ADIAMENTOS` |
| Transparência | Autora/revisor | Aprovado | disclosures Codex/Devin localizados e aprovação S17 |
| Design | Autora/revisor visual | Aprovado com adiamento | paleta preservada; print/PDF e rehearsals adiados explicitamente |
| Acessibilidade | Revisor/autora | Aprovado com adiamento | checks estruturais verdes; Speaker View adiado explicitamente |
| Localização | Revisores PT/EN/ES/autora | Aprovado | paridade determinística verde e aprovação S17 |
| Runtime | Desenvolvimento | Aprovado tecnicamente | typecheck, build e validadores verdes; limitação do browser documentada |
| Segurança/direitos | Autora/revisor | Aprovado | scan público verde, nenhum diff em `resources/` e aprovação S17 |
| Release | Autora | Aprovado | master deck `DONE_VERIFIED`; publicação não foi executada |

## Segurança, direitos e publicação

- O artefato público é limitado a `index.html`, `css/`, `js/`, `resources/` e `slides/`.
- `verify:release` rejeita padrões de credencial no artefato público e no worktree versionável. As quatro referências públicas ao Itaú ficam limitadas à bio profissional aprovada no README e nos três locales; nenhuma delas contém dado interno, budget, quota, repositório ou credencial.
- `git status -- resources` e `git diff -- resources` estão vazios: não há asset novo a licenciar nesta candidata.
- O workflow usa artifact staging com allowlist e não publica documentos internos, `.git`, `.harness`, `node_modules` ou arquivos de credencial.
- `package.json` permanece em `2.3.0` e `CHANGELOG.md` não recebeu entrada de julho. A aprovação agora permite uma proposta futura, mas nenhuma alteração foi solicitada nem necessária para concluir as slices.
- O `npm ci` da S16 reportou dez vulnerabilidades já presentes na árvore (5 moderadas, 4 altas e 1 crítica). Não foi executado `npm audit fix`, pois isso alteraria dependências fora do escopo.

## Limitações aceitas

1. A matriz visual executada na S14 validou normal/lite, deep links, notes e lifecycle; o popup de Speaker View foi bloqueado pelo navegador embutido.
2. Na retentativa S17, a webview não anexou em duas tentativas. Nenhuma automação alternativa foi usada como substituto de evidência visual.
3. Print/PDF e rehearsals de 60–75, 45–55 e 30–40 minutos não foram executados nesta sessão. A autora aprovou explicitamente o adiamento em `APROVO_S17_COM_ADIAMENTOS`.

## Próxima ação

A candidata foi aprovada em `APROVO_S17_COM_ADIAMENTOS` e está `DONE_VERIFIED`. Nenhum changelog, version bump, tag, release, merge ou deploy foi executado. Resta apenas registrar o fechamento operacional no harness uma única vez, depois do gate textual `MODELO_ECONOMICO_CONFIRMADO`.
