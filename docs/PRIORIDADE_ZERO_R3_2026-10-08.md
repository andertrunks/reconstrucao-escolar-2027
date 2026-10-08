# R3 — isolamento, migração e concorrência local

Projeto: Reconstrução Escolar + ENEM e Vestibulares 2027.
Data/hora: 2026-10-08 06:40 America/Sao_Paulo.
Repositório: andertrunks/reconstrucao-escolar-2027.
Branch remota: fix/cloud-progress-cas-20261008; PR draft #3.
Commit inicial R3: b5c4a7f8f464aaa24fcf3baae4e47456fbf13b45 (R2).
Commit final: o commit que adiciona este checkpoint, consultar histórico da branch.
Main permanece separado; não promover commits locais com SHAs diferentes dos remotos.

## Concluído e comprovado em ambiente isolado
- src/storage.ts: transação IndexedDB readwrite para leitura/reconciliação/gravação, também evitando sobrescritas locais entre abas. Rede fora da transação; salvamento local não aguarda a nuvem.
- Cada snapshot carrega owner explícito. Erro ao consultar sessão não transforma progresso autenticado em guest. Snapshot de A não é enviado como B. Gravações remotas serializadas por conta; retorno remoto é reconciliado novamente com cache atual.
- Migração não apaga current/guest. legacy-owner reserva o legado à primeira conta que o reconciliou, mesmo se o upload falha. Outra conta e o modo desconectado não recebem esse legado. Novo progresso guest após a reserva fica separado em guest-after-migration; não é importado automaticamente em outra conta. Backup manual continua disponível.
- App: mudança de identidade recarrega o estado e invalida resultados tardios. Callbacks antigos de importação/atividade não modificam conta nova. Reconexão atualiza estado visível sem registrar estudo fictício.
- CloudAccountBar: logout com scope local; não encerra sessão em outros dispositivos, não recarrega a página abortando operações locais. Resultado antigo de getSession não substitui evento de auth mais recente.
- Nenhum progresso pessoal ou registro remoto real foi usado nos testes. Nenhum schema/RLS/usuário alterado.

Arquivos modificados: src/storage.ts; src/App.tsx; src/CloudAccountBar.tsx; src/cloud.ts; package.json; package-lock.json; vitest.config.ts.
Arquivos adicionados: src/storage.test.ts; src/App.account.test.tsx; este checkpoint.
Dependências exclusivamente de testes, versões fixadas: fake-indexeddb 6.2.5 e jsdom 29.0.1.

## Validação
32 testes aprovados (21 anteriores + 8 IndexedDB/transportes isolados + 3 DOM/interface).
Cobertura nova: gravações concorrentes, rede lenta sem bloquear cache, retorno tardio, troca A→B, falha de auth, migração que falha remotamente, guest pré-login, reconexão/idempotência, legado inválido, carregamento tardio e callback antigo de importação.
Lint, TypeScript, validação de conteúdo e build de produção aprovados; git diff --check limpo.
Conteúdo continua 48 aulas integrais, 1740 questões, 303 visuais, 37 itens diagnósticos. Conteúdos integrados: 0. Conteúdos publicados: 0.
CI do commit R2: validate success; deploy skipped em Actions 37757226444. CI de R3 deve ser consultado pelo SHA remoto deste lote.
Push: conector GitHub autorizado, branch existente com verificação do SHA anterior. Conferir head após persistência.
Deploy/publicação: nenhuma; não houve merge em main. URL pública https://andertrunks.github.io/reconstrucao-escolar-2027/ permanece sem estas mudanças. Não foi declarada validação da versão pública neste lote.

## Limitações / gate
CLOUD PROGRESS: NÃO VALIDADO. Testes de transporte e DOM não equivalem ao teste A/B contra persistência remota.
Falta conta/sessão de teste autenticada para verificar A inicia/conclui/responde/gera revisão/sincroniza e B limpo recupera histórico/revisão/próximo estudo.
Ainda não existe scheduler curricular completo nesta branch. Offline completo em navegador também permanece pendente. Dependência Supabase externa pode impedir identificação offline após reload; auditar antes de aceitar offline-first.
O histórico R2 conserva versões completas de edições. Antes de publicação, avaliar tamanho e compactação causal sem perder conflitos; não truncar silenciosamente. Falha temporária com conexão ainda ativa precisa de política de retry limitada/backoff; atualmente novas edições e evento online retomam sincronização.
Testes entre abas usaram concorrência transacional de IDB simulado; navegador real entre abas/dispositivos ainda pendente.

## Próxima ação EXATA
1. Recuperar a branch da PR #3 pelo SHA remoto deste checkpoint, conferir CI e preservar R1/R2/R3.
2. Em src/reconciliation.ts e src/storage.ts, testar edição longa e falha transitória com conexão ativa; compactar apenas versões causalmente substituídas, preservando conflitos, e implementar retry limitado/backoff sem reatribuição de owner. Testar guest-after-migration e política de importação explícita.
3. Auditar carregamento offline do cliente Supabase e implementar scheduler puro sobre TopicSummary/StudyState, com testes de retomada, revisão vencida, avanço, alternância quando houver disciplinas publicadas e catálogo vazio; ligar à Home sem transformar abertura/publicação em domínio.
4. Executar aceitação remota A/B com conta de teste isolada, incluindo RLS e migração. Só então finalizar PR, publicar, verificar versão pública e registrar deploy.

Central de Estudos e Tribunais: nenhuma mudança nesta continuação. Retomada permanece nos checkpoints main anteriores (Central d8f03ec; Tribunais a237464). Não reiniciar auditoria dos três e não retomar editorial enquanto prioridade zero não estiver validada.
