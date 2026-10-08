# R2 — reconciliação por entidade (continuação)

Projeto: Reconstrução Escolar + ENEM e Vestibulares 2027.
Data/hora: 2026-10-08 06:30 America/Sao_Paulo.
Repositório: andertrunks/reconstrucao-escolar-2027.
Branch remota de continuidade: fix/cloud-progress-cas-20261008; PR draft #3.
Commit inicial: 9934c25477876331aad660cd45a91c32a8a4ee35.
Commit deste lote: consultar o commit que adicionou este arquivo; não confundir com main.
Estado anterior e matriz: docs/PRIORIDADE_ZERO_2026-10-08.md; resultado final anterior em main: docs/PRIORIDADE_ZERO_2026-10-08_RESULTADO.md (cf7810d).

Último item concluído localmente: R2, reconciliação por entidade com versões preservadas.
Adicionados: src/reconciliation.ts; src/reconciliation.test.ts; este checkpoint.
Modificados: src/model.ts; src/study.ts; src/cloud.ts; src/App.tsx.
Implementação: snapshots legados v1 continuam aceitos. Cada edição registra apenas os itens alterados, e inicializa as versões dos itens legados antes de alterar o timestamp global. Merge preserva versões distintas de respostas, tópicos e caderno; desempate determinístico; respostas vazias não substituem respostas preenchidas. Contadores não são somados, não se fabricam tentativas/conclusões/domínio. Importação/exportação preserva histórico. Histórico remoto inválido é rejeitado antes da escrita.
Limite dos legados: sem timestamps por item não é possível saber a ordem real de conflitos já ocorridos; usa-se timestamp global como fallback e conservam-se ambas as versões para recuperação. Não alegar recuperação de dados anteriormente perdidos. Histórico guarda valores completos e ainda precisa de política de compactação causal para edições extensas; não truncar versões conflitantes silenciosamente.
Testes: 21 unitários aprovados (11 novos neste lote), lint e TypeScript aprovados. Cobrem edição independente, revisão, resposta vazia, conflito legado, idempotência, comutatividade, associatividade, importação, dados inválidos e não mutação.
Build de produção aprovado com 20 testes na primeira rodada; após ajuste de importação foram executados 21 testes/lint/TypeScript, repetir build antes de publicar.
Conteúdo validado: 48 aulas integrais, 1740 questões, 303 visuais, 37 itens diagnósticos. Nenhum conteúdo editorial integrado/publicado e nenhum dado pessoal utilizado nos testes.
Push: feito pelo conector GitHub no commit associado a este checkpoint, confirmar SHA remoto antes de continuar.
Deploy: não solicitado para esta branch. PR continua draft. Não integrado a main.
URL pública: https://andertrunks.github.io/reconstrucao-escolar-2027/ — nenhuma nova versão desta correção publicada/verificada.
CLOUD PROGRESS: NÃO VALIDADO. Transporte CAS testado apenas com simulação; falta sessão de teste autenticada autorizada para aceitação A/B remota.
Pendências: serialização local entre load/save/reconexão; guarda de conta e resposta tardia; migração concorrente; trilha curricular/revisões; offline real; aceitação remota A/B. Central e Tribunais seguem nos checkpoints anteriores, sem alterações neste lote.
Próxima ação EXATA: em src/storage.ts, serializar operações locais e vincular cada snapshot à conta que o carregou; impedir reatribuição de snapshots da conta A à B ou guest após troca/falha de auth. Criar testes isolados de corrida load/save/online, troca A→B e migração de current/guest; depois integrar o ciclo de troca de identidade em src/App.tsx e CloudAccountBar.tsx. Não mesclar PR #3 antes desses testes e do teste remoto obrigatório.
