# MAT-EST-066 — Exercícios autorais graduais

Todas as atividades são autorais. O gabarito está em documento separado. Resolva sem abri-lo antecipadamente. Nenhuma resposta preenchida representa tentativa do estudante.

## Aprendizagem básica

### MAT-EST-066-EX-APR-01 — Diferenciar objetos
Explique com suas palavras a diferença entre previsão emitida, observação e erro de previsão. Por que um dado futuro em branco não pode ser registrado como erro zero?

### MAT-EST-066-EX-APR-02 — Completude do SANDBOX
O SANDBOX-057 contém oito cartões, dos quais dois avaliáveis. Calcule completude e identifique seu denominador.

### MAT-EST-066-EX-APR-03 — MAE de B no sandbox
No SANDBOX-057, os dois erros de B são +4 e −2. Calcule o erro absoluto médio e sua unidade.

### MAT-EST-066-EX-APR-04 — MAE de C no sandbox
Para erros C iguais a +3 e −5, calcule MAE e compare descritivamente com B na mesma dupla de cartões.

### MAT-EST-066-EX-APR-05 — Custo e sinal
Na regra fictícia custo três por unidade subprevista e um por unidade superprevista, determine os custos de +4 e −2.

### MAT-EST-066-EX-APR-06 — Nulo versus zero
Uma coorte sucessora ainda tem zero pares avaliáveis. Indique MAE correto e diferencie de uma taxa de execução igual a 0/10.

### MAT-EST-066-EX-APR-07 — H1 e H2
Uma previsão de dois períodos é comparada com previsão de um período. Qual informação mínima deve acompanhar cada erro?

### MAT-EST-066-EX-APR-08 — Governança dos controles
O que significam G1/G2 checked_local, G3–G6 pending e G7/G8 not_performed?

### MAT-EST-066-EX-APR-09 — Arquivo de integridade
Explique o que uma comparação SHA-256 de dois arquivos permite concluir e o que ela não demonstra.

### MAT-EST-066-EX-APR-10 — Etapas de decisão
Em uma frase, explique por que média menor não elimina um critério impeditivo declarado antes de ver os dados.

## Consolidação

### MAT-EST-066-EX-CON-01 — Conciliação de métricas sandbox
Calcule MAE e custo médio para B e C usando B=[+4,−2], C=[+3,−5] e custo 3 para erros positivos e 1 para negativos; interprete diferenças.

### MAT-EST-066-EX-CON-02 — Diferenças emparelhadas
Use módulos de B [4,2] e de C [3,5] para obter C menos B por cartão e média.

### MAT-EST-066-EX-CON-03 — Guarda histórica
Na avaliação t18–t22, MAE B=17,60 e C=8,36, mas piora de C em t19=19,2 ultrapassa guarda máxima dez. Qual registro de decisão preserva a lógica do protocolo?

### MAT-EST-066-EX-CON-04 — Cobertura versus calibração
Duas de três observações ficaram dentro de faixas retrospectivas escolhidas a olho. Qual conclusão numérica é possível e qual afirmação seria indevida?

### MAT-EST-066-EX-CON-05 — Reconciliação Z
EXEMPLO-Z: previsão 29, observação provisória 30 e validada 32. Calcule erros por versão e explique o uso de cada fotografia.

### MAT-EST-066-EX-CON-06 — Reconciliação V
EXEMPLO-V: previsões congeladas B42 e C43, observação preliminar 40 e validada 44. Calcule os módulos nas duas versões.

### MAT-EST-066-EX-CON-07 — Indicadores não combináveis
Explique por que 6/6 mutações artificiais rejeitadas, 6/7 ações testadas em fixtures e 0/10 checks pós-deploy não podem ser resumidos por uma média simples de qualidade.

### MAT-EST-066-EX-CON-08 — Análise de seleção
No SANDBOX-057, exclui-se S02 depois de observar que ele favorece B. Recalcule MAE nos cartões restantes e identifique a falha metodológica.

