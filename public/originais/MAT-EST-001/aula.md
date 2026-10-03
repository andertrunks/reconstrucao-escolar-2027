MAT-EST-001 — Introdução à Estatística: população, amostra, variável e dado


Status editorial: RECONSTRUÇÃO EDITORIAL v1 — não é cópia byte a byte do material histórico perdido.
Matéria: Matemática.
Unidade: Estatística.
Nível principal: 2 — Ensino Fundamental II, com conexões progressivas aos níveis 3 e 4.
Pré-requisitos conceituais: leitura literal de frases curtas; contagem com números naturais; comparação simples de quantidades. Porcentagem, média e probabilidade NÃO são exigidas para iniciar esta aula.
Próximo tópico: MAT-EST-002 — Censo, amostragem e representatividade: como escolher uma amostra.
Origem das questões desta reconstrução: 100% autoral.


1. Objetivo


Ao concluir o estudo real desta aula e resolver as atividades sem consultar o gabarito antes da tentativa, o estudante deverá ser capaz de:


• explicar, com palavras próprias, o que a Estatística procura fazer;
• diferenciar população e amostra;
• identificar corretamente a unidade de análise de uma investigação;
• diferenciar variável e dado observado;
• reconhecer variáveis qualitativas e quantitativas em exemplos simples;
• distinguir, como primeira aproximação, variáveis quantitativas discretas e contínuas e variáveis qualitativas nominais e ordinais;
• explicar por que uma amostra não é automaticamente representativa apenas por ser grande;
• montar a estrutura lógica “pergunta → população → unidade → variável → dados → análise”;
• reconhecer esses conceitos em situações novas, inclusive em gráficos, pesquisas de opinião e problemas no estilo de vestibulares.


2. Antes de começar: o mínimo necessário


Esta aula começa do zero dentro da Estatística. Não é necessário saber calcular média, desvio-padrão ou probabilidade.


É necessário apenas compreender três ideias comuns:


Primeira ideia: um conjunto é uma coleção de elementos considerados juntos. Por exemplo, “todos os livros de uma estante” é um conjunto.


Segunda ideia: uma característica é algo que podemos observar ou registrar sobre um elemento. Por exemplo, em um livro podemos registrar número de páginas, gênero literário e ano de publicação.


Terceira ideia: uma pergunta de pesquisa define o que realmente queremos conhecer. Sem uma pergunta razoavelmente clara, não sabemos qual população observar nem quais dados coletar.


Microdiagnóstico. Imagine cinco caixas numeradas. Se eu pergunto “quantas caixas há?”, preciso apenas contar. Se pergunto “qual é o peso médio das caixas?”, preciso conhecer o peso de cada caixa ou de uma amostra delas. A Estatística começa quando organizamos observações para responder perguntas sobre um conjunto de interesse.


3. Por que a Estatística existe?


No cotidiano, quase nunca conseguimos observar perfeitamente tudo aquilo que gostaríamos de conhecer.


Uma prefeitura pode querer saber quanto tempo as pessoas levam para chegar ao trabalho. Uma fábrica pode querer estimar a proporção de peças defeituosas. Uma escola pode querer entender como os estudantes se deslocam até as aulas. Um pesquisador pode querer descrever a altura de uma população. Um portal de notícias pode apresentar uma pesquisa de opinião.


Em todos esses casos há três desafios:


1. decidir exatamente sobre quem ou sobre o que queremos falar;
2. decidir o que vamos observar;
3. transformar observações em uma conclusão sem dizer mais do que os dados permitem.


A Estatística reúne métodos para coletar, organizar, resumir, analisar e interpretar dados. Nas aulas seguintes acrescentaremos ferramentas matemáticas progressivamente. Nesta primeira aula, o objetivo é aprender a linguagem básica para não fazer contas corretas sobre o conjunto errado.


4. A pergunta vem antes da conta


Considere a pergunta:


“Qual é o tempo de espera dos clientes de uma biblioteca municipal para retirar um livro reservado?”


Antes de calcular qualquer coisa, precisamos esclarecer:


