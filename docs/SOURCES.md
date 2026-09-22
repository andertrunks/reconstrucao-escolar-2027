## 07 - FONTES OFICIAIS, VESTIBULARES E REGRA DE ATUALIZAÇÃO

Fonte: https://docs.google.com/document/d/1R2HA863hi8sUOab-NFKjw3IgHP4GToKdQ2ERp_Y-yAc/edit?usp=drivesdk

﻿FONTES OFICIAIS, VESTIBULARES E REGRA DE ATUALIZAÇÃO


Objetivo
Manter o currículo e os simulados alinhados a documentos institucionais, sem depender de listas de cursinhos como fonte principal.


Fontes primárias


BNCC / MEC
Site oficial:
https://basenacionalcomum.mec.gov.br/
Uso: aprendizagens essenciais e organização geral da Educação Básica.


INEP / ENEM
Site oficial:
https://www.gov.br/inep/
Uso: matriz de referência, competências, habilidades, objetos de conhecimento, cartilhas de redação, editais e provas.


FUVEST / USP
https://www.fuvest.br/
Uso: programa do vestibular, guia de provas, leituras obrigatórias, editais, provas anteriores e mudanças de formato.


COMVEST / UNICAMP
https://www.comvest.unicamp.br/
Uso: programa das provas, manual, leituras obrigatórias, provas anteriores, redação e orientações.


UNESP / VUNESP
https://www.vunesp.com.br/
https://www.unesp.br/
Uso: edital, manual, conteúdo programático, provas e normas do processo seletivo.


Microsoft Edge
https://support.microsoft.com/
Uso: documentação de Modo de Leitura, Leitura Avançada, Ler em voz alta e recursos de acessibilidade.


Regra de atualização


1. Para conteúdo escolar estrutural, usar a BNCC como referência, complementada por livros e materiais didáticos confiáveis.
2. Para cada exame, usar o documento oficial mais recente.
3. Antes de publicar listas de obras, formato, quantidade de questões, critérios de redação, calendário ou regras, verificar novamente a fonte oficial.
4. Documentos 2027 são referência inicial para construção do projeto. Quando forem publicados documentos das edições que Anderson efetivamente prestará, atualizar a matriz.
5. Não apagar a estrutura anterior sem necessidade. Registrar mudanças.
6. Fontes secundárias podem explicar, mas não substituir documentos oficiais.
7. Em questões, preservar a distinção entre item oficial e item autoral ou adaptado.


ENEM
A Matriz de Referência do INEP deve orientar a camada específica de preparação para o ENEM, incluindo competências, habilidades e objetos de conhecimento.


FUVEST
A edição 2027 possui programa, guias e provas próprias disponíveis no portal oficial. O projeto deve acompanhar mudanças posteriores.


UNICAMP
Consultar sempre o programa e o manual mais recentes da COMVEST, especialmente formatos de questões discursivas, redação, leituras e componentes específicos.


UNESP
Consultar VUNESP e UNESP para edital, manual, estrutura das fases e conteúdo vigente.


Acessibilidade
O Microsoft Edge oferece Ler em voz alta e recursos de leitura em páginas compatíveis. A estrutura do site deve facilitar o uso dessas ferramentas.

## 06 - ARQUITETURA DO SITE E MODELO DE CONTEÚDO

Fonte: https://docs.google.com/document/d/1ydkz92UM1owmNLUNyZHrmL2VvxJJtkuM38Xtuq8PCHY/edit?usp=drivesdk

﻿ARQUITETURA DO SITE E MODELO DE CONTEÚDO


Objetivo
Construir um site que possa crescer para centenas ou milhares de aulas sem transformar o código em um conjunto difícil de manter.


Princípio
Separar conteúdo educacional, dados de progresso e componentes visuais.


Estrutura funcional mínima
- Início
- Trilhas
- Matérias
- Aulas
- Exercícios
- Simulados
- Redação
- Leituras
- Progresso
- Caderno de Erros


Página de aula
- título e código;
- progresso;
- objetivos;
- pré-requisitos;
- conteúdo;
- visuais;
- vídeo;
- exercícios;
- resumo;
- revisão;
- anterior e próxima.


Modelo de conteúdo
Cada aula deve ser armazenada em formato estruturado, por exemplo Markdown, MDX, JSON ou banco de dados, sem ficar escrita diretamente dentro do componente visual.


Campos recomendados
id
slug
titulo
materia
unidade
nivel
ordem
preRequisitos
objetivos
resumo
conteudo
visuais
video
exercicios
fontes
revisao
proximoTopico


Questões
Cada questão deve possuir:
id
origem
exame
ano
materia
topicos
dificuldade
enunciado
alternativas quando houver
resposta
resolucao
motivosDeErro


Origem deve distinguir:
- oficial;
- autoral;
- adaptada.


Progresso
Por tópico:
- não iniciado;
- aprendendo;
- revisar;
- consolidado.


Guardar também:
- data do último estudo;
- tentativas;
- acertos;
- erros;
- revisões;
- confiança;
- próximo passo.


Caderno de erros
Classificar erros por:
conteúdo
interpretação
cálculo
distração
memória
estratégia
tempo


Acessibilidade
Usar HTML semântico, navegação por teclado, foco visível, texto redimensionável, modo escuro, contraste adequado e compatibilidade com leitores de tela e Microsoft Edge.


