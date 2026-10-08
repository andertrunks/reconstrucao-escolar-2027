import 'fake-indexeddb/auto';
import {openDB} from 'idb';
import {beforeEach,describe,expect,it,vi} from 'vitest';
import {emptyState} from './study';
import {recordStudyUpdate} from './reconciliation';
import type {StudyState} from './model';

const runtime=vi.hoisted(()=>({owner:'A' as string|null,sessionFailure:false,remoteFailure:false,remote:new Map<string,StudyState>(),writes:[] as string[],gate:null as Promise<void>|null}));
vi.mock('./cloud',async importOriginal=>{
 const actual=await importOriginal<typeof import('./cloud')>();
 return {...actual,getCloudClient:()=>({}),emitCloudStatus:vi.fn(),currentCloudSession:async()=>{
  if(runtime.sessionFailure)throw new Error('session unavailable');
  return runtime.owner?{user:{id:runtime.owner}}:null;
 },syncRemoteStudy:async(owner:string,state:StudyState)=>{
  runtime.writes.push(owner);
  await runtime.gate;
  if(runtime.remoteFailure)throw new Error('offline transport');
  const merged=actual.mergeStudyStates(runtime.remote.get(owner)??emptyState(),state);
  runtime.remote.set(owner,merged);return merged;
 }};
});
import {loadStudy,saveStudy,syncPendingCache} from './storage';
const database=openDB('reconstrucao-escolar',1);
const read=async(key:string)=>(await database).get('study',key);
const put=async(key:string,value:unknown)=>(await database).put('study',value,key);
const answer=(state:StudyState,id:string,value:string,at='2026-10-08T03:00:00.000Z')=>recordStudyUpdate(state,{...state,answers:{...state.answers,[id]:value}},at);
beforeEach(async()=>{
 await(await database).clear('study');runtime.owner='A';runtime.sessionFailure=false;runtime.remoteFailure=false;runtime.remote.clear();runtime.writes=[];runtime.gate=null;
 vi.stubGlobal('navigator',{onLine:true});
});

describe('cache transacional e isolamento de conta (IDB e transporte de teste)',()=>{
 it('duas gravações concorrentes preservam as respostas dos dois snapshots',async()=>{
  const initial=(await loadStudy()).state;
  await Promise.all([saveStudy(answer(initial,'Q1','um'),'A'),saveStudy(answer(initial,'Q2','dois'),'A')]);
  expect((await read('user:A')).answers).toEqual({Q1:'um',Q2:'dois'});
  expect(runtime.remote.get('A')?.answers).toEqual({Q1:'um',Q2:'dois'});
 });
 it('uma escrita local não espera a nuvem, e a resposta remota tardia não a apaga',async()=>{
  const initial=(await loadStudy()).state;
  let release!:()=>void;runtime.gate=new Promise<void>(resolve=>{release=resolve;});
  const first=saveStudy(answer(initial,'Q1','um'),'A');
  await vi.waitFor(()=>expect(runtime.writes.length).toBe(2));
  const second=saveStudy(answer(initial,'Q2','dois'),'A');
  await vi.waitFor(async()=>expect((await read('user:A')).answers.Q2).toBe('dois'));
  release();await Promise.all([first,second]);
  expect((await read('user:A')).answers).toEqual({Q1:'um',Q2:'dois'});
  expect(runtime.remote.get('A')?.answers).toEqual({Q1:'um',Q2:'dois'});
 });
 it('snapshot da conta A nunca é reatribuído a B após troca de sessão',async()=>{
  const initial=(await loadStudy()).state;
  runtime.owner='B';const other=await loadStudy();runtime.writes=[];
  await saveStudy(answer(initial,'PRIVATE','somente A'),'A');
  expect(runtime.writes).toEqual([]);
  expect((await read('user:A')).answers.PRIVATE).toBe('somente A');
  expect((await read('user:B')).answers).toEqual({});expect(other.owner).toBe('B');
 });
 it('falha de auth preserva a conta original e não converte seus dados em guest',async()=>{
  const initial=(await loadStudy()).state;
  runtime.sessionFailure=true;await saveStudy(answer(initial,'PRIVATE','A'),'A');
  expect((await read('user:A')).answers.PRIVATE).toBe('A');
  expect(await read('guest')).toBeUndefined();expect(await read('guest-after-migration')).toBeUndefined();
  await expect(loadStudy()).rejects.toThrow('session unavailable');
 });
 it('migração com falha remota conserva originais e reserva o legado para a conta A',async()=>{
  const legacy=answer(emptyState(),'LEGACY','preservar');await put('current',legacy);
  runtime.remoteFailure=true;const first=await loadStudy();
  expect(first.state.answers.LEGACY).toBe('preservar');expect(await read('current')).toEqual(legacy);
  runtime.owner='B';expect((await loadStudy()).state.answers).toEqual({});
  runtime.owner=null;expect((await loadStudy()).state.answers).toEqual({});
  expect(await read('current')).toEqual(legacy);
 });
 it('progresso guest anterior ao primeiro login é reconciliado sem apagar a fonte',async()=>{
  runtime.owner=null;const guest=await loadStudy();
  await saveStudy(answer(guest.state,'GUEST','resposta'),null);
  runtime.owner='A';const loaded=await loadStudy();
  expect(loaded.state.answers.GUEST).toBe('resposta');expect(runtime.remote.get('A')?.answers.GUEST).toBe('resposta');
  expect((await read('guest')).answers.GUEST).toBe('resposta');
 });
 it('reconecta após edições offline sem duplicar versões',async()=>{
  const initial=(await loadStudy()).state;runtime.writes=[];
  vi.stubGlobal('navigator',{onLine:false});await saveStudy(answer(initial,'OFFLINE','resposta'),'A');
  expect(runtime.writes).toEqual([]);expect(await syncPendingCache()).toBeNull();
  vi.stubGlobal('navigator',{onLine:true});const first=await syncPendingCache();const second=await syncPendingCache();
  expect(first?.state.answers.OFFLINE).toBe('resposta');expect(second?.state).toEqual(first?.state);
  expect(runtime.remote.get('A')?.answers.OFFLINE).toBe('resposta');
 });
 it('não reivindica nem substitui legado inválido',async()=>{
  const broken={version:1,answers:{Q:42}};await put('current',broken);
  await expect(loadStudy()).rejects.toThrow();
  expect(await read('current')).toEqual(broken);expect(await read('legacy-owner')).toBeUndefined();expect(runtime.writes).toEqual([]);
 });
});
