MAT-EST-008 — Variância e desvio-padrão: quadrados dos desvios, unidades e interpretação


Status editorial: RECONSTRUÇÃO EDITORIAL v1 — não é cópia byte a byte do material histórico perdido.
Matéria: Matemática.
Unidade: Estatística.
Nível principal: 3 — transição do Ensino Fundamental para o Ensino Médio, com progressão para ENEM, FUVEST, UNICAMP, UNESP e ponte universitária.
Pré-requisitos: MAT-EST-001 a MAT-EST-007; média aritmética; valor absoluto; potências e raiz quadrada em nível básico.
Próximo tópico: MAT-EST-009 — Coeficiente de variação: dispersão relativa e comparação entre escalas.
Questões desta reconstrução: 100% autorais.


1. Objetivo


Ao concluir o estudo real desta aula, o estudante deverá ser capaz de explicar por que os desvios simples em torno da média não servem diretamente como medida de dispersão; compreender por que elevar os desvios ao quadrado elimina o cancelamento; calcular variância populacional e amostral; compreender o denominador n−1; calcular desvio-padrão; interpretar unidades; comparar conjuntos; prever transformações lineares; reconhecer o efeito de valores extremos; distinguir desvio-padrão de erro-padrão; e preparar a passagem para coeficiente de variação.


2. Retomada: por que o desvio simples falha?


Na MAT-EST-007 vimos que, para qualquer conjunto, a soma dos desvios em relação à média é zero:


Σ(xᵢ − x̄) = 0.


Exemplo: dados 2, 3 e 7; média 4; desvios −2, −1 e +3; soma zero.


Logo, a média dos desvios com sinal não mede espalhamento.


3. Duas estratégias para evitar o cancelamento


Uma estratégia é usar valor absoluto, |xᵢ − x̄|, que levou ao desvio médio absoluto.
Outra estratégia é elevar o desvio ao quadrado, (xᵢ − x̄)².


Como o quadrado de número negativo é positivo, os sinais deixam de se cancelar. Essa segunda estratégia conduz à variância.


4. Por que usar quadrados?


Considere desvios −3, −1, 0, +1 e +3.
Quadrados: 9, 1, 0, 1 e 9.


Os afastamentos maiores recebem peso maior. Um desvio 3 contribui com 9; um desvio 1 contribui com 1. Isso torna a variância especialmente sensível a valores extremos.


5. Variância populacional


Quando temos todos os elementos da população de interesse:


σ² = Σ(xᵢ − μ)² / N.


Leitura pronunciável: “sigma ao quadrado é igual à soma dos quadrados dos desvios em relação à média populacional, dividida pelo tamanho da população”.


σ² é a variância populacional; μ é a média populacional; N é o tamanho da população.


6. Exemplo populacional completo


População: 2, 4, 6.
Média μ = 4.
Desvios: −2, 0, +2.
Quadrados: 4, 0, 4.
Soma = 8.
N = 3.


Variância populacional:
σ² = 8/3 ≈ 2,67.


7. Desvio-padrão populacional


σ = √σ².


No exemplo:
σ = √(8/3) ≈ 1,63.


O desvio-padrão é a raiz quadrada da variância.


8. Por que tirar a raiz?


A variância usa quadrados, então sua unidade também fica ao quadrado. Se os dados estão em centímetros, a variância fica em centímetros quadrados. Ao tirar a raiz, o desvio-padrão volta para centímetros.


9. Unidade da variância e do desvio-padrão


Dados em metros → variância em metros quadrados e DP em metros.
Dados em segundos → variância em segundos quadrados e DP em segundos.
Dados em reais → variância em reais quadrados e DP em reais.


A unidade da variância é matematicamente correta, embora menos intuitiva.


10. Interpretação intuitiva


Desvio-padrão menor indica dados mais concentrados em torno da média, em uma comparação adequada.
Desvio-padrão maior indica maior espalhamento.


Não existe regra universal de que “DP 5 é grande” sem considerar escala e contexto.


11. Desvio-padrão zero


Se σ = 0, todos os desvios quadráticos são zero. Isso só ocorre quando todos os valores são iguais à média.


Exemplo: 5, 5, 5, 5. Variância zero e desvio-padrão zero.


12. Mesma média, dispersões diferentes


A = 4, 5, 6.
B = 0, 5, 10.


