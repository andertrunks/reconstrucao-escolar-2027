# Recuperação do progresso em nuvem — 07/10/2026

## Estado observado

Após a primeira publicação do fluxo cloud-first, a tabela `public.reconstrucao_escolar_progress` recebeu um registro autenticado. A primeira inspeção somente de metadados, às 18:03 UTC, confirmou:

- 1 resposta sincronizada;
- ID presente: `DIA-001-P1`;
- cursor: `DIA-001-P2`.

Uma verificação posterior do mesmo registro, às 18:50 UTC, confirmou recuperação adicional real:

- 34 respostas não vazias sincronizadas;
- Língua Portuguesa: `DIA-001-P1` a `DIA-001-P13`;
- Matemática: `DIA-001-M1` a `DIA-001-M21`;
- cursor: `DIA-001-M21`;
- `DIA-001-M22`, `DIA-001-M23` e `DIA-001-M24` não estavam presentes no estado cloud verificado.

## Correção da alegação anterior de 37/37

A afirmação anterior de que havia “37 de 37 respostas confirmadas no IndexedDB” não foi sustentada por uma leitura enumerada do armazenamento nem por uma automação que comprovasse esse total. O histórico mostra que esse número foi tratado como estado esperado/assumido, não como evidência técnica.

Portanto, este projeto não deve registrar M22, M23 e M24 como respostas perdidas. O que pode ser afirmado é apenas que, na verificação atual, existem 34 respostas reais e não vazias na nuvem e não há evidência concreta de que as três restantes tenham sido respondidas anteriormente.

## Busca por cópia adicional

Foram verificadas as fontes disponíveis ao projeto:

- histórico das conversas e arquivos do projeto;
- exportações/backup JSON conhecidos;
- registro no Supabase;
- perfil persistente de navegador usado em automação de teste.

Não foi localizada uma exportação JSON adicional. O perfil persistente de navegador consultado mostrou 0 de 37 respostas. Essa ausência não invalida as 34 respostas verificadas no Supabase e também não prova que outro navegador/perfil do usuário não possua dados adicionais.

## Fragilidade identificada

A implementação inicial removia `current`, `guest` e `user:<UUID>` do IndexedDB logo após um envio bem-sucedido ao Supabase. Embora a nuvem fosse a referência principal, essa política eliminava a camada local de recuperação cedo demais.

## Correção publicada

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

O estado verificável do diagnóstico neste checkpoint é 34 respostas não vazias no Supabase. Não promover artificialmente esse total para 37 e não classificar M22–M24 como perdidas sem evidência concreta.

A produção editorial e o progresso pedagógico permanecem separados. Nenhum tópico deve ser marcado como consolidado em razão desta correção técnica.
