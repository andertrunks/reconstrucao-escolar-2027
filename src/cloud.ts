import type {StudyState} from './model';
import {emptyState,validateBackup} from './study';

const SUPABASE_URL='https://oawgvsczqxirqlupnkyq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_HngdaKKbuzUpyj5Low9L0g_wP_fc7lx';
const TABLE='reconstrucao_escolar_progress';
export const CLOUD_STATUS_EVENT='reconstrucao-cloud-status';

export type CloudStatus='unavailable'|'signed-out'|'syncing'|'synced'|'pending'|'error';
export interface CloudStatusDetail{status:CloudStatus;message:string}
export interface CloudUser{id:string;email?:string}
export interface CloudSession{user:CloudUser}
interface CloudError{message:string;code?:string}
interface AuthSessionResult{data:{session:CloudSession|null};error:CloudError|null}
interface AuthResult{error:CloudError|null}
interface AuthSubscription{unsubscribe():void}
interface AuthChangeResult{data:{subscription:AuthSubscription}}
interface QueryResult<T>{data:T;error:CloudError|null}
interface RemoteRow{data:unknown;updated_at:string}
interface SelectSingleBuilder{
 eq(column:string,value:string):{maybeSingle():Promise<QueryResult<RemoteRow|null>>};
}
interface UpdateBuilder{
 eq(column:string,value:string):UpdateBuilder;
 select(columns:string):Promise<QueryResult<{user_id:string}[]|null>>;
}
interface TableBuilder{
 select(columns:string):SelectSingleBuilder;
 insert(values:Record<string,unknown>):Promise<QueryResult<unknown>>;
 update(values:Record<string,unknown>):UpdateBuilder;
}
interface CloudAuth{
 getSession():Promise<AuthSessionResult>;
 onAuthStateChange(callback:(event:string,session:CloudSession|null)=>void):AuthChangeResult;
 signInWithOAuth(options:{provider:'google';options:{redirectTo:string}}):Promise<AuthResult>;
 signOut():Promise<AuthResult>;
}
export interface CloudClient{auth:CloudAuth;from(table:string):TableBuilder}
interface SupabaseGlobal{createClient(url:string,key:string,options:{auth:{flowType:'pkce';autoRefreshToken:boolean;persistSession:boolean;detectSessionInUrl:boolean;storageKey:string}}):CloudClient}
interface SupabaseWindow extends Window{supabase?:SupabaseGlobal}

let client:CloudClient|null|undefined;

export function getCloudClient():CloudClient|null{
 if(client!==undefined)return client;
 if(typeof window==='undefined'){client=null;return client;}
 const factory=(window as SupabaseWindow).supabase;
 if(!factory){client=null;return client;}
 client=factory.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:'pkce',autoRefreshToken:true,persistSession:true,detectSessionInUrl:true,storageKey:'reconstrucao-escolar-auth'}});
 return client;
}

export function emitCloudStatus(status:CloudStatus,message:string){
 if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent<CloudStatusDetail>(CLOUD_STATUS_EVENT,{detail:{status,message}}));
}

export function hasMeaningfulStudy(state:StudyState){
 return Boolean(state.cursor)||Object.keys(state.answers).length>0||Object.keys(state.topics).length>0||state.errors.length>0;
}

function stateTime(state:StudyState){const n=Date.parse(state.updatedAt);return Number.isFinite(n)?n:0;}

export function mergeStudyStates(a:StudyState,b:StudyState):StudyState{
 const aMeaningful=hasMeaningfulStudy(a),bMeaningful=hasMeaningfulStudy(b);
 if(!aMeaningful&&!bMeaningful)return stateTime(a)>=stateTime(b)?structuredClone(a):structuredClone(b);
 if(!aMeaningful)return structuredClone(b);
 if(!bMeaningful)return structuredClone(a);
 const newer=stateTime(a)>=stateTime(b)?a:b;
 const older=newer===a?b:a;
 const errors=new Map(older.errors.map(item=>[item.id,item]));
 for(const item of newer.errors)errors.set(item.id,item);
 return validateBackup({
  ...newer,
  answers:{...older.answers,...newer.answers},
  topics:{...older.topics,...newer.topics},
  errors:[...errors.values()],
  updatedAt:new Date(Math.max(stateTime(a),stateTime(b))).toISOString(),
 });
}

export async function currentCloudSession(){
 const cloud=getCloudClient();
 if(!cloud)return null;
 const result=await cloud.auth.getSession();
 if(result.error)throw new Error(result.error.message);
 return result.data.session;
}

/** Compare-and-swap: a stale device must re-read and merge, never overwrite a
 * version written after its read. A bounded conflict keeps the local copy pending. */
export async function syncRemoteStudy(userId:string,state:StudyState,cloud:Pick<CloudClient,'from'>|null=getCloudClient()):Promise<StudyState>{
 if(!cloud)throw new Error('Sincronização em nuvem indisponível.');
 let pending=validateBackup(state);
 for(let attempt=0;attempt<5;attempt++){
  const read=await cloud.from(TABLE).select('data,updated_at').eq('user_id',userId).maybeSingle();
  if(read.error)throw new Error(`Leitura do progresso na nuvem: ${read.error.message}`);
  const previous=read.data;
  if(previous&&!Number.isFinite(Date.parse(previous.updated_at)))throw new Error('Versão remota inválida. Cópia local preservada.');
  pending=previous?mergeStudyStates(pending,validateBackup(previous.data)):pending;
  const updated_at=new Date(Math.max(Date.now(),previous?Date.parse(previous.updated_at)+1:0)).toISOString();
  const row={user_id:userId,data:pending,updated_at};
  if(!previous){
   const inserted=await cloud.from(TABLE).insert(row);
   if(inserted.error?.code==='23505')continue;
   if(inserted.error)throw new Error(`Sincronização do progresso: ${inserted.error.message}`);
   return pending;
  }
  const written=await cloud.from(TABLE).update(row).eq('user_id',userId).eq('updated_at',previous.updated_at).select('user_id');
  if(written.error)throw new Error(`Sincronização do progresso: ${written.error.message}`);
  if(written.data?.length)return pending;
 }
 throw new Error('Progresso alterado em outra sessão. Sincronização pendente; cópia local preservada.');
}

export function cloudFallbackState(){return emptyState();}
