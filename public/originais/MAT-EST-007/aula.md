# MAT-EST-007 — Medidas de dispersão I: amplitude, desvios e desvio médio


**Status editorial:** RECONSTRUÇÃO EDITORIAL v1. Esta versão não afirma identidade textual ou binária com o material histórico perdido.


**Matéria:** Matemática  
**Unidade:** Estatística  
**Nível principal:** 2 — Ensino Fundamental II, com progressão para Ensino Médio, vestibulares e ponte universitária.  
**Pré-requisitos:** MAT-EST-001 a MAT-EST-006; operações com números inteiros e decimais; valor absoluto; média aritmética.  
**Próximo tópico:** MAT-EST-008 — Variância e desvio-padrão: quadrados dos desvios, unidades e interpretação.  
**Questões desta reconstrução:** 100% autorais.


## 1. Objetivo


Ao concluir o estudo real desta aula, o estudante deverá ser capaz de:


- explicar por que uma medida de centro não descreve sozinha um conjunto de dados;
- compreender dispersão como ideia de espalhamento, variabilidade ou afastamento entre valores;
- calcular e interpretar amplitude total;
- reconhecer vantagens e limitações da amplitude;
- calcular desvios em relação à média;
- compreender por que desvios com sinal positivo e negativo se cancelam;
- usar valor absoluto para transformar afastamento em magnitude;
- calcular desvio médio absoluto em torno da média;
- calcular desvio médio absoluto em torno da mediana em situações introdutórias e distinguir as duas escolhas;
- calcular desvio médio a partir de tabela de frequências;
- comparar conjuntos com mesma média e diferentes dispersões;
- interpretar unidade de medida das medidas estudadas;
- reconhecer o efeito de valores extremos;
- evitar comparar dispersões de maneira enganosa;
- relacionar estas ideias com variância, desvio-padrão e coeficiente de variação, que serão aprofundados depois.


## 2. Por que precisamos de medidas de dispersão?


Considere três conjuntos:


A = 5, 5, 5, 5, 5.


B = 3, 4, 5, 6, 7.


C = 1, 1, 5, 9, 9.


Todos têm média 5.


Mas eles não se comportam da mesma forma.


No conjunto A, todos os valores coincidem com a média.


No conjunto B, os valores estão relativamente próximos de 5.


No conjunto C, há valores muito afastados de 5.


A média sozinha não mostra essa diferença.


Precisamos de medidas que descrevam quanto os dados se espalham. Essa é a ideia de **dispersão**.


## 3. O que significa dispersão?


Dispersão é uma forma de descrever o grau de variabilidade dos dados.


Em linguagem intuitiva:


- baixa dispersão: valores ficam relativamente próximos;
- alta dispersão: valores ficam mais espalhados.


A dispersão não é “boa” ou “ruim” por si só. O significado depende do contexto.


Exemplos:


- produção industrial: baixa dispersão pode indicar padronização;
- diversidade biológica: alta dispersão pode ser característica real do sistema;
- tempo de atendimento: alta dispersão pode indicar experiência muito desigual entre usuários;
- notas: baixa dispersão pode ocorrer porque todos aprenderam bem ou porque uma prova foi pouco discriminativa.


## 4. A primeira medida: amplitude total


A amplitude total é a diferença entre o maior e o menor valor.


Fórmula:


**R = máximo − mínimo.**


Leitura pronunciável:


“erre é igual ao maior valor menos o menor valor”.


Alguns materiais usam A para amplitude. Nesta aula usaremos R para evitar confusão com nomes de conjuntos, mas o importante é compreender a operação.


## 5. Exemplo de amplitude


Dados:


4, 7, 9, 10, 15.


Mínimo = 4.


Máximo = 15.


Amplitude:


R = 15 − 4 = 11.


Se os dados estão em minutos, a amplitude está em minutos.


Se estão em reais, a amplitude está em reais.


## 6. Por que a amplitude é útil?


Ela é simples e rápida.


Permite responder:


“Qual é a distância total entre o menor e o maior valor observado?”


Também funciona como uma primeira medida de espalhamento e como controle de plausibilidade.


Se temperaturas variam de 18 a 27 graus Celsius, a amplitude é 9 graus Celsius.


## 7. Limitação central da amplitude


A amplitude usa apenas dois valores:


- o mínimo;
- o máximo.


Ela ignora completamente o que ocorre entre eles.


Compare:


A = 0, 5, 5, 5, 10.


B = 0, 0, 5, 10, 10.


Ambos têm:


mínimo 0;
máximo 10;
amplitude 10.


