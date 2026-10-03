# MAT-EST-048 — Monitoramento prospectivo de séries temporais: registro de previsões, deriva de dados e protocolos de revisão de modelos

**Área:** Matemática. **Unidade:** Estatística — ponte universitária em séries temporais. **Código:** MAT-EST-048. **Anterior:** MAT-EST-047. **Próximo:** MAT-EST-049. **Origem:** integralmente autoral; zero questões oficiais. **Status individual:** não iniciado; nenhum resultado real registrado.

**Roteiro adaptável:** bloco A — emissão e chegada, 25 a 50 minutos; bloco B — erros, janelas e possíveis sinais de mudança, 25 a 50 minutos; bloco C — investigação, versão e relatório, 25 a 50 minutos; exercícios e reteste no momento adequado. Continuar somente após compreender os pré-requisitos.

## 1. Objetivo, pré-requisitos e significado desta etapa

O estudante deverá conseguir: (1) registrar previsão antes de conhecer o alvo; (2) diferenciar simulação bem ordenada de teste prospectivo verdadeiro; (3) calcular erros e métricas em janelas já amadurecidas; (4) aplicar uma regra de alerta pré-declarada; (5) separar qualidade do dado, mudança de distribuição, deriva da relação e piora no desempenho; (6) descrever auditoria humana e versionamento de modelos; (7) interpretar corretamente previsões ainda sem observado.

**Pré-requisitos:** subtração, números negativos, valor absoluto, média e raiz; MAT-EST-031/032 (treino e teste), MAT-EST-041 (ordem temporal), MAT-EST-043/045 (sazonalidade e Holt-Winters), MAT-EST-046 (origens e horizontes) e MAT-EST-047 (erros, intervalos e risco). Se faltar compreensão de uma conta, retomar o fundamento específico.

**Relação com vestibulares:** gráficos, tabelas, porcentagem, relações temporais e crítica a inferências são habilidades transferíveis aos exames. O protocolo de monitoramento de um sistema de previsão e o ajuste de Holt-Winters são aprofundamento universitário e não são atribuídos como exigência oficial de ENEM, FUVEST ou outras bancas. Todos os exercícios, inclusive os de estilo vestibular, são autorais.

## 2. Por que avaliar uma previsão depois de usá-la?

Até MAT-EST-047, conhecíamos os resultados da base t1 até t12. Fizemos uma auditoria retrospectiva de previsões que, embora calculadas com prefixos cronológicos corretos, estavam sendo avaliadas em dados já divulgados nas aulas. Em um monitoramento operacional sério, precisamos de duas peças separadas: o que foi emitido e o que chegou depois. A avaliação posterior não deve reescrever a primeira peça.

Para compreender essa organização sem acesso a dados externos, construiremos **um cenário adicional e inteiramente fictício** de seis trimestres, t13 a t18. Seu autor escolheu todos os valores para fins didáticos. Um programa reexecuta seis emissões em ordem, calculando cada previsão exclusivamente com o passado disponível e só então revela a chegada fictícia correspondente. Isso demonstra uma sequência sem vazamento **dentro da simulação**, mas não produz evidência prospectiva independente de um modelo em produção.

Os doze trimestres da base anterior permanecem byte a byte iguais. Os novos valores simulados são: 151, 168, 190, 176, 181, 201 unidades, respectivamente de t13 a t18. A regra do Holt-Winters aditivo, os parâmetros alfa igual a 0,3, beta-asterisco igual a 0,2 e gama igual a 0,2, e a sazonalidade trimestral de quatro períodos continuam os mesmos. A nova informação atualiza os estados do modelo; não escolhemos hiperparâmetros depois de ver os resultados.

## 3. Emissão, chegada, alvo e versão: exemplo resolvido

Para previsão de um passo, a origem é um período antes do alvo. O primeiro registro é emitido em t12 para t13; recebe o identificador SIM-E13, a versão HW-A-1.0, origem 12, alvo 13, horizonte 1, valor previsto e ordem didática de emissão 1. O observado não existe nesse registro: o campo diz NAO_DISPONIVEL. Em um evento separado, de ordem 2, o valor fictício 151 é apresentado. Só então calculamos o erro.

