import {describe,expect,it} from 'vitest';
import {mergeStudyStates,syncRemoteStudy,type CloudClient} from './cloud';
import {emptyState} from './study';

function state(updatedAt:string,answers:Record<string,string>){return {...emptyState(),answers,updatedAt};}

describe('mergeStudyStates',()=>{
 it('preserva respostas dos dois dispositivos e prefere o estado mais recente em conflitos',()=>{
  const older=state('2026-10-07T10:00:00.000Z',{A:'1',B:'antiga'});
  const newer=state('2026-10-07T11:00:00.000Z',{B:'nova',C:'3'});
  const merged=mergeStudyStates(older,newer);
  expect(merged.answers).toEqual({A:'1',B:'nova',C:'3'});
  expect(merged.updatedAt).toBe('2026-10-07T11:00:00.000Z');
 });

 it('não deixa um estado vazio recém-criado apagar progresso real',()=>{
  const real=state('2026-10-06T10:00:00.000Z',{A:'respondida'});
  const empty=state('2026-10-07T12:00:00.000Z',{});
  expect(mergeStudyStates(real,empty).answers).toEqual({A:'respondida'});
 });
});

describe('sincronização otimista (transporte simulado, não valida nuvem real)',()=>{
 function remoteFixture(initial:ReturnType<typeof emptyState>|null,conflict:'update'|'insert'|'always'|null=null){
  let remote=initial?{data:structuredClone(initial),updated_at:'2026-10-07T12:00:00.000Z'}:null;
  let writes=0;
  const client:Pick<CloudClient,'from'>={from:()=>({
   select:()=>({eq:()=>({maybeSingle:async()=>({data:structuredClone(remote),error:null})})}),
   insert:async row=>{
    writes++;
    if(conflict==='insert'&&writes===1){
     remote={data:state('2026-10-07T12:01:00.000Z',{REMOTE:'outra sessão'}),updated_at:'2026-10-07T12:01:00.000Z'};
     return {data:null,error:{code:'23505',message:'duplicate'}};
    }
    remote={data:structuredClone(row.data) as ReturnType<typeof emptyState>,updated_at:String(row.updated_at)};
    return {data:null,error:null};
   },
   update:row=>{
    const filters:Record<string,string>={};
    const builder={
     eq:(column:string,value:string)=>{filters[column]=value;return builder;},
     select:async()=>{
      writes++;
      if(conflict==='always')return {data:[],error:null};
      if(conflict==='update'&&writes===1){
       remote={data:state('2026-10-07T12:01:00.000Z',{...remote?.data.answers,REMOTE:'outra sessão'}),updated_at:'2026-10-07T12:01:00.000Z'};
      }
      if(filters.user_id!=='test-user'||filters.updated_at!==remote?.updated_at)return {data:[],error:null};
      remote={data:structuredClone(row.data) as ReturnType<typeof emptyState>,updated_at:String(row.updated_at)};
      return {data:[{user_id:'test-user'}],error:null};
     },
    };
    return builder;
   },
  })};
  return {client,read:()=>remote,writes:()=>writes};
 }
 it('refaz leitura após conflito e conserva alterações das duas sessões',async()=>{
  const local=state('2026-10-07T12:02:00.000Z',{LOCAL:'minha resposta'});
  const fixture=remoteFixture(state('2026-10-07T12:00:00.000Z',{BASE:'original'}),'update');
  const result=await syncRemoteStudy('test-user',local,fixture.client);
  expect(fixture.writes()).toBe(2);
  expect(result.answers).toEqual({BASE:'original',REMOTE:'outra sessão',LOCAL:'minha resposta'});
  expect(fixture.read()?.data).toEqual(result);
  expect(local.answers).toEqual({LOCAL:'minha resposta'});
 });
 it('reconcilia a criação simultânea sem upsert destrutivo',async()=>{
  const fixture=remoteFixture(null,'insert');
  const result=await syncRemoteStudy('test-user',state('2026-10-07T12:02:00.000Z',{LOCAL:'resposta'}),fixture.client);
  expect(fixture.writes()).toBe(2);
  expect(result.answers).toEqual({REMOTE:'outra sessão',LOCAL:'resposta'});
 });
 it('limita disputas persistentes e mantém o snapshot original intacto',async()=>{
  const fixture=remoteFixture(emptyState(),'always');
  const local=state('2026-10-07T12:02:00.000Z',{LOCAL:'resposta'});
  await expect(syncRemoteStudy('test-user',local,fixture.client)).rejects.toThrow('Sincronização pendente');
  expect(fixture.writes()).toBe(5);
  expect(local.answers).toEqual({LOCAL:'resposta'});
 });
 it('recusa dados remotos inválidos sem tentar sobrescrevê-los',async()=>{
  const fixture=remoteFixture({...emptyState(),answers:{Q:42}} as unknown as ReturnType<typeof emptyState>);
  await expect(syncRemoteStudy('test-user',emptyState(),fixture.client)).rejects.toThrow();
  expect(fixture.writes()).toBe(0);
 });
 it('nuvem vazia recebe o conteúdo local sem alterar seus IDs',async()=>{
  const fixture=remoteFixture(null);
  const local=state('2026-10-07T12:02:00.000Z',{Q:'resposta'});
  expect(await syncRemoteStudy('test-user',local,fixture.client)).toEqual(local);
  expect(fixture.writes()).toBe(1);
 });
});