Ambos têm média 5, mas B tem valores muito mais afastados.


13. Cálculo de A


Desvios: −1, 0, +1.
Quadrados: 1, 0, 1.
Variância populacional: 2/3 ≈ 0,67.
DP ≈ 0,82.


14. Cálculo de B


Desvios: −5, 0, +5.
Quadrados: 25, 0, 25.
Variância populacional: 50/3 ≈ 16,67.
DP ≈ 4,08.


15. Variância amostral


Quando temos uma amostra e queremos estimar a variabilidade de uma população:


s² = Σ(xᵢ − x̄)² / (n − 1).


Leitura: “ésse ao quadrado é igual à soma dos quadrados dos desvios em relação à média amostral, dividida por ene menos um”.


16. Desvio-padrão amostral


s = √s².


17. Por que aparece n−1?


Ao calcular a média com a própria amostra, os desvios deixam de ser todos independentes. Depois de conhecer n−1 desvios, o último fica determinado pela condição de que a soma seja zero.


Dizemos que restam n−1 graus de liberdade. O divisor n−1 também corrige uma tendência de subestimar a variância populacional quando estimamos a média pela própria amostra.


18. Intuição para graus de liberdade


Se três desvios devem somar zero e sabemos d₁ = +2 e d₂ = −1, então d₃ obrigatoriamente é −1. Ele não pode variar livremente.


19. População ou amostra?


Não escolha a fórmula pelo tamanho do conjunto. Pergunte se os dados representam toda a população de interesse ou uma amostra usada para inferir sobre algo maior.


Os mesmos números podem ser população em uma pergunta e amostra em outra.


20. Exemplo amostral


Amostra 2, 4, 6.
Média x̄ = 4.
Soma dos quadrados = 8.
s² = 8/(3−1) = 4.
s = 2.


Os mesmos números, tratados como população, tinham variância 8/3 e DP aproximadamente 1,63.


21. Nunca misturar fórmulas


Se a pergunta pede variância populacional, use N.
Se pede variância amostral usual para estimar a variância de uma população, use n−1.


A fórmula depende do papel dos dados, não do hábito do estudante.


22. Algoritmo de cálculo


1. Calcule a média.
2. Subtraia a média de cada valor.
3. Eleve cada desvio ao quadrado.
4. Some os quadrados.
5. Divida por N ou n−1.
6. O resultado é a variância.
7. Tire a raiz para obter o desvio-padrão.


23. Exemplo em tabela


Dados 3, 5 e 7; média 5.


x = 3; desvio −2; quadrado 4.
x = 5; desvio 0; quadrado 0.
x = 7; desvio +2; quadrado 4.


Soma dos quadrados = 8.


24. Relação com o desvio médio absoluto


DMA usa |x−centro|.
Variância usa (x−média)².


O DMA aumenta linearmente com a distância. A variância aumenta quadraticamente. Um desvio que dobra tem contribuição quadrática quatro vezes maior.


25. Sensibilidade a extremos


Dados 5, 5, 5, 5, 5 têm variância zero.
Se um dos valores vira 25, a média muda e aparecem desvios grandes. Ao quadrado, esses desvios têm contribuição ainda maior.


26. Valor extremo válido


Sensibilidade não significa que extremos devam ser apagados. Um extremo verdadeiro pode ser justamente a observação mais importante em saúde, finanças, confiabilidade ou segurança.


27. Somar uma constante


Se yᵢ = xᵢ + c, a média aumenta c, mas os desvios em relação à nova média continuam iguais.


Logo, a variância e o desvio-padrão não mudam.


28. Multiplicar por constante


Se yᵢ = a xᵢ:


Var(y) = a² Var(x).
DP(y) = |a| DP(x).


29. Transformação linear geral


Se y = ax+b:


Var(y) = a² Var(x).
DP(y) = |a| DP(x).


O termo b desloca o centro, mas não altera a dispersão.


30. Exemplo de transformação


Dados têm média 10 e DP 2.
Transformação y = 3x + 100.


Nova média = 130.
Novo DP = 6.
Nova variância = 9 vezes a antiga.


31. Controles de plausibilidade


Variância nunca pode ser negativa.
Desvio-padrão nunca pode ser negativo.


Se o cálculo produz variância −4, existe erro.


32. Pequeno e grande são relativos


