# MAT-EST-050 — Instruções de integração

1. Este ZIP contém somente um pacote editorial **local**. Não representa deploy, atualização de GitHub nem sincronização com Drive. Verifique o checkpoint canônico remoto antes da integração.
2. Não recomeçar o projeto ou sobrescrever MAT-EST-049. O arquivo `MAT-EST-050-robustez-temporal-cenarios-sensibilidade-custos-limites-generalizacao.md` contém a aula; a aplicação deve carregar Markdown, seis SVG em `assets/` e metadados sem aprisionar conteúdo ao componente visual.
3. `exercicios.json` tem 36 enunciados autorais. **Não** injetar `gabarito-comentado.json` no cliente/rota de exercícios antes da tentativa correspondente; revisar controle de acesso a respostas no site real. Reteste só em sessão posterior. Nenhum progresso é inferido pela publicação.
4. Os seis arquivos CSV herdados de MAT-EST-049 foram copiados exatamente byte a byte. Arquivos novos em `dados/` são análises derivadas. `cenarios-hipoteticos-t23-nao-observados.csv` não pode compor série observada. `projecoes-t23-sem-revelar-alvo.csv` é recálculo ilustrativo, não log autenticado de emissão.
5. Preservar `MAT-EST-049-PROT-v1` e limiar dez. Não promover `CHAL-SDELTA5-v1`: há apenas 5/8 pares e piora local de 19,2 em t19. A sensibilidade em r não muda o protocolo r=3.
6. SVG contêm `title` e `desc` e a aula oferece legenda, texto alternativo, observação e interpretação em áudio. Verificar localmente carregamento de imagens e leitura real no Edge, leitor de tela, navegação por teclado, zoom e contraste antes de publicar.
7. A prévia HTML é arquivo local. PNG `previa-local.png` é **composição ilustrativa**, não captura do navegador. A obra recomendada tem página e coleção de vídeos verificadas; reprodução direta no YouTube, legendas e duração exigem conferência antes de publicação.
8. `manifesto-sha256.txt` relaciona hashes de todos os arquivos, exceto ele próprio; conferir após descompactação. Testes numéricos em `relatorio-integridade.json`.
9. Próximo tópico editorial proposto é **MAT-EST-051**, sobre desenho de avaliação temporal futura. Não preencher valores de t23–t25 sem fonte e rito distintos da criação de cenários.