Desempenho
Páginas rápidas, responsivas e leves. Imagens otimizadas. Conteúdo carregado de forma eficiente.


Desenvolvimento
Começar com poucos tópicos reais e validar o modelo de conteúdo antes de produzir grandes volumes. Não construir toda a plataforma de uma vez.

## 05 - PADRÃO VISUAL, GRÁFICOS, IMAGENS E VÍDEOS

Fonte: https://docs.google.com/document/d/1yvjAT1kfIQ2o5oPEOB7f-tTTZ9_H1HQV6-5MZct2UKc/edit?usp=drivesdk

﻿PADRÃO VISUAL, GRÁFICOS, IMAGENS E VÍDEOS


Objetivo
Usar elementos visuais para ensinar, e não apenas decorar a página.


Quando usar
Matemática: retas numéricas, áreas, formas, gráficos, diagramas e construções geométricas.
Física: vetores, forças, trajetórias, circuitos, ondas e óptica.
Química: átomos, moléculas, ligações, estruturas, gráficos e esquemas de reação.
Biologia: células, sistemas, anatomia, ciclos, ecossistemas e genética.
História: mapas, linhas do tempo, documentos e relações de causa e consequência.
Geografia: mapas, climogramas, pirâmides etárias, gráficos, fluxos e imagens de território.
Português e Literatura: esquemas de estrutura textual, relações sintáticas e linhas do tempo literárias.
Filosofia e Sociologia: mapas conceituais e comparação de ideias.


Obrigatório para cada visual relevante
- título ou legenda;
- texto alternativo;
- descrição do que observar;
- explicação textual da conclusão;
- fonte ou autoria quando for material externo;
- licença ou permissão compatível quando necessário.


Gráficos
Devem conter título, eixos, unidades, escala legível e explicação em texto. Não comunicar informação apenas por cor.


Imagens
Preferir:
1. material oficial;
2. domínio público;
3. Creative Commons compatível;
4. produção própria ou imagem gerada especificamente para a aula.


Evitar imagem apenas decorativa quando ela aumentar distração ou peso da página.


Diagramas
Dar preferência a diagramas simples, com poucos elementos por etapa. Para processos complexos, dividir em mais de uma figura.


Vídeos
Cada aula deve ter pelo menos um vídeo complementar quando houver opção didática de qualidade, preferencialmente no YouTube.


Ficha do vídeo
- título;
- canal;
- link;
- duração aproximada;
- idioma;
- por que foi escolhido;
- momento recomendado da aula;
- quais pontos reforça.


O vídeo nunca substitui a aula. O estudante deve conseguir aprender o conteúdo mesmo que o vídeo seja removido.


Validação
Antes de publicar, verificar se o vídeo continua disponível e se realmente trata do conteúdo indicado.


Desempenho
O site deve carregar imagens de forma otimizada, usar dimensões adequadas, lazy loading quando apropriado e evitar páginas excessivamente pesadas.

## 04 - ACESSIBILIDADE E LEITURA EM VOZ ALTA NO EDGE

Fonte: https://docs.google.com/document/d/1Q8wTq3w_rTfCusLJtSQQfBXyaj77zzJUe5E__FrCwwg/edit?usp=drivesdk

﻿ACESSIBILIDADE E LEITURA EM VOZ ALTA NO MICROSOFT EDGE


Objetivo
Todo conteúdo do site deve ser confortável tanto para leitura visual quanto para estudo por áudio no Microsoft Edge.


Princípio
Uma aula deve continuar inteligível quando o estudante apenas escuta.


Redação para voz
- usar frases claras;
- preferir parágrafos curtos;
- manter ordem lógica;
- evitar excesso de abreviações;
- explicar siglas na primeira ocorrência;
- evitar emojis decorativos;
- evitar sequências longas de símbolos sem explicação;
- escrever números, símbolos e fórmulas de forma que possam ser pronunciados.


Exemplos
Visual: 3/4.
Texto associado: “três quartos”.


Visual: x².
Texto associado: “x ao quadrado”.


Visual: H₂O.
Texto associado: “água, formada por dois átomos de hidrogênio e um átomo de oxigênio”.


Fórmulas
Toda fórmula importante deve ter:
1. fórmula visual;
2. leitura por extenso;
3. significado de cada variável;
4. unidade, quando existir;
5. exemplo.


Tabelas
Não depender apenas de tabelas. Depois de uma tabela complexa, fornecer um parágrafo resumindo os padrões ou conclusões importantes.


Imagens
Toda imagem educacional deve possuir texto alternativo e legenda. Quando a imagem for necessária para compreender o assunto, acrescentar descrição textual detalhada.


Gráficos
Descrever título, eixo horizontal, eixo vertical, unidades, tendência principal, pontos importantes e conclusão.


Mapas
Informar em texto a localização, escala ou relação espacial essencial que o estudante precisa perceber.


HTML e acessibilidade
Priorizar estrutura semântica:
- um H1 principal por página;
- H2 e H3 hierárquicos;
- parágrafos reais;
- listas reais;
- botões identificados;
- links com nomes descritivos;
- atributos alt em imagens;
- labels em formulários;
- navegação por teclado;
- foco visível;
- contraste suficiente;
- zoom e aumento de fonte sem quebrar layout.


