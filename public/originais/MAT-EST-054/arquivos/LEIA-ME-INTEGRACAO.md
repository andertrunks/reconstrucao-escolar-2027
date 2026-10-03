# Integração MAT-EST-054 — instruções de preservação

Este ZIP é um pacote **editorial local**. Não está publicado ou sincronizado. Preservar IDs de aulas, questões, versões observadas, namespace e os dados herdados sem alterações. Não marcar progresso individual como consolidado ou estudado. Antes do deploy, conferir vídeo, reprodução, Microsoft Edge, foco de teclado, texto alternativo e fluxo do site.

Arquivos: aula Markdown em raiz; exercícios e gabaritos separados em MD e JSON; seis SVG com `<title>` e `<desc>` e legendas no Markdown; `dados/` contém cópias byte a byte dos 17 arquivos herdados da MAT-EST-053, mais protocolo e plano copiados sem alteração. `auditoria/recalcular_relatorios.py` usa apenas Python padrão e recalcula `relatorios/relatorio-auditoria.json` e `relatorios/conciliacao-de-versoes.csv`. `auditoria/testar_auditoria.py` testa os invariantes. `manifesto-sha256.txt` permite conferir cada byte listado. A prévia HTML é local e a PNG é ilustrativa, não captura de navegador.

Execute dentro de MAT-EST-054:

```bash
python auditoria/recalcular_relatorios.py --verify
python auditoria/testar_auditoria.py
sha256sum -c manifesto-sha256.txt
```

Não misturar exemplos Z/V com t18–t22. Protocolo histórico t19 permanece violado; t23–t25 estão pendentes. O relatório reproduz cálculos editoriais, não comprova emissões reais nem data/autoria de arquivos. O vídeo da ficha herdada segue pendente de confirmação integral e não deve ser tratado como validado para publicação.
