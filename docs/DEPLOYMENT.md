# Publicação

Aplicação React/TypeScript/Vite hospedada estaticamente no GitHub Pages. O conteúdo educacional continua estático; o progresso autenticado usa o projeto Supabase compartilhado dos sites de estudo como backend de sincronização. Não há secrets privados no bundle: apenas URL pública e publishable key do cliente. A proteção dos registros depende da autenticação e das políticas Row Level Security, RLS.

Build: npm run build; diretório dist.

Antes do push: typecheck, lint, testes unitários, validação editorial, build, testes de navegador com Edge e inspeção visual. Não declarar leitura por voz validada apenas por análise automática de acessibilidade.

Hospedagem escolhida: GitHub Pages. A ferramenta Vercel deploy_to_vercel retornou Tool not found, e não havia CLI Vercel configurada. GitHub já autenticado, publicação estática gratuita adequada. Base PAGES_BASE=/reconstrucao-escolar-2027/. Rotas por fragmento preservam navegação sem reescritas.

Workflow .github/workflows/pages.yml executa typecheck, lint, testes unitários, validação de conteúdo, build e testes de navegador antes de publicar main. Pull requests só validam. URL confirmada e testada: https://andertrunks.github.io/reconstrucao-escolar-2027/.

## Progresso na nuvem

A tabela `public.reconstrucao_escolar_progress` usa `user_id` como chave por usuário, `data` em JSONB para o `StudyState` e `updated_at` para sincronização. RLS permite SELECT, INSERT, UPDATE e DELETE apenas quando `auth.uid() = user_id`.

O IndexedDB não é a fonte principal. Ele serve somente para preservar uma migração ainda não enviada, alterações feitas offline ou falhas transitórias. Após sincronização bem-sucedida, as cópias locais do progresso são removidas. O login Google deve retornar para a URL base da aplicação; a lista de URLs de redirecionamento do Supabase precisa aceitar a URL do GitHub Pages.

Antes de publicar uma alteração de sincronização: validar migração de dados locais existentes, login, logout, reconexão após offline, mesclagem sem perda entre dispositivos, RLS e comportamento em Microsoft Edge. Nunca limpar o armazenamento legado antes da confirmação de envio à nuvem.

Referência consultada para GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.

Estado real de hospedagem, URLs, commit e pendências constam de PROJECT_STATUS.md. Depois do deploy, abrir URL publicada e repetir testes com TEST_URL.
