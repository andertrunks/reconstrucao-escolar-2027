MAT-EST-011 — Amplitude interquartil e box-plot: caixa, bigodes e valores discrepantes


Status editorial: RECONSTRUÇÃO EDITORIAL v1 — não é cópia byte a byte do material histórico perdido.
Título histórico preservado conforme o inventário INC07.
Matéria: Matemática.
Unidade: Estatística.
Nível principal: 3 — Ensino Médio, com aprofundamento para ENEM, FUVEST, UNICAMP, UNESP e ponte universitária.
Pré-requisitos: MAT-EST-001 a MAT-EST-010, com ênfase em organização de dados, mediana, amplitude, variância, desvio-padrão, quartis e percentis.
Questões desta reconstrução: 100% autorais.
Próximo tópico: MAT-EST-012 — Assimetria e forma das distribuições: comparação integrada de histogramas e box-plots.


1. Objetivo


Ao concluir esta aula, o estudante deverá ser capaz de explicar o que mede a amplitude interquartil, calcular AIQ a partir de Q1 e Q3, construir e interpretar box-plots com convenção declarada, distinguir caixa, mediana, bigodes, limites e pontos sinalizados, comparar distribuições sem depender apenas da média e reconhecer limitações do gráfico.


Também deverá compreender que um ponto sinalizado pela regra de 1,5 vezes a amplitude interquartil não é automaticamente um erro, uma fraude ou um dado a ser removido.


2. O que você precisa saber antes


A aula usa os conceitos de dados ordenados, mediana, primeiro quartil Q1 e terceiro quartil Q3.


Se Q1 e Q3 ainda não estiverem claros, retome MAT-EST-010 antes de avançar. A ordem conceitual importa mais do que o número da aula.


Também serão úteis amplitude total, proporção, reta numérica e leitura de gráficos.


3. Por que a amplitude interquartil existe?


A amplitude total usa somente o menor e o maior valor. Por isso, pode mudar muito quando aparece um valor extremo.


A amplitude interquartil concentra-se na metade central da distribuição. Ela mede a distância entre o terceiro quartil e o primeiro quartil.


Assim, oferece uma medida de dispersão menos sensível aos extremos do que a amplitude total.


4. A ideia dos 50% centrais


Q1 está associado ao corte de 25% da distribuição ordenada e Q3 ao corte de 75%.


Entre Q1 e Q3 fica a região central de aproximadamente 50% dos dados, respeitada a convenção de quartis usada.


A amplitude interquartil mede a largura dessa região.


5. Definição formal


AIQ = Q3 - Q1.


Leitura por extenso: “amplitude interquartil é igual ao terceiro quartil menos o primeiro quartil”.


AIQ é a sigla usada nesta aula para amplitude interquartil. Também é comum encontrar IQR, do inglês interquartile range.


6. Unidade da AIQ


A amplitude interquartil tem a mesma unidade da variável original.


Se os dados são medidos em minutos, a AIQ é medida em minutos.


Se os dados são medidos em reais, a AIQ é medida em reais.


Diferentemente da variância, não há elevação da unidade ao quadrado.


7. Exemplo direto


Suponha Q1 = 12 e Q3 = 20.


AIQ = 20 - 12 = 8.


A leitura é: “os cinquenta por cento centrais ocupam uma faixa de oito unidades entre o primeiro e o terceiro quartil”.


Isso não significa que cada observação central esteja a oito unidades das demais. A AIQ resume a largura do intervalo central.


8. Retomada de uma convenção explícita


Nesta reconstrução, quando for necessário calcular quartis a partir de dados brutos, o enunciado informará a convenção.


Em vários exemplos simples, usaremos a mediana das metades, excluindo a mediana central quando houver número ímpar de observações, salvo indicação diferente.


Não existe uma única convenção universal de quantil para toda amostra finita. Essa cautela foi construída em MAT-EST-010.


9. Resumo de cinco números


Uma representação clássica da distribuição usa cinco valores:


mínimo;
Q1;
mediana;
Q3;
máximo.


Esse conjunto é chamado resumo de cinco números.


Ele ajuda a descrever posição e dispersão sem listar todos os dados.


10. O box-plot


Box-plot, ou gráfico de caixa, é uma representação compacta baseada em quartis.


A caixa se estende de Q1 a Q3.


Uma linha dentro da caixa marca a mediana.


Os bigodes estendem a informação para regiões externas à caixa, mas a definição exata dos bigodes depende da convenção adotada.


