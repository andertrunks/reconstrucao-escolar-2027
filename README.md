# Reconstrução Escolar + ENEM e Vestibulares 2027

Plataforma de Anderson Luis Costa. React, TypeScript e Vite, conteúdo JSON separado da interface e progresso local em IndexedDB. Não recomeçar: consultar docs/PROJECT_STATUS.md, fontes do Drive e histórico Git antes de qualquer alteração.

## Desenvolvimento

Node 22. `npm ci`, `npm run dev`.

Validação: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e`. Para Edge, definir TEST_EDGE=1 antes do teste de navegador. TEST_URL permite testar a versão publicada.

## Conteúdo

A versão 0.2.0 acrescenta 48 aulas integrais de Estatística, 1.740 questões e 303 recursos visuais. Fontes e edições anteriores acompanham as aulas. O diagnóstico autoral de 37 questões permanece integral; sua fonte não possui correções. A interface salva tentativas e libera o gabarito de prática após uma tentativa salva, sem pontuação ou domínio automáticos. Nenhum resumo de conversa é tratado como aula.

Há lacunas no acervo histórico, inclusive MAT-EST-012 a 030. As aulas avançadas indicam pré-requisitos indisponíveis e podem ser consultadas. O catálogo permite mostrar referências pendentes sem apresentá-las como aulas completas. Veja docs/PUBLICATION_2026-10-03.md para escopo, evidências e limitações da atualização.

Consulte docs/CONTENT_MODEL.md e docs/EDITORIAL_INDEX.md. Fontes consolidadas em docs/SOURCES.md. O estado editorial é separado do progresso do estudante.

## Dados pessoais

Respostas e erros permanecem no navegador. Backup JSON exportável e restaurável; a restauração mescla dados preservando registros atuais. Não há backend, anúncios, rastreadores nem serviços pagos.