Mas B tem muito mais concentração nos extremos.


A amplitude não consegue distinguir isso.


## 8. Sensibilidade da amplitude a valores extremos


Considere:


2, 3, 4, 5, 6.


Amplitude = 6 − 2 = 4.


Agora substitua 6 por 60:


2, 3, 4, 5, 60.


Amplitude = 60 − 2 = 58.


Um único valor extremo altera profundamente a amplitude.


Isso não significa que o extremo seja erro. Significa que a amplitude é muito sensível aos extremos.


## 9. Amplitude e tamanho da amostra


Em geral, amostras maiores têm mais oportunidade de conter valores extremos.


Por isso, comparar amplitudes de grupos com tamanhos muito diferentes exige cuidadoDois grupos podem ter a mesma distribuição teórica, mas o grupo maior pode apresentar amplitude observada maior simplesmente porque contém mais observações.


Essa é uma ponte para raciocínio estatístico mais avançado.


## 10. Da amplitude aos desvios


A amplitude considera somente os extremos.


Para usar todos os valores, precisamos medir o afastamento de cada observação em relação a um centro.


Como já estudamos a média, começaremos pelos desvios em relação à média.


Para cada observação xᵢ:


**dᵢ = xᵢ − x̄.**


Leitura:


“desvio índice i é igual ao valor índice i menos a média”.


## 11. Exemplo de desvios


Dados:


2, 3, 7.


Média = 4.


Desvios:


2 − 4 = −2.


3 − 4 = −1.


7 − 4 = +3.


Os sinais mostram direção:


negativo = abaixo da média;


positivo = acima da média.


## 12. O problema do cancelamento


Somando os desvios do exemplo:


−2 + (−1) + 3 = 0.


Isso não é coincidência.


Para qualquer conjunto, a soma dos desvios em relação à média é zero:


**Σ(xᵢ − x̄) = 0.**


Portanto, não podemos medir dispersão simplesmente tirando a média dos desvios com sinal.


O resultado seria sempre zero.


## 13. Por que a soma dos desvios é zero?


Já vimos a propriedade da média:


Σxᵢ = n x̄.


Logo:


Σ(xᵢ − x̄)
= Σxᵢ − n x̄
= 0.


A média funciona como ponto de equilíbrio.


Para medir espalhamento, precisamos impedir que afastamentos positivos e negativos se cancelem.


## 14. Uma solução: valor absoluto


O valor absoluto transforma a distância com sinal em magnitude não negativa.


Exemplos:


|−2| = 2.


|−1| = 1.


|3| = 3.


A barra vertical significa valor absoluto.


Leitura:


“valor absoluto de menos dois é dois”.


## 15. Desvio absoluto


Para cada observação:


**|xᵢ − x̄|**


representa a distância da observação até a média, ignorando direção.


No conjunto 2, 3, 7 com média 4:


|2−4| = 2.


|3−4| = 1.


|7−4| = 3.


Agora podemos somar sem cancelamento:


2 + 1 + 3 = 6.


## 16. Desvio médio absoluto em torno da média


O desvio médio absoluto, abreviado aqui como DMA, é a média dos desvios absolutos em relação ao centro escolhido.


Quando o centro é a média:


**DMA = Σ|xᵢ − x̄| / n.**


Leitura pronunciável:


“desvio médio absoluto é a soma das distâncias absolutas de cada valor até a média, dividida pela quantidade de observações”.


## 17. Exemplo completo de desvio médio


Dados:


2, 3, 7.


Média = 4.


Desvios absolutos:


2, 1 e 3.


Soma = 6.


n = 3.


DMA = 6/3 = 2.


Interpretação:


as observações estão, em média, a 2 unidades de distância da média aritmética.


## 18. Unidade do desvio médio


O desvio médio absoluto tem a mesma unidade dos dados.


Se os dados são em minutos, o DMA está em minutos.


Se são em reais, o DMA está em reais.


Isso facilita a interpretação.


## 19. Comparação de dois conjuntos com mesma média


A = 4, 5, 6.


B = 0, 5, 10.


Ambos têm média 5.


Para A:


desvios absolutos = 1, 0, 1.


DMA = 2/3 ≈ 0,67.


Para B:


desvios absolutos = 5, 0, 5.


DMA = 10/3 ≈ 3,33.


A média é igual, mas B é muito mais disperso.


## 20. Comparação com a amplitude


Para A = 4,5,6:


amplitude = 2.


DMA ≈ 0,67.


Para B = 0,5,10:


amplitude = 10.


DMA ≈ 3,33.


As duas medidas detectam maior dispersão em B.