11. Duas convenções de bigodes que não devem ser confundidas


Em um box-plot simples, algumas apresentações escolares usam bigodes até o mínimo e o máximo.


No box-plot modificado de Tukey, os bigodes normalmente vão até as observações mais extremas que permanecem dentro de limites calculados a partir da AIQ. Pontos além desses limites são desenhados separadamente.


Antes de interpretar um gráfico, descubra qual convenção foi usada.


12. Regra de 1,5 vezes a AIQ


Uma convenção muito difundida usa dois limites, também chamados cercas.


Limite inferior = Q1 - 1,5 × AIQ.


Limite superior = Q3 + 1,5 × AIQ.


Leitura por extenso: “limite inferior é igual ao primeiro quartil menos uma vez e meia a amplitude interquartil; limite superior é igual ao terceiro quartil mais uma vez e meia a amplitude interquartil”.


13. O que os limites fazem


Os limites não precisam coincidir com dados observados.


Eles servem para identificar valores que ficam suficientemente afastados da caixa segundo essa regra.


Uma observação abaixo do limite inferior ou acima do limite superior é sinalizada como potencialmente discrepante.


14. Exemplo completo com dados brutos


Considere os dados ordenados:


2, 3, 4, 5, 6, 7, 8, 20.


Usando a mediana das metades:


metade inferior: 2, 3, 4, 5;
Q1 = (3 + 4) / 2 = 3,5.


metade superior: 6, 7, 8, 20;
Q3 = (7 + 8) / 2 = 7,5.


AIQ = 7,5 - 3,5 = 4.


15. Limites do exemplo


Limite inferior = 3,5 - 1,5 × 4 = -2,5.


Limite superior = 7,5 + 1,5 × 4 = 13,5.


O valor 20 está acima de 13,5. Portanto, é sinalizado pela regra de 1,5 vezes a AIQ.


16. Sinalizado não significa errado


O valor 20 pode ser:


uma observação legítima de uma cauda da distribuição;
um caso raro, mas real;
um valor proveniente de outra população;
um erro de digitação;
um erro de medição;
ou outra situação que exige investigação.


O box-plot sozinho não decide qual dessas explicações é verdadeira.


17. Nunca remover um dado apenas porque ele foi sinalizado


A exclusão de uma observação exige justificativa ligada ao objetivo do estudo, ao processo de coleta e à qualidade do dado.


Remover automaticamente pontos sinalizados pode distorcer a análise.


Em vestibular, uma questão pode pedir apenas para identificar o ponto discrepante segundo a regra fornecida. Em análise real, a investigação não termina aí.


18. Onde terminam os bigodes no box-plot modificado?


No exemplo anterior, o limite superior é 13,5.


O maior dado observado que não ultrapassa 13,5 é 8.


Por isso, no box-plot modificado, o bigode superior termina em 8, e o 20 aparece separado.


O bigode não termina necessariamente no próprio limite 13,5.


19. Construção passo a passo


Um roteiro seguro é:


1. ordenar os dados;
2. fixar a convenção de quartis;
3. calcular Q1, mediana e Q3;
4. calcular AIQ;
5. se for box-plot modificado, calcular os limites;
6. localizar os últimos dados observados dentro dos limites;
7. desenhar caixa, mediana e bigodes;
8. marcar separadamente os pontos além dos limites;
9. interpretar centro, dispersão e possíveis assimetrias com cautela.


20. Como ler a caixa


O comprimento da caixa é a AIQ.


Uma caixa mais longa indica maior dispersão dos 50% centrais, na mesma escala e para variáveis comparáveis.


Uma caixa curta indica maior concentração central.


Não conclua nada sobre a amplitude total olhando somente a caixa.


21. Como ler a mediana


A mediana marca o centro por posição.


Se a mediana está próxima do meio da caixa, isso é compatível com maior equilíbrio entre as duas metades centrais.


Se está muito próxima de Q1 ou Q3, pode sugerir assimetria local.


“Sugerir” não é “provar”. A forma completa da distribuição pode conter detalhes que o box-plot esconde.


22. Como ler os bigodes


Bigodes de comprimentos muito diferentes podem sugerir diferenças entre as caudas ou assimetria.


Mas a interpretação depende da convenção dos bigodes e da amostra observada.


Bigodes também não mostram todos os intervalos vazios ou agrupamentos internos.


23. Comparando dois box-plots