• Que biblioteca?
• Em qual período?
• O que conta como cliente?
• O tempo começa quando a pessoa entra na fila ou quando chega ao prédio?
• A unidade observada é a pessoa, a reserva ou cada atendimento?
• Mediremos segundos, minutos ou categorias como “rápido”, “moderado” e “demorado”?


Essas decisões não são burocracia. Elas mudam o significado do dado.


Se uma mesma pessoa retira três reservas em momentos diferentes, “pessoa” e “atendimento” não são a mesma unidade de análise. Uma planilha com três linhas pode representar três pessoas diferentes ou três atendimentos da mesma pessoa. A interpretação depende disso.


5. População: o conjunto sobre o qual queremos falar


População estatística é o conjunto completo de unidades que atendem à definição da investigação.


A palavra “população” não significa apenas pessoas. Uma população pode ser formada por:


• todas as lâmpadas produzidas por uma máquina em um turno;
• todos os pedidos registrados por uma loja em um mês;
• todas as árvores de determinada área delimitada;
• todos os lançamentos de um processo experimental definido;
• todos os estudantes matriculados em uma instituição, se essa for a pergunta.


A população precisa ser delimitada.


Dizer “os brasileiros” é vago para muitas pesquisas. “Pessoas com 16 anos ou mais residentes no Brasil em uma determinada data de referência”, por exemplo, é uma definição mais precisa, porque informa critérios de inclusão.


Em notação estatística, é comum representar o tamanho de uma população finita por N maiúsculo. Leitura: “ene maiúsculo”. Nesta aula, a notação é apenas uma convenção. Não é necessário decorar agora.


Exemplo resolvido 1.


Pergunta: “Qual é a quantidade de páginas dos romances disponíveis no acervo de uma biblioteca específica no fechamento do mês?”


População: todos os romances que pertencem ao acervo definido naquele fechamento.
Unidade de análise: cada romance do acervo.
Variável: número de páginas.
Dado: um valor efetivamente observado em uma unidade, por exemplo, 312 páginas.


Observe: “312” não é a variável. A variável é “número de páginas”. O número 312 é um valor dessa variável para um livro particular.


6. Amostra: a parte observada da população


Amostra é um subconjunto da população utilizado na investigação.


Se uma fábrica produziu 20.000 peças e a equipe mede 400 delas, as 20.000 peças pertencem à população definida e as 400 peças medidas formam a amostra.


Em notação, é comum representar o tamanho da amostra por n minúsculo. Leitura: “ene minúsculo”.


Amostra não significa “população pequena”. Ela é uma parte da população.


Também não é verdade que qualquer amostra grande seja boa. Imagine uma pesquisa sobre transporte realizada somente com pessoas que chegaram de automóvel a um estacionamento. Mesmo que sejam milhares de respostas, esse procedimento pode deixar de fora grupos importantes para uma pergunta sobre os meios de transporte de toda a população.


O modo de selecionar a amostra é assunto central da MAT-EST-002.


Exemplo resolvido 2.


Uma universidade tem 12.000 estudantes matriculados. Um questionário é enviado a 1.000 estudantes escolhidos segundo um plano de seleção. Desses, 730 respondem.


Qual é a população? Os 12.000 estudantes, se a pergunta se refere a todos os matriculados.
Qual é a amostra planejada? Os 1.000 selecionados.
Qual é o conjunto efetivamente respondente? Os 730 que enviaram resposta.


Por que isso importa? Porque “selecionado” e “respondente” são conceitos diferentes. A falta de resposta pode alterar quem efetivamente aparece nos dados.


7. Censo e pesquisa por amostra: primeira visão


Censo é uma investigação que procura observar todas as unidades da população definida.


Pesquisa amostral observa apenas uma parte.


Um censo não é automaticamente perfeito. Ainda podem existir erros de registro, unidades não localizadas, respostas incorretas, duplicidades e definições ruins.


Uma pesquisa amostral também não é automaticamente inferior. Quando bem planejada, pode ser mais rápida, mais econômica e suficientemente informativa para determinados objetivos.


Na MAT-EST-002 estudaremos como a forma de seleção interfere na representatividade e por que alguns tipos de amostra são perigosos.