Mas fazem isso de maneiras diferentes:


- amplitude usa apenas extremos;
- DMA usa todas as observações.


## 21. Desvio médio zero


Se todos os valores são iguais:


5, 5, 5, 5,


média = 5.


Todos os desvios absolutos são zero.


DMA = 0.


Portanto, dispersão zero significa ausência de variação observada.


## 22. O desvio médio nunca é negativo


Como cada valor absoluto é não negativo:


|xᵢ − x̄| ≥ 0.


A soma é não negativa.


Dividir por n positivo mantém o resultado não negativo.


Logo:


**DMA ≥ 0.**


## 23. Efeito de adicionar constante


Dados:


2, 4, 6.


Média = 4.


Desvios absolutos:


2, 0, 2.


DMA = 4/3.


Somando 10 a todos:


12, 14, 16.


Média = 14.


Desvios absolutos continuam:


2, 0, 2.


O DMA não muda.


Adicionar a mesma constante desloca o conjunto, mas não altera sua dispersão.


## 24. Efeito de multiplicar todos os valores


Se todos os valores forem multiplicados por k, os desvios absolutos são multiplicados por |k|.


Exemplo:


2,4,6 têm DMA 4/3.


Multiplicando por 3:


6,12,18.


DMA = 4.


Como 3 × 4/3 = 4.


## 25. Propriedade geral de escala


Se:


yᵢ = a xᵢ + b,


então o desvio médio absoluto é multiplicado por |a| e não depende de b.


Leitura:


“somar uma constante não altera a dispersão; multiplicar a escala multiplica a dispersão pelo valor absoluto do fator”.


## 26. Desvio médio a partir de frequências


Considere:


valor 1, frequência 2;


valor 2, frequência 4;


valor 5, frequência 2.


Primeiro calculamos a média:


soma ponderada = 1×2 + 2×4 + 5×2 = 20.


n = 8.


média = 2,5.


Desvios absolutos:


para 1: |1−2,5| = 1,5;


para 2: |2−2,5| = 0,5;


para 5: |5−2,5| = 2,5.


Agora ponderamos pelas frequências:


1,5×2 + 0,5×4 + 2,5×2
= 3 + 2 + 5
= 10.


DMA = 10/8 = 1,25.


## 27. Fórmula com frequências


**DMA = Σ(fᵢ |xᵢ − x̄|) / Σfᵢ.**


Leitura:


“desvio médio absoluto é a soma das frequências vezes a distância absoluta de cada valor até a média, dividida pela soma das frequências”.


## 28. Desvio em torno da mediana


Também podemos calcular distâncias em relação à mediana.


Exemplo:


1, 2, 3, 100.


Mediana = 2,5.


Distâncias absolutas até a mediana:


1,5; 0,5; 0,5; 97,5.


Média dessas distâncias:


100/4 = 25.


Se usarmos a média aritmética como centro, o valor será diferente.


Por isso, sempre precisamos declarar qual centro foi usado.


## 29. Média e mediana minimizam coisas diferentes


Esta é uma ponte universitária importante.


A média aritmética minimiza a soma dos **quadrados** dos desvios.


A mediana minimiza a soma dos **valores absolutos** dos desvios.


Ainda estudaremos os quadrados dos desvios na MAT-EST-008.


Essa diferença explica por que média e mediana aparecem naturalmente em medidas de dispersão diferentes.


## 30. Por que não existe uma única “melhor” medida de dispersão?


Cada medida destaca uma propriedade.


Amplitude:


- simples;
- intuitiva;
- usa apenas extremos;
- muito sensível a valores extremos.


Desvio médio absoluto:


- usa todos os dados;
- conserva a unidade;
- tem interpretação direta de distância média;
- depende do centro escolhido.


Variância e desvio-padrão, estudados a seguir, possuem propriedades algébricas muito importantes e aparecem amplamente em inferência, probabilidade e modelagem.


## 31. Comparar dispersão de conjuntos em escalas diferentes


Suponha:


Conjunto A: média 10, DMA 2.


Conjunto B: média 1000, DMA 20.


O DMA de B é dez vezes maior.


Mas as escalas também são cem vezes maiores.


Comparar apenas dispersão absoluta pode ser enganoso quando médias e unidades diferem muito.


Mais adiante estudaremos o coeficiente de variação como uma medida relativa.


## 32. Dispersão e unidade


Amplitude e DMA mantêm a unidade original.


Isso é uma vantagem interpretativa.


Na MAT-EST-008 veremos que a variância usa unidade ao quadrado, o que exige interpretação adicional.


