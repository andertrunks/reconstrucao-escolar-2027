import {useEffect,useState} from 'react';
import {loadQuestions,topics,questionCount} from './catalog';
import type {Question,StudyState} from './model';
import Practice from './Practice';
export default function ExercisesPage({id,state,update}:{id?:string;state:StudyState;update:(f:(s:StudyState)=>StudyState)=>void}){
 const [bank,setBank]=useState<Question[]>(),[error,setError]=useState('');
 useEffect(()=>{let active=true;setBank(undefined);setError('');if(id)loadQuestions(id).then(v=>{if(active)setBank(v)}).catch(()=>{if(active)setError('Esta lista ainda não está disponível.')});return()=>{active=false}},[id]);
 const topic=topics.find(t=>t.id===id);
 return <><p className="eyebrow">PRÁTICA COM PROPÓSITO</p><h1>{topic?`Exercícios · ${topic.id}`:'Exercícios'}</h1>{id?<><p>{topic?.title}</p><a href={`#aula/${id}`}>Ler a aula completa</a>{error?<p>{error}</p>:bank?<section><h2>Questões e tentativas</h2><Practice questions={bank} state={state} update={update}/></section>:<p>Carregando exercícios…</p>}</>:<><p className="intro">{questionCount} questões de aprendizagem, consolidação, vestibular, transferência e reteste. Consulte o gabarito depois da sua tentativa.</p><a href="#diagnostico/DIA-001-P1">Abrir as 37 questões do diagnóstico inicial</a><div className="cards">{topics.filter(t=>t.editorialStatus==='publicado').map(t=><section className="card" key={t.id}><p className="eyebrow">{t.id}</p><h2>{t.title}</h2><p>{t.exercises.length} questões</p><a href={`#exercicios/${t.id}`}>Abrir exercícios</a></section>)}</div></>}</>;
}
