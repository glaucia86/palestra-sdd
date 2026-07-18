# Operação manual `content-refresh`

`content-refresh` é um procedimento manual e bounded para revisar claims voláteis da apresentação. Não é scheduler, bot nem YAML executável.

## Contrato

- **Trigger:** manual, antes de palestra pública ou quando uma fonte oficial anuncia mudança relevante.
- **Objetivo:** atualizar somente claims afetadas com fonte primária, manter PT-BR/EN-US/ES-ES coerentes e produzir no máximo um draft PR revisável.
- **Papéis:** researcher localiza fonte e registra data; editor propõe o menor diff; verifier executa checks e preserva evidência; autora decide narrativa, design, merge e publicação.
- **Escopo permitido:** `docs/research/claim-ledger.md`, partes/notes afetadas, quiz se o conceito mudou, README/docs diretamente relacionados e verificadores.
- **Fora de escopo:** assets, paleta, dependências, scheduler, auto-merge, tag, release e deploy.
- **Limites:** no máximo 3 iterações, 3 tarefas de pesquisa em paralelo e 1 claim/slice ativo por execução.

## Fluxo

1. Detectar claims marcadas no ledger ou em `data-volatile-claim`.
2. Selecionar uma claim e registrar arquivos/locales afetados.
3. Consultar até três fontes primárias; fonte secundária serve apenas para descoberta.
4. Classificar como `NO_OP`, mudança verificável, fonte indisponível ou budget esgotado.
5. Se houver mudança, editar PT-BR/EN-US/ES-ES na mesma slice e atualizar o ledger.
6. Executar `npm run verify:deck` e os verificadores focados; executar typecheck/build quando TypeScript mudar.
7. Persistir handoff curto. Resultado válido pode chegar a draft PR, nunca a merge/release/deploy automático.

## Checks mínimos

```text
npm run verify:deck
npm run verify:agents       # quando a seção de agentes mudar
npm run verify:quiz         # quando o quiz mudar
npm run typecheck           # quando TypeScript mudar
npm run build:ts            # quando TypeScript mudar
git diff --check
```

Os verificadores determinísticos são o checker principal. Revisão factual, narrativa e visual continua humana.

## Terminal states

| Estado | Quando usar | Diff/PR permitido |
|---|---|---|
| `NO_OP` | Fonte confirma que claim, status e caveats continuam atuais | Sem diff artificial; sem PR |
| `NEEDS_HUMAN_REVIEW` | Mudança verificada e checks passam, mas copy/publicação depende da autora | Diff pequeno; no máximo draft PR |
| `BLOCKED` | Fonte primária indisponível, contraditória ou exige acesso não autorizado | Sem inferência e sem PR |
| `BUDGET_EXHAUSTED` | Terceira iteração ou terceiro ramo de pesquisa não resolve o caso | Parar sem retry infinito |
| `DONE_VERIFIED` | Mudança documental não editorial totalmente verificada e sem gate pendente | Handoff; draft PR opcional se solicitado |

## Evidência e resumo

- Sucessos repetitivos são resumidos como comando, exit code e contagem.
- Falhas preservam comando, sinal observado, fonte/arquivo e próxima ação.
- Nenhum transcript integral é usado como estado.
- O ledger é atualizado apenas quando a fonte foi verificada; o handoff registra o restante.

## Template de handoff

```markdown
# content-refresh handoff
- terminal_state:
- concluído:
- restante:
- branch/worktree:
- arquivos:
- decisões:
- hipóteses:
- checks:
- blockers:
- risco:
- budget: iterações X/3; tarefas paralelas Y/3
- próxima ação:
```

## Simulações de contrato

| Cenário | Iterações | Paralelo | Terminal | Resultado esperado |
|---|---:|---:|---|---|
| Claim sem alteração | 1 | 1 | `NO_OP` | zero diff e zero PR |
| Claim alterada com fonte primária | 2 | 3 | `NEEDS_HUMAN_REVIEW` | diff verificado; no máximo draft PR |
| Fonte primária indisponível | 1 | 2 | `BLOCKED` | evidência preservada, sem inferência |
| Budget esgotado | 3 | 3 | `BUDGET_EXHAUSTED` | parada definitiva, sem novo retry |

Execute `npm run verify:content-refresh` para repetir as quatro simulações.

