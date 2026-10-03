# Decisões

## 2026-10-03 — Publicação do acervo integral recuperado

A solicitação atual autoriza publicar todo o conteúdo criado. Foram percorridas as pastas do projeto, o inventário histórico, as reconstruções editoriais e os pacotes cumulativos. Importadas MAT-EST-001 a 011 (reconstrução editorial v1) e MAT-EST-031 a 067 (fontes integrais recuperadas). Não foram criadas aulas a partir de códigos ou títulos. MAT-EST-012 a 030, MAT-PRO-039 e outras referências históricas continuam sem material integral acessível; MAT-EST-068 continua apenas referência futura.

As aulas avançadas ficam disponíveis para consulta, com aviso dos pré-requisitos diretos e transitivos indisponíveis. A árvore de fundamentos ainda não está completa (B1 parcial na auditoria AUD-MAT-EST-067). Não se declara que a trilha está pronta para um iniciante nem que a produção representa domínio do estudante.

Textos originais, todos os itens de exercícios/gabarito, retestes, versões recuperadas, tabelas, SVG/PNG, dados e scripts foram preservados. Os cinco diagramas de MAT-EST-001 materializam as especificações visuais já existentes na fonte; são implementação editorial identificável, sem alegação de identidade binária histórica. As demais imagens são as recuperadas. As camadas TRA mantêm seus IDs e sua identidade de transferência.

Os gabaritos são fontes para autocorreção, acessíveis na prática depois de salvar uma tentativa. 177 respostas têm explicação breve segundo conferência conservadora e recebem indicação de desenvolvimento pendente. A correspondência entre IDs/enunciados/respostas foi validada; nenhum item é declarado pedagogicamente revisado por contagem de palavras. Não são atribuídas notas automáticas.

Vídeos do YouTube conferidos por oEmbed; recursos institucionais por resposta HTTP e conteúdo da página. Um link da Penn State retornou 502 e foi preservado com esse estado, acompanhado de complemento verificado. A indicação sem link exato de Ferretto em MAT-EST-008 foi mantida no original e acompanhada do vídeo verificado de Equaciona, presente na edição anterior. Reprodução integral, voz e legendas não foram auditadas.

O ambiente local restringe sockets necessários ao navegador. A build, TypeScript, lint, conteúdo e testes unitários são locais; o workflow exige os seis testes completos em Chromium e Microsoft Edge antes do deploy. A URL real será inspecionada após o sucesso da implantação.

## 2026-09-22 — Primeira inspeção

Nenhum repositório correspondente nos nove repositórios acessíveis do proprietário; diretório desta tarefa sem aplicação. Busca local por manifestos e documentos em Documents/Codex não identificou o projeto. Google Drive: Site do Projeto e Materiais por Matéria sem arquivos. A aplicação é iniciada aqui; futuras execuções continuam neste repositório.

## Conteúdo recuperável

Lidos nove documentos de fontes e quatro páginas da conversa Gerenciar criação de conteúdo. Localizados resumos de 31 aulas de Matemática, nenhum arquivo integral por essa interface. Os resumos mencionam anexos por referências internas sem arquivo acessível. MAT-DEC-007 é planejado. Aulas não publicadas. POR-INT-001 permanece exemplo/referência sem aula recuperada. Não reconstruir esses materiais.

Diagnóstico 001 integral importado do Drive, sem alteração das perguntas. Inserida leitura textual de notações em campos separados. A fonte não traz gabarito: correção permanece pendente, sem pontuação inventada. Mantida a produção escrita exatamente como na fonte.

## Arquitetura

React/TypeScript/Vite. Conteúdo JSON e modelos tipados. Carregamento sob demanda para telas de diagnóstico e aula, e cada futuro arquivo de aula. Rotas por fragmento funcionam em hospedagem estática sem reescritas. IndexedDB isolado em módulo para futura sincronização opcional. Nenhuma consolidação por abertura de conteúdo. Sem backend pago.

## Limite desta versão

Estrutura de aulas/questões/progresso pronta para evolução; prática corrigida e critérios interativos completos de domínio dependem das primeiras aulas integrais. Simulados e leituras têm estados vazios honestos. Sem listas de obras, regras ou calendários de vestibulares não verificados. Funcionamento offline integral via PWA fica para uma atualização; progresso local já funciona sem serviço remoto.

## 2026-09-23 — Sincronização editorial

Identificadas 17 novas produções anunciadas: MAT-DEC-007, MAT-RAZ-001 a 007, MAT-PCT-001 a 007 e MAT-JUR-001 a 002. MAT-JUR-003 é planejado. Registradas referências de arquivos e mensagens sem importar resumos como aulas. Tentativa de download do pacote MAT-JUR-002 bloqueada pelo Chrome (ERR_BLOCKED_BY_CLIENT). Nenhuma proteção foi alterada. O estado mostrado pela interface passa a vir do índice, sem exceção fixa para MAT-DEC-007.

Recuperação alternativa: a prévia de MAT-JUR-002 no ChatGPT exibe o texto até a seção 124, mas não contém os seis SVGs referenciados. Exportação da prévia não suportada pelo navegador conectado. Material ainda não importado integralmente; recuperar e conferir texto e recursos antes de publicar a aula.

## Atualização 2026-09-25

Consultadas fontes do Drive, sem novos arquivos na pasta Matemática, e as conversas Gerenciar criação de conteúdo e Continuar Matemática Financeira. Acrescentadas 31 referências: MAT-FIN-003 a 026 e MAT-EST-001 a 007. Total: 79 materiais a recuperar, MAT-EST-008 planejado e MAT-JUR-003 com código a conferir. Nenhuma aula ou questão integral adicionada. Preservados MAT-JUR-001/002; não duplicados como MAT-FIN-001/002 a partir do resumo de continuidade. Download de MAT-EST-007 acionado pela interface, sem arquivo localizado em Downloads; acesso ao gerenciador interno do Chrome recusado pela política de navegação, sem contornar o bloqueio. Recuperação dos pacotes segue pendente.