8. Unidade de análise: a peça que cada linha representa


A unidade de análise é o elemento básico sobre o qual uma observação é feita.


Exemplos:


• numa pesquisa sobre estudantes, a unidade pode ser cada estudante;
• numa pesquisa sobre escolas, a unidade pode ser cada escola;
• numa série diária de temperatura, a unidade pode ser cada dia ou cada medição, conforme a definição;
• numa análise de partidas, a unidade pode ser cada partida;
• num estudo de produtos, a unidade pode ser cada produto vendido.


Um dos erros mais comuns em Estatística é confundir quantidade de linhas com quantidade de unidades independentes.


Se cada uma de 100 pessoas responde cinco vezes, temos 500 registros, mas não necessariamente 500 pessoas independentes.


Essa diferença ficará ainda mais importante em conteúdos avançados, mas a disciplina correta começa aqui.


9. Variável: a característica que pode assumir valores


Variável é uma característica observada ou registrada para cada unidade e que pode assumir valores diferentes.


Em uma lista de estudantes:


• idade é uma variável;
• meio de transporte é uma variável;
• número de livros lidos no mês é uma variável;
• nível de satisfação em categorias ordenadas pode ser uma variável.


Um dado é o valor efetivamente registrado.


Se a variável é “idade em anos completos”, um dado possível é 34.
Se a variável é “meio de transporte principal”, um dado possível é “ônibus”.
Se a variável é “quantidade de livros”, um dado possível é 2.


Uma única unidade pode fornecer vários dados, um para cada variável.


10. Classificação inicial das variáveis


A classificação ajuda a escolher representações e análises apropriadas mais tarde.


10.1 Variável qualitativa


Registra categorias ou qualidades, e não uma quantidade obtida por contagem ou medição aritmética.


Qualitativa nominal: as categorias não têm uma ordem natural obrigatória.


Exemplos: tipo sanguíneo; estado de nascimento; meio de transporte; setor de trabalho.


Qualitativa ordinal: as categorias possuem ordem.


Exemplos: satisfação “baixa, média, alta”; classificação “iniciante, intermediário, avançado”; avaliação “ruim, regular, boa, ótima”.


A existência de ordem não cria automaticamente uma distância numérica igual entre as categorias.


10.2 Variável quantitativa


Registra uma quantidade numérica para a qual operações aritméticas podem ter significado.


Quantitativa discreta: normalmente resulta de contagem e assume valores separados.


Exemplos: número de filhos; quantidade de livros; número de defeitos.


Quantitativa contínua: normalmente resulta de medição e, em princípio, pode assumir qualquer valor em um intervalo compatível com a precisão do instrumento.


Exemplos: massa; tempo; comprimento; temperatura em uma escala contínua.


A distinção “discreta versus contínua” não depende apenas de aparecerem casas decimais. Um sistema pode registrar a altura arredondada para centímetros inteiros, embora a grandeza altura seja conceitualmente contínua.


Exemplo resolvido 3.


Uma pesquisa registra:
A. bairro de residência;
B. satisfação de 1 a 5, onde 1 significa muito insatisfeito e 5 muito satisfeito;
C. quantidade de viagens de ônibus na semana;
D. tempo de viagem, em minutos e segundos.


A é qualitativa nominal.
B pode ser tratada como qualitativa ordinal quando os números são códigos ordenados de categorias; não devemos supor, sem justificativa, que a distância psicológica entre 1 e 2 seja idêntica à distância entre 4 e 5.
C é quantitativa discreta.
D é quantitativa contínua, ainda que seja registrada com precisão limitada.


11. Dado, informação e contexto


Um número isolado não é automaticamente informação suficiente.


“18” pode significar idade, temperatura, quantidade de pessoas, quilômetros ou uma categoria codificada.


Para interpretar um dado, precisamos de contexto:


• qual variável;
• qual unidade;
• qual unidade de medida;
• quando e como foi coletado;
• qual população ou amostra;
• quais regras de registro foram usadas.


Exemplo resolvido 4.