Uma comparação deve considerar pelo menos:


posição da mediana;
AIQ;
extensão dos bigodes;
presença de pontos sinalizados;
unidade e escala;
definição dos bigodes;
e contexto dos grupos.


Evite declarar um grupo “mais variável” sem dizer qual medida de dispersão está sendo comparada.


24. Mesmo centro, dispersões diferentes


Dois grupos podem ter a mesma mediana e AIQs diferentes.


Nesse caso, os centros por posição são iguais, mas os 50% centrais ocupam larguras diferentes.


Isso é uma informação que a média isolada não forneceria.


25. Mesma AIQ, centros diferentes


Dois grupos podem ter a mesma AIQ e medianas diferentes.


Nesse caso, a dispersão central resumida pela AIQ é igual, mas a posição central muda.


Centro e dispersão são dimensões distintas.


26. Box-plot não mostra tamanho da amostra por padrão


Dois box-plots com aparência parecida podem ter sido construídos com 12 e 12 mil observações.


A versão convencional não informa o tamanho amostral diretamente.


Algumas variações ajustam a largura da caixa ao tamanho da amostra, mas isso precisa ser indicado.


27. Box-plot pode esconder multimodalidade


Duas distribuições muito diferentes podem ter o mesmo resumo de cinco números.


Uma distribuição pode ter dois picos e outra apenas um, mas seus box-plots serem parecidos.


Por isso, quando a forma detalhada importa, histograma, gráfico de densidade, pontos individuais ou outros recursos podem complementar o box-plot.


28. Box-plot e histograma são complementares


O histograma enfatiza forma, frequências por intervalos e possíveis picos.


O box-plot enfatiza quartis, mediana, dispersão central e pontos sinalizados.


Nenhum deles é universalmente “melhor”. A escolha depende da pergunta.


29. Dados repetidos


Empates podem fazer Q1, mediana e Q3 coincidirem parcialmente.


É possível que a AIQ seja zero.


Isso não significa que todos os dados sejam iguais. Significa que, segundo a convenção adotada, a metade central está concentrada no mesmo valor ou numa faixa nula.


30. Caso AIQ igual a zero


Se AIQ = 0, então os dois limites da regra de 1,5 vezes a AIQ coincidem com Q1 e Q3.


Nesse caso, qualquer valor diferente desse núcleo pode ser sinalizado.


A regra torna-se muito agressiva em distribuições altamente discretas ou com muitos empates. A interpretação precisa de contexto.


31. Variáveis discretas


Box-plots podem ser usados com muitas variáveis quantitativas discretas, mas a presença de poucos valores possíveis pode produzir caixas comprimidas e muitos empates.


Um gráfico de pontos ou barras de frequências pode revelar melhor a estrutura.


A escolha da representação deve ser justificada pela informação que se deseja enxergar.


32. Somar uma constante


Se adicionamos uma constante c a todos os dados:


novo Q1 = Q1 + c;
novo Q3 = Q3 + c.


Logo:


nova AIQ = (Q3 + c) - (Q1 + c) = Q3 - Q1.


A soma de uma constante não altera a AIQ.


33. Multiplicar por uma constante positiva


Se todos os dados são multiplicados por a, com a positivo:


novo Q1 = aQ1;
novo Q3 = aQ3.


Logo:


nova AIQ = a(Q3 - Q1) = a × AIQ.


A leitura é: “a amplitude interquartil é multiplicada pelo mesmo fator positivo”.


34. Multiplicar por uma constante negativa


Uma multiplicação por número negativo inverte a ordem dos dados.


Depois da reordenação, a amplitude interquartil é multiplicada pelo valor absoluto do fator.


Em forma compacta:


AIQ nova = |a| × AIQ antiga.


Leitura: “a nova amplitude interquartil é o módulo de a vezes a amplitude interquartil antiga”.


35. Mudança de unidade


Se uma medida em metros é convertida para centímetros, os valores são multiplicados por 100.


A AIQ também é multiplicada por 100.


Essa propriedade permite verificar coerência de unidade.


36. Robustez e comparação com a amplitude total


A AIQ ignora diretamente a distância entre os extremos e os quartis.


Por isso, um único valor muito afastado pode aumentar muito a amplitude total sem alterar a AIQ.


A palavra robusta, neste contexto, significa menos sensível a certos valores extremos, não “imune a qualquer problema”.


37. Aplicação: notas de duas turmas