Microsoft Edge
O site deve ser testado com:
- Ler em voz alta;
- Modo de Leitura ou Leitura Avançada quando disponível;
- zoom;
- navegação por teclado;
- seleção de texto;
- modo claro e escuro.


Regra de qualidade
Antes de publicar uma aula, ouvir uma parte relevante pelo Edge. Se a leitura ficar confusa, adaptar o texto ou adicionar uma versão verbal da notação.

## 03 - MATRIZ MESTRE E ESTRUTURA CURRICULAR

Fonte: https://docs.google.com/document/d/1p_MTm9U5PRBbLSSst4p5q3ZzHXODlE3Lx-0guMY23Ds/edit?usp=drivesdk

﻿MATRIZ MESTRE E ESTRUTURA CURRICULAR


Objetivo
A Matriz Mestre será a espinha dorsal do site. Ela organizará todo o conhecimento por pré-requisitos, profundidade e relações entre áreas.


Níveis


NÍVEL 1 - FUNDAMENTOS ESSENCIAIS
Leitura, escrita, operações, números, frações, medidas, compreensão básica de mundo natural, histórico e geográfico.


NÍVEL 2 - ENSINO FUNDAMENTAL II
Álgebra elementar, geometria, estatística inicial, gramática aplicada, interpretação, ciências introdutórias, História e Geografia sistematizadas.


NÍVEL 3 - ENSINO MÉDIO
Matemática, Física, Química, Biologia, Português, Literatura, História, Geografia, Filosofia, Sociologia, Inglês, Arte e conteúdos exigidos pelos exames.


NÍVEL 4 - APROFUNDAMENTO DE VESTIBULAR
ENEM, FUVEST, UNICAMP, UNESP e provas adicionadas futuramente.


NÍVEL 5 - CONSOLIDAÇÃO
Revisão espaçada, listas mistas, provas anteriores, questões discursivas, simulados e estratégia.


NÍVEL 6 - PONTE UNIVERSITÁRIA
Pré-cálculo, leitura acadêmica, escrita, lógica, estatística, metodologia científica e outros fundamentos conforme o curso escolhido.


Áreas da matriz
MAT - Matemática
POR - Língua Portuguesa
RED - Redação
LIT - Literatura
FIS - Física
QUI - Química
BIO - Biologia
HIS - História
GEO - Geografia
FIL - Filosofia
SOC - Sociologia
ING - Inglês
ART - Arte
EDF - Educação Física quando exigida


Exemplo de identificador
MAT-FRA-001 - Conceito de fração
MAT-FRA-002 - Frações equivalentes
MAT-POR-001 - Porcentagem: conceito
POR-INT-001 - Leitura literal
POR-INT-002 - Inferência


Metadados obrigatórios de cada tópico
código; título; área; unidade; nível; descrição; pré-requisitos; objetivos; habilidades desenvolvidas; conceitos relacionados; aplicações; exames relacionados; profundidade esperada; recursos visuais adequados; exercício inicial; exercício de consolidação; revisão; próximo tópico.


Árvore de dependência
Operações → frações → razão → proporção → porcentagem → álgebra → funções.
Palavra → frase → oração → período → parágrafo → coesão → argumentação.
Matéria → átomo → elemento → molécula → ligação → reação → estequiometria.


Regra
A matriz não deve ser criada apenas copiando séries escolares. A série de origem pode ser registrada, mas a ordem principal deve seguir a dependência conceitual.


Próxima etapa
Construir a versão completa da Matriz Mestre, área por área, começando por Matemática e Língua Portuguesa e depois expandindo para as demais.MATRIZ MESTRE E ESTRUTURA CURRICULAR


Objetivo
A Matriz Mestre será a espinha dorsal do site. Ela organizará todo o conhecimento por pré-requisitos, profundidade e relações entre áreas.


Níveis


NÍVEL 1 - FUNDAMENTOS ESSENCIAIS
Leitura, escrita, operações, números, frações, medidas, compreensão básica de mundo natural, histórico e geográfico.


NÍVEL 2 - ENSINO FUNDAMENTAL II
Álgebra elementar, geometria, estatística inicial, gramática aplicada, interpretação, ciências introdutórias, História e Geografia sistematizadas.


NÍVEL 3 - ENSINO MÉDIO
Matemática, Física, Química, Biologia, Português, Literatura, História, Geografia, Filosofia, Sociologia, Inglês, Arte e conteúdos exigidos pelos exames.


NÍVEL 4 - APROFUNDAMENTO DE VESTIBULAR
ENEM, FUVEST, UNICAMP, UNESP e provas adicionadas futuramente.


NÍVEL 5 - CONSOLIDAÇÃO
Revisão espaçada, listas mistas, provas anteriores, questões discursivas, simulados e estratégia.


NÍVEL 6 - PONTE UNIVERSITÁRIA
Pré-cálculo, leitura acadêmica, escrita, lógica, estatística, metodologia científica e outros fundamentos conforme o curso escolhido.


Áreas da matriz
MAT - Matemática
POR - Língua Portuguesa
RED - Redação
LIT - Literatura
FIS - Física
QUI - Química
BIO - Biologia
HIS - História
GEO - Geografia
FIL - Filosofia
SOC - Sociologia
ING - Inglês
ART - Arte
EDF - Educação Física quando exigida


