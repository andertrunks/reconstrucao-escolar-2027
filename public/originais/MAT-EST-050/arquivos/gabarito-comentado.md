# MAT-EST-050 — Gabarito comentado separado

**Liberar somente após a tentativa correspondente.** Erros prováveis são hipóteses de diagnóstico a confirmar com a resposta efetiva; não alimentar o caderno de erros sem tentativa.

## Camada A — Aprendizagem

### MAT-EST-050-EX-APR-01 — Fronteira de conhecimento

**Resolução comentada:** O histórico fictício vai até t22. t23, t24 e t25 não têm observado neste pacote. Cenários com y23 não preenchem essa ausência.

**Possível causa a investigar:** interpretação: tomar hipótese por ocorrência.

### MAT-EST-050-EX-APR-02 — Definição de erro

**Resolução comentada:** Erro é 20 menos 24, ou menos quatro unidades. O modelo previu acima do observado, portanto ocorreu superprevisão.

**Possível causa a investigar:** conteúdo: inverter observado menos previsto.

### MAT-EST-050-EX-APR-03 — Módulo local

**Resolução comentada:** Os módulos foram quatro e 23,2 unidades, respectivamente. Retirar sinal serve à comparação de magnitudes, mas o sinal continua necessário para calcular custo assimétrico.

**Possível causa a investigar:** cálculo: manter sinal no módulo.

### MAT-EST-050-EX-APR-04 — Custo de sinal positivo

**Resolução comentada:** O custo é duas vezes três, igual a seis pontos. Não existe parcela negativa para e positivo.

**Possível causa a investigar:** conteúdo: confundir penalidade de sinal.

### MAT-EST-050-EX-APR-05 — Custo de sinal negativo

**Resolução comentada:** Custo é três pontos, pois a parte positiva é zero e a magnitude negativa é três. O peso cinco não atua na superprevisão nesta definição.

**Possível causa a investigar:** conteúdo: penalizar ambos os sinais pelo mesmo r.

### MAT-EST-050-EX-APR-06 — Peso igual a um

**Resolução comentada:** Custo de cada linha é o módulo do erro, porque ambas as direções custam um ponto por unidade; a média coincide numericamente com MAE. As unidades de custo seguem sendo pontos fictícios.

**Possível causa a investigar:** conteúdo: não reconhecer função por partes.

### MAT-EST-050-EX-APR-07 — Soma dos módulos

**Resolução comentada:** Oitenta e oito dividido por cinco é 17,6 unidades. Não dividir por oito: três alvos do protocolo ainda não foram observados.

**Possível causa a investigar:** cálculo: usar tamanho planejado da amostra.

### MAT-EST-050-EX-APR-08 — Janelas e hipóteses

**Resolução comentada:** Não. É somente cenário condicional e permanece em arquivo separado com rótulo de não observado.

**Possível causa a investigar:** interpretação: misturar simulação condicional e registro.

### MAT-EST-050-EX-APR-09 — Piora versus percentual

**Resolução comentada:** A diferença 23,2 menos quatro é 19,2 unidades. Não é 19,2 por cento.

**Possível causa a investigar:** cálculo: confundir operação e unidade.

### MAT-EST-050-EX-APR-10 — Condição lógica

**Resolução comentada:** Não. Trata-se de uma conjunção lógica; amostra incompleta e falha da guarda local impedem aprovação dentro daquele protocolo.

**Possível causa a investigar:** estratégia: substituir critérios múltiplos por uma métrica.

## Camada B — Consolidação

### MAT-EST-050-EX-CON-01 — Derivar reta B

**Resolução comentada:** Positivos somam 84; magnitude negativa soma quatro. Dividindo (84r+4) por cinco, obtemos 16,8r+0,8 pontos por previsão.

**Possível causa a investigar:** cálculo: esquecer divisão por cinco.

### MAT-EST-050-EX-CON-02 — Derivar reta C

**Resolução comentada:** (16,4r+25,4)/5 é igual a 3,28r+5,08 pontos por previsão. As parcelas têm origem em sinais diferentes dos cinco erros.

**Possível causa a investigar:** conteúdo: trocar partes positivas e negativas.

### MAT-EST-050-EX-CON-03 — Calcular alternativa r=2

