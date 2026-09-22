# Reconstrução Escolar + ENEM e Vestibulares 2027

Plataforma de Anderson Luis Costa. React, TypeScript e Vite, conteúdo JSON separado da interface e progresso local em IndexedDB. Não recomeçar: consultar docs/PROJECT_STATUS.md, fontes do Drive e histórico Git antes de qualquer alteração.

## Desenvolvimento

Node 22. `npm ci`, `npm run dev`.

Validação: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e`. Para Edge, definir TEST_EDGE=1 antes do teste de navegador. TEST_URL permite testar a versão publicada.

## Conteúdo

A primeira versão contém o diagnóstico autoral integral com 37 questões. A fonte não possui correções; a interface salva respostas e indica correção pendente. Nenhum resumo de conversa é tratado como aula.

Consulte docs/CONTENT_MODEL.md e docs/EDITORIAL_INDEX.md. Fontes consolidadas em docs/SOURCES.md. O estado editorial é separado do progresso do estudante.

## Dados pessoais

Respostas e erros permanecem no navegador. Backup JSON exportável e restaurável; a restauração mescla dados preservando registros atuais. Não há backend, anúncios, rastreadores nem serviços pagos.
