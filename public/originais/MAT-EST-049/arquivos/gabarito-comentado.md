# MAT-EST-049 — Gabarito comentado separado

**Revelar somente depois da tentativa.** As classificações de erro abaixo são hipóteses de correção, não diagnósticos pessoais automáticos.

## Camada A — Aprendizagem básica

### MAT-EST-049-EX-APR-01 — Origem e alvo
**Resolução:** Origem t23; alvo t24; horizonte um período. O registro deve anteceder a chegada de y24.
**Possível motivo de erro:** Interpretação: confundir data de emissão com data-alvo.

### MAT-EST-049-EX-APR-02 — Valores disponíveis
**Resolução:** Não. O y19 é o próprio valor ainda não revelado. Inserir y19 vazaria informação do alvo.
**Possível motivo de erro:** Estratégia: não marcar a fronteira entre passado e futuro.

### MAT-EST-049-EX-APR-03 — Referência sazonal
**Resolução:** 80 unidades, pois t20 e t16 são da mesma posição do ciclo de quatro trimestres.
**Possível motivo de erro:** Conteúdo: usar t19, o último valor, em lugar de t16.

### MAT-EST-049-EX-APR-04 — Diferença sazonal
**Resolução:** d19 é 183 menos 187, igual a −4 unidades. O valor está quatro abaixo da estação anterior.
**Possível motivo de erro:** Cálculo: inverter a ordem da subtração ou omitir o sinal.

### MAT-EST-049-EX-APR-05 — Média da janela
**Resolução:** A soma é 30 e há cinco valores; a média é 6 unidades.
**Possível motivo de erro:** Cálculo: dividir pela sazonalidade 4 em vez do tamanho da janela 5.

### MAT-EST-049-EX-APR-06 — Erro assinado
**Resolução:** 93 menos 98 é −5; foi uma superprevisão de cinco unidades.
**Possível motivo de erro:** Conteúdo: usar previsão menos observado.

### MAT-EST-049-EX-APR-07 — Módulo
**Resolução:** O módulo é 7,2 unidades fictícias, não −7,2.
**Possível motivo de erro:** Cálculo: manter o sinal no módulo.

### MAT-EST-049-EX-APR-08 — Identificar o par
**Resolução:** Não. Os alvos são diferentes. Comparação emparelhada requer o mesmo alvo, horizonte e fronteira de informação.
**Possível motivo de erro:** Interpretação: agrupar previsões somente por estarem próximas no calendário.

### MAT-EST-049-EX-APR-09 — Piora em magnitude
**Resolução:** 9 menos 5 = 4 unidades. A piora é magnitude, não porcentagem.
**Possível motivo de erro:** Cálculo: inverter a diferença ou trocar unidade por por cento.

### MAT-EST-049-EX-APR-10 — Tipo de evidência
**Resolução:** Não. É uma simulação didática reproduzível, não log autenticado de emissões de campo.
**Possível motivo de erro:** Interpretação: confundir roteiro editorial com observação real.

## Camada B — Consolidação

### MAT-EST-049-EX-CON-01 — Previsão candidata simples
**Resolução:** A soma das diferenças é 20; média 4. Previsão candidata é 100 + 4 = 104 unidades.
**Possível motivo de erro:** Cálculo: esquecer a média ou adicionar 20 inteiro.

### MAT-EST-049-EX-CON-02 — Par completo
**Resolução:** Erros: B 110−100=+10 e C 110−104=+6. Módulos: 10 e 6. Diferença pareada |B|−|C|=+4.
**Possível motivo de erro:** Cálculo: confundir erro assinado com módulo ou errar a ordem.

### MAT-EST-049-EX-CON-03 — MAE de três pares
**Resolução:** MAE B=(2+5+8)/3=5. MAE C=(3+1+4)/3=8/3≈2,67 unidades.
**Possível motivo de erro:** Cálculo: somar sinais antes de aplicar módulo.

### MAT-EST-049-EX-CON-04 — Redução relativa
**Resolução:** (20−15)/20=5/20=0,25=25%. O denominador é a base.
**Possível motivo de erro:** Cálculo: dividir pelo resultado do candidato ou converter mal fração em porcentagem.