![Cronologia de emissão e chegada](assets/01-cronologia-registro.svg)

**Figura 1.** Texto alternativo: Em cada t13 a t18 uma emissão de ordem ímpar antecede a chegada de ordem par. **Observe:** Leia as ordens de emissão e chegada, não datas de calendário inventadas. **Conclusão para leitura em voz alta:** O encadeamento preserva a causalidade informacional na simulação; não fabrica teste prospectivo real.

O erro assinado da previsão é:

\[e_t = y_t - \widehat y_{t\mid t-1}.\]

Leitura: erro no alvo t é o observado no alvo menos a previsão emitida no período anterior. Quando o erro é positivo, o observado foi maior que o previsto. Quando negativo, o modelo previu acima do ocorrido. Um erro somente pode ser computado se houver uma observação verdadeira ou explicitamente simulada para a tarefa em estudo.

O registro de emissão deve conservar: identificador, objetivo, origem, alvo, horizonte, frequência e unidade dos dados, versão e parâmetros, instante ou ordem verificável, valor previsto, intervalo (se houver), proveniência e responsável. O de chegada conserva identificador de ligação, alvo, observado, unidade, fonte, momento da disponibilidade, qualidade, retificações e atraso. Em sistemas reais, registros duráveis e permissões ajudam a impedir regravação; um CSV didático, isoladamente, não prova integridade operacional.

## 4. Seis emissões simuladas: reconstrução numérica completa

A tabela seguinte é produzida a partir do código reproduzível. Não se trata de dados de uma empresa, órgão público ou pessoa.

| Emissão | Origem | Alvo | Previsto (un.) | Chegada inventada (un.) | Erro observado menos previsto (un.) |
|---|---:|---:|---:|---:|---:|
| SIM-E13 | 12 | 13 | 149,784727 | 151 | +1,215273 |
| SIM-E14 | 13 | 14 | 166,415128 | 168 | +1,584872 |
| SIM-E15 | 14 | 15 | 190,124698 | 190 | −0,124698 |
| SIM-E16 | 15 | 16 | 166,100579 | 176 | +9,899421 |
| SIM-E17 | 16 | 17 | 174,857463 | 181 | +6,142537 |
| SIM-E18 | 17 | 18 | 194,090091 | 201 | +6,909909 |

**Síntese por áudio:** nas três primeiras chegadas, as diferenças são relativamente pequenas. Nas chegadas t16, t17 e t18, o cenário foi construído para gerar erros positivos maiores. A escolha deliberada facilita demonstrar como funciona um alerta: não devemos interpretá-la como descoberta estatística independente.

![Erros por chegada simulada](assets/02-erros-por-chegada.svg)

**Figura 2.** Texto alternativo: Erros pequenos até t15; valores positivos bem maiores em t16 a t18. **Observe:** Compare direção, escala, unidades e sequências, não somente cores. **Conclusão:** O padrão foi construído no cenário; ele justifica investigação, não diagnóstico causal ou teste formal de deriva.

**Exemplo detalhado de t13.** A previsão resultante do estado atualizado até t12 é 149,784727186 unidades. O observado simulado é 151. Portanto, o erro é 151 menos 149,784727186, igual a +1,215272814 unidade. O erro absoluto é 1,215272814, pois o módulo não conserva o sinal. Para emitir t14, o modelo incorpora a chegada 151, mas mantém os mesmos parâmetros já definidos. Não existe utilização de t14 em sua própria emissão.

## 5. Métricas de janelas maduras e gatilho previamente declarado

Para os três erros já conhecidos numa janela de três tarefas, calculamos média assinada, erro absoluto médio e raiz do erro quadrático médio:

\[\overline e = \frac{e_1+e_2+e_3}{3},\qquad MAE=\frac{|e_1|+|e_2|+|e_3|}{3},\qquad RMSE=\sqrt{\frac{e_1^2+e_2^2+e_3^2}{3}}.\]

Leitura: a média assinada conserva a direção; o MAE representa o tamanho absoluto médio; o RMSE aumenta o peso de erros grandes. Os valores abaixo possuem a mesma unidade do observado; os quadrados são convertidos de volta à unidade original pela raiz.

