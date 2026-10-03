# Publicação do acervo — 03/10/2026

O site existente foi atualizado com todo o material curricular cujo texto integral e recursos foram recuperados nas fontes acessíveis. A estrutura React/TypeScript/Vite e o progresso IndexedDB foram preservados.

## Estado inicial e resultado

| Conteúdo | Antes | Atualização preparada |
|---|---:|---:|
| Aulas integrais | 0 | 48 |
| Questões de prática | 0 | 1.740 |
| Recursos visuais | 0 | 303 |
| Diagnóstico autoral | 37 | 37, preservados |
| Seções de aulas | 0 | 1.043 |

As fontes recuperadas somam 1.256.963 caracteres, preservados na íntegra. MAT-EST-001 a 011 são reconstruções editoriais v1 identificadas como tal; MAT-EST-031 a 067 vêm dos pacotes integrais recuperados. Foram mantidos fontes, edições anteriores, dados, scripts, gabaritos e arquivos de apoio. O pacote cumulativo MAT-EST-067 foi conferido por CRC e SHA-256: f9ce102bb4bb8b50e104cdda029659bab0d967c6ec23879f0b07c42497ef9e44.

## Comportamento publicado

Catálogo com busca, navegação entre aulas, leitor por seções, tabelas, galerias com descrições acessíveis, texto integral para download e banco de exercícios por aula. Simulado MAT-EST-037 com 48 itens disponibilizado na área de simulados; retestes e camadas TRA mantêm os IDs originais. O gabarito de prática é revelado depois de salvar uma tentativa; a consulta não registra nota, acerto ou consolidação. Abrir uma aula não altera progresso.

As aulas avançadas exibem lacunas nos pré-requisitos diretos e transitivos. 94 referências de materiais sem conteúdo integral recuperado ou futuros permanecem separadas das aulas disponíveis. Não foi produzida MAT-EST-068.

## Análise e limitações

- MAT-EST-012 a 030, MAT-PRO-039, séries anteriores de Matemática e referências de outras matérias continuam sem arquivo integral recuperado. As pastas de matérias e fontes foram percorridas e as buscas adicionais não forneceram esses originais.
- B1 da auditoria AUD-MAT-EST-067 permanece parcial: a árvore de fundamentos não está completa. As aulas avançadas são consultas, não uma trilha inicial completa.
- 177 respostas breves são sinalizadas para desenvolvimento da correção. A preservação dos gabaritos não implica revisão pedagógica de todos os itens.
- Os cinco visuais de MAT-EST-001 materializam as especificações já presentes na fonte. As outras 298 imagens são recuperadas.
- Disponibilidade de complementos foi conferida por metadados YouTube e HTTP institucional. A página Penn State retornou 502 e permanece identificada, com complemento verificado de bootstrap. A indicação de Ferretto sem link exato em 008 foi preservada e acompanhada de recurso verificado da edição anterior.
- Não foram auditados reprodução audiovisual integral, legendas sincronizadas nem leitura em voz alta do Edge. A auditoria automatizada de acessibilidade não substitui essas verificações.

## Arquivos principais e evidências

`src/content/lessons/`, `src/content/questions/`, `src/content/topics.json`, manifesto compacto `src/content/catalog.json`, referências `src/content/prerequisite-references.json`, `public/media/`, `public/originais/`, leitor e páginas de prática/catálogo. Relatório por fonte e hashes em `docs/sources/publication-2026-10-03.json`; conferência de recursos em `docs/sources/resources-2026-10-03.json`. Scripts de conversão e validação reproduzíveis com os pacotes originais.

## Verificação e implantação

Conteúdo integral/hashes, bancos e IDs, ativos, TypeScript, lint, três testes unitários e build aprovados localmente. A inicialização local do navegador foi bloqueada pela restrição de sockets do ambiente. O workflow exige seis testes no Chromium e os mesmos seis no Microsoft Edge antes de publicar. Verificação de implantação e URL real em andamento; registrar o resultado final aqui e em PROJECT_STATUS.md após a conclusão.

URL: https://andertrunks.github.io/reconstrucao-escolar-2027/

## Próximo trabalho curricular

Recuperar os originais históricos ausentes e concluir as explicações breves dos gabaritos, com revisão editorial. Consolidar evidências de domínio somente a partir de tentativas reais do estudante.