DP 5 pode ser enorme se a variável costuma variar entre 0 e 10, ou pequeno se a variável está em torno de 10.000.


Isso prepara a MAT-EST-009, sobre coeficiente de variação e dispersão relativa.


33. Antecipação do coeficiente de variação


CV = DP / média.


Em porcentagem:


CV% = 100 × DP / média.


Ainda não usaremos CV de modo mecânico, porque médias próximas de zero, negativas ou escalas com zero arbitrário exigem cuidado.


34. Variância com frequências


Se valores xᵢ aparecem com frequências fᵢ, podemos calcular:


σ² = Σ[fᵢ(xᵢ−μ)²] / Σfᵢ.


35. Exemplo com frequências


Valor 1 aparece 1 vez.
Valor 2 aparece 2 vezes.
Valor 3 aparece 1 vez.


Dados expandidos: 1, 2, 2, 3.
Média = 2.


Quadrados dos desvios:
1, 0, 0, 1.


Soma = 2.
Variância populacional = 2/4 = 0,5.
DP ≈ 0,71.


36. Dados agrupados em classes


Se conhecemos apenas classes, por exemplo [0,10), [10,20), [20,30), não sabemos cada observação individual.


Podemos aproximar usando o ponto médio de cada classe como representante.


A variância resultante é aproximada, não necessariamente exata.


37. Fórmula computacional alternativa


Para uma população:


σ² = Σxᵢ²/N − μ².


Leitura: “variância é a média dos quadrados menos o quadrado da média”.


Ela pode facilitar certos cálculos, mas deve ser entendida como identidade algébrica, não como fórmula mágica.


38. Demonstração da identidade


Partimos de:


Σ(xᵢ−μ)².


Expandindo:


Σ(xᵢ² − 2μxᵢ + μ²).


Isso resulta em:


Σxᵢ² − 2μΣxᵢ + Nμ².


Como Σxᵢ = Nμ:


Σxᵢ² − 2Nμ² + Nμ²
= Σxᵢ² − Nμ².


Dividindo por N:


σ² = Σxᵢ²/N − μ².


39. Cuidado numérico em computação


A identidade anterior é correta, mas algumas implementações computacionais podem sofrer perda de precisão quando os números são muito grandes e a variância é pequena.


Algoritmos mais estáveis, como o algoritmo de Welford, são usados em ciência de dados e sistemas de monitoramento.


40. Ideia do algoritmo de Welford


Não é necessário memorizar fórmulas agora.


A ideia importante é que média e soma ajustada de quadrados podem ser atualizadas conforme novos dados chegam, sem guardar tudo na memória e com maior estabilidade numérica.


41. Desvio-padrão e distribuição normal


Em uma distribuição aproximadamente normal, o DP ganha interpretações adicionais sobre concentração em torno da média.


A conhecida regra aproximada 68–95–99,7 será estudada quando a distribuição normal for formalizada.


Não aplique essa regra automaticamente a qualquer conjunto.


42. Desvio-padrão não é erro-padrão


Desvio-padrão descreve a variabilidade das observações.


Erro-padrão descreve a variabilidade de uma estatística, como a média, entre possíveis amostras.


São conceitos diferentes.


43. Desvio-padrão não é margem de erro


Margem de erro envolve estimativa, erro-padrão, nível de confiança e modelo de amostragem.


Não use os termos como sinônimos.


44. Desvio-padrão não mede qualidade sozinho


Um instrumento pode ter DP muito pequeno e ainda medir sistematicamente 5 unidades acima do valor verdadeiro.


Baixa dispersão significa precisão/repetibilidade, não necessariamente exatidão.


45. Centro e dispersão devem ser lidos juntos


Uma descrição estatística mínima deve considerar:


• medida de centro;
• medida de dispersão;
• forma da distribuição;
• valores extremos;
• unidade e contexto;
• qualidade da coleta.


46. Exemplo integrado 1


Dados 8, 8, 8, 8.


Média 8.
Variância 0.
DP 0.


47. Exemplo integrado 2


Dados 6, 8, 10.


Média 8.
Desvios −2, 0, +2.
Quadrados 4, 0, 4.


Variância populacional = 8/3.
DP ≈ 1,63.


48. Exemplo integrado 3 — amostra


Os mesmos 6, 8, 10 como amostra:


s² = 8/2 = 4.
s = 2.


