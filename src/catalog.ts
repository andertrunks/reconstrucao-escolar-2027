import legacyTopics from './content/catalog.json';
import v2BaseTopics from './content/v2-catalog.json';
import v2ExtraTopics from './content/v2-catalog-extra.json';
import type {Lesson,TopicSummary,Question} from './model';
const v2Topics=[...v2BaseTopics,...v2ExtraTopics];
export const topics=[...v2Topics,...legacyTopics] as TopicSummary[];
export const questionCount=topics.reduce((n,t)=>n+t.exercises.length,0);
export const subjects=[['MAT','Matemática'],['POR','Língua Portuguesa'],['RED','Redação'],['LIT','Literatura'],['FIS','Física'],['QUI','Química'],['BIO','Biologia'],['HIS','História'],['GEO','Geografia'],['FIL','Filosofia'],['SOC','Sociologia'],['ING','Inglês'],['ART','Arte'],['EDF','Educação Física']];
export const levels=['Fundamentos Essenciais','Ensino Fundamental II','Ensino Médio','Aprofundamento de Vestibular','Consolidação','Ponte Universitária'];
const lessons={...import.meta.glob<Lesson>('./content/lessons/*.json',{import:'default'}),...import.meta.glob<Lesson>('./content/lessons/*.mjs',{import:'default'})};
export async function loadLesson(id:string){const loader=lessons[`./content/lessons/${id}.json`]||lessons[`./content/lessons/${id}.mjs`];if(!loader)throw new Error('Aula ainda não disponível.');return loader();}
const questionBanks={...import.meta.glob<Question[]>('./content/questions/*.json',{import:'default'}),...import.meta.glob<Question[]>('./content/questions/*.mjs',{import:'default'})};
export async function loadQuestions(id:string){const loader=questionBanks[`./content/questions/${id}.json`]||questionBanks[`./content/questions/${id}.mjs`];if(!loader)throw new Error('Exercícios ainda não disponíveis.');return loader();}
