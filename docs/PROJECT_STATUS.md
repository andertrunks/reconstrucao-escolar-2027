# Estado do projeto

Versão: 0.1.0 com atualização editorial publicada e verificada — 2026-09-23.

URL: https://andertrunks.github.io/reconstrucao-escolar-2027/
Commit da aplicação publicada: cf228b9f87cdd71093b6be00eed46f821f8884bf.
Deploy aprovado: https://github.com/andertrunks/reconstrucao-escolar-2027/actions/runs/35859277117.

## Última alteração

Criada primeira estrutura funcional React/TypeScript/Vite, dez áreas, claro/escuro, diagnóstico, IndexedDB, retomada, backup e Caderno de Erros. Modelos de conteúdo/questões/progresso separados. Pastas por matéria e índice criados no Drive.

## Conteúdos

- Publicado: Diagnóstico Inicial 001, integral, 37 questões autorais; gabarito ausente na fonte.
- Aulas integrais publicadas: zero.
- A recuperar: 48 aulas: MAT-NUM-001 a 017, MAT-FRA-001 a 008, MAT-DEC-001 a 007, MAT-RAZ-001 a 007, MAT-PCT-001 a 007 e MAT-JUR-001 a 002.
- Planejado: MAT-JUR-003.
- POR-INT-001: apenas referência, sem aula integral recuperada.

## Pendências

Recuperar arquivos integrais de aulas e visuais; importar matriz real. Evoluir evidências de consolidação e prática corrigida com as primeiras aulas. PWA offline integral ainda não implementada. Leitura em voz alta nativa do Edge não foi ouvida nesta execução; não declarar validação auditiva completa.

## Validação local

TypeScript, lint, três testes unitários, validação de conteúdo e build aprovados. Três testes de navegador aprovados no Microsoft Edge instalado: dez áreas/console/axe/claro-escuro; IndexedDB/retomada/Caderno; celular 390 px/teclado/diagnóstico. Corrigidos contraste dos números de navegação e nome da região lateral. Inspeção visual desktop aprovada. Bundle principal ~83 KB gzip. Primeira execução de Vitest capturou testes Playwright por configuração genérica; corrigido com inclusão explícita de src/**/*.test.ts.

## Próximo passo

Recuperar primeiro MAT-NUM-001 integral, seus recursos e metadados; incorporar à matriz e publicar incrementalmente. Não confundir conclusões editoriais da conversa com aprendizagem do estudante.

## Continuidade operacional

Repositório: https://github.com/andertrunks/reconstrucao-escolar-2027. Commit inicial a0eb30a. Primeira execução GitHub Actions bloqueou publicação por falha de recuperação de resposta após reload. Salvamento restringido a alterações do usuário; teste aguarda a nova questão antes de preenchê-la. Nova validação local: typecheck/lint/build e três testes Edge aprovados.

Automação manter-reconstru-o-escolar-2027 ativa nesta tarefa, diariamente às 09h (America/Sao_Paulo), silenciosa sem novidades acionáveis. Ela depende da disponibilidade do ambiente local e dos conectores; não é um serviço de sincronização instalado no site.

Cópia estruturada do diagnóstico no Drive: https://drive.google.com/file/d/18h7BWL51vwSb-WS5LidIGp28I0Zr3BM8/view. Índice mestre: https://drive.google.com/file/d/1NXekZGsVLYYwc-pTVJNeTKa6KtXRnlWn/view.

## Verificação pública

GitHub Actions: todos os passos aprovados, incluindo três testes no Chromium/Linux e deploy Pages. Os três testes foram repetidos com sucesso no Edge contra a URL pública: navegação/axe/temas, persistência/retomada/caderno e celular/teclado. Inspeção adicional da página pública: zero violações axe e captura visual. A aba do site foi solicitada no painel do Codex.

## Manutenção 2026-09-23

Índice atualizado com 17 produções anunciadas após a inspeção anterior, sem novas aulas ou questões integrais importadas. Referências em docs/sources/editorial-2026-09-23.json. Download do pacote no Chrome bloqueado por ERR_BLOCKED_BY_CLIENT; próxima recuperação depende de acesso aos arquivos, não de recriação. TypeScript, lint, três testes unitários, validação de conteúdo, build e três testes Edge aprovados. Testes de navegador estabilizados: espera pela interface pronta antes de Tab e prazo de 60 segundos para auditoria das dez rotas. Índice Drive atualizado e verificado no mesmo ID. Publicação aprovada pelo GitHub Actions. Três testes Edge repetidos com sucesso contra a URL pública; índice aberto no navegador e conferidos MAT-DEC-007 como conteúdo a recuperar e MAT-JUR-003 como planejado.

Recuperação alternativa: a prévia de MAT-JUR-002 no ChatGPT exibe o texto até a seção 124, mas não contém os seis SVGs referenciados. Exportação da prévia não suportada pelo navegador conectado. Material ainda não importado integralmente; recuperar e conferir texto e recursos antes de publicar a aula.