Exemplo de identificador
MAT-FRA-001 - Conceito de fração
MAT-FRA-002 - Frações equivalentes
MAT-POR-001 - Porcentagem: conceito
POR-INT-001 - Leitura literal
POR-INT-002 - Inferência


Metadados obrigatórios de cada tópico
- código;
- título;
- área;
- unidade;
- nível;
- descrição;
- pré-requisitos;
- objetivos;
- habilidades desenvolvidas;
- conceitos relacionados;
- aplicações;
- exames relacionados;
- profundidade esperada;
- recursos visuais adequados;
- exercício inicial;
- exercício de consolidação;
- revisão;
- próximo tópico.


Árvore de dependência
A matriz deve indicar relações como:
operações → frações → razão → proporção → porcentagem → álgebra → funções;
palavra → frase → oração → período → parágrafo → coesão → argumentação;
matéria → átomo → elemento → molécula → ligação → reação → estequiometria.


Regra
A matriz não deve ser criada apenas copiando séries escolares. A série de origem pode ser registrada, mas a ordem principal deve seguir a dependência conceitual.


Próxima etapa
Construir a versão completa da Matriz Mestre, área por área, começando por Matemática e Língua Portuguesa e depois expandindo para as demais.

## 02 - METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO

Fonte: https://docs.google.com/document/d/1b3P1vAFj_8HnENpj76Z2h2ENX9uzOum53EhTzroDntk/edit?usp=drivesdk

﻿METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO


Cada tópico deve ser ensinado em camadas: intuição, fundamento, formalização, representação visual, aplicação, prática, vestibular e revisão.


Modelo de aula
1. Título e código.
2. Objetivo.
3. Pré-requisitos.
4. Por que isso importa.
5. Explicação intuitiva.
6. Explicação aprofundada.
7. Vocabulário essencial.
8. Exemplos resolvidos passo a passo.
9. Visual principal.
10. Aplicações.
11. Conexões com outras matérias.
12. Erros frequentes.
13. Exercícios de aprendizagem.
14. Exercícios de consolidação.
15. Questões de vestibular.
16. Correção comentada.
17. Resumo para revisão.
18. Versão curta para ouvir.
19. Vídeo complementar.
20. Próximo tópico.


Profundidade
Não simplificar até distorcer. Um tópico deve incluir definições, mecanismos, relações, causas, consequências, exceções, limites e diferentes representações quando relevantes.


Fórmulas
Evitar decorar sem compreender. Explicar de onde vêm ou por que funcionam sempre que isso for adequado ao nível da aula.


Resolução de problemas
Ensinar sempre a identificar o que a pergunta pede, quais dados foram fornecidos, quais conceitos se aplicam, como montar a solução e como verificar se a resposta faz sentido.


Exercícios
A. Aprendizagem: habilidade isolada.
B. Consolidação: combinação de habilidades.
C. Vestibular: interpretação, estratégia e transferência de conhecimento.


Correção
Toda resposta deve conter raciocínio. Alternativa correta sem explicação não é correção suficiente.


Revisão
Usar repetição espaçada e aprendizagem em espiral. O assunto deve reaparecer posteriormente em contextos diferentes.


Ciclo de estudo
Continuar de onde parou. Não fixar matéria a um dia da semana. Preferir blocos de 25 a 50 minutos.METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO


Estrutura pedagógica
Cada tópico deve ser ensinado em camadas.


CAMADA 1 - INTUIÇÃO
Apresentar o problema, a ideia ou o fenômeno em linguagem simples. Mostrar para que serve e onde aparece.


CAMADA 2 - FUNDAMENTO
Definir termos, explicar mecanismos e reconstruir pré-requisitos necessários.


CAMADA 3 - FORMALIZAÇÃO
Apresentar notação, regras, fórmulas, classificações e linguagem acadêmica apropriada.


CAMADA 4 - REPRESENTAÇÃO
Mostrar o conceito por mais de uma forma: texto, exemplo numérico, gráfico, diagrama, mapa, tabela, linha do tempo ou imagem.


CAMADA 5 - APLICAÇÃO
Usar problemas cotidianos, científicos, históricos, tecnológicos ou interdisciplinares.


CAMADA 6 - PRÁTICA
Resolver exemplos guiados e depois exercícios independentes em dificuldade crescente.


CAMADA 7 - VESTIBULAR
Aplicar o mesmo conhecimento em questões contextualizadas, interdisciplinares, objetivas ou discursivas.


CAMADA 8 - REVISÃO
Reapresentar o conceito posteriormente em contexto diferente.


Modelo de aula


1. Título e código.
2. Objetivo.
3. O que você precisa saber antes.
4. Por que isso importa.
5. Explicação intuitiva.
6. Explicação aprofundada.
7. Vocabulário essencial.
8. Exemplos resolvidos passo a passo.
9. Visual principal.
10. Aplicações.
11. Conexões com outras matérias.
12. Erros frequentes.
13. Exercícios de aprendizagem.
14. Exercícios de consolidação.
15. Questões de vestibular.
16. Correção comentada.
17. Resumo para revisão.
18. Versão curta para ouvir.
19. Vídeo complementar.
20. Próximo tópico.


Profundidade
Não simplificar até distorcer. Um tópico deve incluir causas, mecanismos, relações, exceções, limites e diferentes representações quando relevantes.


Fórmulas
Evitar decorar sem compreender. Explicar de onde vêm ou por que funcionam sempre que isso for adequado ao nível da aula.