### MAT-EST-049-EX-CON-05 — Perda assimétrica
**Resolução:** Para +4: 3×4=12 pontos. Para −4: máximo(−e,0)=4, portanto 4 pontos. Sinal altera custo.
**Possível motivo de erro:** Conteúdo: multiplicar ambos os sinais por três.

### MAT-EST-049-EX-CON-06 — Regra de proteção
**Resolução:** Não. O valor 11 excede dez em uma data; a média ou a melhora em outra data não o elimina.
**Possível motivo de erro:** Estratégia: verificar só a média, ignorando exigência por alvo.

### MAT-EST-049-EX-CON-07 — Janela móvel e dependência
**Resolução:** Usa d14 a d18, substituindo d13 por d18. Repete quatro das cinco diferenças.
**Possível motivo de erro:** Conteúdo: recomeçar a janela em d18 ou incluir d19 futuro.

### MAT-EST-049-EX-CON-08 — Auditoria de vazamento
**Resolução:** d20 = y20−y16 contém y20, o próprio alvo; não é conhecido em t19. A previsão tem vazamento.
**Possível motivo de erro:** Estratégia: analisar apenas o índice de uma variável sem expandir sua definição.

### MAT-EST-049-EX-CON-09 — Média pareada
**Resolução:** MAE B=(8+4)/2=6; C=(3+9)/2=6; diferenças B−C são +5 e −5, média zero. Mesmo MAE esconde desempenhos diferentes por alvo.
**Possível motivo de erro:** Interpretação: declarar empate em todas as datas porque médias coincidem.

### MAT-EST-049-EX-CON-10 — Relatório curto
**Resolução:** Exemplo: “Neste conjunto simulado, o candidato teve MAE menor”. “Isso não comprova ganho futuro, pois os alvos são poucos, dependentes e fictícios; seria necessária avaliação adicional previamente definida”. Respostas equivalentes com ressalvas são válidas.
**Possível motivo de erro:** Interpretação: extrapolar uma descrição para certeza geral.

## Camada C — Contextualização no estilo vestibular (todas autorais)

### MAT-EST-049-EX-VES-01 — Calendário de previsão
**Resolução:** A previsão B utilizou informação do próprio alvo; sua condição informacional difere da A. Deve ser rotulada retrospectiva e não comparada como se fosse par emitido previamente.
**Possível motivo de erro:** Interpretação: privilegiar precisão aparente sem conferir a ordem temporal.

### MAT-EST-049-EX-VES-02 — Escolha do denominador
**Resolução:** (17,60−8,36)/17,60=9,24/17,60=0,525=52,5%. O denominador é o procedimento BASE-SNAIVE-v1, explicitamente escolhido como comparador.
**Possível motivo de erro:** Cálculo: trocar base por candidato no denominador.

### MAT-EST-049-EX-VES-03 — Falha local e média
**Resolução:** No alvo t19, o candidato piorou 23,2−4=19,2 unidades; a média agregada não significa melhora em todos os casos, nem elimina uma guarda por observação.
**Possível motivo de erro:** Interpretação: confundir resumo estatístico com garantia de cada caso.

### MAT-EST-049-EX-VES-04 — Regra de perda socialmente escolhida
**Resolução:** Os módulos são ambos 6, mas custos são 18 e 6 pontos. MAE ignora sinal por definição; a perda incorpora uma escolha de consequência e precisa ser declarada.
**Possível motivo de erro:** Conteúdo: tratar MAE como métrica universal de decisão.

### MAT-EST-049-EX-VES-05 — Atualização de política após observação
**Resolução:** Houve alteração retrospectiva do critério. Registrar uma nova versão de protocolo com motivo, data e testes futuros; não reclassificar o resultado do protocolo v1 como se nunca tivesse ocorrido a falha.
**Possível motivo de erro:** Estratégia: confundir análise exploratória com confirmação pré-registrada.

