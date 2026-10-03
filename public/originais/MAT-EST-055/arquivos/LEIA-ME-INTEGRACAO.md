# MAT-EST-055 — Instruções para integração posterior

Pacote editorial local da Reconstrução Escolar + ENEM e Vestibulares 2027. Não houve sincronização com Drive, GitHub ou publicação no site. NÃO modificar o histórico de progresso do aluno.

- Aula: `MAT-EST-055-governanca-modelos-temporais-documentacao-decisoes-responsaveis-revisoes-criterios-encerramento.md`; material educacional separado da interface.
- Questões autorais: `exercicios.md` e `exercicios.json`; gabaritos comentados separados (`gabarito-comentado.md` e `.json`). Os IDs permanentes seguem MAT-EST-055-EX-[APR/CON/VES/RET]-nn.
- Metadados e checkpoint com navegação MAT-EST-054 → MAT-EST-055 → MAT-EST-056.
- `assets/`: seis figuras SVG originais, cada qual com `<title>`, `<desc>` e legenda/comentário correspondente na aula.
- `previa-local.html`: aula completa renderizada localmente, texto semântico com CSS responsivo, sem aplicação/servidor; deve ser conferida no Edge com Ler em voz alta e teclado antes de eventual publicação.
- `previa-local.png`: composição editorial ilustrativa, NÃO captura do site.
- `dados/`, `auditoria/`, `relatorios/` e os dois arquivos JSON de protocolo/plano foram COPIADOS sem modificar os 23 arquivos herdados do pacote MAT-EST-054. Conferência dos bytes em `governanca/hashes-herdados.json`.
- `governanca/criterios-e-responsabilidades.json`, `responsabilidades.csv`, `parecer-didatico.json` e `trilha-exemplo.jsonl` são apenas documentos autorais didáticos, SEM assinatura humana ou atos de produção; G1–G5 indicam ordem lógica fictícia.
- `governanca/testar-pacote.py`: verificações locais; `auditoria/recalcular_relatorios.py --verify`: verifica relatórios herdados sem reescrever.
- `relatorio-integridade.json` e `manifesto-sha256.txt`: checksums calculados localmente.

Limites persistentes: só cinco de oito pares simulados, t19 deterioração local 19,2 > 10, C não elegível à promoção sob MAT-EST-049-PROT-v1. t23–t25 não observados, B23/C23 apenas recálculos. EXEMPLO-Z/V não pertencem à série principal. O vídeo foi encontrado via metadados de busca, mas não reproduzido integralmente; sua duração não foi confirmada. Sem teste manual do Edge ou leitores de tela.

Integração futura: conferir arquivos e IDs, renderizar e ouvir parte da aula no Edge, validar disponibilidade/reprodução do vídeo, executar testes, fazer revisão humana, publicar somente então e registrar URL e commit/deploy reais. Não converter status editorial em aprovação do aluno.