Ao comparar notas, a mediana informa uma posição central e a AIQ informa a largura dos 50% centrais.


Uma turma pode ter mediana maior e também maior AIQ.


Não existe uma única conclusão “melhor” sem dizer se a pergunta é sobre desempenho típico, consistência, extremos ou outro critério.


38. Aplicação: tempo de atendimento


Em tempos de atendimento, uma cauda longa de valores altos pode indicar ocorrências demoradas.


O box-plot ajuda a localizar casos sinalizados e a comparar turnos.


Mas ele não informa sozinho a causa dos atrasos nem demonstra que um turno é operacionalmente pior.


39. Aplicação: controle de processo


Em uma linha de produção, box-plots podem comparar lotes, turnos ou máquinas.


Mudança de mediana e mudança de AIQ são fenômenos diferentes.


Antes de agir, é preciso verificar unidades, amostragem, condições de coleta e estabilidade do processo.


40. Ponte universitária: regra de Tukey é uma convenção descritiva


Os limites Q1 menos 1,5 AIQ e Q3 mais 1,5 AIQ são uma regra descritiva associada ao box-plot de Tukey.


Eles não são um intervalo de confiança.


Eles não correspondem automaticamente a “95% dos dados”.


Eles não dependem de assumir normalidade para serem calculados, embora a frequência de pontos sinalizados varie conforme a distribuição.


41. Relação com a BNCC


A Base Nacional Comum Curricular do Ensino Médio inclui habilidade de interpretar e comparar conjuntos de dados por diferentes diagramas e gráficos, incluindo o gráfico de caixa, ou box-plot.


Esta aula desenvolve diretamente leitura, construção e comparação de box-plots, sempre explicitando limites da representação.


42. Relação com a FUVEST 2027


O Programa do Vestibular FUVEST 2027 inclui interpretação de registros de representação estatística e medidas de posição, como quartis, decis e percentis.


A amplitude interquartil e o box-plot usam esses conceitos para comparar centro e dispersão.


As questões desta reconstrução são autorais; não são questões oficiais da FUVEST.


43. Relação com o Enem


As Matrizes de Referência do Enem publicadas pelo Inep em 2026 mantêm como eixos a resolução de situações-problema, o uso de linguagens e a interpretação de informações.


Nesta aula, o foco de preparação é ler dados, interpretar representações, comparar distribuições e justificar conclusões.


Não se afirma que a regra de 1,5 vezes a AIQ seja um conteúdo isolado obrigatório do Enem apenas por aparecer aqui.


44. O que observar nos seis visuais


Visual 1 — Dados ordenados.
Texto alternativo: oito valores aparecem em ordem crescente, com um valor final muito maior que os demais.
Observe: a construção dos quartis começa pela ordenação.
Conclusão para áudio: um extremo pode ficar longe do núcleo sem alterar todas as medidas centrais.


Visual 2 — Amplitude interquartil.
Texto alternativo: uma faixa horizontal vai de Q1 igual a 3,5 até Q3 igual a 7,5, com mediana 5,5.
Observe: a AIQ é a largura entre Q1 e Q3.
Conclusão para áudio: os 50% centrais ocupam quatro unidades.


Visual 3 — Anatomia do box-plot.
Texto alternativo: caixa horizontal de Q1 a Q3, linha de mediana, bigodes e um ponto separado em 20.
Observe: no box-plot modificado, o ponto 20 fica além do bigode.
Conclusão para áudio: caixa, bigodes e pontos separados representam funções diferentes.


Visual 4 — Limites da regra de 1,5 AIQ.
Texto alternativo: os dados são mostrados numa reta com linhas verticais nos limites inferior e superior; 20 aparece além do limite superior.
Observe: o limite é um valor calculado; o bigode termina em dado observado.
Conclusão para áudio: ultrapassar o limite sinaliza o ponto, não prova erro.


Visual 5 — Comparação de dois box-plots.
Texto alternativo: dois grupos apresentam centros parecidos, mas o segundo ocupa faixa mais larga.
Observe: compare mediana e AIQ separadamente.
Conclusão para áudio: centro semelhante não implica dispersão semelhante.


Visual 6 — Roteiro de interpretação.
Texto alternativo: seis etapas conectam ordenação, quartis, AIQ, limites, comparação e interpretação.
Observe: a conclusão vem depois de verificar a convenção.
Conclusão para áudio: interpretar um box-plot exige método e contexto, não apenas reconhecer a figura.


