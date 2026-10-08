import type {StudyState,TopicProgress} from './model';
export const emptyState = ():StudyState=>({version:1,answers:{},topics:{},errors:[],updatedAt:new Date().toISOString()});
export const emptyProgress = ():TopicProgress=>({status:'não iniciado',attempts:0,correct:0,incorrect:0,reviews:0,confidence:0,nextStep:'Estudar e praticar',evidence:{explained:false,direct:false,application:false,transfer:false,recall:false}});
export function canConsolidate(p:TopicProgress){return Object.values(p.evidence).every(Boolean)&&p.correct>0&&p.reviews>0;}
export function continuation(s:StudyState,ids:string[]){return s.cursor&&ids.includes(s.cursor)?s.cursor:ids.find(id=>!s.answers[id]?.trim())||ids[0];}
export function validateBackup(data:unknown):StudyState{
 if(!data||typeof data!=='object')throw new Error('Arquivo inválido.');
 const d=data as StudyState;
 if(d.version!==1||typeof d.answers!=='object'||!d.answers||!Array.isArray(d.errors)||!d.topics||typeof d.topics!=='object'||typeof d.updatedAt!=='string'||!Number.isFinite(Date.parse(d.updatedAt))||Array.isArray(d.answers)||Array.isArray(d.topics))throw new Error('Formato de backup incompatível.');
 if(Object.values(d.answers).some(v=>typeof v!=='string')||(d.cursor!==undefined&&typeof d.cursor!=='string'))throw new Error('Respostas inválidas.');
 const kinds=['conteúdo','interpretação','cálculo','distração','memória','estratégia','tempo'];
 if(d.errors.some(e=>!e||typeof e.id!=='string'||typeof e.question!=='string'||!kinds.includes(e.kind)||typeof e.note!=='string'||typeof e.resolved!=='boolean'||typeof e.date!=='string'))throw new Error('Caderno inválido.');
 for(const p of Object.values(d.topics))if(!p||!['não iniciado','aprendendo','revisar','consolidado'].includes(p.status)||!p.evidence||Object.values(p.evidence).length!==5||Object.values(p.evidence).some(v=>typeof v!=='boolean')||[p.attempts,p.correct,p.incorrect,p.reviews,p.confidence].some(v=>!Number.isFinite(v)||v<0)||typeof p.nextStep!=='string')throw new Error('Progresso inválido.');
 if(d.history!==undefined){
  if(!d.history||typeof d.history!=='object'||Array.isArray(d.history))throw new Error('Histórico inválido.');
  for(const kind of ['answers','topics','errors'] as const){
   const entries=d.history[kind];
   if(!entries||typeof entries!=='object'||Array.isArray(entries))throw new Error('Histórico inválido.');
   for(const [id,versions] of Object.entries(entries)){
    if(!Array.isArray(versions)||!versions.length)throw new Error('Histórico vazio ou inválido.');
    for(const revision of versions){
     if(!revision||typeof revision.at!=='string'||!Number.isFinite(Date.parse(revision.at)))throw new Error('Data de histórico inválida.');
     const snapshot={...emptyState(),updatedAt:revision.at};
     if(kind==='answers')snapshot.answers={[id]:revision.value as string};
     if(kind==='topics')snapshot.topics={[id]:revision.value as TopicProgress};
     if(kind==='errors'){
      const error=revision.value as StudyState['errors'][number];
      if(!error||error.id!==id)throw new Error('Identidade de erro inválida.');
      snapshot.errors=[error];
     }
     validateBackup(snapshot);
    }
   }
  }
 }
 return structuredClone(d);
}