Resolução de problemas
Ensinar o processo:
- o que a pergunta pede;
- quais informações foram dadas;
- quais conceitos se aplicam;
- como montar a solução;
- como verificar se a resposta faz sentido.


Exercícios
Três níveis:
A. Aprendizagem: habilidade isolada.
B. Consolidação: combinação de habilidades.
C. Vestibular: interpretação, estratégia e transferência de conhecimento.


Correção
Toda resposta deve conter raciocínio. Alternativa correta sem explicação não é correção suficiente.


Revisão
Usar repetição espaçada e aprendizagem em espiral. O assunto deve reaparecer depois de alguns tópicos, inclusive dentro de outros conteúdos.


Ciclo de estudo
Continuar de onde parou. Não fixar matéria a um dia da semana. Preferir blocos de 25 a 50 minutos.METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO


Estrutura pedagógica
Cada tópico deve ser ensinado em camadas.


CAMADA 1 - INTUIÇÃO
Apresentar o problema, a ideia ou o fenômeno em linguagem simples. Mostrar para que serve e onde aparece.


CAMADA 2 - FUNDAMENTO
Definir termos, explicar mecanismos e reconstruir pré-requisitos necessários.


CAMADA 3 - FORMALIZAÇÃO
Apresentar notação, regras, fórmulas, classificações e linguagem acadêmica apropriada.


CAMADA 4 - REPRESENTAÇÃO
Mostrar o conceito por mais de uma forma: texto, exemplo numérico, gráfico, diagrama, mapa, tabela, linha do tempo ou imagem.


CAMADA 5 - APLICAÇÃO
Usar problemas cotidianos, científicos, históricos, tecnológicos ou interdisciplinares.


CAMADA 6 - PRÁTICA
Resolver exemplos guiados e depois exercícios independentes em dificuldade crescente.


CAMADA 7 - VESTIBULAR
Aplicar o mesmo conhecimento em questões contextualizadas, interdisciplinares, objetivas ou discursivas.


CAMADA 8 - REVISÃO
Reapresentar o conceito posteriormente em contexto diferente.


Modelo de aula


1. Título e código.
2. Objetivo.
3. O que você precisa saber antes.
4. Por que isso importa.
5. Explicação intuitiva.
6. Explicação aprofundada.
7. Vocabulário essencial.
8. Exemplos resolvidos passo a passo.
9. Visual principal.
10. Aplicações.
11. Conexões com outras matérias.
12. Erros frequentes.
13. Exercícios de aprendizagem.
14. Exercícios de consolidação.
15. Questões de vestibular.
16. Correção comentada.
17. Resumo para revisão.
18. Versão curta para ouvir.
19. Vídeo complementar.
20. Próximo tópico.


Profundidade
Não simplificar até distorcer. Um tópico deve incluir causas, mecanismos, relações, exceções, limites e diferentes representações quando relevantes.


Fórmulas
Evitar decorar sem compreender. Explicar de onde vêm ou por que funcionam sempre que isso for adequado ao nível da aula.


Resolução de problemas
Ensinar o processo:
- o que a pergunta pede;
- quais informações foram dadas;
- quais conceitos se aplicam;
- como montar a solução;
- como verificar se a resposta faz sentido.


Exercícios
Três níveis:
A. Aprendizagem: habilidade isolada.
B. Consolidação: combinação de habilidades.
C. Vestibular: interpretação, estratégia e transferência de conhecimento.


Correção
Toda resposta deve conter raciocínio. Alternativa correta sem explicação não é correção suficiente.


Revisão
Usar repetição espaçada e aprendizagem em espiral. O assunto deve reaparecer depois de alguns tópicos, inclusive dentro de outros conteúdos.


Ciclo de estudo
Continuar de onde parou. Não fixar matéria a um dia da semana. Preferir blocos de 25 a 50 minutos.

## 01 - VISÃO E PRINCÍPIOS DO PROJETO

Fonte: https://docs.google.com/document/d/1f9UVhCrnowgD3GCmWg3T4MIVCNwllRg1IGF8BxjmhqQ/edit?usp=drivesdk

﻿VISÃO E PRINCÍPIOS DO PROJETO


Nome de trabalho
Reconstrução Escolar + ENEM e Vestibulares 2027


Missão
Criar um ambiente de estudo completo para um adulto que deseja reconstruir conhecimentos que ficaram frágeis ao longo da Educação Básica e chegar ao nível necessário para enfrentar ENEM, FUVEST, UNICAMP, UNESP e outras provas exigentes, além de entrar na universidade com condições reais de acompanhar o curso.


O projeto não será um cursinho de macetes. Será uma reconstrução estruturada da educação geral.


Princípios


1. Compreensão antes de velocidade.
Não avançar apenas porque uma aula foi lida.


2. Fundamento antes de fórmula.
Sempre que um conceito depender de outro, ensinar o pré-requisito necessário.


3. Linguagem adulta.
Explicar conteúdos básicos com respeito, sem infantilizar.


4. Profundidade progressiva.
Começar intuitivamente, formalizar, aplicar, relacionar e aprofundar.


5. Conhecimento conectado.
Mostrar relações entre Matemática, Ciências, Humanidades, Linguagens e situações reais.


6. Visualização como ferramenta cognitiva.
Usar recursos visuais quando ajudarem a transformar abstrações em algo observável.


