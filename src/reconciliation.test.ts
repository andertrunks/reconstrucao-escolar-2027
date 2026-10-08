import {describe,it,expect} from 'vitest';
import {emptyState,emptyProgress,validateBackup} from './study';
import {mergeStudyStates} from './cloud';
import {recordStudyUpdate} from './reconciliation';

const t0='2026-10-08T01:00:00.000Z',t1='2026-10-08T02:00:00.000Z',t2='2026-10-08T03:00:00.000Z';
const base=()=>({...emptyState(),updatedAt:t0,answers:{Q:'original'},topics:{T:{...emptyProgress(),status:'aprendendo' as const}}});

describe('reconciliação por item e preservação do histórico',()=>{
 it('editar outra resposta não ressuscita a resposta antiga de um dispositivo',()=>{
  const original=base();
  const a=recordStudyUpdate(original,{...original,answers:{Q:'corrigida'}},t1);
  const b=recordStudyUpdate(original,{...original,answers:{...original.answers,OTHER:'nova'}},t2);
  const merged=mergeStudyStates(a,b);
  expect(merged.answers).toEqual({Q:'corrigida',OTHER:'nova'});
  expect(merged.history?.answers.Q.map(r=>r.value)).toEqual(['original','corrigida']);
 });
 it('resposta recente não sobrescreve revisão e contadores de um tópico alterado no outro dispositivo',()=>{
  const original=base();
  const topic={...original.topics.T,status:'revisar' as const,reviews:1,attempts:2,correct:1,incorrect:1,reviewDate:t2};
  const a=recordStudyUpdate(original,{...original,topics:{T:topic}},t1);
  const b=recordStudyUpdate(original,{...original,answers:{Q:'nova'}},t2);
  expect(mergeStudyStates(a,b).topics.T).toEqual(topic);
 });
 it('não transforma respostas em branco em perda de uma resposta válida',()=>{
  const original=base();
  const blank=recordStudyUpdate(original,{...original,answers:{Q:'   '}},t2);
  const merged=mergeStudyStates(original,blank);
  expect(merged.answers.Q).toBe('original');
  expect(merged.history?.answers.Q).toHaveLength(2);
 });
 it('preserva ambas as versões de um conflito legado sem fabricar tentativas ou domínio',()=>{
  const a=base(),b={...base(),updatedAt:t2,topics:{T:{...emptyProgress(),attempts:1}}};
  a.topics.T.attempts=4;
  const merged=mergeStudyStates(a,b);
  expect(merged.topics.T.attempts).toBe(1);
  expect(merged.history?.topics.T.map(r=>r.value.attempts)).toEqual([4,1]);
  expect(merged.topics.T.status).toBe('não iniciado');
 });
 it('deduplica versões em sincronizações repetidas e independe da ordem dos dispositivos',()=>{
  const original=base();
  const a=recordStudyUpdate(original,{...original,answers:{Q:'A'}},t1);
  const b=recordStudyUpdate(original,{...original,answers:{Q:'B'}},t1);
  const merged=mergeStudyStates(a,b);
  expect(mergeStudyStates(b,a)).toEqual(merged);
  expect(mergeStudyStates(merged,a)).toEqual(merged);
  expect(mergeStudyStates(merged,merged)).toEqual(merged);
  expect(merged.history?.answers.Q).toHaveLength(2);
 });
 it('três dispositivos convergem sem depender do agrupamento das sincronizações',()=>{
  const original=base();
  const a=recordStudyUpdate(original,{...original,answers:{Q:'A'}},t1);
  const b=recordStudyUpdate(original,{...original,answers:{Q:'B'}},t1);
  const c=recordStudyUpdate(original,{...original,answers:{Q:'C'}},t2);
  expect(mergeStudyStates(mergeStudyStates(a,b),c)).toEqual(mergeStudyStates(a,mergeStudyStates(b,c)));
 });
 it('mantém a revisão do caderno ao editar outra entidade e não duplica o erro',()=>{
  const error={id:'E',question:'Q',kind:'memória' as const,note:'rever',date:t0,resolved:false};
  const original={...base(),errors:[error]};
  const a=recordStudyUpdate(original,{...original,errors:[{...error,resolved:true}]},t1);
  const b=recordStudyUpdate(original,{...original,answers:{Q:'nova'}},t2);
  const merged=mergeStudyStates(a,b);
  expect(merged.errors).toEqual([{...error,resolved:true}]);
  expect(merged.history?.errors.E).toHaveLength(2);
 });
 it('não altera os snapshots de entrada nem cria progresso por sincronizar',()=>{
  const a=base(),b=base(),snapshot=structuredClone(a);
  const merged=mergeStudyStates(a,b);
  expect(a).toEqual(snapshot);expect(b).toEqual(snapshot);
  expect(merged.answers).toEqual(a.answers);expect(merged.topics).toEqual(a.topics);
 });
 it('preserva histórico e compatibilidade ao exportar/restaurar JSON',()=>{
  const original=base();
  const next=recordStudyUpdate(original,{...original,answers:{Q:'nova'}},t1);
  expect(validateBackup(JSON.parse(JSON.stringify(next)))).toEqual(next);
  expect(validateBackup(original)).toEqual(original);
 });
 it('recusa histórico malformado, datas inválidas e identidade de erro trocada',()=>{
  const original=base();
  expect(()=>validateBackup({...original,updatedAt:'inválido'})).toThrow();
  expect(()=>validateBackup({...original,history:{answers:{Q:[]},topics:{},errors:{}}})).toThrow();
  expect(()=>validateBackup({...original,history:{answers:{Q:[{at:t1,value:42}]},topics:{},errors:{}}})).toThrow();
  expect(()=>validateBackup({...original,history:{answers:{},topics:{},errors:{E:[{at:t1,value:{id:'OTHER'}}]}}})).toThrow();
 });
 it('compacta centenas de edições causais da mesma entidade sem crescer o histórico',()=>{
  let current=base();
  for(let i=0;i<500;i++)current=recordStudyUpdate(current,{...current,answers:{Q:`v${i}`}},new Date(Date.UTC(2026,9,8,4,0,0,i)).toISOString());
  expect(current.answers.Q).toBe('v499');
  expect(current.history?.answers.Q).toEqual([{at:'2026-10-08T04:00:00.499Z',value:'v499'}]);
 });
 it('compacta a cabeça causal mas mantém a versão concorrente não resolvida',()=>{
  const original=base();
  const a=recordStudyUpdate(original,{...original,answers:{Q:'A'}},t1);
  const b=recordStudyUpdate(original,{...original,answers:{Q:'B'}},t1);
  const merged=mergeStudyStates(a,b),active=merged.answers.Q,hidden=active==='A'?'B':'A';
  const resolved=recordStudyUpdate(merged,{...merged,answers:{Q:'resolvida'}},t2);
  const versions=resolved.history?.answers.Q.map(r=>r.value)??[];
  expect(versions).toContain(hidden);expect(versions).toContain('resolvida');expect(versions).not.toContain(active);
  expect(versions).toHaveLength(2);
 });
});