### MAT-EST-066-EX-CON-09 — Novo problema transferência 066
No TRANSFER-066, R01 tem y=50, B48 e C51. R02 tem y=40, B43 e C39. Calcule os quatro erros assinados.

### MAT-EST-066-EX-CON-10 — Transferência de custos e ausência
Com os erros de R01/R02 do exercício anterior, obtenha MAE e custos médios de B/C e a completude entre quatro cartões.

## Transferência em estilo vestibular, questões autorais

### MAT-EST-066-EX-VES-01 — Relatório que promete tendência
Uma reportagem usa uma única fotografia F0 dos onze indicadores K65 para afirmar que a qualidade editorial vem aumentando por mês. Identifique o erro e reescreva a conclusão.

### MAT-EST-066-EX-VES-02 — Gráfico enganoso de qualidade
Um gráfico de 25% de completude usa o título “25% de aulas corretas”. Proponha título, eixos e texto alternativo adequado.

### MAT-EST-066-EX-VES-03 — Coorte nova zerada
Um painel publica “MAE do sucessor = zero” porque t26–t33 ainda não têm pares. Corrija o painel e indique qual contagem pode ser zero.

### MAT-EST-066-EX-VES-04 — Regra adversa
Alguém propõe apagar a falha t19 porque o MAE C ficou menor que B nos cinco pares. Explique por que o relatório deve mostrar ambos.

### MAT-EST-066-EX-VES-05 — Leitura de recorte
O MAE de C do sandbox é quatro. Uma apresentação usa esse número para a série t18–t22. Qual inconsistência e quais dois valores de C devem aparecer com legenda?

### MAT-EST-066-EX-VES-06 — Acidente na retificação
Após o valor de V mudar de 40 para 44, o editor exclui a avaliação de 40 e declara que nunca existiu. Avalie a prática e especifique registro correto.

### MAT-EST-066-EX-VES-07 — Indicador com incentivo perverso
Um responsável melhora o percentual de prontidão apagando cartões pendentes do denominador. Explique por que o número sobe e qual controle evitaria isso.

### MAT-EST-066-EX-VES-08 — Teste e aprovação
O pacote passa 249 verificações locais. Um relatório escreve “publicado, acessível e aprovado”. Que evidências adicionais são necessárias?

### MAT-EST-066-EX-VES-09 — Transposição para química
Em um experimento fictício, quatro amostras foram planejadas, mas apenas duas tiveram medida válida: 8 e 12 miligramas por litro. Calcule completude e média das medidas válidas e justifique denominadores.

### MAT-EST-066-EX-VES-10 — Transferência de critério futuro
No TRANSFER-066, um relatório diz “C está comprovadamente superior para toda demanda futura” porque nos dois casos seu MAE foi 1 contra 2,5 de B. Reescreva com evidência e limite.

## Reteste posterior

### MAT-EST-066-EX-RET-01 — Novo conjunto de erros
Em exercício futuro independente, três erros assinados são −4, +2 e +5. Calcule média assinada e MAE, explicando o cancelamento.

### MAT-EST-066-EX-RET-02 — Novo denominador
Numa coorte didática diferente, há doze alvos propostos, três previsões com observação válida e nove pendências. Calcule completude e indique o denominador para o MAE.

### MAT-EST-066-EX-RET-03 — Custo assimétrico alternativo
Se cada erro positivo custa quatro pontos por unidade e cada negativo um, qual o custo médio dos erros [+2,−3] e que ressalva acompanha a mudança de regra?

### MAT-EST-066-EX-RET-04 — Guarda em hipótese futura
Considere APENAS um cenário hipotético independente: observado 60, previsões B58 e C64, guarda de piora máxima uma unidade. Calcule diferença C menos B dos módulos e conclusão condicional.

### MAT-EST-066-EX-RET-05 — Versão de observado
Uma previsão congelada foi 70, a medição provisória 73 e a validada 69. Calcule os dois erros e descreva a trilha de versões.

### MAT-EST-066-EX-RET-06 — Comunicado integrador
Escreva até seis frases sobre SANDBOX-057 contendo população, MAE, custo, pendências e limite de evidência, além de uma frase sobre os controles G.