7. Áudio como forma legítima de estudo.
Todo material textual deve continuar compreensível quando ouvido pelo recurso Ler em voz alta do Microsoft Edge.


8. Prática ativa.
Cada unidade deve levar o estudante a resolver, explicar, comparar, aplicar e revisar.


9. Erro como informação.
Erros devem apontar o que revisar: conceito, leitura, cálculo, memória, distração, estratégia ou tempo.


10. Continuidade.
O projeto deve sempre continuar do ponto anterior, sem reiniciar trilhas por impulso.


Critério de domínio
Um tópico só poderá ser considerado consolidado quando o estudante demonstrar que consegue:
- explicar a ideia com suas próprias palavras;
- resolver exercícios diretos;
- resolver aplicações;
- reconhecer o conceito em contexto diferente;
- recuperar o conhecimento após revisão.


Destino final
O vestibular é um marco, não o fim. O site deve construir leitura, escrita, raciocínio, conhecimento científico e autonomia suficientes para acompanhar uma graduação exigente.VISÃO E PRINCÍPIOS DO PROJETO


Nome de trabalho
Reconstrução Escolar + ENEM e Vestibulares 2027


Missão
Criar um ambiente de estudo completo para um adulto que deseja reconstruir conhecimentos que ficaram frágeis ao longo da Educação Básica e chegar ao nível necessário para enfrentar ENEM, FUVEST, UNICAMP, UNESP e outras provas exigentes, além de entrar na universidade com condições reais de acompanhar o curso.


O projeto não será um cursinho de macetes. Será uma reconstrução estruturada da educação geral.


Princípios


1. Compreensão antes de velocidade.
Não avançar apenas porque uma aula foi lida.


2. Fundamento antes de fórmula.
Sempre que um conceito depender de outro, ensinar o pré-requisito necessário.


3. Linguagem adulta.
Explicar conteúdos básicos com respeito, sem infantilizar.


4. Profundidade progressiva.
Começar intuitivamente, formalizar, aplicar, relacionar e aprofundar.


5. Conhecimento conectado.
Mostrar relações entre Matemática, Ciências, Humanidades, Linguagens e situações reais.


6. Visualização como ferramenta cognitiva.
Usar recursos visuais quando ajudarem a transformar abstrações em algo observável.


7. Áudio como forma legítima de estudo.
Todo material textual deve continuar compreensível quando ouvido pelo recurso Ler em voz alta do Microsoft Edge.


8. Prática ativa.
Cada unidade deve levar o estudante a resolver, explicar, comparar, aplicar e revisar.


9. Erro como informação.
Erros devem apontar o que revisar: conceito, leitura, cálculo, memória, distração, estratégia ou tempo.


10. Continuidade.
O projeto deve sempre continuar do ponto anterior, sem reiniciar trilhas por impulso.


Critério de domínio
Um tópico só poderá ser considerado consolidado quando o estudante demonstrar que consegue:
- explicar a ideia com suas próprias palavras;
- resolver exercícios diretos;
- resolver aplicações;
- reconhecer o conceito em contexto diferente;
- recuperar o conhecimento após revisão.


Destino final
O vestibular é um marco, não o fim. O site deve construir leitura, escrita, raciocínio, conhecimento científico e autonomia suficientes para acompanhar uma graduação exigente.

## 00 - ÍNDICE DAS FONTES - Projeto Reconstrução Escolar 2027

Fonte: https://docs.google.com/document/d/1qPa5UPxWXZFToGi6AIBRAD0VdnW7cGAjreBxa_Yfa80/edit?usp=drivesdk

﻿ÍNDICE DAS FONTES
Projeto Reconstrução Escolar + ENEM e Vestibulares 2027


Finalidade
Este conjunto de documentos orienta a construção do site, a produção do material didático, a organização curricular e a continuidade do projeto no ChatGPT.


Ordem de leitura das fontes


01 - VISÃO E PRINCÍPIOS DO PROJETO
Define objetivo, público, filosofia pedagógica e critérios de sucesso.


02 - METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO
Define como cada conceito deve ser ensinado, praticado, revisado e consolidado.


03 - MATRIZ MESTRE E ESTRUTURA CURRICULAR
Define a arquitetura do conhecimento: áreas, níveis, pré-requisitos, códigos e relações entre tópicos.


04 - ACESSIBILIDADE E LEITURA EM VOZ ALTA NO EDGE
Define como escrever páginas compatíveis com Microsoft Edge, Ler em voz alta, Modo de Leitura e tecnologias assistivas.


05 - PADRÃO VISUAL, GRÁFICOS, IMAGENS E VÍDEOS
Define quando e como usar imagens, diagramas, mapas, tabelas, gráficos, animações e vídeos.


06 - ARQUITETURA DO SITE E MODELO DE CONTEÚDO
Define a estrutura funcional e técnica do site, separando conteúdo educacional da interface.


07 - FONTES OFICIAIS, VESTIBULARES E REGRA DE ATUALIZAÇÃO
Define as fontes primárias a consultar e como manter o projeto atualizado.


08 - INSTRUÇÃO DO PROJETO CHATGPT - RECONSTRUÇÃO ESCOLAR 2027
Texto pronto, com menos de 8.000 caracteres, para as instruções do novo Projeto no ChatGPT.


