# Estado do projeto

Versão: 0.1.0 com atualização editorial publicada e verificada — 2026-09-28.

URL: https://andertrunks.github.io/reconstrucao-escolar-2027/
Commit da aplicação publicada: 27108d24b3d121faf42e4f3cbe1a7cd8ae0955b5.
Deploy aprovado: https://github.com/andertrunks/reconstrucao-escolar-2027/actions/runs/36411488201.

## Última alteração

Criada primeira estrutura funcional React/TypeScript/Vite, dez áreas, claro/escuro, diagnóstico, IndexedDB, retomada, backup e Caderno de Erros. Modelos de conteúdo/questões/progresso separados. Pastas por matéria e índice criados no Drive.

## Conteúdos

- Publicado: Diagnóstico Inicial 001, integral, 37 questões autorais; gabarito ausente na fonte.
- Aulas integrais publicadas: zero.
- A recuperar: 79 materiais (48 anteriores, MAT-FIN-003 a 026 e MAT-EST-001 a 007).
- Planejado: MAT-EST-008. MAT-JUR-003 preservado com código a conferir frente a MAT-FIN-003.
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

## Atualização 2026-09-25

Consultadas fontes do Drive, sem novos arquivos na pasta Matemática, e as conversas Gerenciar criação de conteúdo e Continuar Matemática Financeira. Acrescentadas 31 referências: MAT-FIN-003 a 026 e MAT-EST-001 a 007. Total: 79 materiais a recuperar, MAT-EST-008 planejado e MAT-JUR-003 com código a conferir. Nenhuma aula ou questão integral adicionada. Preservados MAT-JUR-001/002; não duplicados como MAT-FIN-001/002 a partir do resumo de continuidade. Download de MAT-EST-007 acionado pela interface, sem arquivo localizado em Downloads; acesso ao gerenciador interno do Chrome recusado pela política de navegação, sem contornar o bloqueio. Recuperação dos pacotes segue pendente.

Validação local aprovada em 28/09: TypeScript, lint, três testes unitários, conteúdo, build e três testes Edge. Publicação concluída em 28/09; GitHub Actions aprovado e três testes Edge repetidos com sucesso contra a URL pública. Próximo passo: recuperar pacotes integrais, conferir correspondência MAT-JUR/MAT-FIN e importar sem reconstrução.

## Retomada 2026-09-28

Repositório sincronizado com origin/main antes de publicar a atualização pendente. Busca de alterações no Drive desde 25/09 não encontrou novos documentos nas pastas de fontes, materiais e Matemática. Conversas Continuar material produzido e Padronizar materiais no projeto localizadas, mas o conector retornou somente referências internas chatgpt-content-reference, sem texto integral nem anexos. Conteúdos dessas conversas ainda não inventariados; recuperar originais antes de importar. A validação interrompida da sessão anterior foi reiniciada.

Verificação final em 28/09: MAT-EST-007 visível como conteúdo a recuperar e MAT-JUR-003 com explicação de código a conferir. Build principal 86,74 KB gzip. Nenhuma aula ou questão nova publicada. CI registra aviso não bloqueante de depreciação do Node 20 nas actions; atualizar essas actions em manutenção posterior. Novas conversas de 27/09 permanecem pendentes de recuperação integral.

## Manutenção 2026-09-30

Recuperação real de MAT-EST-048 confirmada; 64 arquivos inventariados na subpasta Estatística. Ver docs/RECOVERY_2026-09-30.md e docs/sources/drive-estatistica-2026-09-30.json. Fontes avançadas disponíveis, mas árvore de fundamentos e conversão integral ainda pendentes. Nenhuma aula publicada nesta execução; build e testes da aplicação não repetidos porque a mudança é documental. Último deploy permanece o de 28/09. Incluir subpastas Estatística e auditoria nas próximas consultas do Drive.
