import {describe,it,expect} from 'vitest';
import {emptyGuided,finishGuided,nextGuided,mergeGuided,validGuided} from './guided';
const topics=[
 {id:'A',title:'Base A',subject:'MAT',prerequisites:[],questions:5},
 {id:'B',title:'Base B',subject:'POR',prerequisites:[],questions:5},
 {id:'C',title:'Avançado',subject:'MAT',prerequisites:['A'],questions:5},
];
const day=new Date('2026-10-17T12:00:00Z');
describe('estudo organizado preserva a aprendizagem',()=>{
 it('retoma a atividade e exige pré-requisitos',()=>{
  const s=emptyGuided();expect(nextGuided(topics,s,[],day)?.topicIds).toEqual(['A']);
  const active={id:'questões:B',kind:'questões' as const,title:'Teste',topicIds:['B']};
  expect(nextGuided(topics,{...s,active},[],day)).toEqual(active);
 });
 it('aplica questões após a aula e depois alterna a matéria',()=>{
  let s=emptyGuided();s=finishGuided(s,nextGuided(topics,s,[],day)!,day);
  expect(nextGuided(topics,s,[],day)?.kind).toBe('questões');
  s=finishGuided(s,nextGuided(topics,s,[],day)!,day);
  expect(nextGuided(topics,s,[],day)?.topicIds).toEqual(['B']);
 });
 it('agenda revisão real em 1, 7 e 21 dias, sem baixar as futuras',()=>{
  const s=finishGuided(emptyGuided(),{id:'aula:A',kind:'aula',topicIds:['A'],title:'A'},day);
  expect(nextGuided(topics,s,[],new Date('2026-10-18T13:00:00Z'))?.id).toBe('revisão:A:1');
  const next=finishGuided(s,nextGuided(topics,s,[],new Date('2026-10-18T13:00:00Z'))!,new Date('2026-10-18T13:00:00Z'));
  expect(nextGuided(topics,next,[],new Date('2026-10-24T13:00:00Z'))?.id).toBe('revisão:A:7');
  expect(next.completed['revisão:A:21']).toBeUndefined();
 });
 it('recupera dificuldade e prepara simulado somente com conteúdo praticado',()=>{
  const s=emptyGuided();for(const t of topics){s.completed[`aula:${t.id}`]=day.toISOString();s.completed[`questões:${t.id}`]=day.toISOString();}
  expect(nextGuided(topics,s,[],day)?.kind).toBe('simulado');
  s.checked['questões:A']=false;expect(nextGuided(topics,s,[],day)?.id).toBe('revisão:erro:questões:A');
 });
 it('mescla respostas e conclusões entre dispositivos e remove retomada já concluída',()=>{
  const a=emptyGuided(),b=emptyGuided();a.updatedAt='2026-10-17T10:00:00Z';b.updatedAt='2026-10-17T11:00:00Z';
  a.completed['aula:A']=a.updatedAt;a.drafts.sim={q1:'A'};b.drafts.sim={q2:'B'};
  b.active={id:'aula:A',kind:'aula',title:'A',topicIds:['A']};
  const merged=mergeGuided(a,b)!;
  expect(merged.drafts.sim).toEqual({q1:'A',q2:'B'});expect(merged.active).toBeUndefined();expect(validGuided(merged)).toBe(true);
  expect(validGuided({...merged,drafts:{sim:{q1:3}}})).toBe(false);
 });
 it('erros de simulado geram um reforço por assunto sem duplicar revisão do bloco',()=>{
  let s={...emptyGuided(),recovery:{'simulado:1':['A']},checked:{'simulado:1':false}};
  s.completed['simulado:1']=day.toISOString();
  expect(nextGuided(topics,s,[],day)?.id).toBe('revisão:recuperação:simulado:1:A');
  s=finishGuided(s,nextGuided(topics,s,[],day)!,day) as typeof s;
  expect(nextGuided(topics,s,[],day)?.kind).toBe('aula');
 });
});