Regra de precedência
1. Documento oficial ou edital mais recente.
2. Fonte institucional do exame.
3. BNCC e documentos curriculares oficiais.
4. Fontes consolidadas deste projeto.
5. Conteúdo didático produzido pelo projeto.
6. Fontes externas de apoio.


Regra central
O objetivo é construir compreensão real e progressiva, e não apenas cobrir rapidamente um programa de vestibular.ÍNDICE DAS FONTES
Projeto Reconstrução Escolar + ENEM e Vestibulares 2027


Finalidade
Este conjunto de documentos orienta a construção do site, a produção do material didático, a organização curricular e a continuidade do projeto no ChatGPT.


Ordem de leitura das fontes


01 - VISÃO E PRINCÍPIOS DO PROJETO
Define objetivo, público, filosofia pedagógica e critérios de sucesso.


02 - METODOLOGIA DE APRENDIZAGEM E APROFUNDAMENTO
Define como cada conceito deve ser ensinado, praticado, revisado e consolidado.


03 - MATRIZ MESTRE E ESTRUTURA CURRICULAR
Define a arquitetura do conhecimento: áreas, níveis, pré-requisitos, códigos e relações entre tópicos.


04 - ACESSIBILIDADE E LEITURA EM VOZ ALTA NO EDGE
Define como escrever páginas compatíveis com Microsoft Edge, Ler em voz alta, Modo de Leitura e tecnologias assistivas.


05 - PADRÃO VISUAL, GRÁFICOS, IMAGENS E VÍDEOS
Define quando e como usar imagens, diagramas, mapas, tabelas, gráficos, animações e vídeos.


06 - ARQUITETURA DO SITE E MODELO DE CONTEÚDO
Define a estrutura funcional e técnica do site, separando conteúdo educacional da interface.


07 - FONTES OFICIAIS, VESTIBULARES E REGRA DE ATUALIZAÇÃO
Define as fontes primárias a consultar e como manter o projeto atualizado.


08 - INSTRUÇÃO DO PROJETO CHATGPT - RECONSTRUÇÃO ESCOLAR 2027
Texto pronto, com menos de 8.000 caracteres, para as instruções do novo Projeto no ChatGPT.


Regra de precedência
1. Documento oficial ou edital mais recente.
2. Fonte institucional do exame.
3. BNCC e documentos curriculares oficiais.
4. Fontes consolidadas deste projeto.
5. Conteúdo didático produzido pelo projeto.
6. Fontes externas de apoio.


Regra central
O objetivo é construir compreensão real e progressiva, e não apenas cobrir rapidamente um programa de vestibular.

## 08 - INSTRUÇÃO DO PROJETO CHATGPT - RECONSTRUÇÃO ESCOLAR 2027

Fonte: https://docs.google.com/document/d/1B5kxJc68gA9oJ4aSbK9a0w-LiW6QfmHOXfyUPcXswZo/edit?usp=drivesdk

﻿PROJETO: RECONSTRUÇÃO ESCOLAR + ENEM E VESTIBULARES 2027


Este projeto orienta a criação de um site de estudos para Anderson Luis Costa. O objetivo é reconstruir, com profundidade, a formação escolar desde os fundamentos necessários do Ensino Fundamental até o nível exigido no Ensino Médio, ENEM, FUVEST, UNICAMP, UNESP e outros vestibulares relevantes, preparando também para acompanhar uma graduação exigente no Brasil ou em Portugal.


FONTES
As fontes oficiais e documentos do Google Drive deste projeto são a base principal. Priorizar BNCC/MEC, INEP/ENEM, FUVEST, COMVEST/UNICAMP, UNESP/VUNESP e documentos oficiais das instituições. Quando houver mudança de edital, matriz, obras obrigatórias ou formato de prova, atualizar a fonte correspondente sem reconstruir o projeto do zero. Não inventar requisitos. Distinguir questão oficial de questão autoral/adaptada.


PRINCÍPIO CENTRAL
Não correr para “cobrir matéria”. Construir compreensão real. Quando um conteúdo exigir um pré-requisito não dominado, ensinar primeiro o fundamento. Não presumir domínio apenas porque Anderson concluiu o Ensino Médio ou possui graduação. Explicar para um adulto, sem infantilizar.


ORGANIZAÇÃO DO CONHECIMENTO
O currículo deve ser uma árvore de pré-requisitos. Organizar por dependência conceitual, não apenas por série escolar. Exemplo: operações → frações → razão → proporção → porcentagem → álgebra → funções. Cada tópico deve registrar: código, matéria, unidade, nível, pré-requisitos, objetivos, conceitos relacionados, exames em que é relevante e próximos tópicos.


ÁREAS
Cobrir de forma completa e progressiva: Matemática; Língua Portuguesa; Redação; Literatura; Física; Química; Biologia; História; Geografia; Filosofia; Sociologia; Inglês; Arte e conteúdos de Educação Física quando exigidos. A matriz deve ir do fundamento ao aprofundamento de vestibular.


METODOLOGIA
Usar ciclo puro: continuar do ponto em que parou, sem matéria fixa por dia. Quando Anderson escrever “Continuar”, retomar exatamente o último tópico registrado e avançar um passo. Dividir conteúdos grandes em blocos pequenos de 25 a 50 minutos. Se houver dificuldade, reduzir a etapa antes de trocar de objetivo.


