import {openDB} from 'idb';
import type {StudyState} from './model';
import {emptyState,validateBackup} from './study';
import {currentCloudSession,emitCloudStatus,getCloudClient,loadRemoteStudy,mergeStudyStates,saveRemoteStudy} from './cloud';

const db=openDB('reconstrucao-escolar',1,{upgrade(database){database.createObjectStore('study');}});
const LEGACY_KEY='current';
const GUEST_KEY='guest';
const userKey=(userId:string)=>`user:${userId}`;

async function readStudy(key:string):Promise<StudyState|null>{
 const value=await(await db).get('study',key);
 return value?validateBackup(value):null;
}
async function writeStudy(key:string,state:StudyState){await(await db).put('study',state,key);}
async function removeStudy(key:string){await(await db).delete('study',key);}

async function loadGuestOrLegacy(){
 const guest=await readStudy(GUEST_KEY);
 const legacy=await readStudy(LEGACY_KEY);
 if(guest&&legacy)return mergeStudyStates(guest,legacy);
 return guest??legacy??emptyState();
}

export async function loadStudy():Promise<StudyState>{
 const cloud=getCloudClient();
 if(!cloud){emitCloudStatus('unavailable','Nuvem indisponível; usando cache offline neste dispositivo.');return loadGuestOrLegacy();}
 let session;
 try{session=await currentCloudSession();}catch{emitCloudStatus('error','Não foi possível verificar a conta; usando cache offline.');return loadGuestOrLegacy();}
 if(!session){emitCloudStatus('signed-out','Entre com Google para sincronizar seu progresso entre dispositivos.');return loadGuestOrLegacy();}

 const legacy=await readStudy(LEGACY_KEY);
 const guest=await readStudy(GUEST_KEY);
 const userLocal=await readStudy(userKey(session.user.id));
 let local=userLocal??emptyState();
 if(guest)local=mergeStudyStates(local,guest);
 if(legacy)local=mergeStudyStates(local,legacy);
 await writeStudy(userKey(session.user.id),local);

 if(typeof navigator!=='undefined'&&!navigator.onLine){emitCloudStatus('pending','Offline: alterações guardadas no cache e serão sincronizadas quando a conexão voltar.');return local;}
 try{
  emitCloudStatus('syncing','Sincronizando seu progresso…');
  const remote=await loadRemoteStudy(session.user.id);
  const merged=remote?mergeStudyStates(local,remote):local;
  await saveRemoteStudy(session.user.id,merged);
  await writeStudy(userKey(session.user.id),merged);
  await removeStudy(LEGACY_KEY);
  await removeStudy(GUEST_KEY);
  emitCloudStatus('synced','Progresso sincronizado na nuvem.');
  return merged;
 }catch{
  emitCloudStatus('error','Não foi possível alcançar a nuvem agora; seu progresso continua no cache e será sincronizado depois.');
  return local;
 }
}

export async function saveStudy(state:StudyState){
 const cloud=getCloudClient();
 if(!cloud){await writeStudy(GUEST_KEY,state);emitCloudStatus('unavailable','Nuvem indisponível; progresso guardado temporariamente neste dispositivo.');return;}
 let session;
 try{session=await currentCloudSession();}catch{await writeStudy(GUEST_KEY,state);emitCloudStatus('error','Conta indisponível; progresso guardado temporariamente neste dispositivo.');return;}
 if(!session){await writeStudy(GUEST_KEY,state);emitCloudStatus('signed-out','Entre com Google para enviar este progresso à nuvem.');return;}

 const key=userKey(session.user.id);
 await writeStudy(key,state);
 if(typeof navigator!=='undefined'&&!navigator.onLine){emitCloudStatus('pending','Offline: alterações guardadas no cache e serão sincronizadas quando a conexão voltar.');return;}
 try{
  emitCloudStatus('syncing','Sincronizando seu progresso…');
  const remote=await loadRemoteStudy(session.user.id);
  const merged=remote?mergeStudyStates(state,remote):state;
  await saveRemoteStudy(session.user.id,merged);
  await writeStudy(key,merged);
  await removeStudy(LEGACY_KEY);
  await removeStudy(GUEST_KEY);
  emitCloudStatus('synced','Progresso sincronizado na nuvem.');
 }catch{
  emitCloudStatus('error','Falha temporária na sincronização; o cache preservou suas alterações.');
 }
}

export async function clearUserCache(userId:string){await removeStudy(userKey(userId));}