| Janela fictícia | Quantidade de chegadas | Média assinada (un.) | MAE (un.) | RMSE (un.) | Erros absolutos superiores a 4 |
|---|---:|---:|---:|---:|---:|
| t13–t15 | 3 | +0,891816 | 0,974947 | 1,155315 | 0 de 3 |
| t16–t18 | 3 | +7,650622 | 7,650622 | 7,820404 | 3 de 3 |

**Síntese por áudio:** a janela final apresenta erros maiores e todos positivos no cenário inventado. Os blocos reúnem trimestres sazonais diferentes; com três registros em cada bloco, não há base para teste formal de mudança persistente. Esta é uma demonstração de procedimento e de cautela, não uma validação de qualidade operacional.

![Métricas em duas janelas](assets/04-comparacao-janelas.svg)

**Figura 3.** Texto alternativo: Leia média assinada, MAE e RMSE em cada bloco de três. **Observe:** O bloco mais recente apresenta erros positivos maiores por construção do cenário. **Conclusão:** Uma comparação curta serve à triagem e não controla sazonalidade nem estabelece deriva verdadeira.

**Regra autoral declarada para o exercício antes de interpretar seus resultados:** Em cada chegada, sobre as últimas 3 tarefas amadurecidas no mesmo horizonte, revisar se pelo menos 2 tiverem erro absoluto > 4 unidades. Regra didática previamente definida, não um teste de deriva nem autorização de atualização automática.

Após t15, nenhum dos três últimos erros ultrapassou quatro. Após t16, apenas um ultrapassou. Em t17, a janela t15 a t17 contém dois casos altos e o aviso de revisão é ativado. Em t18, os três erros de t16 a t18 ultrapassam quatro, mantendo a investigação. O operador **superior** é estrito: erro exatamente quatro não é considerado alto. Uma janela de apenas uma ou duas chegadas não satisfaz a condição completa.

![Janela de alerta](assets/03-janela-gatilho.svg)

**Figura 4.** Texto alternativo: Até t15 nenhum erro supera quatro; t16, t17 e t18 superam quatro. **Observe:** A condição só é testada com três chegadas maduras e exige dois valores altos. **Conclusão:** O gatilho de investigação aciona revisão humana; não prova mudança estatística ou validade operacional.

Este limiar hipotético não foi estimado para gerar uma taxa de falso alarme, não é teste de hipótese, nem certifica um fenômeno chamado deriva. O alerta ordena **investigar**, não reestimar ou substituir automaticamente o modelo.

## 6. Mudança no tempo: quatro perguntas que não são equivalentes

**Qualidade da entrada ou do observado:** um atraso, arquivo duplicado, valor faltante ou mudança de unidade pode produzir uma queda aparente na qualidade da previsão. Primeiro confronte chaves, calendário, frequência, fonte e retificações. Por exemplo, misturar unidades com milhares de unidades multiplica o erro sem que a demanda tenha necessariamente mudado.

**Mudança da distribuição de entradas (deriva de dados):** quando um modelo usa variáveis X, compara-se a distribuição de X de novas chegadas com uma referência relevante. Esta base didática registra a série Y e sua previsão; **não contém covariáveis externas X**. Seria incorreto dizer que demonstrou uma mudança na distribuição de preditores ausentes.

**Mudança da relação entre entradas e alvo (deriva de conceito):** mesmo que X se mantenha parecido, sua relação com Y pode alterar-se ao longo do tempo. Detectar essa mudança requer evidência apropriada, comparação temporal e hipóteses sobre o processo. Erros grandes não identificam sozinhos sua causa.

**Queda da qualidade preditiva:** após a chegada do alvo, comparam-se erro, cobertura de intervalos, atraso de observações e critérios de decisão. Esse monitoramento informa *o que aconteceu no desempenho avaliado*, não identifica automaticamente *por que aconteceu*.

![Categorias de monitoramento](assets/05-classes-de-alerta.svg)