**Resolução comentada:** B=16,8 vezes dois mais 0,8 = 34,4. C=3,28 vezes dois mais 5,08 = 11,64. Diferença é 22,76 pontos fictícios em favor de C no agregado alternativo.

**Possível causa a investigar:** cálculo: substituição numérica ou subtração.

### MAT-EST-050-EX-CON-04 — Encontrar ponto de empate

**Resolução comentada:** Subtraindo 3,28r e depois 0,8, fica 13,52r=4,28. Portanto r=4,28/13,52, cerca de 0,31657. O resultado é adimensional.

**Possível causa a investigar:** álgebra: transpor termo com sinal incorreto.

### MAT-EST-050-EX-CON-05 — Testar r=0,25

**Resolução comentada:** B=5,00, C=5,90, então B fica 0,90 ponto abaixo. O achado mostra dependência do custo e não altera o protocolo r=3.

**Possível causa a investigar:** cálculo: arredondar o limiar cedo.

### MAT-EST-050-EX-CON-06 — Retirar t19 descritivamente

**Resolução comentada:** B=(88−4)/4=21. C=(41,8−23,2)/4=4,65. Essa conta mede influência; a guarda original continua registrando t19.

**Possível causa a investigar:** estratégia: transformar diagnóstico em exclusão oficial.

### MAT-EST-050-EX-CON-07 — Retirar t18 descritivamente

**Resolução comentada:** B=(88−25)/4=15,75 e C=(41,8−9,8)/4=8. A redução relativa neste recorte é aproximadamente 49,21 por cento.

**Possível causa a investigar:** cálculo: usar cinco no denominador após retirar um.

### MAT-EST-050-EX-CON-08 — Projeção B de t23

**Resolução comentada:** B23 é y19, ou 183. Não é y22, pois a referência sazonal usa a mesma estação do ciclo anterior.

**Possível causa a investigar:** conteúdo: confundir sazonal ingênuo com último valor.

### MAT-EST-050-EX-CON-09 — Projeção C de t23

**Resolução comentada:** A soma é 80 e a média em cinco valores é 16. O candidato prevê 183+16=199 unidades. A janela só usa informações disponíveis até t22.

**Possível causa a investigar:** cálculo: dividir pelo período sazonal quatro em vez da janela cinco.

### MAT-EST-050-EX-CON-10 — Retificação hipotética

**Resolução comentada:** d22=190−176=14. A soma da janela cai de 80 para 77; sua média cai para 15,4. A previsão C23 hipotética seria 198,4, não 199.

**Possível causa a investigar:** estratégia: sobrescrever dado e previsão originais.

## Camada C — Questões autorais no estilo de vestibulares

### MAT-EST-050-EX-VES-01 — Interpretação de duas retas

**Resolução comentada:** Não existe preferência de custo independente do peso: no recorte r=0,25 a média B é menor; em r=3 a média C é menor. Esses resultados são descritivos e não substituem a guarda do protocolo.

**Possível causa a investigar:** interpretação: extrapolar uma métrica para todas as políticas.

### MAT-EST-050-EX-VES-02 — Menor média, guarda violada

**Resolução comentada:** A condição local falha porque 19,2 supera dez. Redução agregada não compensa uma porta definida como obrigatória. A regra também exige oito pares, e há só cinco.

**Possível causa a investigar:** estratégia: ponderar critérios que foram definidos como portas obrigatórias.

### MAT-EST-050-EX-VES-03 — Igual módulo, outro custo

**Resolução comentada:** Erros seriam +8 e −8, módulos ambos oito. Custos seriam 24 e oito pontos, pois o mesmo tamanho em sentidos opostos recebe pesos distintos. Não afirmar que y23 aconteceu.

**Possível causa a investigar:** conteúdo: confundir módulo e custo.

### MAT-EST-050-EX-VES-04 — Cenário de queda

**Resolução comentada:** Módulos seriam cinco e 21 unidades; C pioraria dezesseis unidades, além do limite dez. É cenário condicional, não mais uma falha observada.

**Possível causa a investigar:** interpretação: transformar cenário em evidência histórica.

### MAT-EST-050-EX-VES-05 — Cenário de alta

**Resolução comentada:** Erros +26 e +10; módulos 26 e dez; custos 78 e 30 pontos fictícios. A melhora condicional de C não reverte a falha já registrada em t19.

