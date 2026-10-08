import {useState} from 'react';
import {topics} from './catalog';
import editorial from './content/editorial-index.json';
import references from './content/prerequisite-references.json';
import {dependencyGaps} from './content-utils';
const published=new Set(topics.map(t=>t.id));
const pending=[...new Map([...editorial,...references].filter(t=>!published.has(t.id)).map(t=>[t.id,t])).values()];
export default function CatalogPage(){
 const [query,setQuery]=useState(''),[showPending,setShowPending]=useState(false);
 const matches=(id:string,title:string)=>(id+' '+title).toLocaleLowerCase().includes(query.toLocaleLowerCase());
 const available=topics.filter(t=>matches(t.id,t.title));
 const waiting=pending.filter(t=>matches(t.id,t.title));
 return <><p className="eyebrow">ACERVO DO PROJETO</p><h1>Aulas e conteúdos</h1><p className="intro">{topics.length} aulas completas publicadas. A sequência ativa V2 começa nos fundamentos e intercala as matérias; o acervo anterior permanece preservado para consulta enquanto é convertido ao novo padrão.</p>
 <div className="lesson-actions"><a className="button primary" href="#aula/MAT-NUM-001">Começar a trilha ativa V2</a><a href="#diagnostico/DIA-001-M1">Consultar diagnóstico inicial</a></div>
 <label className="search">Buscar por código ou título<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ex.: valor posicional ou MAT-EST-067"/></label>
 <p role="status">{available.length} aulas encontradas.</p><ul className="editorial lesson-catalog">{available.map(t=>{const gaps=dependencyGaps(t.id,topics);return <li key={t.id}><p className="code">{t.id} · Nível {t.level}</p><h2><a href={`#aula/${t.id}`}>{t.title}</a></h2><span className="tag">{t.id==='MAT-NUM-001'?'Sequência ativa V2':'Aula completa publicada'}</span><p>{t.exercises.length} questões · {t.visualCount} recursos visuais{gaps.length?` · ${gaps.length} pré-requisitos com texto a recuperar`:''}</p><a href={`#exercicios/${t.id}`}>Abrir exercícios</a></li>})}</ul>
 {available.length===0&&<p>Nenhuma aula publicada corresponde à busca.</p>}
 <label className="checkbox"><input type="checkbox" checked={showPending} onChange={e=>setShowPending(e.target.checked)}/>Mostrar referências editoriais pendentes ({pending.length})</label>
 {showPending&&<><h2>Referências ainda sem aula completa disponível</h2><p>Os códigos e títulos preservam o histórico de produção. O texto integral destes materiais não foi recuperado ou ainda não foi convertido ao padrão de publicação; por isso, eles ainda não abrem uma aula.</p><ul className="editorial">{waiting.map(t=><li key={t.id}><span className="code">{t.id}</span><h3>{t.title}</h3><span className="tag">{t.editorialStatus}</span>{'note' in t&&<p>{t.note}</p>}</li>)}</ul>{waiting.length===0&&<p>Nenhuma referência pendente corresponde à busca.</p>}</>}
 </>;
}