# Recuperação do progresso em nuvem — 07/10/2026

## Estado observado

Após a primeira publicação do fluxo cloud-first, a tabela `public.reconstrucao_escolar_progress` recebeu um registro autenticado. A primeira inspeção somente de metadados, às 18:03 UTC, confirmou:

- 1 resposta sincronizada;
- ID presente: `DIA-001-P1`;
- cursor: `DIA-001-P2`.

Uma verificação posterior, às 18:50 UTC, confirmou recuperação adicional real:

- 34 respostas não vazias sincronizadas;
- Língua Portuguesa: `DIA-001-P1` a `DIA-001-P13`;
- Matemática: `DIA-001-M1` a `DIA-001-M21`;
- cursor: `DIA-001-M21`.

Após o usuário concluir a ação de sincronização no navegador original, nova leitura direta do Supabase confirmou o estado final:

- 37 respostas não vazias;
- 0 respostas vazias;
- Língua Portuguesa: `DIA-001-P1` a `DIA-001-P13`;
- Matemática: `DIA-001-M1` a `DIA-001-M24`;
- cursor: `DIA-001-M24`;
- atualização cloud: 07/10/2026 às 19:02:33 UTC.

## Conclusão da migração

A migração do diagnóstico está concluída com evidência técnica de 37 de 37 respostas presentes na nuvem. O total foi confirmado pela enumeração das chaves do objeto `answers` e pela contagem de valores não vazios no Supabase.

A verificação intermediária de 34 respostas não representava perda definitiva; M22, M23 e M24 chegaram ao registro remoto após a sincronização final do navegador original.

## Fragilidade identificada e correção publicada

A implementação inicial removia `current`, `guest` e `user:<UUID>` do IndexedDB logo após um envio bem-sucedido ao Supabase. Embora a nuvem fosse a referência principal, essa política eliminava a camada local de recuperação cedo demais.

A correção publicada no commit `53753f071b6347bc6a30014b4e07374722f04356` passa a adotar:

1. Supabase como fonte principal do progresso autenticado;
2. `user:<UUID>` como cópia offline/recuperação persistente por conta;
3. mesclagem conservadora entre estado remoto, cópia da conta e legado;
4. toda gravação autenticada relê `current` e `guest` ainda existentes antes de permitir a remoção do legado;
5. remoção apenas de `current` e `guest` depois que o estado mesclado foi salvo na nuvem e em `user:<UUID>`;
6. logout sem apagar `user:<UUID>`;
7. reconciliação automática da cópia local com a nuvem quando a conta voltar a ficar online.

A cópia offline não é carregada para outra conta nem exibida em modo visitante.

## Regra de continuidade

O estado verificável do diagnóstico neste checkpoint é 37 respostas não vazias no Supabase. Esse total pode ser tratado como migrado e protegido na nuvem.

A produção editorial e o progresso pedagógico permanecem separados. Nenhum tópico deve ser marcado como consolidado apenas em razão desta migração técnica.