## 33. Amplitude e dados ausentes


Dados ausentes não devem ser tratados automaticamente como zero.


Se o maior ou menor valor está ausente por falha de coleta, a amplitude observada pode subestimar a variabilidade real.


Da mesma forma, o DMA deve usar apenas observações efetivamente válidas, salvo método de tratamento de ausência claramente documentado.


## 34. Amplitude em dados agrupados


Se temos apenas classes, a amplitude exata dos dados pode ser desconhecida.


Exemplo:


classe mínima: [0,10);


classe máxima: [40,50).


Sabemos apenas que o menor dado está entre 0 e menos de 10 e o maior entre 40 e menos de 50.


Usar 50−0=50 seria amplitude do intervalo coberto pelas classes, não necessariamente amplitude exata dos valores observados.


## 35. Desvio médio aproximado em dados agrupados


Se só temos classes, podemos usar pontos médios para construir uma aproximação.


Isso introduz erro de agrupamento, porque substituímos os valores reais pelo ponto médio da classe.


A resposta deve ser identificada como aproximada.


## 36. Erro comum: usar desvios com sinal diretamente


Dados 2,3,7 têm média 4.


Desvios: −2, −1, +3.


A média desses desvios é zero.


Isso não significa dispersão zero.


Significa apenas que a média é ponto de equilíbrio.


Para dispersão, precisamos impedir cancelamento, usando valor absoluto ou quadrado.


## 37. Erro comum: chamar amplitude de “média das diferenças”


Amplitude não é média.


Amplitude é:


máximo − mínimo.


Ela não usa os valores intermediários.


## 38. Erro comum: comparar DMA sem verificar unidade


Um DMA de 5 centímetros e um DMA de 5 metros têm o mesmo número, mas não a mesma magnitude física.


Unidade faz parte do resultado.


## 39. Erro comum: concluir homogeneidade apenas pela amplitude


Dois conjuntos podem ter mesma amplitude e distribuições internas muito diferentes.


Sempre que possível, observe também medidas que usem todos os dados e representações gráficas.


## 40. Erro comum: remover extremos para “melhorar” a dispersão


Remover um extremo quase sempre reduz amplitude e pode reduzir outras medidas.


Isso não é justificativa para exclusão.


A exclusão deve ser motivada por erro comprovado, regra metodológica prévia ou definição clara da população.


## 41. Exemplo resolvido integrado 1


Dados:


3, 4, 5, 6, 7.


Média = 5.


Amplitude:


7−3 = 4.


Desvios absolutos:


2,1,0,1,2.


Soma = 6.


DMA = 6/5 = 1,2.


Interpretação:


os dados ocupam intervalo total de 4 unidades e ficam, em média, a 1,2 unidade da média.


## 42. Exemplo resolvido integrado 2


Dados:


1, 1, 5, 9, 9.


Média = 5.


Amplitude:


9−1 = 8.


Desvios absolutos:


4,4,0,4,4.


Soma = 16.


DMA = 16/5 = 3,2.


Compare com 3,4,5,6,7:


mesma média 5;
amplitude 8 versus 4;
DMA 3,2 versus 1,2.


O segundo conjunto é mais disperso.


## 43. Exemplo resolvido integrado 3 — frequências


Valores:


10 com f=1;


12 com f=3;


14 com f=1.


Média:


(10×1 + 12×3 + 14×1)/5
= 60/5
= 12.


Desvios absolutos:


2, 0, 2.


Ponderados:


2×1 + 0×3 + 2×1 = 4.


DMA = 4/5 = 0,8.


## 44. Exemplo resolvido integrado 4 — transformação


Dados:


2,4,6.


Média = 4.


DMA = 4/3.


Transformação:


y = 5x + 100.


Somar 100 não altera dispersão.


Multiplicar por 5 multiplica o DMA por 5.


Novo DMA:


5 × 4/3 = 20/3 ≈ 6,67.


## 45. Exemplo resolvido integrado 5 — extremo


Dados originais:


5,5,5,5,5.


Amplitude = 0.


DMA = 0.


Substitua um valor por 25:


5,5,5,5,25.


Média = 9.


Amplitude = 20.


Desvios absolutos em relação à média:


4,4,4,4,16.


Soma = 32.


DMA = 32/5 = 6,4.


Um único valor alterou centro e dispersão.


## 46. Relação com gráficos


Histogramas, box-plots e gráficos de pontos ajudam a enxergar dispersão visualmente.


Duas distribuições podem ter mesma média, mas uma ocupar intervalo muito maior.


A análise ideal combina:


