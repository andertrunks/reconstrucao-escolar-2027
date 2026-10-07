# Reconstrução Escolar + ENEM e Vestibulares 2027

Plataforma de Anderson Luis Costa. React, TypeScript e Vite, conteúdo JSON separado da interface e progresso sincronizado na nuvem por Supabase. A nuvem é a referência principal do progresso autenticado; o IndexedDB mantém uma cópia offline por conta para recuperação, continuidade sem conexão e proteção contra falhas transitórias. Não recomeçar: consultar docs/PROJECT_STATUS.md, fontes do Drive e histórico Git antes de qualquer alteração.

## Desenvolvimento

Node 22. `npm ci`, `npm run dev`.

Validação: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e`. Para Edge, definir TEST_EDGE=1 antes do teste de navegador. TEST_URL permite testar a versão publicada.

## Conteúdo

A versão 0.2.0 acrescenta 48 aulas integrais de Estatística, 1.740 questões e 303 recursos visuais. Fontes e edições anteriores acompanham as aulas. O diagnóstico autoral de 37 questões permanece integral; sua fonte não possui correções. A interface salva tentativas e libera o gabarito de prática após uma tentativa salva, sem pontuação ou domínio automáticos. Nenhum resumo de conversa é tratado como aula.

Há lacunas no acervo histórico, inclusive MAT-EST-012 a 030. As aulas avançadas indicam pré-requisitos indisponíveis e podem ser consultadas. O catálogo permite mostrar referências pendentes sem apresentá-las como aulas completas. Veja docs/PUBLICATION_2026-10-03.md para escopo, evidências e limitações da atualização.

Consulte docs/CONTENT_MODEL.md e docs/EDITORIAL_INDEX.md. Fontes consolidadas em docs/SOURCES.md. O estado editorial é separado do progresso do estudante.

## Dados pessoais e sincronização

O `StudyState` autenticado é persistido na tabela `reconstrucao_escolar_progress` do Supabase e protegido por Row Level Security, RLS, com acesso restrito ao próprio `auth.uid()`. O login Google identifica a conta para sincronização entre dispositivos. Dados existentes do navegador são mesclados e enviados na primeira sincronização.

O IndexedDB mantém uma cópia offline por usuário autenticado, separada por `user:<UUID>`. Essa cópia não substitui a nuvem: ela permite continuar estudando sem conexão, recuperar alterações pendentes e evita que um logout ou uma falha de migração elimine a última cópia disponível. Dados legados de visitante (`current` e `guest`) só são removidos depois de uma sincronização bem-sucedida e após o estado mesclado ter sido gravado também no namespace local da conta.

Ao restabelecer a conexão, o cliente faz leitura remota, mescla de forma conservadora e envia o resultado combinado. A exportação JSON permanece como backup opcional adicional, não como mecanismo principal de transferência entre aparelhos.

A configuração pública do cliente Supabase não é segredo; a autorização depende da autenticação e das políticas RLS. Credenciais privadas e respostas pessoais não devem ser salvas no Git.
