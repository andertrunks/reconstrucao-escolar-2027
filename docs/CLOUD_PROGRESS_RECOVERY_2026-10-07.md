# Recuperação do progresso em nuvem — 07/10/2026

## Estado observado

Após a primeira publicação do fluxo cloud-first, a tabela `public.reconstrucao_escolar_progress` recebeu um registro autenticado. A inspeção somente de metadados confirmou:

- 1 resposta sincronizada;
- ID presente: `DIA-001-P1`;
- cursor: `DIA-001-P2`;
- nenhum tópico ou Caderno de Erros sincronizado nesse registro naquele momento.

Esse estado não corresponde à verificação anterior de 37 de 37 respostas que havia sido observada em um navegador antes da migração.

## Busca por cópia recuperável

Foram verificadas as fontes disponíveis ao projeto:

- histórico das conversas e arquivos do projeto;
- exportações/backup JSON conhecidos;
- registro atual no Supabase;
- perfil persistente de navegador usado em automação de teste.

Não foi localizada uma exportação JSON das 37 respostas. O perfil persistente de navegador consultado mostrou 0 de 37 respostas. Portanto, nenhuma dessas fontes contém atualmente uma cópia restaurável das 37 respostas.

Isso não prova que o navegador original do usuário tenha perdido os dados: ele pode usar outro perfil/origem de armazenamento não acessível às ferramentas do projeto. Se esse navegador ainda exibir 37 de 37, deve-se exportar o backup antes de qualquer limpeza de dados.

## Fragilidade identificada

A implementação inicial removia `current`, `guest` e `user:<UUID>` do IndexedDB logo após um envio bem-sucedido ao Supabase. Embora a nuvem fosse a referência principal, essa política eliminava a camada local de recuperação cedo demais.

## Correção

A correção passa a adotar:

1. Supabase como fonte principal do progresso autenticado;
2. `user:<UUID>` como cópia offline/recuperação persistente por conta;
3. mesclagem conservadora entre estado remoto, cópia da conta e legado;
4. remoção apenas de `current` e `guest` depois que o estado mesclado foi salvo na nuvem e em `user:<UUID>`;
5. logout sem apagar `user:<UUID>`;
6. reconciliação automática da cópia local com a nuvem quando a conta voltar a ficar online.

A cópia offline não é carregada para outra conta nem exibida em modo visitante.

## Regra de continuidade

Não registrar as 37 respostas como recuperadas até existir evidência concreta: backup JSON, IndexedDB do navegador original ou registro completo no Supabase. O registro cloud atual de 1 resposta não deve ser promovido artificialmente para 37.

A produção editorial e o progresso pedagógico permanecem separados. Nenhum tópico deve ser marcado como consolidado em razão desta correção técnica.
