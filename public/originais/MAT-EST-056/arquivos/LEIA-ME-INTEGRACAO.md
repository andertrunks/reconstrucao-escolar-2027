# MAT-EST-056 — Instruções de integração

Pacote editorial local. A fonte para o conteúdo é `MAT-EST-056-revisao-controlada-experimentos-temporais-protocolo-sucessor-pre-registro-prevencao-contaminacao.md` e os dados ficam separados da interface. A visualização HTML é uma prévia técnica local com CSS e sem integração ao site. PNG é uma composição ilustrativa, não uma captura real.

1. Preservar os IDs existentes e os 23 arquivos base conferidos com SHA-256 em `governanca/hashes-herdados.json`. O pacote inclui ainda os registros da MAT-EST-055 em `historico/MAT-EST-055/` para contexto.
2. Integrar página e exercícios/gabarito em fluxos separados; nunca revelar resposta antes da tentativa. Todas as 36 questões são autorais.
3. O novo documento `protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json` é rascunho local, sem registro externo nem execução. Não sobrepor `protocolo-herdado-MAT-EST-049.json`.
4. Não alterar os dados t01–t22. t23–t25 não observados; t26–t33 só alvos futuros propostos. V e Z permanecem isolados.
5. Verificar todas as referências relativas, dimensões, contraste, foco de teclado e áudio de partes relevantes no Edge antes de publicar. Conferir reprodução integral e duração do vídeo OSF.
6. O manifesto registra SHA-256 dos arquivos, exceto o próprio manifesto e relatório de integridade para evitar dependência circular. Rodar `protocolo-sucessor/testar-pacote.py`.

**Não realizado:** publicação web, sincronização Google Drive, integração GitHub, teste manual Edge, pré-registro externo, emissão/observação futura, assinatura humana, reprodução integral do vídeo, alteração de progresso individual.