**Possível causa a investigar:** estratégia: considerar nova possibilidade como reparo do histórico.

### MAT-EST-050-EX-VES-06 — Revisão de entrada

**Resolução comentada:** A previsão C23 sob a hipótese cairia de 199 para 198,4, diferença de menos 0,6. Uma retificação real deve manter a emissão original, nova versão e momento do evento; reescrever o passado elimina auditabilidade.

**Possível causa a investigar:** interpretação: achar que mudança pequena dispensa registro.

### MAT-EST-050-EX-VES-07 — Vazamento condicional

**Resolução comentada:** Não se pode obter d23 verdadeiro sem y23. O valor condicional obtido sob cenário y23=191 é legítimo somente como cenário, nunca como emissão real baseada nos dados de t22.

**Possível causa a investigar:** estratégia: cruzar fronteira de informação.

### MAT-EST-050-EX-VES-08 — Amostra dependente

**Resolução comentada:** As quatro linhas remanescentes se sobrepõem fortemente entre diagnósticos e pertencem à mesma sequência temporal inventada. Logo, não são cinco testes independentes nem validam inferência probabilística externa.

**Possível causa a investigar:** conteúdo: ignorar dependência entre subconjuntos.

### MAT-EST-050-EX-VES-09 — Política alterada depois

**Resolução comentada:** O protocolo herdado continua violado; uma nova política com guarda vinte teria de receber outra versão, justificativa e avaliação posterior independente. Não se pode apresentar ajuste pós-resultado como congelamento prévio.

**Possível causa a investigar:** estratégia: retrospectiva apresentada como pré-registro.

### MAT-EST-050-EX-VES-10 — Comunicado técnico

**Resolução comentada:** Exemplo: Comparamos B e C em cinco alvos fictícios h1. MAE foi 17,6 versus 8,36 unidades, com custo médio r=3 de 51,2 versus 14,92 pontos. Em t19, C piorou 19,2 unidades, excedendo a guarda de dez. Faltam três pares e auditoria/autorização, portanto não há promoção nem inferência de desempenho real futuro.

**Possível causa a investigar:** interpretação: omitir unidade, ressalva ou contexto da média.

## Reteste independente posterior

### MAT-EST-050-EX-RET-01 — Nova família de custo

**Resolução comentada:** P(r)=(30r+5)/5=6r+1. Q(r)=(10r+25)/5=2r+5. Igualando, 4r=4 e r=1. Esta questão exige transferir a derivação, não memorizar o limiar do exemplo central.

**Possível causa a investigar:** conteúdo: não reconstruir separação de sinais.

### MAT-EST-050-EX-RET-02 — Novo cenário condicional

**Resolução comentada:** Erros seriam +5 e −10; módulos cinco e dez; custos dez e dez pontos. Igual custo não implica igual erro absoluto. O observado continua hipotético.

**Possível causa a investigar:** cálculo: confundir direção e peso.

### MAT-EST-050-EX-RET-03 — Retirada sem apagar falha

**Resolução comentada:** Média original (1+15+2)/3=6. Nos dois restantes seria 1,5; essa queda não apaga a perda individual de 15, que continua violando a guarda.

**Possível causa a investigar:** estratégia: usar exclusão descritiva para contornar regra.

### MAT-EST-050-EX-RET-04 — Correção de registro

**Resolução comentada:** A média cai oito dividido por quatro, isto é, duas unidades. O ajuste é hipotético e uma retificação real precisa de trilha de versões.

**Possível causa a investigar:** cálculo: esquecer efeito do denominador.

### MAT-EST-050-EX-RET-05 — Fronteira temporal

**Resolução comentada:** y51 só será conhecido após o período-alvo, então há vazamento. Congelar a regra com valores até t50 e registrar emissão antes da revelação de y51; avaliar depois e preservar versões.

**Possível causa a investigar:** estratégia: ignorar ordenação temporal.

### MAT-EST-050-EX-RET-06 — Parecer crítico de generalização

**Resolução comentada:** Os alvos são fictícios e não constituem amostra de operação real; a escolha da regra e os valores não formam teste externo cego; é preciso avaliação futura com emissões registradas, dados auditados e métricas/guardas predefinidas. Uma média menor isolada não assegura cada alvo.

**Possível causa a investigar:** interpretação: extrapolar amostra sintética.