49. Exemplo integrado 4 — transformação


DP = 4.
Transformação y = −2x + 50.


Novo DP = |−2|×4 = 8.


O 50 não altera a dispersão.


50. Exemplo integrado 5 — comparação absoluta


A:
média 50;
DP 2.


B:
média 50;
DP 8.


Como as médias e unidades são comparáveis, B tem maior dispersão absoluta.


51. Exemplo integrado 6 — escalas diferentes


A:
média 10;
DP 2.


B:
média 1000;
DP 20.


B tem DP absoluto maior, mas afirmar que é “dez vezes mais variável” pode ser enganoso porque a escala média é muito diferente.


Isso motiva o coeficiente de variação.


52. Erros frequentes


Erro 1. Esquecer de calcular o centro.
Erro 2. Não elevar os desvios ao quadrado.
Erro 3. Tirar raiz quadrada antes da hora.
Erro 4. Confundir população e amostra.
Erro 5. Usar n−1 sem entender o papel dos dados.
Erro 6. Interpretar variância na unidade original.
Erro 7. Admitir DP negativo.
Erro 8. Excluir extremos apenas porque aumentam a dispersão.
Erro 9. Aplicar 68–95–99,7 sem normalidade aproximada.
Erro 10. Confundir DP, erro-padrão e margem de erro.


53. Relação com BNCC, ENEM e FUVEST


A BNCC constrói a base da dispersão a partir da amplitude e da comparação com medidas de tendência central.


A FUVEST 2027 inclui explicitamente amplitude, desvio-médio, variância, desvio-padrão e coeficiente de variação entre as medidas de dispersão.


A Matriz de Referência do Enem publicada pelo Inep em 2026 é a referência institucional vigente para competências, habilidades e objetos de conhecimento da prova. As questões desta reconstrução são autorais.


54. O que observar nos seis visuais


Visual 1 — mesma média, dispersões diferentes.
Visual 2 — desvios e seus quadrados.
Visual 3 — fluxo dados → média → desvios → quadrados → variância → DP.
Visual 4 — população versus amostra, destacando N e n−1.
Visual 5 — efeito de y=ax+b sobre centro e dispersão.
Visual 6 — efeito de um extremo sobre os quadrados dos desvios.


55. Resumo


Variância populacional:


σ² = Σ(xᵢ−μ)²/N.


Variância amostral:


s² = Σ(xᵢ−x̄)²/(n−1).


Desvio-padrão:


σ = √σ² ou s = √s².


Variância tem unidade ao quadrado.
DP tem a unidade original.
Somar uma constante não altera dispersão.
Multiplicar por a multiplica variância por a² e DP por |a|.


56. Versão curta para ouvir


A variância evita o cancelamento dos desvios elevando cada afastamento ao quadrado.


Somamos os quadrados e dividimos pelo tamanho da população, ou por n menos um na fórmula amostral usual.


O desvio-padrão é a raiz quadrada da variância e volta à unidade original.


Valores extremos influenciam bastante porque grandes desvios são elevados ao quadrado.


Desvio-padrão zero significa que todos os valores são iguais.


Comparar DP exige unidade, escala e contexto.


57. Vídeo complementar


Vídeo recomendado:
“Variância e Desvio Padrão - Estatística”.
Canal: Professor Ferretto.


Momento recomendado:
Após compreender as fórmulas populacional e amostral e antes dos exercícios de consolidação.


Motivo:
Reforçar o procedimento de cálculo e a interpretação de variância e desvio-padrão.


Estado de QA:
O vídeo é recomendado como complemento. A reprodução integral, duração efetiva, áudio e sincronização das legendas ainda precisam de auditoria no Microsoft Edge antes de publicação.


58. Critério de domínio


O tópico só deve ser considerado consolidado quando o estudante conseguir:


• explicar por que os quadrados aparecem;
• calcular variância populacional;
• calcular variância amostral;
• explicar n−1 em nível conceitual;
• calcular DP;
• interpretar unidades;
• prever transformações;
• explicar efeito de extremos;
• distinguir DP de erro-padrão;
• resolver situação nova sem copiar mecanicamente um algoritmo.


A produção editorial não altera progresso individual.


59. Próximo passo


MAT-EST-009 — Coeficiente de variação: dispersão relativa e comparação entre escalas.
