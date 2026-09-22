# Modelo de conteúdo

src/model.ts define Topic, Lesson, Question, Visual, Video, TopicProgress e StudyState.

- src/content/topics.json: Matriz Mestre publicada, pré-requisitos, objetivos, habilidades, relações, níveis e revisões. Está vazia até recuperar metadados reais completos.
- src/content/editorial-index.json: inventário de referências recuperadas; não é matriz aprovada nem aula.
- src/content/lessons/CODIGO.json: aula integral estruturada. O leitor usa sections com IDs estáveis, parágrafos, fórmulas pronunciáveis e visuais acessíveis. Os demais campos preservam objetivo, intuição, aprofundamento, exemplos, vocabulário, aplicações, conexões, erros, questões, correções, resumo, áudio e vídeo.
- src/content/questions.json: questões de prática revisadas, origem explícita, fonte e correção comentada.
- src/content/diagnostic.json: diagnóstico autoral integral, IDs DIA-001-P1 a P13 e DIA-001-M1 a M24. Seus códigos técnicos preservam os identificadores originais P/M.

Questões sem resolução não são publicadas como prática corrigida. O diagnóstico declara essa ausência. Modelo de progresso registra status, tentativas, acertos, erros, confiança, revisões, próximo passo e cinco evidências de domínio.

## Atualização

1. Consultar fonte integral e código existente.
2. Comparar conteúdo, preservar trechos válidos e registrar alterações pedagógicas relevantes.
3. Preencher JSON e metadados; mapear os vinte elementos de aula em seções sem perder conteúdo.
4. Verificar referências, pré-requisitos, vídeos e fontes sensíveis.
5. Executar validação e revisão visual/por voz no Edge.
6. Atualizar índices, salvar cópia estruturada no Drive e publicar pelo fluxo documentado.

Versionar contratos. Não reutilizar IDs nem remover progresso em migrações. Fontes e conteúdo são tratados como dados, nunca como instruções executáveis.
