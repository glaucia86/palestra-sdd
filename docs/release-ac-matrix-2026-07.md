# Matriz de critérios de aceite — release candidate julho 2026

Esta matriz rastreia todos os critérios normativos da seção 24 de `doc-specs/spec.md`. `PASS` significa evidência técnica atual; `APPROVED_DEFERRAL` significa que a autora aprovou explicitamente o adiamento da validação manual indicada, sem convertê-la em evidência técnica inexistente.

| AC | Estado | Evidência autoritativa |
|---|---|---|
| AC-RUN-001 | PASS | `verify:identity`, `verify:loader`, browser S14 |
| AC-RUN-002 | PASS | `verify:loader`, fixture de locale inválido |
| AC-RUN-003 | PASS | `verify:closing`, browser S14 em lite |
| AC-RUN-004 | PASS | `verify:loader`, fixture manifest 404 |
| AC-RUN-005 | PASS | `verify:loader`, fixture manifest vazio |
| AC-RUN-006 | PASS | `verify:loader`, falha da segunda parte preserva posição |
| AC-RUN-007 | PASS | `verify:loader`, fixture de markup escapado |
| AC-RUN-008 | PASS | `verify:identity`, preservação de query/hash |
| AC-RUN-009 | PASS | `verify:loader`, rejeição de fonte não bloqueia Mermaid |
| AC-RUN-010 | PASS | `verify:loader`, Mermaid processado não rerenderiza |
| AC-CNT-001 | PASS | `verify:identity`, `verify:agents` |
| AC-CNT-002 | PASS | `verify:identity`, três capas de julho de 2026 |
| AC-CNT-003 | PASS | `verify:identity`, nove cards de sumário |
| AC-CNT-004 | PASS | `verify:agents`, ausência de catálogo fixo |
| AC-CNT-005 | PASS | `verify:agents`, `verify:content-refresh`, claim ledger |
| AC-CNT-006 | PASS | `verify:spec-kit`, sintaxe atual e notes datadas |
| AC-CNT-007 | PASS | `verify:spec-kit`, `/speckit.converge` e artefatos canônicos |
| AC-CNT-008 | PASS | `verify:spec-kit`, `verify:context`, `verify:harness` |
| AC-CNT-009 | PASS | `verify:deck` e validadores localizados |
| AC-CNT-010 | PASS | `verify:deck`, 72/72 notes no master PT/default e notes por leaf nos locales |
| AC-CTX-001 | PASS | `verify:economy`, desigualdade de contexto |
| AC-CTX-002 | PASS | `verify:economy`, `verify:economy-locales`, heurística calibrável |
| AC-CTX-003 | PASS | `verify:economy`, cache não amplia atenção útil |
| AC-CTX-004 | PASS | `verify:economy`, contrato de slice completo |
| AC-CTX-005 | PASS | `verify:economy`, fixture de slice horizontal rejeitada |
| AC-CTX-006 | PASS | `verify:economy`, envelope de handoff completo |
| AC-CTX-007 | PASS | `verify:economy`, transcript sem síntese rejeitado |
| AC-CTX-008 | PASS | `verify:economy`, model routing por risco/fase |
| AC-QUIZ-001 | PASS | `verify:quiz`, 12 questões e quatro opções por locale |
| AC-QUIZ-002 | PASS | `verify:quiz`, score idempotente |
| AC-QUIZ-003 | PASS | `verify:quiz`, Next/Finish na última questão |
| AC-QUIZ-004 | PASS | `verify:quiz`, restart zera estado |
| AC-QUIZ-005 | PASS | `verify:quiz`, fixture inválida localizada |
| AC-MOT-001 | PASS | `verify:closing`, motion preferences, browser S14 |
| AC-MOT-002 | PASS | `verify:closing`, demo entra OFF e silenciosa |
| AC-MOT-003 | PASS | `verify:closing`, cleanup de áudio/RAF/timers/Three.js |
| AC-MOT-004 | PASS | `verify:closing`, fallback HTML/CSS |
| AC-MOT-005 | PASS | `verify:closing`, finale exige gesto |
| AC-MOT-006 | PASS | `verify:closing`, saída reseta música/hyperdrive |
| AC-LOOP-001 | PASS | `verify:loop-locales`, nove IDs em cada locale |
| AC-LOOP-002 | PASS | `verify:loop`, stop condition e terminal states |
| AC-LOOP-003 | PASS | `verify:loop-locales`, caveat probabilístico |
| AC-LOOP-004 | PASS | `verify:content-refresh`, cenário exhausted em três iterações |
| AC-LOOP-005 | PASS | `verify:content-refresh`, máximo draft PR e sem merge/release/deploy |
| AC-SEC-001 | PASS | `verify:release`, scan público e do worktree versionável |
| AC-SEC-002 | PASS | `verify:release`, nenhum diff em `resources/`; novos slides sem assets |
| AC-REL-001 | PASS | `npm run typecheck`, `npm run build:ts` |
| AC-REL-002 | PASS | rebuild TypeScript concluído; `js/app/*` emitido pela fonte |
| AC-REL-003 | APPROVED_DEFERRAL | normal/lite e features validados na S14; print, Speaker View e rehearsals adiados em `APROVO_S17_COM_ADIAMENTOS` |
| AC-REL-004 | PASS | candidata aprovada pela autora; nenhuma publicação automática foi executada |

## Resultado

- 49 critérios com evidência técnica `PASS`.
- 1 critério em `APPROVED_DEFERRAL`: AC-REL-003.
- Não há AC normativo omitido nem gate humano pendente na S17.
