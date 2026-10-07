import {openDB} from 'idb';
import type {StudyState} from './model';
import {emptyState,validateBackup} from './study';
import {currentCloudSession,emitCloudStatus,getCloudClient,hasMeaningfulStudy,loadRemoteStudy,mergeStudyStates,saveRemoteStudy} from './cloud';

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
async function writeGuestSnapshot(state:StudyState){
 await writeStudy(GUEST_KEY,state);
 await writeStudy(LEGACY_KEY,state);
}
async function finishLegacyMigration(){
 await Promise.all([removeStudy(LEGACY_KEY),removeStudy(GUEST_KEY)]);
}
async function mergeLegacyInto(seed:StudyState){
 let merged=seed;
 const guest=await readStudy(GUEST_KEY);
 const legacy=await readStudy(LEGACY_KEY);
 if(guest)merged=mergeStudyStates(merged,guest);
 if(legacy)merged=mergeStudyStates(merged,legacy);
 return merged;
}

async function loadGuestOrLegacy(){
 return mergeLegacyInto(emptyState());
}

export async function loadStudy():Promise<StudyState>{
 const cloud=getCloudClient();
 if(!cloud){emitCloudStatus('unavailable','Nuvem indisponível; usando a cópia offline deste dispositivo.');return loadGuestOrLegacy();}
 let session;
 try{session=await currentCloudSession();}catch{emitCloudStatus('error','Não foi possível verificar a conta; usando a cópia offline deste dispositivo.');return loadGuestOrLegacy();}
 if(!session){emitCloudStatus('signed-out','Entre com Google para sincronizar seu progresso entre dispositivos.');return loadGuestOrLegacy();}

 const key=userKey(session.user.id);
 const userLocal=await readStudy(key);
 const local=await mergeLegacyInto(userLocal??emptyState());
 await writeStudy(key,local);
 if(typeof navigator!=='undefined'&&!navigator.onLine){emitCloudStatus('pending','Offline: seu progresso ficou preservado na cópia local e será sincronizado quando a conexão voltar.');return local;}
 try{
  emitCloudStatus('syncing','Sincronizando seu progresso…');
  const remote=await loadRemoteStudy(session.user.id);
  const merged=remote?mergeStudyStates(local,remote):local;
  await saveRemoteStudy(session.user.id,merged);
  await writeStudy(key,merged);
  await finishLegacyMigration();
  emitCloudStatus('synced','Progresso sincronizado na nuvem e preservado também para uso offline neste dispositivo.');
  return merged;
 }catch{
  await writeStudy(key,local);
  emitCloudStatus('error','Não foi possível alcançar a nuvem agora; sua cópia local foi preservada e será sincronizada depois.');
  return local;
 }
}

export async function saveStudy(state:StudyState){
 const cloud=getCloudClient();
 if(!cloud){await writeGuestSnapshot(state);emitCloudStatus('unavailable','Nuvem indisponível; progresso preservado na cópia offline deste dispositivo.');return;}
 let session;
 try{session=await currentCloudSession();}catch{await writeGuestSnapshot(state);emitCloudStatus('error','Conta indisponível; progresso preservado na cópia offline deste dispositivo.');return;}
 if(!session){await writeGuestSnapshot(state);emitCloudStatus('signed-out','Entre com Google para enviar este progresso à nuvem.');return;}

 const key=userKey(session.user.id);
 let local=await mergeLegacyInto(state);
 const cached=await readStudy(key);
 if(cached)local=mergeStudyStates(local,cached);
 await writeStudy(key,local);
 if(typeof navigator!=='undefined'&&!navigator.onLine){emitCloudStatus('pending','Offline: alterações preservadas localmente e serão sincronizadas quando a conexão voltar.');return;}
 try{
  emitCloudStatus('syncing','Sincronizando seu progresso…');
  const remote=await loadRemoteStudy(session.user.id);
  const merged=remote?mergeStudyStates(local,remote):local;
  await saveRemoteStudy(session.user.id,merged);
  await writeStudy(key,merged);
  await finishLegacyMigration();
  emitCloudStatus('synced','Progresso sincronizado na nuvem e cópia offline atualizada.');
 }catch{
  emitCloudStatus('error','Falha temporária na sincronização; sua cópia local continua preservada.');
 }
}

export async function syncPendingCache(){
 const cloud=getCloudClient();
 if(!cloud||typeof navigator!=='undefined'&&!navigator.onLine)return;
 let session;
 try{session=await currentCloudSession();}catch{return;}
 if(!session)return;
 const key=userKey(session.user.id);
 const cached=await readStudy(key);
 const pending=await mergeLegacyInto(cached??emptyState());
 if(!cached&&!hasMeaningfulStudy(pending))return;
 await writeStudy(key,pending);
 try{
  emitCloudStatus('syncing','Conexão restabelecida. Enviando alterações pendentes…');
  const remote=await loadRemoteStudy(session.user.id);
  const merged=remote?mergeStudyStates(pending,remote):pending;
  await saveRemoteStudy(session.user.id,merged);
  await writeStudy(key,merged);
  await finishLegacyMigration();
  emitCloudStatus('synced','Alterações pendentes sincronizadas na nuvem e cópia offline atualizada.');
 }catch{
  emitCloudStatus('error','A conexão voltou, mas a sincronização ainda não concluiu. A cópia local foi preservada.');
 }
}