Planilha:
Linha 1 — unidade A17; transporte: bicicleta; tempo: 18 minutos.
Linha 2 — unidade A18; transporte: ônibus; tempo: 42 minutos.


A variável “transporte” é qualitativa nominal.
A variável “tempo” é quantitativa contínua.
“A17” e “A18” são identificadores, não medidas de idade.
“18 minutos” é um dado da variável tempo para a unidade A17.


Isso mostra por que nomes de colunas e unidades de medida fazem parte do significado.


12. População, amostra, parâmetro e estatística


Duas palavras aparecerão muitas vezes adiante.


Parâmetro é uma medida que descreve a população.


Estatística, em sentido técnico de “estatística amostral”, é uma medida calculada a partir da amostra.


Exemplo: se conhecêssemos a idade média de todos os indivíduos da população, esse valor seria um parâmetro. Se calculamos a idade média apenas dos indivíduos de uma amostra, obtemos uma estatística amostral usada para descrever a amostra e, sob condições adequadas, aprender algo sobre a população.


Nesta aula não calcularemos estimativas. A distinção serve apenas para preparar a linguagem das etapas futuras.


13. Exemplo integrado resolvido passo a passo


Situação: uma rede de bibliotecas quer compreender o tempo de espera para retirar reservas em suas unidades durante dias úteis de um determinado mês.


Passo 1 — Pergunta.
“Qual é a distribuição dos tempos de espera nos atendimentos elegíveis definidos pela pesquisa?”


Passo 2 — População.
Todos os atendimentos que satisfazem os critérios: bibliotecas incluídas, período incluído, tipo de serviço e demais regras.


Passo 3 — Unidade de análise.
Cada atendimento elegível.


Passo 4 — Variáveis.
Biblioteca; dia; horário; tempo de espera; tipo de retirada; eventualmente outras características definidas antes da coleta.


Passo 5 — Dados.
Cada linha registra valores dessas variáveis para um atendimento.


Passo 6 — Amostra.
Se apenas alguns atendimentos forem observados, o conjunto observado é a amostra.


Passo 7 — Limite.
Se a amostra foi coletada somente às segundas-feiras pela manhã, não podemos tratar automaticamente as conclusões como descrição de todos os horários do mês.


O ponto central é que a Estatística começa pela definição correta do problema, não pela escolha de uma fórmula.


14. Cinco visuais autorais especificados para esta reconstrução


Os SVGs reais ainda não foram gerados neste incremento. As especificações abaixo são obrigatórias para a produção gráfica posterior.


Visual 1 — População e amostra.


Legenda: “A amostra é uma parte da população definida”.
Texto alternativo: conjunto maior com vinte unidades representadas por círculos identificáveis e, dentro dele, cinco unidades destacadas como amostra.
O que observar: nenhuma unidade da amostra está fora da população; a amostra não é uma população diferente.
Conclusão para áudio: população é o conjunto completo definido pela pergunta; amostra é o subconjunto efetivamente selecionado ou observado segundo o desenho.
Requisito de cor: destacar a amostra também por contorno e rótulo, nunca apenas por cor.


Visual 2 — Unidade, variável e dado.


Legenda: “Uma linha representa uma unidade; cada coluna representa uma variável”.
Texto alternativo: pequena matriz com três linhas de atendimentos e três colunas: identificador, meio de transporte e tempo em minutos.
O que observar: “tempo” é o nome da variável; “18 minutos” é um dado; “A17” identifica a unidade.
Conclusão para áudio: variável é a característica registrada; dado é o valor da característica em uma unidade concreta.


Visual 3 — Árvore de classificação das variáveis.


Legenda: “Primeira classificação: qualitativas e quantitativas”.
Texto alternativo: árvore textual que divide variável em qualitativa e quantitativa; qualitativa em nominal e ordinal; quantitativa em discreta e contínua.
O que observar: cada ramo contém um exemplo e uma pergunta-guia.
Conclusão para áudio: classificar uma variável depende de seu significado, e não apenas da aparência do código usado para registrá-la.


Visual 4 — Censo e amostra.


