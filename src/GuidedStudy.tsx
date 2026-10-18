import {useEffect,useState} from 'react';
import {loadQuestions,topics} from './catalog';
import type {Question,StudyState} from './model';
import {emptyGuided,finishGuided,nextGuided,type GuidedActivity} from './guided';
import LessonPage from './LessonPage';
import MarkdownContent from './MarkdownContent';
import {emptyProgress} from './study';

type Props={state:StudyState;update:(f:(s:StudyState)=>StudyState)=>void;storageError:boolean};
const curriculum=topics.filter(t=>t.editorialStatus==='publicado').map(t=>({id:t.id,title:t.title,subject:t.subject,prerequisites:t.prerequisites,questions:t.exercises.length}));
export default function GuidedStudy(props:Props) {
 const g=props.state.guided??emptyGuided();
 const known=Object.entries(props.state.topics).filter(([,p])=>p.status==='consolidado').map(([id])=>id);
 const a=nextGuided(curriculum,g,known);
 return a?<Activity key={a.id} {...props} activity={a}/>:<><h1>Seu estudo está em dia</h1><p>As próximas revisões aparecem quando chegar a data. Seu progresso está preservado.</p><a href="#aulas">Explorar aulas</a></>;
}
function Activity({state,update,storageError,activity:a}:Props&{activity:GuidedActivity}) {
 const [bank,setBank]=useState<Question[]|null>(null),[error,setError]=useState(false),[confirmed,setConfirmed]=useState(false),[assessment,setAssessment]=useState('');
 const g=state.guided??emptyGuided(),answers=g.drafts[a.id]??{};
 const practice=a.kind==='questões'||a.kind==='simulado';
 useEffect(()=>{if(!state.guided?.active)update(s=>({...s,guided:{...(s.guided??emptyGuided()),active:a,updatedAt:new Date().toISOString()}}));},[a,state.guided?.active,update]);
 const checked=g.checked[a.id]!==undefined;
 const topicKey=a.topicIds.join('|'),kind=a.kind;
 useEffect(()=>{if(!practice)return;let active=true;
  Promise.all(topicKey.split('|').map(id=>loadQuestions(id))).then(groups=>{
   const filtered=groups.map(q=>q.filter(x=>x.reviewStatus==='revisado'&&x.answer&&x.resolution).slice(0,kind==='simulado'?4:5));
   const selected=kind==='simulado'?Array.from({length:4},(_,i)=>filtered.flatMap(q=>q[i]?[q[i]]:[])).flat().slice(0,10):filtered[0]??[];
   if(active)setBank([...new Map(selected.map(q=>[q.id,q])).values()]);
  }).catch(()=>{if(active)setError(true)});return()=>{active=false};
 },[topicKey,kind,practice]);
 const save=(id:string,value:string)=>update(s=>{const old=s.guided??emptyGuided();return {...s,guided:{...old,active:a,drafts:{...old.drafts,[a.id]:{...old.drafts[a.id],[id]:value}},updatedAt:new Date().toISOString()}};});
 const allAnswered=Boolean(bank?.length&&bank.every(q=>answers[q.id]?.trim()));
 function reveal(){if(!allAnswered)return;update(s=>{const old=s.guided??emptyGuided(),progress={...s.topics};
  for(const q of bank??[]){if(s.answers[q.id]!==answers[q.id]){const id=q.topics[0],p=progress[id]??emptyProgress();progress[id]={...p,attempts:p.attempts+1};}}
  return {...s,topics:progress,answers:{...s.answers,...answers},guided:{...old,active:a,checked:{...old.checked,[a.id]:true},updatedAt:new Date().toISOString()}};});}
 function finish(){update(s=>{
  const old=s.guided??emptyGuided();
  const next=finishGuided({...old,recovery:practice?{...old.recovery,[a.id]:assessment==='revisar'?a.topicIds:[]}:old.recovery,checked:practice?{...old.checked,[a.id]:assessment==='compreendi'}:old.checked},a);
  const known=Object.entries(s.topics).filter(([,p])=>p.status==='consolidado').map(([id])=>id);
  const progress=s.topics[a.topicIds[0]]??emptyProgress();
  const isRead=a.kind==='aula',isReview=a.kind==='revisão';
  return {...s,topics:isRead||isReview?{...s.topics,[a.topicIds[0]]:{...progress,status:progress.status==='não iniciado'?'aprendendo':progress.status,lastStudy:new Date().toISOString(),reviews:progress.reviews+Number(isReview),nextStep:'Continuar pela trilha automática'}}:s.topics,
   guided:{...next,active:nextGuided(curriculum,next,known)}};
 });window.scrollTo(0,0);}
 return <><p className="eyebrow">SEU ESTUDO ORGANIZADO · {a.kind.toLocaleUpperCase('pt-BR')}</p><h1>{a.title}</h1><p>Matérias alternadas respeitando pré-requisitos. Revisões em 1, 7 e 21 dias; simulado a cada 3 blocos de questões. Leitura concluída não significa domínio.</p>
 <p className="small">Sua atividade e suas respostas ficam salvas para continuar depois.</p>
 {practice?<section aria-label="Resolução de questões"><p>{a.kind==='simulado'?'Simulado de treino com conteúdo já estudado. As respostas abertas exigem autocorreção, sem nota automática.':'Registre suas respostas antes de consultar o gabarito.'}</p>{error?<p role="alert">Falha ao carregar as questões. Atualize para tentar novamente; seu progresso foi preservado.</p>:bank===null?<p role="status">Carregando questões…</p>:bank.length===0?<p>O banco revisado desta aula ainda está em preparação. Os exercícios integrais permanecem no material; a próxima atividade será liberada sem atribuir acertos.</p>:bank.map((q,i)=><section className="question" key={q.id}><h2>{i+1}. {q.title||q.id}</h2><p>Questão {q.origin} · {q.id}</p><MarkdownContent text={q.statement}/>{q.alternatives&&<ol type="A">{q.alternatives.map((o,j)=><li key={j}>{o}</li>)}</ol>}<label>Sua resposta e seu raciocínio<textarea value={answers[q.id]??''} disabled={checked} onChange={e=>save(q.id,e.target.value)} rows={3}/></label>{checked&&<div className="solution"><h3>Gabarito da fonte · confira seu raciocínio</h3><MarkdownContent text={q.answer||''}/>{q.answer!==q.resolution&&<MarkdownContent text={q.resolution||''}/>}<a href="#erros">Registrar dificuldade no Caderno de Erros</a></div>}</section>)}
 {!checked&&Boolean(bank?.length)&&<button disabled={!allAnswered||storageError} onClick={reveal}>{a.kind==='simulado'?'Finalizar simulado e conferir':'Conferir respostas'}</button>}
 </section>:<>{a.kind==='revisão'&&<p className="notice">Tente recordar e explicar o assunto antes de reler. Retome as dificuldades registradas no Caderno de Erros.</p>}<LessonPage embedded id={a.topicIds[0]} state={state} update={update}/></>}
 <section className="note">{practice&&checked&&<label>Após conferir o gabarito, como foi?<select value={assessment} onChange={e=>setAssessment(e.target.value)}><option value="">Escolha sua avaliação</option><option value="compreendi">Consegui explicar meu raciocínio</option><option value="revisar">Preciso revisar este assunto</option></select></label>}<label><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/>{practice?'Conferi meu raciocínio e registrei as dificuldades.':'Concluí a leitura e tentei explicar os pontos principais.'}</label><p><button className="button primary" disabled={storageError||!confirmed||(practice&&(error||bank===null||(bank.length>0&&(!checked||!assessment))))} onClick={finish}>Concluir e continuar →</button></p>{storageError&&<p role="alert">Falha ao salvar. Corrija o armazenamento antes de avançar.</p>}</section>
 </>;
}