**Figura 5.** Texto alternativo: Os registros trimestrais possuem Y, mas não covariáveis externas de X. **Observe:** Não confunda erro grande, falha no dado, deslocamento da entrada e mudança da relação. **Conclusão:** Sem X externo nem amostra suficiente, a simulação não demonstra qual mudança, se alguma, ocorreu.

As orientações de monitoramento contínuo e revisão de responsabilidades aparecem no NIST AI Risk Management Framework. Elas servem aqui como referência de governança e documentação. O cenário não é um sistema de inteligência artificial implantado, e essa orientação não torna nosso limiar uma norma estatística. [NIST — Govern 1.5](https://airc.nist.gov/airmf-resources/playbook/govern/) e [NIST — Manage 2.2](https://airc.nist.gov/airmf-resources/playbook/manage/).

## 7. Investigar, testar, aprovar: protocolo de revisão

**Primeira etapa, preservar evidências.** Manter a versão HW-A-1.0, emissões e chegadas já registradas, o código e os hashes dos dados herdados. Não apague falhas para apresentar um indicador melhor.

**Segunda etapa, conferir dados e calendário.** Procurar omissões, duplicidades, correções históricas, sazonalidade, mudanças de unidade e atraso dos alvos. Uma falha na ingestão é diferente de uma alteração real de demanda.

**Terceira etapa, comparar com uma referência simples.** Verificar sazonal ingênuo, métricas por horizonte, sinais e faixas avaliáveis quando existentes. Não concluir que um modelo complexo deve ser mantido só porque foi usado anteriormente.

**Quarta etapa, formular hipótese e registrar decisão humana.** Anotar o motivo do alerta, data de investigação, evidências, limitações e responsável. O tamanho da amostra importa: três erros altos num cenário artificial justificam somente a simulação da resposta operacional.

**Quinta etapa, produzir candidato separado se necessário.** Ao mudar hiperparâmetros, janela ou família de modelo, publicar novo identificador de versão e critério de comparação. A janela que serviu para sugerir a mudança deixa de ser um teste independente daquele candidato. Avaliar um período posterior ainda não utilizado na decisão.

**Sexta etapa, considerar substituição ou reversão.** Aprovar a mudança conforme critérios documentados e guardar um caminho de retorno. Em aplicações de consequência elevada, critérios de governança, revisão humana e requisitos específicos precisam de avaliação própria.

![Etapas de revisão](assets/06-protocolo-revisao.svg)

**Figura 6.** Texto alternativo: Veja que a aprovação é posterior à verificação de dados e teste separado. **Observe:** Não se substitui um modelo só porque três erros ilustrativos ultrapassaram o limite. **Conclusão:** Toda mudança precisa de versão, critério anterior, validação separada e responsabilidade humana.

## 8. Previsões pendentes: matemática sem inventar o futuro

Na origem t18 do **cenário simulado**, é possível emitir dois compromissos com a versão atual: previsão de h1 para t19 e de h2 para t20. Não criaremos valores observados para essas datas. As duas emissões permanecem pendentes.

| Emissão simulada | Origem | Horizonte | Alvo | Previsão (un.) | Observado | Pode entrar no MAE? |
|---|---:|---:|---:|---:|---|---|
| SIM-P19 | 18 | 1 | 19 | 220,424888 | Não disponível | Não |
| SIM-P20 | 18 | 2 | 20 | 199,820114 | Não disponível | Não |

**Síntese por áudio:** uma previsão emitida é um compromisso ainda não avaliado. Contar um alvo ausente como erro zero, incluir um dado antecipadamente ou presumir cobertura desfiguraria o denominador. Também não é legítimo emitir novamente em t19 e chamar o novo resultado de previsão original de t18 para t20: a origem e a informação disponível seriam diferentes.

![Duas previsões ainda sem observado](assets/07-emissoes-pendentes.svg)

**Figura 7.** Texto alternativo: Veja que as métricas ficam em branco enquanto o alvo não chega. **Observe:** Separar emissão e chegada impede preencher uma previsão com o futuro ou contar pendências como acertos. **Conclusão:** A política mantém a métrica calculada somente nas tarefas maduras e com rastro verificável.

## 9. Relatório-modelo e erros comuns

**Exemplo de comunicado responsável:** “Auditamos uma simulação editorial trimestral com seis emissões sequenciais, utilizando a mesma versão de Holt-Winters aditivo e registrando as previsões antes das chegadas fictícias. A regra ilustrativa, que exige dois dos três últimos erros absolutos acima de quatro unidades, ativou investigação em t17 e permaneceu ativa em t18. A comparação entre os blocos de três casos é exploratória, não controla integralmente sazonalidade e não demonstra deriva causal ou taxa de acerto futura. As emissões t19 e t20 permanecem sem observado e não entram nas métricas. Em um serviço real, a investigação examinaria fontes, atrasos, referências, horizonte e versionamento antes de considerar novo modelo.”

**Erros frequentes:** chamar um cenário inventado de acompanhamento prospectivo real; calcular o erro antes de a observação chegar; alterar uma previsão depois da chegada; confundir atualização dos estados e escolha nova de hiperparâmetros; reportar MAE sem número de tarefas maduras; trocar o sinal do erro; usar limiar escolhido retrospectivamente como se fosse registrado antes; assumir que alerta prova mudança persistente; comparar trimestres diferentes ignorando sazonalidade; afirmar distribuição de X sem possuir X; concluir causalidade a partir de performance; disparar atualização automática; incluir pendências como acertos; divulgar uma cobertura nominal sem procedimento de calibração.

**Relações entre áreas:** Matemática — média, valor absoluto, raiz, desigualdades e funções por partes; Computação — integridade de eventos, logs, versionamento e validação de entradas; Português e Redação — compromisso claro entre resultado e limites; Metodologia científica — separação entre exploração, hipótese e avaliação independente. A separação de emissões e chegadas é uma ferramenta geral para decisões informadas e auditáveis.

## 10. Vídeo complementar e fontes

**Vídeo:** [Lecture 12: Time Series Analysis — MIT OpenCourseWare / MIT Learn](https://learn.mit.edu/video/21027/lecture-12-time-series-analysis?playlist=21012). **Professor:** Peter Kempthorne. **Duração indicada na plataforma institucional:** aproximadamente 1 hora, 20 minutos e 32 segundos. **Quando assistir:** após o exemplo de atualização temporal e antes da consolidação. **Por quê:** revê autocorrelação, estacionariedade e estrutura das séries; não substitui esta aula nem apresenta como se fosse autor do nosso protocolo de monitoramento. Página institucional verificada; a reprodução integral e o teste real no Microsoft Edge permanecem pendentes.

**Leituras:** [Forecasting: Principles and Practice — validação cruzada temporal](https://otexts.com/fpp3/tscv.html); [avaliação de erro de previsão](https://otexts.com/fpp3/accuracy.html); [NIST — avaliação e monitoramento de modelos em operação](https://airc.nist.gov/airmf-resources/playbook/manage/); [NIST — planejamento de monitoramento e responsabilidades](https://airc.nist.gov/airmf-resources/playbook/govern/). Os dados, a versão didática, o gatilho e as conclusões do exercício foram produzidos especificamente para o projeto.

## 11. Exercícios graduais — gabarito editorial separado

Na interface do site, mostrar somente `exercicios.json` antes de registrar uma tentativa real; liberar `gabarito-comentado.json` depois. O motivo provável do erro ajuda a recuperar conteúdo, interpretação, cálculo, distração, memória, estratégia ou tempo. Nenhuma atividade é questão oficial.

### 11.1 Aprendizagem básica

**MAT-EST-048-EX-APR-01 — Origem e alvo.** Numa previsão emitida em t12 para t13, identifique a origem, o alvo e o horizonte.

**MAT-EST-048-EX-APR-02 — Registro imutável.** Por que guardar a versão do modelo e o valor previsto antes da chegada do observado?

**MAT-EST-048-EX-APR-03 — Sinal do primeiro erro.** Em t13 o observado foi 151 e a previsão registrada foi 149,784727. Calcule o erro como observado menos previsto.

**MAT-EST-048-EX-APR-04 — Erro absoluto.** Em t15, o erro assinado foi −0,124698. Qual foi o erro absoluto?

**MAT-EST-048-EX-APR-05 — Limiar estrito.** A regra define erro absoluto superior a quatro, não maior ou igual. Uma tarefa com erro exatamente quatro conta como alta?

**MAT-EST-048-EX-APR-06 — Janela incompleta.** Após apenas duas chegadas, pode-se ativar a regra que exige observar as últimas três tarefas maduras?

**MAT-EST-048-EX-APR-07 — Erro ou pendência.** O alvo t19 ainda não foi observado. Ele entra no cálculo do MAE com erro zero?

**MAT-EST-048-EX-APR-08 — Cópia da base.** Por que os doze trimestres herdados devem manter seus mesmos valores e hashes?

**MAT-EST-048-EX-APR-09 — Número de chegadas.** Quantas emissões completas, com observado já simulado, constam de t13 a t18?

**MAT-EST-048-EX-APR-10 — Natureza da evidência.** O arquivo com valores fictícios t13 a t18 equivale a seis trimestres coletados de uma operação real?

### 11.2 Consolidação

**MAT-EST-048-EX-CON-01 — MAE inicial.** Refaça o MAE de t13 a t15 a partir dos erros absolutos 1,215273, 1,584872 e 0,124698.

**MAT-EST-048-EX-CON-02 — MAE recente.** Calcule o MAE das chegadas t16, t17 e t18 usando a tabela de emissões.

**MAT-EST-048-EX-CON-03 — Média com sinal.** Calcule a média assinada dos erros de t16 a t18.

**MAT-EST-048-EX-CON-04 — RMSE recente.** Qual é a sequência de operações para obter o RMSE das três chegadas mais recentes? Mostre o valor.

**MAT-EST-048-EX-CON-05 — Primeiro gatilho.** Em qual chegada aparece o primeiro gatilho de revisão, e quantos erros acima de quatro há na janela?

**MAT-EST-048-EX-CON-06 — Gatilho seguinte.** Em t18, quantos dos últimos três erros absolutos superam quatro?

**MAT-EST-048-EX-CON-07 — Atualização de estado.** Se o modelo mantém alfa, beta-asterisco e gama, mas incorpora t13 para emitir t14, houve troca de versão ou atualização de estado?

**MAT-EST-048-EX-CON-08 — Chegada duplicada.** Uma rotina importa duas vezes a linha observada de t16. Que medida de qualidade é prioritária?

**MAT-EST-048-EX-CON-09 — Mudança de unidade.** O sistema começa a registrar algumas observações em milhares de unidades, enquanto a previsão permanece em unidades simples. É deriva estatística ou erro de integridade?

**MAT-EST-048-EX-CON-10 — Pendências h1/h2.** Na origem t18 são emitidas previsões h1=220,425 e h2=199,820. Quais alvos correspondem a cada uma e quantos erros avaliáveis existem nessas duas emissões?

### 11.3 Transferência e estilo vestibular — autorais

**MAT-EST-048-EX-VES-01 — Erro grande e causa.** Um portal afirma: “Os três últimos erros provam uma mudança permanente na realidade”. Analise a afirmação.

**MAT-EST-048-EX-VES-02 — Comparar meses distintos.** Por que comparar a média simples de t13–t15 com t16–t18 pode induzir interpretação errada mesmo se ambas forem numericamente corretas?

**MAT-EST-048-EX-VES-03 — Versão alterada.** Uma pessoa muda alfa após examinar as chegadas t16–t18 e relata o mesmo intervalo como teste imparcial do modelo novo. Qual é o problema?

**MAT-EST-048-EX-VES-04 — Critério escolhido depois.** Um limiar de erro é escolhido apenas após observar t18 para que produza exatamente dois alarmes. Ainda pode ser tratado como limiar pré-especificado?

**MAT-EST-048-EX-VES-05 — Alvo atrasado.** Há uma previsão para t20, mas o resultado chega dois meses após a data esperada. Descreva como a métrica e o registro devem responder.

**MAT-EST-048-EX-VES-06 — Cobertura nominal.** Uma faixa arbitrária acompanhou quatro de cinco resultados. Isso autoriza dizer “intervalo garantido de 80% para o futuro”?

**MAT-EST-048-EX-VES-07 — Desempenho vs entrada.** A base só contém o resultado Y por trimestre e a previsão; um relatório afirma mudança comprovada na distribuição de uma variável externa X. O que está errado?

**MAT-EST-048-EX-VES-08 — Comunicação com limite.** Redija uma frase que relate o gatilho em t17 sem vender o resultado como evidência de implantação.

**MAT-EST-048-EX-VES-09 — MAE e custo.** Um planejamento fictício penaliza a subprevisão mais do que a superprevisão. Por que MAE sozinho não resolve a decisão?

**MAT-EST-048-EX-VES-10 — Política responsável.** O alerta ocorre. Compare “substituir imediatamente a versão” e “preservar log, auditar entrada e propor teste separado”.

### 11.4 Reteste independente, para momento posterior

**MAT-EST-048-EX-RET-01 — Reteste cronológico.** Uma emissão para o alvo t21 feita na origem t19 tem qual horizonte? Pode conhecer t20 e t21 naquela emissão?

**MAT-EST-048-EX-RET-02 — Reteste janela móvel.** Uma janela de três erros absolutos é 3, 4,1 e 5,2; limiar alto significa > 4 e gatilho exige ao menos dois altos. O que ocorre?

**MAT-EST-048-EX-RET-03 — Reteste MAE.** Erros assinados de duas tarefas avaliáveis são −2 e +6. Calcule o MAE e a média assinada.

**MAT-EST-048-EX-RET-04 — Reteste atraso.** Foram emitidas dez previsões, mas somente sete observações chegaram. Quantas entram no denominador de um MAE, sem imputação e sem outras exclusões?

**MAT-EST-048-EX-RET-05 — Reteste reestimação.** O método troca beta-asterisco de 0,2 para 0,7 depois de examinar a janela de avaliação. Qual procedimento falta para alegar melhor desempenho externo?

**MAT-EST-048-EX-RET-06 — Reteste conclusão.** Um registro de previsão tem versionamento completo, mas foi criado depois da chegada observada. Pode ser contabilizado como previsão originalmente emitida?

## 12. Correção comentada, revisão e próximo passo

**Correção:** consultar as respostas e os raciocínios individualizados em `gabarito-comentado.json` somente depois da tentativa. Ao recuperar erros, exigir a identificação de origem, alvo, horizonte e disponibilidade do observado, além das operações matemáticas. Não atribuir desempenho fictício ao estudante porque o pacote foi produzido.

**Resumo pronunciável:** previsão é aquilo que foi emitido com informações até a origem; observado é o valor recebido depois para o alvo. O erro é observado menos previsto. Uma janela só pode ser avaliada quando possui os alvos exigidos. Um limiar documentado pode orientar investigação, mas não prova mudança de distribuição ou de relação entre variáveis. Uma versão nova deve ser testada em alvos que ainda não ajudaram a escolhê-la. Previsões sem chegada continuam pendentes.

**Revisão espaçada, a programar após estudo verdadeiro:** dia um, registrar exemplo de origem, alvo, emissão e chegada; dia sete, refazer o MAE e a janela móvel t15 a t17 sem gabarito; dia trinta, resolver o reteste e escrever um parecer de quatro parágrafos sobre evidência, qualidade de dados, alerta e próximos passos. A data de geração deste arquivo não inicia a contagem.

**Evidência futura de domínio:** uma resposta correta deve reconstruir uma previsão sem usar o próprio alvo, calcular sinais e métricas, aplicar o limiar estrito, classificar possíveis causas e elaborar um protocolo de revisão sem inventar causalidade. Se houver erro em módulo ou média, recuperar esse pré-requisito antes de avançar.

**Próximo tópico editorial:** MAT-EST-049 — Projeto integrado de monitoramento estatístico: comparação de versões, critérios de aceitação e relatório reproduzível.

**Limites de execução:** material apenas local; sem integração ao Google Drive, GitHub ou site; sem teste real de leitor de tela, Edge ou reprodução integral do vídeo. As avaliações MAT-EST-018, MAT-PRO-039, MAT-PRO-054 e MAT-EST-037 permanecem pendentes de tentativa real. Não alterar status individual por produção editorial.
