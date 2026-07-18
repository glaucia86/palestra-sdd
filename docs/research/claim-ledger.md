# Claim ledger — apresentação SDD

Snapshot operacional verificado em **2026-07-17**. Este arquivo é o sistema de registro para claims voláteis; os slides continuam enxutos e não funcionam como catálogo de preços ou modelos.

## Claims de alta volatilidade

| ID | Claim e fonte primária | Verificado em | Superfície | Plano/status | Caveats | Locales/slides | Owner |
|---|---|---:|---|---|---|---|---|
| `CLM-COP-001` | Copilot mede uso agentic em GitHub AI Credits; 1 crédito equivale a US$ 0,01. [GitHub Docs](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) | 2026-07-17 | Copilot Chat, CLI, cloud agent, Spaces, Spark e agentes terceiros | Regime usage-based atual; allowances variam por plano | Modelo, tokens, contexto e feature alteram consumo; não comparar créditos com tokens ou unidades de outro fornecedor | PT/EN/ES; `agent-loop-economy` e notes de `github-copilot` | Autora |
| `CLM-COP-002` | Pro, Pro+ e Max publicam allowances mensais de 1.500, 7.000 e 20.000 AI Credits. [GitHub Docs](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) | 2026-07-17 | Planos individuais do GitHub Copilot | Publicado; revisar antes de cada palestra | Flex allotment pode mudar; não levar números para hero copy | Ledger/notes; PT/EN/ES; `agent-loop-economy` | Autora |
| `CLM-COP-003` | Clientes Business/Enterprise existentes têm allowance promocional maior de 1 jun. a 1 set. 2026. [GitHub Docs](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) | 2026-07-17 | Copilot Business e Enterprise | Promoção temporária | Expira em 1 set. 2026; após isso volta ao allowance padrão | Ledger apenas; não está na rota principal | Autora |
| `CLM-OAI-001` | Codex aceita login ChatGPT para acesso de assinatura e API key para acesso usage-based; Codex cloud requer ChatGPT. [OpenAI Docs](https://developers.openai.com/codex/auth) | 2026-07-17 | Codex CLI, IDE, desktop e cloud | Dois regimes de autenticação e governança | API key segue organização/políticas da API; ChatGPT segue workspace, RBAC, retenção e residência do ChatGPT | PT/EN/ES; `codex-app-cli`, `agent-loop-economy` | Autora |
| `CLM-OAI-002` | O rate card atual do Codex mede créditos por milhão de tokens de entrada, cache e saída; uma minoria Enterprise ainda usa card legado. [OpenAI Help](https://help.openai.com/en/articles/20001106-codex-rate-card) | 2026-07-17 | Codex com login ChatGPT | Token-based para a maioria; exceção Enterprise em migração | Modelos, fast mode e workspace mudam consumo; não congelar valores no slide | Ledger/notes; PT/EN/ES; `agent-loop-economy` | Autora |
| `CLM-OAI-003` | API cobra tokens e também itens como containers e tool calls conforme a tabela vigente. [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) | 2026-07-17 | OpenAI API | Usage-based | Custos de tools/containers não são equivalentes ao rate card do Codex por assinatura | PT/EN/ES; notes de `agent-loop-economy` | Autora |
| `CLM-DEV-001` | Devin self-serve combina quota incluída e on-demand credits; Enterprise usa ACUs conforme order form. [Devin Docs](https://docs.devin.ai/admin/billing) | 2026-07-17 | Devin Cloud, CLI/Terminal e Review | Self-serve versus Enterprise | Unidades e contrato diferem; não comparar diretamente com AI Credits ou tokens | PT/EN/ES; `devin-superficies`, `agent-loop-economy` | Autora |
| `CLM-DEV-002` | Self-serve publica Free, Pro US$20/mês, Max US$200/mês e Teams mínimo US$80/mês. [Devin Docs](https://docs.devin.ai/admin/billing/self-serve) | 2026-07-17 | Planos self-serve | Preço publicado; revisão obrigatória antes da palestra | Quotas, seats, Review e on-demand credits têm regras próprias; ledger/notes apenas | Ledger/notes; PT/EN/ES; `agent-loop-economy` | Autora |

## Política de manutenção

- Revisar `CLM-COP-*`, `CLM-OAI-*` e `CLM-DEV-*` antes de cada apresentação pública.
- Atualizar fonte, data, status, caveats e todos os locales na mesma mudança.
- Fonte primária indisponível não autoriza inferência: encerrar em `BLOCKED` ou `NEEDS_HUMAN_REVIEW`.
- Mudança de preço, modelo, promoção ou depreciação gera proposta pequena; não cria catálogo novo na rota principal.
- Preservar o snapshot anterior no histórico Git; não manter copy obsoleta no slide para “documentar” a mudança.
- Owner editorial e gate de publicação permanecem com a autora.