Legenda: “Observar todos ou observar uma parte”.
Texto alternativo: dois caminhos partindo da mesma população: censo cobre todas as unidades; pesquisa amostral seleciona uma parte e mantém explícita a população-alvo.
O que observar: censo e amostra são estratégias de coleta diferentes; nenhuma delas corrige uma pergunta mal definida.
Conclusão para áudio: observar todos pode reduzir erro de amostragem, mas não elimina outros erros; amostragem exige um plano de seleção.


Visual 5 — Da pergunta à conclusão.


Legenda: “A cadeia lógica de uma investigação estatística”.
Texto alternativo: sequência pergunta → população → unidade → variáveis → coleta → dados → análise → conclusão limitada.
O que observar: a análise aparece somente depois da definição e da coleta.
Conclusão para áudio: uma conclusão estatística só faz sentido quando sabemos de onde vieram os dados e a que conjunto a afirmação pretende se referir.


15. Aplicações e conexões com outras matérias


Língua Portuguesa: interpretar exatamente a pergunta, os quantificadores “todos”, “alguns”, “entre os selecionados” e as condições de inclusão.


Geografia: pesquisas populacionais, censos, mobilidade, distribuição territorial e leitura crítica de indicadores.


Biologia: população pode ter sentido biológico próprio; em Estatística, precisamos declarar a unidade e o conjunto sobre os quais serão feitas inferências.


História e Sociologia: censos, levantamentos, pesquisas de opinião e indicadores sociais precisam ser lidos junto de sua metodologia.


Tecnologia da Informação: tabelas de dados, nomes de colunas, tipos de campo, registros duplicados, identificadores e proveniência são versões computacionais dos conceitos de unidade, variável e dado.


Ciências em geral: definir a população e a unidade observacional ajuda a não generalizar resultados de um experimento para condições que não foram estudadas.


16. Erros frequentes


Erro 1 — Dizer que população significa necessariamente “pessoas”.
Correção: população estatística pode ser qualquer conjunto de unidades definido pela pergunta.


Erro 2 — Confundir amostra com grupo pequeno.
Correção: uma amostra é uma parte da população, independentemente de ser pequena ou grande.


Erro 3 — Chamar “42” de variável.
Correção: “idade”, “tempo” ou outra característica é a variável; 42 é um valor registrado.


Erro 4 — Achar que uma amostra grande é automaticamente representativa.
Correção: o modo de seleção importa. Tamanho e representatividade são questões diferentes.


Erro 5 — Classificar códigos numéricos como quantitativos sem olhar o significado.
Correção: 1, 2 e 3 podem ser apenas códigos de categorias.


Erro 6 — Confundir cada linha da planilha com uma pessoa.
Correção: a linha representa a unidade definida. Pode ser pessoa, atendimento, escola, produto, dia ou outra unidade.


Erro 7 — Generalizar além da população definida.
Correção: dados coletados numa empresa não descrevem automaticamente todas as empresas; dados de uma cidade não descrevem automaticamente um país.


Erro 8 — Começar pela fórmula.
Correção: primeiro definir pergunta, população, unidade e variável; depois decidir o método.


17. Relação com BNCC e exames


A Base Nacional Comum Curricular organiza Matemática do Ensino Fundamental também pela unidade temática Probabilidade e Estatística. O documento oficial destaca coleta, organização, análise, tabelas, gráficos e comunicação de conclusões como aprendizagens progressivas. No Ensino Médio, a BNCC propõe consolidar, ampliar e aprofundar as aprendizagens do Ensino Fundamental.


A Matriz de Referência do Enem publicada pelo Inep em 2026 é a referência institucional vigente do projeto para a camada específica do exame. Esta aula não tenta reproduzir uma questão oficial: prepara a linguagem necessária para ler situações-problema, dados, amostras e representações.


O Programa do Vestibular FUVEST 2027 explicita, na competência estatística, população e amostra, planejamento de pesquisa amostral, comunicação e interpretação de resultados e leitura crítica de gráficos e métodos de amostragem.


Nesta reconstrução, nenhuma questão oficial foi copiada. A camada de exercícios é autoral. A correspondência detalhada com UNICAMP e UNESP deverá ser revalidada nos documentos específicos antes da publicação do pacote como versão final de vestibular.


