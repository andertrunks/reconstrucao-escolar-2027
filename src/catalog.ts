import legacyTopics from './content/catalog.json';
import v2Topics from './content/v2-catalog.json';
import type {Lesson,TopicSummary,Question} from './model';
export const topics=[...v2Topics,...legacyTopics] as TopicSummary[];
export const questionCount=topics.reduce((n,t)=>n+t.exercises.length,0);
export const subjects=[['MAT','Matemática'],['POR','Língua Portuguesa'],['RED','Redação'],['LIT','Literatura'],['FIS','Física'],['QUI','Química'],['BIO','Biologia'],['HIS','História'],['GEO','Geografia'],['FIL','Filosofia'],['SOC','Sociologia'],['ING','Inglês'],['ART','Arte'],['EDF','Educação Física']];
export const levels=['Fundamentos Essenciais','Ensino Fundamental II','Ensino Médio','Aprofundamento de Vestibular','Consolidação','Ponte Universitária'];
const lessons=import.meta.glob<Lesson>('./content/lessons/*.json',{import:'default'});
export async function loadLesson(id:string){const loader=lessons[`./content/lessons/${id}.json`];if(!loader)throw new Error('Aula ainda não disponível.');return loader();}
const questionBanks=import.meta.glob<Question[]>('./content/questions/*.json',{import:'default'});
export async function loadQuestions(id:string){const loader=questionBanks[`./content/questions/${id}.json`];if(!loader)throw new Error('Exercícios ainda não disponíveis.');return loader();}