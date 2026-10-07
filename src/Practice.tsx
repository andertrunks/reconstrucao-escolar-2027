import {useState} from 'react';
import type {Question,StudyState} from './model';
import MarkdownContent from './MarkdownContent';
import {emptyProgress} from './study';
const layers:Record<string,string>={APR:'Aprendizagem',CON:'Consolidação',VES:'Vestibular',TRA:'Transferência',RET:'Reteste'};
type Props={questions:Question[];state:StudyState;update:(f:(s:StudyState)=>StudyState)=>void};
function Attempt({question:q,state,update}:Omit<Props,'questions'>&{question:Question}){
 const [draft,setDraft]=useState(state.answers[q.id]||''),[revealed,setRevealed]=useState(false);
 const saved=Boolean(state.answers[q.id]?.trim());
 const save=()=>{if(!draft.trim())return;update(s=>{const id=q.topics[0],p=s.topics[id]||emptyProgress();return {...s,answers:{...s.answers,[q.id]:draft},topics:{...s.topics,[id]:{...p,attempts:p.attempts+(s.answers[q.id]!==draft?1:0)}}};});};
 return <section className="question practice-question" id={q.id} aria-label={`${q.id} · ${q.title||'Questão'}`}>
 <p className="eyebrow">{q.id} · {layers[q.layer||'']||q.difficulty} · Questão {q.origin}</p><h3>{q.title||q.id}</h3><MarkdownContent text={q.statement}/>
 {q.alternatives&&<ol type="A">{q.alternatives.map((a,i)=><li key={i}>{a}</li>)}</ol>}
 <label htmlFor={`${q.id}-answer`}>Sua resposta e seu raciocínio</label><textarea id={`${q.id}-answer`} value={draft} onChange={e=>setDraft(e.target.value)} rows={3}/>
 <div className="question-actions"><button onClick={save} disabled={!draft.trim()}>Salvar tentativa</button><button disabled={!saved} aria-expanded={revealed} aria-controls={`${q.id}-solution`} onClick={()=>setRevealed(!revealed)}>{revealed?'Ocultar gabarito':'Consultar gabarito'}</button></div>
 <p className="small">{saved?'Tentativa salva. Consultar o gabarito não registra acerto nem consolidação.':'Escreva e salve sua tentativa para consultar o gabarito.'}</p>
 <div id={`${q.id}-solution`} hidden={!revealed||!saved}>{revealed&&saved&&<div className="solution"><h4>{q.reviewNote?'Resposta da fonte · desenvolvimento pendente':'Gabarito comentado da fonte'}</h4>{q.answer!==q.resolution&&<MarkdownContent text={q.answer||''}/>}<MarkdownContent text={q.resolution||''}/>{q.reviewNote&&<p>{q.reviewNote}</p>}{Boolean(q.errorReasons?.length)&&<><h4>Possíveis motivos de erro</h4>{q.errorReasons?.map((r,i)=><p key={i}>{r}</p>)}<p className="small">São hipóteses para a revisão. Identifique o motivo pela sua tentativa.</p></>}<a href="#erros">Registrar no Caderno de Erros</a></div>}</div>
 </section>;
}
export default function Practice({questions,state,update}:Props){
 const [layer,setLayer]=useState('todas');const available=[...new Set(questions.map(q=>q.layer||q.difficulty))];
 return <><label>Camada dos exercícios<select value={layer} onChange={e=>setLayer(e.target.value)}><option value="todas">Todas as camadas</option>{available.map(v=><option key={v} value={v}>{layers[v]||v}</option>)}</select></label><p>{questions.length} questões autorais. Respostas abertas exigem conferência do raciocínio; o site não atribui nota automática.</p>{questions.filter(q=>layer==='todas'||(q.layer||q.difficulty)===layer).map(q=><Attempt key={q.id} question={q} state={state} update={update}/>)}</>;
}
