import {useEffect,useState} from 'react';
import {CLOUD_STATUS_EVENT,emitCloudStatus,getCloudClient,type CloudSession,type CloudStatusDetail} from './cloud';
import {clearUserCache} from './storage';

export default function CloudAccountBar(){
 const [session,setSession]=useState<CloudSession|null>(null);
 const [message,setMessage]=useState('Verificando sincronização…');
 const [busy,setBusy]=useState(false);

 useEffect(()=>{
  const cloud=getCloudClient();
  if(!cloud){setMessage('Sincronização em nuvem indisponível neste momento.');return;}
  let active=true;
  cloud.auth.getSession().then(result=>{
   if(!active)return;
   if(result.error){setMessage('Não foi possível verificar sua conta.');return;}
   setSession(result.data.session);
   setMessage(result.data.session?'Progresso conectado à nuvem.':'Entre com Google para sincronizar seu progresso entre dispositivos.');
  });
  const listener=cloud.auth.onAuthStateChange((_event,next)=>{if(active){setSession(next);setMessage(next?'Progresso conectado à nuvem.':'Entre com Google para sincronizar seu progresso entre dispositivos.');}});
  const onStatus=(event:Event)=>{const detail=(event as CustomEvent<CloudStatusDetail>).detail;if(detail?.message)setMessage(detail.message);};
  window.addEventListener(CLOUD_STATUS_EVENT,onStatus);
  return()=>{active=false;listener.data.subscription.unsubscribe();window.removeEventListener(CLOUD_STATUS_EVENT,onStatus);};
 },[]);

 const signIn=async()=>{
  const cloud=getCloudClient();if(!cloud){setMessage('Sincronização em nuvem indisponível neste momento.');return;}
  setBusy(true);
  const redirectTo=new URL(import.meta.env.BASE_URL,window.location.origin).toString();
  const result=await cloud.auth.signInWithOAuth({provider:'google',options:{redirectTo}});
  if(result.error){setMessage(`Falha ao entrar: ${result.error.message}`);setBusy(false);}
 };

 const signOut=async()=>{
  const cloud=getCloudClient();if(!cloud)return;
  setBusy(true);
  const userId=session?.user.id;
  const result=await cloud.auth.signOut();
  if(result.error){setMessage(`Falha ao sair: ${result.error.message}`);setBusy(false);return;}
  if(userId)await clearUserCache(userId);
  emitCloudStatus('signed-out','Sessão encerrada. Seu progresso continua protegido na nuvem.');
  location.hash='progresso';
  location.reload();
 };

 return <section aria-label="Sincronização do progresso" style={{display:'flex',gap:'0.75rem',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',padding:'0.65rem 1rem',borderBottom:'1px solid currentColor'}}>
  <div><strong>{session?'Nuvem ativa':'Progresso na nuvem'}</strong><span aria-live="polite"> · {message}</span>{session?.user.email?<span> · {session.user.email}</span>:null}</div>
  {session?<button type="button" onClick={signOut} disabled={busy}>Sair</button>:<button type="button" onClick={signIn} disabled={busy}>{busy?'Abrindo login…':'Entrar com Google'}</button>}
 </section>;
}
