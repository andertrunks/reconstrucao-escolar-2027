# Publicação

Aplicação estática, sem backend ou secrets de runtime. Build: npm run build; diretório dist.

Antes do push: typecheck, lint, testes unitários, validação editorial, build, testes de navegador com Edge e inspeção visual. Não declarar leitura por voz validada apenas por análise automática de acessibilidade.

Hospedagem escolhida: GitHub Pages. A ferramenta Vercel deploy_to_vercel retornou Tool not found, e não havia CLI Vercel configurada. GitHub já autenticado, publicação estática gratuita adequada. Base PAGES_BASE=/reconstrucao-escolar-2027/. Rotas por fragmento preservam navegação sem reescritas.

Workflow .github/workflows/pages.yml executa typecheck, lint, testes unitários, validação de conteúdo, build e testes de navegador antes de publicar main. Pull requests só validam. URL prevista até confirmação pelo serviço: https://andertrunks.github.io/reconstrucao-escolar-2027/.

Referência consultada: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.

Estado real de hospedagem, URLs, commit e pendências constam de PROJECT_STATUS.md. Depois do deploy, abrir URL publicada e repetir testes com TEST_URL.
