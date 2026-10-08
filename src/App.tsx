import {getCloudClient,mergeStudyStates} from './cloud';
import {recordStudyUpdate} from './reconciliation';
import {useEffect,useRef,useState,lazy,Suspense} from 'react';
import type {StudyState,ErrorKind} from './model';
import {subjects,levels,topics,questionCount} from './catalog';
import {continuation,emptyState,validateBackup} from './study';
import {loadStudy,saveStudy,syncPendingCache,type LoadedStudy} from './storage';
import CloudAccountBar from './CloudAccountBar';
import diagnostic from './content/diagnostic.json';
const Diagnostic=lazy(()=>import('./Diagnostic'));
const LessonPage=lazy(()=>import('./LessonPage'));
const ExercisesPage=lazy(()=>import('./ExercisesPage'));
const CatalogPage=lazy(()=>import('./CatalogPage'));
const nav=[['inicio','Início'],['trilhas','Trilhas'],['materias','Matérias'],['aulas','Aulas'],['exercicios','Exercícios'],['simulados','Simulados'],['redacao','Redação'],['leituras','Leituras'],['progresso','Progresso'],['erros','Caderno de Erros']];
const kinds:ErrorKind[]=['conteúdo','interpretação','cálculo','distração','memória','estratégia','tempo'];
const route=()=>location.hash.slice(1)||'inicio';
function download(state:StudyState){const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='reconstrucao-escolar-progresso.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export default function App(){
 const [path,setPath]=useState(route),[state,setState]=useState<StudyState>(emptyState),[ready,setReady]=useState(false),[notice,setNotice]=useState(''),[storageError,setStorageError]=useState(false),[theme,setTheme]=useState(()=>{try{return localStorage.getItem('school-theme')||'claro'}catch{return 'claro'}});
 const main=useRef<HTMLElement>(null),loaded=useRef<LoadedStudy|null>(null),generation=useRef(0);
 useEffect(()=>{
  let active=true,identity:string|null|undefined;
  const apply=(value:LoadedStudy,version:number)=>{
   if(!active||generation.current!==version)return;
   loaded.current=value;setState(value.state);setReady(true);
  };
  const reload=()=>{
   const version=++generation.current;
   loaded.current=null;setReady(false);setStorageError(false);setNotice('');
   void loadStudy().then(value=>apply(value,version)).catch(()=>{
    if(!active||generation.current!==version)return;
    setState(emptyState());setStorageError(true);setReady(true);
    setNotice('Não foi possível verificar a conta ou ler o cache offline. Os dados existentes foram preservados. Reconecte para tentar novamente.');
   });
  };
  const navigate=()=>{setPath(route());setTimeout(()=>{main.current?.focus();window.scrollTo(0,0)},0)};
  const online=()=>{
   if(!loaded.current){reload();return;}
   const version=generation.current;
   void syncPendingCache().then(value=>{
    const current=loaded.current;
    if(value&&current&&current.owner===value.owner&&generation.current===version)apply({owner:current.owner,state:mergeStudyStates(current.state,value.state)},version);
   }).catch(()=>{/* Local edits remain available; the sync indicator will retry. */});
  };
  window.addEventListener('hashchange',navigate);window.addEventListener('online',online);
  reload();
  const subscription=getCloudClient()?.auth.onAuthStateChange((_event,session)=>{
   const next=session?.user.id??null;
   if(identity!==next){identity=next;reload();}
  });
  return()=>{active=false;generation.current++;subscription?.data.subscription.unsubscribe();window.removeEventListener('hashchange',navigate);window.removeEventListener('online',online);};
 },[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('school-theme',theme)}catch{/* Theme remains available in memory. */}},[theme]);
 const renderGeneration=generation.current;
 const update=(f:(s:StudyState)=>StudyState)=>{
  const current=loaded.current;if(!current||storageError||generation.current!==renderGeneration)return;
  const version=generation.current,next=recordStudyUpdate(current.state,f(current.state));
  loaded.current={owner:current.owner,state:next};setState(next);
  void saveStudy(next,current.owner).then(saved=>{
   const latest=loaded.current;
   if(generation.current!==version||!latest||latest.owner!==current.owner)return;
   const merged=mergeStudyStates(latest.state,saved);loaded.current={owner:current.owner,state:merged};setState(merged);
  }).catch(()=>{
   if(generation.current!==version)return;
   setStorageError(true);setNotice('Falha ao gravar o cache offline. Exporte o backup antes de fechar a página.');
  });
 };
 const answered=diagnostic.questions.filter(q=>state.answers[q.id]?.trim()).length;
 const resume=continuation(state,diagnostic.questions.map(q=>q.id));
 const title=nav.find(n=>n[0]===path)?.[1]||(path.startsWith('diagnostico')?'Diagnóstico inicial':path.startsWith('aula/')?'Aula':path.startsWith('exercicios/')?'Exercícios':path.startsWith('materia/')?subjects.find(s=>s[0]===path.split('/')[1])?.[1]:'Página não encontrada');
 useEffect(()=>{document.title=`${title} · Reconstrução Escolar`},[title]);
 return <><a className="skip" href="#conteudo" onClick={e=>{e.preventDefault();main.current?.focus()}}>Pular para o conteúdo</a><div className="shell"><aside className="sidebar"><a className="brand" href="#inicio"><span className="brand-icon" aria-hidden="true">R</span><span>Reconstrução<br/><strong>Escolar</strong></span></a><p className="eyebrow">SEU PERCURSO DE ESTUDO</p><nav aria-label="Navegação principal">{nav.map(([id,label],i)=><a key={id} href={'#'+id} aria-current={path===id?'page':undefined}><span className="nav-num" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{label}</a>)}</nav><div className="sidebar-foot">Compreender. Praticar. Retomar.<br/><small>ENEM e vestibulares · 2027</small></div></aside><div className="workspace"><header className="topbar"><span>FORMAÇÃO PARA IR ALÉM</span><CloudAccountBar/><button onClick={()=>setTheme(theme==='claro'?'escuro':'claro')} aria-label={`Ativar modo ${theme==='claro'?'escuro':'claro'}`}>{theme==='claro'?'Modo escuro':'Modo claro'}</button></header><main ref={main} tabIndex={-1} id="conteudo"><div role="status" className={notice?'notice':''}>{notice}</div>{!ready?<p>Carregando seu percurso…</p>:<Suspense fallback={<p>Carregando conteúdo…</p>}>
 {path==='inicio'?<><p className="eyebrow">UM PASSO DE CADA VEZ</p><h1>Seu próximo passo<br/><em>começa aqui.</em></h1><p className="intro">Reconstrua sua base, conecte ideias e avance com compreensão. Seu percurso continua de onde você parou.</p><section className="hero" aria-labelledby="continue-title"><div><span className="pill">PONTO DE PARTIDA · DIAGNÓSTICO</span><h2 id="continue-title">Vamos conhecer sua base.</h2><p>Matemática e Língua Portuguesa. Sem nota de aprovação e sem pressa: o objetivo é descobrir o que precisa de atenção.</p><a className="button primary" href={`#diagnostico/${resume}`}>{answered?'Continuar estudando':'Começar diagnóstico'} <span aria-hidden="true">→</span></a><p className="small">{answered?`${answered} de 37 respostas registradas. Próximo ponto: ${resume?.replace('DIA-001-','')}.`:'Reserve um bloco de 25 a 40 minutos.'}</p></div><div className="hero-figure" aria-label={`${answered} de 37 questões respondidas`}><strong>{answered}<span>/37</span></strong><span>respostas registradas</span><progress max={37} value={answered}> {answered} de 37</progress><small>Responder não significa consolidar.</small></div></section><div className="stats"><section><span>APRENDIZAGEM</span><strong>{Object.values(state.topics).filter(t=>t.status==='consolidado').length}</strong><p>Tópicos consolidados</p></section><section><span>REVISÃO</span><strong>{Object.values(state.topics).filter(t=>t.status==='revisar').length}</strong><p>Tópicos para retomar</p></section><section><span>CADERNO DE ERROS</span><strong>{state.errors.filter(e=>!e.resolved).length}</strong><p>Registros em aberto</p></section></div><div className="section-heading"><h2>Explore seu percurso</h2><a href="#trilhas">Conhecer os seis níveis →</a></div><div className="cards">{subjects.slice(0,4).map(([id,name])=><a className="card" key={id} href={`#materia/${id}`}><span className="eyebrow">{id}</span><h3>{name}</h3><p>{id==='MAT'?`${topics.length} aulas de Estatística disponíveis.`:id==='POR'?'Comece pelo diagnóstico da sua base.':'Conteúdo em preparação.'}</p><span className="card-arrow" aria-hidden="true">↗</span></a>)}</div><section className="note"><h2>O acervo já está disponível</h2><p>{topics.length} aulas completas de Estatística, {questionCount.toLocaleString('pt-BR')} questões e {topics.reduce((n,t)=>n+t.visualCount,0)} recursos visuais. As fontes, edições anteriores e dados de apoio acompanham as aulas.</p><div className="lesson-actions"><a href="#aulas">Explorar todas as aulas →</a><a href="#aula/MAT-EST-001">Começar pelos fundamentos</a></div></section></>:
 path.startsWith('diagnostico')?<Diagnostic state={state} update={update} current={path.split('/')[1]} storageError={storageError}/>:
 path.startsWith('aula/')?<LessonPage id={path.split('/')[1]} state={state} update={update}/>:
 path==='trilhas'?<><p className="eyebrow">DEPENDÊNCIAS CONCEITUAIS</p><h1>Trilhas de aprendizagem</h1><p className="intro">Fundamento antes de fórmula. Cada nova ideia se apoia na compreensão da anterior.</p><ol className="level-list">{levels.map((l,i)=><li key={l}><span className="level-number">{i+1}</span><div><h2>{l}</h2><p>{['Leitura, escrita, números, operações, frações e compreensão do mundo.','Álgebra elementar, geometria, interpretação e ciências introdutórias.','Linguagens, Matemática, Ciências da Natureza e Humanidades.','Aplicação e aprofundamento conforme as fontes oficiais de cada exame.','Revisões, prática mista e recuperação do conhecimento.','Leitura acadêmica, pré-cálculo, lógica e metodologia científica.'][i]}</p></div></li>)}</ol><a className="button primary" href={`#diagnostico/${resume}`}>Ir ao diagnóstico inicial</a></>:
 path==='materias'||path.startsWith('materia/')?<><p className="eyebrow">ÁREAS DO CONHECIMENTO</p><h1>{title}</h1><div className="cards">{subjects.filter(s=>!path.startsWith('materia/')||s[0]===path.split('/')[1]).map(([id,name])=><section className="card" key={id}><span className="eyebrow">{id}</span><h2>{name}</h2><p>{topics.filter(t=>t.subject===id&&t.editorialStatus==='publicado').length} aulas publicadas</p>{id==='MAT'&&<p><a href="#aulas">Abrir as aulas de Estatística →</a></p>}{['MAT','POR'].includes(id)?<a href={`#diagnostico/DIA-001-${id==='MAT'?'M1':'P1'}`}>Abrir diagnóstico de {name}</a>:<p>O material desta área será publicado progressivamente.</p>}</section>)}</div><a href="#aulas">Consultar o catálogo completo →</a></>:
 path==='aulas'?<CatalogPage/>:
 path==='exercicios'||path.startsWith('exercicios/')?<ExercisesPage key={path} id={path.split('/')[1]} state={state} update={update}/>:
 path==='progresso'?<><p className="eyebrow">SEU PERCURSO, SEU RITMO</p><h1>Progresso</h1><section className="note"><h2>Diagnóstico inicial</h2><p>{answered} de 37 respostas registradas. A correção pedagógica está pendente; nenhuma resposta é usada para presumir domínio.</p><progress value={answered} max={37} aria-label="Respostas do diagnóstico"/><p><a href={`#diagnostico/${resume}`}>Continuar estudando →</a></p></section><h2>Revisões</h2><p>{Object.values(state.topics).filter(p=>p.status==='revisar').length} tópicos para revisar. Abrir um conteúdo não o torna consolidado.</p><h2>Sincronização na nuvem</h2><p>Entre com Google na barra superior para manter respostas, tópicos, revisões e Caderno de Erros sincronizados entre seus dispositivos. O navegador é usado apenas como cache offline temporário; depois da primeira sincronização, a nuvem passa a ser a referência do seu progresso.</p><button onClick={()=>download(state)}>Exportar backup</button><label className="import">Restaurar backup<input type="file" accept="application/json,.json" onChange={async e=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>5000000)throw new Error('Arquivo maior que o limite de 5 MB.');const imported=validateBackup(JSON.parse(await f.text()));update(s=>mergeStudyStates(s,imported));setNotice('Backup mesclado. Os registros atuais foram preservados.');}catch(err){setNotice(err instanceof Error?err.message:'Falha na importação.')}e.target.value='';}}/></label></>:
 path==='erros'?<><p className="eyebrow">ERRO É INFORMAÇÃO</p><h1>Caderno de Erros</h1><p className="intro">Registre o que aconteceu e o que fará diferente na próxima tentativa.</p><form className="error-form" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);update(s=>({...s,errors:[...s.errors,{id:crypto.randomUUID(),question:String(data.get('question')),kind:String(data.get('kind')) as ErrorKind,note:String(data.get('note')),date:new Date().toISOString(),resolved:false}]}));e.currentTarget.reset();setNotice('Registro adicionado ao Caderno de Erros.')}}><label>Questão ou tópico<input name="question" required placeholder="Ex.: DIA-001-M8"/></label><label>Tipo de erro<select name="kind">{kinds.map(k=><option key={k}>{k}</option>)}</select></label><label>O que revisar e como tentar novamente<textarea name="note" required rows={3}/></label><button className="primary">Registrar erro</button></form>{state.errors.length===0?<p>Nenhum erro registrado ainda.</p>:state.errors.map(e=><section className="note" key={e.id}><h2>{e.question} · {e.kind}</h2><p>{e.note}</p><button onClick={()=>update(s=>({...s,errors:s.errors.map(x=>x.id===e.id?{...x,resolved:!x.resolved}:x)}))}>{e.resolved?'Reabrir registro':'Marcar como revisado'}</button><span> {e.resolved?'Revisado':'Em aberto'}</span></section>)}</>:
 path==='simulados'?<><p className="eyebrow">PRÁTICA CUMULATIVA</p><h1>Simulados</h1><p className="intro">Materiais autorais recuperados do projeto. Eles não reproduzem a aplicação oficial de um exame e não atribuem nota automática.</p><section className="note"><p className="eyebrow">MAT-EST-037 · 48 QUESTÕES</p><h2>Simulado cumulativo de Estatística</h2><p>Leia as instruções e consulte os pré-requisitos antes de responder. Registre o raciocínio e confira o gabarito depois da tentativa.</p><div className="lesson-actions"><a href="#aula/MAT-EST-037">Abrir instruções e material completo</a><a href="#exercicios/MAT-EST-037">Responder às questões</a></div></section><section className="note"><h2>Diagnóstico inicial · 37 questões</h2><p>Identifique os fundamentos que precisam de atenção em Matemática e Língua Portuguesa.</p><a href={`#diagnostico/${resume}`}>Abrir diagnóstico →</a></section></>:
 ['redacao','leituras'].includes(path)?<><p className="eyebrow">APROFUNDAMENTO PROGRESSIVO</p><h1>{title}</h1><section className="note"><h2>{path==='redacao'?'Escreva seu ponto de partida':path==='simulados'?'Antes do simulado, conheça sua base':'Leituras com contexto e compreensão'}</h2><p>{path==='redacao'?'O diagnóstico inclui uma produção escrita. Registre seu texto para posterior correção pedagógica.':path==='simulados'?'Os simulados serão publicados após a validação das questões, formatos e fontes oficiais.':'As obras e os materiais de leitura serão adicionados após a validação editorial. Listas obrigatórias dependem do edital de cada edição.'}</p><a href={path==='redacao'?'#diagnostico/DIA-001-P13':`#diagnostico/${resume}`}>{path==='redacao'?'Abrir produção escrita':'Abrir diagnóstico inicial'} →</a></section></>:
 <><h1>Página não encontrada</h1><p>Este endereço não corresponde a um conteúdo publicado.</p><a href="#inicio">Voltar ao início</a></>}
 </Suspense>}</main><footer>Reconstrução Escolar · Compreensão antes de velocidade.<span>{storageError?'Cache offline indisponível':'Nuvem + cache offline'} · v0.2.0</span></footer></div></div></>;
}

