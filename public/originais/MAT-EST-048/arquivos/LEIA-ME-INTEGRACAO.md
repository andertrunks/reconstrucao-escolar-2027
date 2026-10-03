# Integração editorial — MAT-EST-048

O arquivo principal é `MAT-EST-048-monitoramento-prospectivo-series-temporais-registro-previsoes-deriva-dados-protocolos-revisao-modelos.md`. Seu índice editorial e dependências estão em `metadados.json`. Visuais originais são SVG com texto alternativo/legendas na aula. A página `previa-local.html` é somente demonstração estática; a imagem `previa-local.png` é uma composição ilustrativa da primeira dobra, não captura do navegador. Abra o HTML localmente no Edge; não confundir com publicação. Os dados históricos preservam os mesmos doze valores da aula anterior, sem alegar identidade de bytes com arquivo-fonte não disponível.

1. Ler `checkpoint-editorial.json` e verificar que não houve versão publicada mais nova antes da integração. Manter MAT-EST-047 intacta.
2. Importar Markdown e os cinco SVG, mantendo caminhos relativos, IDs e texto alternativo; usar `metadados.json` para construir rota e navegação anterior/próxima. Não embutir conteúdo diretamente nos componentes.
3. Importar `exercicios.json` sem resposta visível e guardar `gabarito-comentado.json`/`.md` em rota/estado inacessível antes da tentativa. Reteste independente permanece bloqueado até a etapa adequada. Não computar conclusão por leitura.
4. Validar parse dos JSON, unicidade dos 36 IDs e integridade SHA-256 pelo `manifesto-sha256.txt`. Os arquivos `dados` são fictícios e registram ordem lógica, não timestamps criptograficamente atestados.
5. Testar no Microsoft Edge a leitura em voz alta, zoom, modo leitura quando compatível, navegação por teclado, foco, modo escuro, render de equações e legendas. Verificar vídeo e duração/possibilidade de reprodução antes de publicação.
6. Publicação GitHub/deploy e sincronização com Drive somente com execução verificável; não realizadas por esta entrega. Progresso individual não foi alterado.

Próximo código proposto: `MAT-EST-049`, não iniciar nem sobrescrever até novo comando de continuidade.