### MAT-EST-049-EX-VES-06 — Condição necessária e suficiente
**Resolução:** Não. Em uma conjunção, uma condição falsa já impede “todas verdadeiras”; há também condições pendentes. A decisão prevista é não autorizar a promoção nesta etapa, sem inferir superioridade geral da referência.
**Possível motivo de erro:** Interpretação: substituir uma conjunção de requisitos por voto majoritário.

### MAT-EST-049-EX-VES-07 — Sazonalidade de quatro estações
**Resolução:** B prevê t24 com y20=200 porque t−4=20. Usar y23=230 corresponde à regra ingênua não sazonal, não à versão sazonal fixada.
**Possível motivo de erro:** Conteúdo: misturar modelos com nomes semelhantes.

### MAT-EST-049-EX-VES-08 — Expansão de variável escondida
**Resolução:** d22 inclui y22 ainda desconhecido. A janela admissível é d17 a d21. Com dados desta aula, sua média é (33+25−4+21+21)/5=19,2.
**Possível motivo de erro:** Estratégia: usar uma fórmula circular que depende do alvo.

### MAT-EST-049-EX-VES-09 — Agregado versus dependência
**Resolução:** Incorreto. As janelas consecutivas de cinco diferenças compartilham quatro valores e os alvos pertencem à mesma série. Sem modelagem adequada, não há justificativa de independência.
**Possível motivo de erro:** Interpretação: confundir quantidade de linhas com independência estatística.

### MAT-EST-049-EX-VES-10 — Parecer com limites
**Resolução:** Resposta-modelo: “Os modelos foram calculados para os mesmos cinco alvos de horizonte um em uma simulação”. “Seus MAEs foram 17,60 e 8,36 unidades”. “A melhora média não apaga a piora de 19,2 unidades do candidato em t19, e os dados não são avaliação real externa”. “Como faltam pares e a guarda local falhou, a promoção não é autorizada nesta etapa”.
**Possível motivo de erro:** Interpretação: omitir limites ou converter números fictícios em recomendação real.

## Reteste posterior — Sem consultar gabarito

### MAT-EST-049-EX-RET-01 — Novo par sazonal
**Resolução:** B usa y24=210. A soma das diferenças é 10, média 2; C prevê 212 unidades. Nenhum y28 foi usado.
**Possível motivo de erro:** Cálculo: perder o sinal negativo na média.

### MAT-EST-049-EX-RET-02 — Nova verificação de custo
**Resolução:** Erros observados menos previstos: B=−2 e C=−4. Ambos são superprevisão: custos 2 e 4 pontos. C piorou 2 unidades em módulo.
**Possível motivo de erro:** Conteúdo: aplicar peso triplo a erro negativo.

### MAT-EST-049-EX-RET-03 — Sensibilidade ao custo
**Resolução:** B custa 6 pontos, C 12 pontos. Mudou a regra decisória; não reescrever custos originais como se fossem iguais, nem usar o mesmo cenário para confirmar política escolhida posteriormente.
**Possível motivo de erro:** Estratégia: alterar função de custo sem indicar mudança de versão.

### MAT-EST-049-EX-RET-04 — Guarda e média em amostra nova
**Resolução:** Média delta=(5+5+5−12)/4=0,75, que favorece o candidato em média. A piora individual de 12 ultrapassa a guarda de dez; não permite promoção.
**Possível motivo de erro:** Interpretação: eliminar eventos adversos quando a média ainda é positiva.

### MAT-EST-049-EX-RET-05 — Avaliação além do horizonte
**Resolução:** Não. Têm horizontes e conjuntos de informação distintos e compartilham o mesmo observado t30. Separar por horizonte e reconhecer dependência.
**Possível motivo de erro:** Interpretação: contar duas previsões como duas observações independentes.

### MAT-EST-049-EX-RET-06 — Nota de decisão
**Resolução:** A resposta deve diferenciar simulação de campo; identificar falha da guarda; dizer que não há autorização automática; pedir mais pares emparelhados, qualidade dos dados, decisão humana, versionamento e plano de reversão. A formulação pode variar sem alterar esses fundamentos.
**Possível motivo de erro:** Estratégia: declarar promoção a partir de uma única métrica ou pular governança.