45. Erros frequentes


Erro 1. Calcular AIQ como Q1 menos Q3 e obter valor negativo.
Erro 2. Confundir AIQ com amplitude total.
Erro 3. Achar que a caixa contém todos os dados.
Erro 4. Achar que os bigodes sempre são mínimo e máximo.
Erro 5. Desenhar o bigode exatamente no limite calculado, mesmo sem observação ali.
Erro 6. Tratar ponto sinalizado como erro comprovado.
Erro 7. Remover automaticamente todo ponto sinalizado.
Erro 8. Interpretar caixa mais longa como média maior.
Erro 9. Comparar box-plots com escalas ou unidades diferentes sem conversão.
Erro 10. Inferir tamanho da amostra pela largura convencional da caixa.
Erro 11. Concluir que não há multimodalidade porque o box-plot parece simétrico.
Erro 12. Esquecer de declarar a convenção de quartis.
Erro 13. Dizer que 1,5 AIQ é um intervalo de confiança.
Erro 14. Dizer que todo dado fora do limite é estatisticamente impossível.


46. Exercícios


Os 36 exercícios autorais estão armazenados em documento separado.


Distribuição planejada:
10 de aprendizagem;
10 de consolidação;
10 de transferência em estilo de vestibular e ponte universitária;
6 de reteste independente.


O gabarito comentado permanece separado para futura implementação de tentativa antes da revelação da resposta.


47. Resumo


A amplitude interquartil é Q3 menos Q1.


Ela mede a largura dos 50% centrais da distribuição e tem a mesma unidade da variável.


O box-plot usa Q1, mediana e Q3 para formar a caixa.


Bigodes dependem da convenção.


No box-plot modificado, a regra de 1,5 vezes a AIQ pode sinalizar observações afastadas.


Ponto sinalizado não é sinônimo de erro.


AIQ é menos sensível a extremos do que a amplitude total.


Box-plots são úteis para comparar centro e dispersão, mas escondem detalhes como multimodalidade e, na forma convencional, tamanho amostral.


48. Versão curta para ouvir


Amplitude interquartil é a diferença entre o terceiro e o primeiro quartil. Ela mede a largura da metade central dos dados.


No box-plot, a caixa vai de Q1 a Q3 e uma linha marca a mediana. Em um box-plot modificado, os bigodes vão até observações que permanecem dentro de limites calculados a partir de uma vez e meia a amplitude interquartil.


Um ponto além desses limites é sinalizado para investigação. Ele não é automaticamente um erro e não deve ser removido sem justificativa.


Ao comparar box-plots, observe mediana, largura da caixa, bigodes, pontos sinalizados, escala e convenção usada.


49. Vídeo complementar


Vídeo recomendado: “Amplitude interquartil - Khan Academy em português (8º ano)”.
Canal: Khan Academy em Português de Portugal.
URL: https://www.youtube.com/watch?v=rB86hCqaT-Q
Motivo: reforça o significado e o cálculo da amplitude interquartil com linguagem introdutória.
Quando assistir: depois das seções 5 a 18, antes dos exercícios de consolidação.
Estado de QA: a página pública do vídeo foi localizada; reprodução integral, áudio, legendas, duração efetiva e compatibilidade com o Microsoft Edge permanecem pendentes.


50. Fontes curriculares verificadas


FUVEST — Programa do Vestibular 2027:
https://www.fuvest.br/wp-content/uploads/fuvest2027-programa-vestibular.pdf


BNCC do Ensino Médio — Ministério da Educação:
https://www.gov.br/mec/pt-br/cne/bncc_ensino_medio.pdf


INEP — Matrizes de Referência do Enem, publicação institucional de 2026:
https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem/


51. Critério de domínio


O tópico só deve ser marcado como consolidado quando o estudante conseguir:


explicar AIQ com palavras próprias;
calcular AIQ a partir de quartis;
construir um box-plot quando a convenção for fornecida;
calcular limites de 1,5 AIQ;
distinguir limite calculado de posição do bigode;
interpretar pontos sinalizados sem afirmar mais do que os dados permitem;
comparar duas distribuições por mediana e AIQ;
explicar ao menos uma limitação do box-plot;
resolver uma situação nova;
recuperar o conceito após revisão espaçada.


A produção editorial não altera progresso individual.


52. Próximo passo


MAT-EST-012 — Assimetria e forma das distribuições: comparação integrada de histogramas e box-plots.
