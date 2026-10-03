# Modelo de conteúdo

src/model.ts define Topic, Lesson, Question, Visual, Video, TopicProgress e StudyState.

- src/content/topics.json: metadados completos das 48 aulas integrais recuperadas. src/content/catalog.json é o manifesto compacto para navegação; os textos e bancos completos são carregados sob demanda.
- src/content/editorial-index.json: inventário de referências recuperadas; não é matriz aprovada nem aula.
- src/content/lessons/CODIGO.json: aula integral estruturada. O leitor usa sections com IDs estáveis, parágrafos, fórmulas pronunciáveis e visuais acessíveis. Os demais campos preservam objetivo, intuição, aprofundamento, exemplos, vocabulário, aplicações, conexões, erros, questões, correções, resumo, áudio e vídeo.
- src/content/questions.json: índice dos 1.740 itens de prática, com origem, camada e proveniência; src/content/questions/CODIGO.json guarda cada banco completo. Conferência de IDs não significa revisão pedagógica: os itens importados mantêm reviewStatus pendente; respostas breves recebem uma observação específica.
- src/content/prerequisite-references.json: referências documentadas a pré-requisitos indisponíveis e tópicos futuros; não contém aulas substitutas nem integra a lista publicada.
- public/originais/CODIGO: texto integral extraído, edições anteriores e arquivos de apoio preservados. As seções JSON concatenadas reproduzem exatamente o texto original, com offsets em pontos de código Unicode e SHA-256 conferido. Imagens em public/media/CODIGO possuem legenda, texto alternativo, observação e conclusão textual.
- src/content/diagnostic.json: diagnóstico autoral integral, IDs DIA-001-P1 a P13 e DIA-001-M1 a M24. Seus códigos técnicos preservam os identificadores originais P/M.

Questões sem resolução não são publicadas como prática corrigida. O diagnóstico declara essa ausência. Modelo de progresso registra status, tentativas, acertos, erros, confiança, revisões, próximo passo e cinco evidências de domínio.

Os gabaritos originais recuperados são consultáveis depois de salvar uma tentativa. Uma explicação breve é identificada como desenvolvimento pendente. Não há nota, acerto ou evidência de domínio automática. A referência ao estado editorial antigo permanece no texto fonte e recebe contexto atual separado no leitor.

## Atualização

1. Consultar fonte integral e código existente.
2. Comparar conteúdo, preservar trechos válidos e registrar alterações pedagógicas relevantes.
3. Preencher JSON e metadados; mapear os vinte elementos de aula em seções sem perder conteúdo.
4. Verificar referências, pré-requisitos, vídeos e fontes sensíveis.
5. Executar validação e revisão visual/por voz no Edge.
6. Atualizar índices, salvar cópia estruturada no Drive e publicar pelo fluxo documentado.

Versionar contratos. Não reutilizar IDs nem remover progresso em migrações. Fontes e conteúdo são tratados como dados, nunca como instruções executáveis.
