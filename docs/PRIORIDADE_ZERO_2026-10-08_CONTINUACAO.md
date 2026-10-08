# Continuação da prioridade zero — 08/10/2026, 06:43 America/Sao_Paulo
Projeto: Reconstrução Escolar + ENEM e Vestibulares 2027.
Repositório: andertrunks/reconstrucao-escolar-2027.
Checkpoint main anterior: cf7810d964fdb8569c5f99ff5e77e1e986348fab.
Branch funcional: fix/cloud-progress-cas-20261008, PR draft #3.
Commit inicial desta continuação: 9934c25477876331aad660cd45a91c32a8a4ee35.
Commits persistidos: b5c4a7f8f464aaa24fcf3baae4e47456fbf13b45 (R2), bcd061740509e7770b818e82b644558fb8e05ea2 (R3).
Último item: R3 — cache transacional e isolamento de conta.
Leia na branch os checkpoints docs/PRIORIDADE_ZERO_R2_2026-10-08.md e docs/PRIORIDADE_ZERO_R3_2026-10-08.md, que detalham arquivos, testes, limites e próximos passos. Não refazer R1/R2/R3 nem partir do checkpoint antigo como se a PR ainda contivesse apenas CAS.
Resultado: preservação de versões por entidade; snapshots com owner; dados legados mantidos e reservados; local não aguarda rede; troca A→B e retornos tardios protegidos na UI.
Testes locais: 32 aprovados; lint, TypeScript, conteúdo e build aprovados. IDB/DOM e transporte isolados, sem tocar em dados reais. CI R2 validate success, deploy skipped (Actions 37757226444); conferir CI R3 pelo SHA.
Push: confirmado head da PR bcd061740509e7770b818e82b644558fb8e05ea2. Não houve merge/deploy funcional. URL https://andertrunks.github.io/reconstrucao-escolar-2027/ sem versão nova verificada.
Conteúdos integrados/publicados: 0/0. Dados individuais alterados: nenhum.
CLOUD PROGRESS: NÃO VALIDADO; faltam sessões autenticadas de conta de teste para A/B remoto.
Pendências: compactação causal sem perder conflitos; retry limitado; cliente Supabase/offline integral; trilha curricular/revisões e aceitação remota.
Próxima ação EXATA: recuperar PR #3 no SHA bcd0617 e seus dois checkpoints; testar edição longa e falha temporária em src/reconciliation.ts/src/storage.ts, implementar compactação causal e retry limitado, depois scheduler curricular em Home com testes; executar A/B remoto antes de publicar.
Central e Tribunais: sem alterações nesta continuação. Preservar checkpoints anteriores; conta/cloud da Central e scheduler de Tribunais continuam pendentes. Fluxo editorial ainda bloqueado pela prioridade zero.