18. Como estudar esta aula


Bloco A — 25 a 40 minutos.
Estude seções 1 a 8. Pare e tente explicar sem olhar: população, amostra e unidade de análise.


Bloco B — 25 a 45 minutos.
Estude seções 9 a 13. Classifique variáveis e refaça os exemplos em palavras próprias.


Bloco C — 25 a 50 minutos.
Resolva os exercícios de aprendizagem. Somente depois consulte a correção correspondente.


Bloco D — em sessão posterior.
Resolva consolidação e transferência. O reteste deve ficar para depois da correção e de eventual recuperação.


19. Resumo


Estatística começa com uma pergunta sobre um conjunto de interesse.


População é o conjunto completo de unidades definido pela investigação.


Amostra é a parte da população que foi selecionada ou observada.


Unidade de análise é aquilo que cada observação representa.


Variável é a característica registrada.


Dado é o valor observado dessa variável em uma unidade concreta.


Variáveis qualitativas descrevem categorias; podem ser nominais ou ordinais.


Variáveis quantitativas descrevem quantidades; podem ser discretas ou contínuas.


Antes de calcular, precisamos saber de onde os dados vieram e até onde uma conclusão pode ir.


20. Versão curta para ouvir


A Estatística transforma observações em descrições e conclusões, mas o primeiro passo não é uma fórmula. Primeiro fazemos uma pergunta. Depois definimos a população, isto é, o conjunto completo sobre o qual queremos falar. Se observamos somente uma parte, essa parte é a amostra. Em seguida definimos a unidade de análise, que é aquilo que cada registro representa. Uma variável é uma característica registrada para cada unidade, e um dado é o valor dessa característica em um caso concreto. Variáveis podem representar categorias ou quantidades. Uma amostra grande não é automaticamente representativa; a forma de seleção será estudada na próxima aula. Uma conclusão responsável nunca deve ir além do conjunto e do processo de coleta que realmente foram definidos.


21. Vídeo complementar


Título: “CONCEITOS BÁSICOS DE ESTATÍSTICA: POPULAÇÃO, AMOSTRA, AMOSTRAGEM, VARIÁVEIS E ORGANIZAÇÃO DE DADOS”.
Canal: Professora Gisele Ramos - Matemática.
Link: https://www.youtube.com/watch?v=5ctWgFOizkQ
Idioma: português do Brasil.
Duração: aproximadamente 13 minutos, pela estrutura temporal publicada na descrição do vídeo.
Disponibilidade: página localizada na verificação desta reconstrução.
Quando assistir: depois das seções sobre população, amostra e variável.
Trechos especialmente alinhados: aproximadamente de 0:42 a 2:16 para introdução, população, amostra e censo; aproximadamente de 9:30 a 11:57 para tipos de variáveis. O trecho intermediário sobre métodos de amostragem será retomado na MAT-EST-002.
Motivo: reforça o vocabulário essencial sem substituir as explicações mais cuidadosas desta aula.
Limite de QA: a reprodução integral, qualidade das legendas e leitura no Microsoft Edge ainda precisam ser verificadas antes da publicação.


22. Fontes desta reconstrução


Base Nacional Comum Curricular — versão oficial:
https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf


Inep — Matrizes de Referência do Enem, publicação institucional de 2026:
https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem/


FUVEST — Programa do Vestibular 2027:
https://www.fuvest.br/wp-content/uploads/fuvest2027-programa-vestibular.pdf


Documentos internos do projeto:
Visão e Princípios; Metodologia de Aprendizagem e Aprofundamento; Matriz Mestre; Acessibilidade e Leitura em Voz Alta; Padrão Visual; Arquitetura do Site; Fontes Oficiais e Regra de Atualização.


23. Próximo passo


MAT-EST-002 — Censo, amostragem e representatividade: como escolher uma amostra.


Não avançar apenas porque esta aula foi produzida. A produção editorial não altera o progresso individual. Antes de publicar, ainda faltam os SVGs reais, teste audiovisual, validação de acessibilidade no Edge, conversão para o modelo do site e QA técnico.