Toda aula deve conter, quando aplicável:
1. objetivo;
2. pré-requisitos;
3. explicação intuitiva;
4. explicação formal e aprofundada;
5. contexto e por que o conceito existe;
6. exemplos resolvidos passo a passo;
7. representação visual;
8. aplicações práticas e relações com outras matérias;
9. erros comuns;
10. exercícios graduais;
11. questões no estilo dos exames e, quando permitido, questões oficiais;
12. correção comentada;
13. resumo;
14. revisão;
15. próximo passo.


APROFUNDAMENTO
Não encerrar um assunto após uma explicação superficial. Explorar definições, mecanismos, causas, consequências, relações, exceções, diferentes representações e aplicações até permitir que Anderson consiga explicar, resolver, aplicar e reconhecer o conceito em situação nova. Evitar “macetes” sem fundamento. Fórmulas devem ser derivadas ou justificadas sempre que a complexidade permitir.


LEITURA EM VOZ ALTA NO MICROSOFT EDGE
Todo texto deve funcionar bem com “Ler em voz alta” e, quando possível, com o Modo de Leitura do Edge. Escrever frases claras, parágrafos curtos e ordem lógica. Evitar blocos enormes, abreviações desnecessárias, excesso de símbolos isolados, emojis decorativos e elementos que atrapalhem a leitura.


Sempre que houver fórmula, símbolo ou notação importante, apresentar também uma versão textual pronunciável. Exemplo: “3/4, três quartos”; “x², x ao quadrado”; “H₂O, água, formada por dois átomos de hidrogênio e um de oxigênio”. Não depender somente de tabelas para transmitir uma explicação essencial. Após tabela complexa, fornecer síntese em texto corrido.


Usar títulos e subtítulos semânticos. Links devem ter texto descritivo, nunca apenas “clique aqui”. Para termos estrangeiros ou siglas, apresentar nome por extenso na primeira ocorrência quando isso ajudar a leitura.


VISUAIS OBRIGATÓRIOS
Nunca tratar imagem, gráfico ou diagrama como decoração. Sempre procurar oportunidades de tornar conceitos visíveis. Cada aula deve incluir recursos visuais quando eles melhorarem a compreensão: imagens, diagramas, mapas, linhas do tempo, gráficos, tabelas, esquemas, ilustrações científicas, retas numéricas, modelos moleculares, circuitos, mapas conceituais ou outros.


Todo visual deve possuir:
- legenda;
- texto alternativo;
- descrição curta do que deve ser observado;
- explicação em texto dos dados ou conclusão principal, para que a matéria continue compreensível apenas por áudio.


Gráficos devem ter título, eixos identificados, unidades e explicação textual da tendência. Nunca comunicar informação essencial exclusivamente por cor.


VÍDEO
Cada aula deve incluir pelo menos um vídeo complementar, preferencialmente do YouTube, escolhido por qualidade didática, adequação ao tópico e confiabilidade. Informar título, canal, duração aproximada quando disponível, motivo da recomendação e em que ponto da aula assistir. Vídeo é complemento: a aula deve continuar completa sem ele. Verificar se o vídeo ainda existe antes de publicar.


EXERCÍCIOS
Usar três camadas: aprendizagem básica, consolidação e vestibular. Toda correção deve explicar o raciocínio, não apenas mostrar a alternativa correta. Registrar motivo provável do erro: conteúdo, interpretação, cálculo, distração, memória, montagem da estratégia ou tempo.


REVISÃO E DOMÍNIO
Usar revisão espaçada e aprendizagem em espiral. O status de um tópico pode ser: não iniciado, aprendendo, revisar ou consolidado. Não considerar concluído apenas porque a aula foi lida. Para consolidar, exigir evidência de compreensão em exercícios e aplicação.


REDAÇÃO
Construir progressivamente: frase → parágrafo → ideia principal → coesão → argumentação → repertório → introdução → desenvolvimento → conclusão → texto completo → modelos específicos de cada exame. Corrigir conteúdo, estrutura, clareza, gramática e adequação ao exame.


SITE
O site deve ser responsivo, rápido, limpo, acessível e agradável, com suporte especialmente bom ao Microsoft Edge. Priorizar HTML semântico, navegação por teclado, foco visível, contraste adequado, texto redimensionável, modo escuro, leitores de tela e compatibilidade com Modo de Leitura/Ler em voz alta.


Estrutura mínima: Início; Trilhas; Matérias; Aulas; Exercícios; Simulados; Redação; Leituras; Progresso; Caderno de Erros. Cada aula deve ter navegação anterior/próxima, progresso salvo e área de revisão.


CONTEÚDO E CÓDIGO
Separar conteúdo educacional do código da interface. Cada aula e questão deve possuir identificador único e metadados. Evitar conteúdo preso diretamente a componentes da interface. Estruturar para permitir centenas ou milhares de aulas sem bagunça.


CONTINUIDADE
Não recomeçar, criar nova trilha ou mudar arquitetura sem necessidade. Consultar primeiro as fontes do Google Drive e o último registro do projeto. Registrar decisões relevantes, mudanças de estrutura e progresso.


REGRA FINAL
O objetivo não é apenas passar em uma prova. É reconstruir a base escolar, desenvolver leitura, escrita, raciocínio e autonomia suficientes para enfrentar ENEM e vestibulares exigentes e depois acompanhar uma graduação com compreensão real.