- medida de centro;
- medida de dispersão;
- representação gráfica;
- contexto da coleta.


## 47. Relação com BNCC, ENEM e FUVEST


A BNCC, em EF08MA25, trabalha medidas de tendência central e a relação com a dispersão indicada pela amplitude.


O Programa FUVEST 2027 inclui explicitamente medidas de dispersão: amplitude, desvio-médio, variância, desvio-padrão e coeficiente de variação, além de suas interpretações.


A Matriz de Referência do Enem publicada pelo Inep em 2026 permanece a referência institucional para competências, habilidades e objetos de conhecimento. As questões desta reconstrução são autorais.


## 48. O que observar nos seis visuais


**Visual 1 — mesma média, dispersões diferentes.**  
Observe três conjuntos com média 5 e espalhamentos diferentes.


**Visual 2 — amplitude.**  
Observe mínimo, máximo e a distância total entre eles.


**Visual 3 — desvios com sinal.**  
Observe valores abaixo e acima da média e o cancelamento dos sinais.


**Visual 4 — valor absoluto.**  
Observe como os desvios −2, −1 e +3 se tornam distâncias 2, 1 e 3.


**Visual 5 — desvio médio.**  
Observe a sequência cálculo da média → distâncias → soma → divisão por n.


**Visual 6 — efeito do extremo.**  
Compare a dispersão de 5,5,5,5,5 com 5,5,5,5,25.


## 49. Resumo


Amplitude:


R = máximo − mínimo.


Desvio em relação à média:


dᵢ = xᵢ − x̄.


Desvio médio absoluto:


DMA = Σ|xᵢ − x̄|/n.


Com frequências:


DMA = Σ(fᵢ|xᵢ − x̄|)/Σfᵢ.


A amplitude usa apenas extremos.


O DMA usa todas as observações.


Ambos têm a mesma unidade dos dados.


A amplitude e o DMA são não negativos.


Somar uma constante a todos os valores não altera a dispersão.


Multiplicar todos por k multiplica medidas de dispersão lineares por |k|.


## 50. Versão curta para ouvir


Dispersão descreve quanto os dados se espalham.


A amplitude é o maior valor menos o menor. É simples, mas usa apenas dois dados e é muito sensível a extremos.


O desvio de uma observação é a diferença entre ela e um centro. Em relação à média, desvios positivos e negativos somam zero, então precisamos evitar cancelamento.


O desvio médio absoluto usa as distâncias absolutas até a média e calcula a média dessas distâncias.


Ele tem a mesma unidade dos dados e usa todas as observações.


A mesma média pode aparecer em conjuntos com dispersões muito diferentes.


## 51. Vídeos complementares


### Vídeo 1 — amplitude


**Título:** AMPLITUDE ESTATÍSTICA | MEDIDA DE DISPERSÃO  
**Canal:** Gis com Giz Mathematics  
**URL:** https://www.youtube.com/watch?v=mV_d_KejL8s


**Motivo:** a descrição pública informa explicação direta de amplitude como diferença entre maior e menor valor e inclui exercícios.


**Quando assistir:** depois das seções 4 a 9.


### Vídeo 2 — desvio médio absoluto


**Título:** DESVIO MÉDIO ABSOLUTO  
**Canal:** Prof. MURAKAMI - MATEMÁTICA RAPIDOLA  
**URL:** https://www.youtube.com/watch?v=cEgG9bq2XQg


**Motivo:** a descrição pública identifica o desvio médio absoluto como medida de dispersão e o relaciona com variância e desvio-padrão.


**Quando assistir:** depois das seções 14 a 30.


**Estado de QA:** as páginas públicas foram localizadas; reprodução integral, áudio, duração efetiva e sincronização de legendas ainda não foram auditados no Microsoft Edge.


## 52. Critério de domínio


O tópico só deve ser considerado consolidado quando o estudante conseguir:


- explicar por que média não basta;
- calcular amplitude;
- calcular desvios em relação à média;
- explicar o cancelamento dos desvios com sinal;
- calcular DMA simples;
- calcular DMA com frequências;
- interpretar unidade;
- comparar dois conjuntos com mesmo centro;
- reconhecer influência de extremos;
- decidir quando amplitude é insuficiente;
- resolver situação nova sem copiar exemplo.


A produção editorial não altera o progresso do aluno.


## 53. Próximo passo


**MAT-EST-008 — Variância e desvio-padrão: quadrados dos desvios, unidades e interpretação.**


A próxima aula estudará por que elevar desvios ao quadrado também evita cancelamento, como nasce a variância e por que o desvio-padrão retorna à unidade original.
.
