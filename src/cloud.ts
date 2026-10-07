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
interface TableBuilder{
 select(columns:string):SelectSingleBuilder;
 upsert(values:Record<string,unknown>):Promise<QueryResult<unknown>>;
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

export async function loadRemoteStudy(userId:string):Promise<StudyState|null>{
 const cloud=getCloudClient();
 if(!cloud)return null;
 const result=await cloud.from(TABLE).select('data,updated_at').eq('user_id',userId).maybeSingle();
 if(result.error)throw new Error(`Leitura do progresso na nuvem: ${result.error.message}`);
 if(!result.data)return null;
 const state=validateBackup(result.data.data);
 if(!state.updatedAt&&result.data.updated_at)state.updatedAt=result.data.updated_at;
 return state;
}

export async function saveRemoteStudy(userId:string,state:StudyState){
 const cloud=getCloudClient();
 if(!cloud)throw new Error('Sincronização em nuvem indisponível.');
 const result=await cloud.from(TABLE).upsert({user_id:userId,data:state,updated_at:new Date().toISOString()});
 if(result.error)throw new Error(`Sincronização do progresso: ${result.error.message}`);
}

export function cloudFallbackState(){return emptyState();}
