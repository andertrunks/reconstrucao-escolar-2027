import {useEffect,useState} from 'react';
import {loadLesson,loadQuestions,topics} from './catalog';
import type {Lesson,Section,StudyState,Status,Question,Visual,Video} from './model';
import {canConsolidate,emptyProgress} from './study';
import {dependencyGaps,mediaUrl} from './content-utils';
import MarkdownContent from './MarkdownContent';
import Practice from './Practice';

function Figure({visual:v}:{visual:Visual}){return <figure><img src={mediaUrl(v.url)} alt={v.alt} loading="lazy"/><figcaption>{v.caption}</figcaption><p><strong>O que observar:</strong> {v.observe}</p><p><strong>Conclusão:</strong> {v.conclusion}</p></figure>}

function youtubeEmbedUrl(url:string){
 try{
  const u=new URL(url);
  const host=u.hostname.replace(/^www\./,'');
  let id='';
  if(host==='youtu.be')id=u.pathname.split('/').filter(Boolean)[0]||'';
  else if(host.endsWith('youtube.com'))id=u.searchParams.get('v')||u.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1]||'';
  return id?`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`:'';
 }catch{return '';}
}

function VideoBlock({video:v}:{video:Video}){
 const [loaded,setLoaded]=useState(false);
 const embed=v.type!=='leitura'?youtubeEmbedUrl(v.url):'';
 const label=v.type==='leitura'?'Leitura complementar':'Vídeo complementar';
 return <section className="video-card" aria-label={`${label}: ${v.title}`}>
  <h2>{label}</h2>
  <h3>{v.title}</h3>
  {embed&&!loaded&&<div className="video-placeholder"><p>O player externo só é carregado quando você solicitar. Isso reduz rastreamento, consumo de dados e interferência nos recursos de acessibilidade da página.</p><button type="button" onClick={()=>setLoaded(true)}>Carregar vídeo</button></div>}
  {embed&&loaded&&<div className="video-frame"><iframe src={embed} title={`Vídeo complementar: ${v.title}`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div>}
  <div className="video-meta">
   <p><strong>Canal:</strong> {v.channel}</p>
   <p><strong>Duração:</strong> {v.duration}</p>
   <p><strong>Idioma:</strong> {v.language}</p>
   <p><strong>Por que assistir:</strong> {v.reason}</p>
   <p><strong>Quando assistir:</strong> {v.when}</p>
   {Boolean(v.reinforces?.length)&&<p><strong>Reforça:</strong> {v.reinforces.join('; ')}</p>}
  </div>
  <a className="video-link" href={v.url} target="_blank" rel="noreferrer">{v.type==='leitura'?'Abrir leitura em nova aba':'Abrir no YouTube em nova aba'}</a>
  {v.verification&&<p className="small">{v.verification}</p>}
 </section>;
}

function ContentSection({section:s,lessonId}:{section:Section;lessonId:string}){return <section id={s.id} className="lesson-section"><h2>{s.title}</h2>{s.markdown?<MarkdownContent text={s.markdown.replace(/^(?:##\s+|\d+\.\s+)[^\n]+\n/,'')} base={`originais/${lessonId}/arquivos/`}/>:s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{s.formula&&<div className="note"><p>{s.formula.notation}</p><p>{s.formula.spoken}</p><p>{s.formula.variables}</p><p>{s.formula.units}</p><p>{s.formula.example}</p></div>}{s.visuals?.map(v=><Figure key={v.url} visual={v}/>)}</section>}

export default function LessonPage({id,state,update}:{id:string;state:StudyState;update:(f:(s:StudyState)=>StudyState)=>void}){
 const [lesson,setLesson]=useState<Lesson>(),[bank,setBank]=useState<Question[]>(),[error,setError]=useState('');
 const topic=topics.find(t=>t.id===id&&t.editorialStatus==='publicado');
 useEffect(()=>{setLesson(undefined);setBank(undefined);setError('');if(!topic){setError('Esta aula ainda não está publicada.');return;}let active=true;Promise.all([loadLesson(id),loadQuestions(id)]).then(([l,q])=>{if(active){setLesson(l);setBank(q)}}).catch(()=>{if(active)setError('Não foi possível abrir a aula.')});return()=>{active=false}},[id,topic]);
 if(error)return <><h1>Aula indisponível</h1><p>{error}</p><a href="#aulas">Consultar a biblioteca</a></>;
 if(!lesson||!topic||!bank)return <p>Carregando aula…</p>;
 const p=state.topics[id]||emptyProgress(),gaps=dependencyGaps(id,topics),publication=lesson.publication;
 const available=(next?:string)=>topics.some(t=>t.id===next&&t.editorialStatus==='publicado');
 return <><p className="eyebrow">{id} · {topic.unit}</p><h1>{topic.title}</h1>
 <nav className="lesson-actions" aria-label="Atalhos da aula"><a href="#aulas">Todas as aulas</a><a href={`#exercicios/${id}`}>Ir aos exercícios</a>{publication&&<a href={mediaUrl(publication.original)} download>Baixar texto integral</a>}</nav>
 <section className="note"><h2>Antes de começar</h2><p>{topic.level<=3?'Fundamentos e aprofundamento progressivo.':'Conteúdo avançado; consulte os fundamentos antes de prosseguir.'} Estude em blocos de 25 a 50 minutos.</p>
 {lesson.prerequisites.length>0?<><h3>Pré-requisitos declarados na fonte</h3><ul>{lesson.prerequisites.map(v=><li key={v}>{available(v)?<a href={`#aula/${v}`}>{v} · {topics.find(t=>t.id===v)?.title}</a>:<span>{v} · texto integral a recuperar</span>}</li>)}</ul></>:<p>Esta aula começa pela leitura de frases, contagem e comparação de quantidades.</p>}
 {gaps.length>0&&<p className="dependency-warning">A sequência ainda tem {gaps.length} pré-requisitos sem texto integral disponível: {gaps.join(', ')}. Esta aula pode ser consultada; ela não representa um ponto inicial da trilha.</p>}<p>{publication?.kind}</p>
 </section>
 <details className="lesson-index"><summary>Índice da aula · {lesson.sections.length} seções</summary><nav aria-label="Índice da aula"><ol>{lesson.sections.map(s=><li key={s.id}><a href={`#${s.id}`} onClick={e=>{e.preventDefault();document.getElementById(s.id)?.scrollIntoView()}}>{s.title}</a></li>)}</ol></nav></details>
 <article className="lesson-body" aria-label="Texto integral da aula">{lesson.sections.map(s=><ContentSection key={s.id} section={s} lessonId={id}/>)}</article>
 {lesson.visuals.length>0&&<section className="lesson-gallery"><h2>Galeria de apoio visual</h2><p>Os visuais principais devem aparecer junto das explicações correspondentes. Esta galeria reúne cópias de apoio para revisão.</p>{lesson.visuals.map(v=><Figure key={v.url} visual={v}/>)}</section>}
 <section><h2>Prática e gabarito após a tentativa</h2><Practice questions={bank} state={state} update={update}/></section>
 <section><h2>Resumo para ouvir</h2><MarkdownContent text={lesson.audioVersion}/></section>
 {(lesson.videos||[lesson.video]).filter(v=>v).map(v=>v&&<VideoBlock key={v.url} video={v}/>)}
 <section><h2>Fontes e versões</h2><ul>{lesson.sources.map(s=><li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul>{publication?.notes.map(n=><p key={n} className="small">{n}</p>)}{publication&&<details><summary>Consultar edições e dados de apoio</summary><ul>{[...publication.editions,...publication.attachments].map((v,i)=><li key={i}><a href={mediaUrl(v.url)}>{v.label}</a></li>)}</ul></details>}</section>
 <section><h2>Revisão e aprendizagem</h2><p>Retome após um dia, uma semana e um mês. Faça o reteste sem consultar a correção.</p><label>Estado de aprendizagem<select value={p.status} onChange={e=>{const status=e.target.value as Status;if(status==='consolidado'&&!canConsolidate(p))return;update(s=>({...s,topics:{...s.topics,[id]:{...p,status,lastStudy:new Date().toISOString()}}}))}}>{['não iniciado','aprendendo','revisar','consolidado'].map(s=><option key={s} disabled={s==='consolidado'&&!canConsolidate(p)}>{s}</option>)}</select></label><p>A consolidação exige evidências em exercícios, aplicação, transferência, explicação e revisão.</p></section>
 <nav className="lesson-actions" aria-label="Sequência de aulas">{available(lesson.previous)&&<a href={`#aula/${lesson.previous}`}>← Aula anterior</a>}{available(lesson.next)?<a href={`#aula/${lesson.next}`}>Próxima aula →</a>:lesson.next&&<span>Próximo tópico: {lesson.next} · ainda indisponível</span>}</nav>
 </>;
}
