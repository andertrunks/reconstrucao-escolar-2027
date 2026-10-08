import {openDB} from 'idb';
import type {StudyState} from './model';
import {emptyState,validateBackup} from './study';
import {currentCloudSession,emitCloudStatus,getCloudClient,mergeStudyStates,syncRemoteStudy} from './cloud';

const db=openDB('reconstrucao-escolar',1,{upgrade(database){database.createObjectStore('study');}});
const CLAIM='legacy-owner';
const keyFor=(owner:string|null)=>owner===null?'guest-after-migration':`user:${owner}`;
const RETRY_DELAYS=[250,750] as const;
export interface LoadedStudy{state:StudyState;owner:string|null}

async function account():Promise<string|null>{
 if(!getCloudClient())return null;
 // A failed session lookup is not proof that the user signed out.
 return (await currentCloudSession())?.user.id??null;
}

/** One IDB transaction reconciles and writes the cache across tabs. No network
 * request runs inside the transaction; offline edits do not wait for cloud sync. */
async function localSnapshot(owner:string|null,incoming?:StudyState):Promise<StudyState>{
 const database=await db;
 const tx=database.transaction('study','readwrite');
 const store=tx.objectStore('study');
 try{
  let claim=await store.get(CLAIM) as string|undefined;
  const key=owner===null&&claim===undefined?'guest':keyFor(owner);
  const cached=await store.get(key) as unknown;
  let result=cached?validateBackup(cached):emptyState();
  if(incoming)result=mergeStudyStates(result,validateBackup(incoming));
  // Preserve legacy originals. Once claimed they cannot be imported by another
  // account or displayed while signed out, even if the first upload fails.
  if(claim===undefined||claim===owner){
   for(const legacyKey of ['current','guest']){
    const legacy=await store.get(legacyKey);
    if(legacy)result=mergeStudyStates(result,validateBackup(legacy));
   }
   if(owner!==null&&claim===undefined){claim=owner;await store.put(claim,CLAIM);}
  }
  await store.put(result,key);
  await tx.done;
  return result;
 }catch(error){tx.abort();await tx.done.catch(()=>{});throw error;}
}

function transientSyncError(error:unknown){
 if(error instanceof TypeError)return true;
 const message=error instanceof Error?error.message:String(error);
 return /failed to fetch|network|timeout|timed out|temporar|connection|conex[aã]o|socket|gateway|\b429\b|\b502\b|\b503\b|\b504\b|offline transport/i.test(message);
}
const wait=(ms:number)=>new Promise<void>(resolve=>setTimeout(resolve,ms));
async function syncRemoteWithRetry(owner:string,pending:StudyState):Promise<StudyState>{
 for(let attempt=0;attempt<=RETRY_DELAYS.length;attempt++){
  if(typeof navigator!=='undefined'&&!navigator.onLine){
   emitCloudStatus('pending','Offline — alterações serão sincronizadas posteriormente.');return pending;
  }
  // Re-check identity before every retry. A transient transport failure must not
  // turn an old account snapshot into a write for whoever signs in next.
  if(await account()!==owner)return pending;
  try{return await syncRemoteStudy(owner,pending);}
  catch(error){
   if(!transientSyncError(error)||attempt===RETRY_DELAYS.length)throw error;
   emitCloudStatus('pending',`Falha temporária na sincronização. Nova tentativa ${attempt+2} de ${RETRY_DELAYS.length+1}.`);
   await wait(RETRY_DELAYS[attempt]);
  }
 }
 return pending;
}

const remoteQueues=new Map<string,Promise<StudyState>>();
async function syncOwner(owner:string):Promise<StudyState>{
 const previous=remoteQueues.get(owner);
 const operation=(previous??Promise.resolve()).catch(()=>{}).then(async()=>{
  const pending=await localSnapshot(owner);
  if(typeof navigator!=='undefined'&&!navigator.onLine){
   emitCloudStatus('pending','Offline — alterações serão sincronizadas posteriormente.');return pending;
  }
  // The snapshot remains attached to its original owner. A changed or uncertain
  // account must never turn it into guest progress or another user's upload.
  if(await account()!==owner)return pending;
  emitCloudStatus('syncing','Sincronizando seu progresso…');
  const merged=await syncRemoteWithRetry(owner,pending);
  const latest=await localSnapshot(owner,merged);
  if(await account()===owner){
   const newerEdits=JSON.stringify(latest)!==JSON.stringify(merged);
   emitCloudStatus(newerEdits?'pending':'synced',newerEdits?'Sincronização pendente':'☁ Sincronizado');
  }
  return latest;
 });
 remoteQueues.set(owner,operation);
 try{return await operation;}finally{if(remoteQueues.get(owner)===operation)remoteQueues.delete(owner);}
}

export async function loadStudy():Promise<LoadedStudy>{
 const owner=await account();
 const local=await localSnapshot(owner);
 if(owner===null){emitCloudStatus('signed-out','Entre com Google para sincronizar seu progresso entre dispositivos.');return {state:local,owner};}
 try{return {state:await syncOwner(owner),owner};}
 catch{emitCloudStatus('pending','Sincronização pendente; cópia local preservada.');return {state:await localSnapshot(owner),owner};}
}

export async function saveStudy(state:StudyState,owner:string|null):Promise<StudyState>{
 const local=await localSnapshot(owner,state);
 if(owner===null){emitCloudStatus('signed-out','Progresso preservado neste dispositivo. Entre com Google para sincronizar.');return local;}
 try{return await syncOwner(owner);}
 catch{emitCloudStatus('pending','Sincronização pendente; cópia local preservada.');return local;}
}

export async function syncPendingCache():Promise<LoadedStudy|null>{
 if(typeof navigator!=='undefined'&&!navigator.onLine)return null;
 return loadStudy();
}
