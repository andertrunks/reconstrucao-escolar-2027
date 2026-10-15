import legacyTopics from './content/catalog.json';
import v2BaseTopics from './content/v2-catalog.json';
import v2ExtraTopics from './content/v2-catalog-extra.json';
import v2RedParTopics from './content/v2-catalog-red-par.json';
import v2FisCinTopics from './content/v2-catalog-fis-cin.json';
import v2GeoOriTopics from './content/v2-catalog-geo-ori.json';
import v2MatFraTopics from './content/v2-catalog-mat-fra.json';
import v2QuiMisTopics from './content/v2-catalog-qui-mis.json';
import v2IngGraTopics from './content/v2-catalog-ing-gra.json';
import v2PorFra002Topics from './content/v2-catalog-por-fra-002.json';
import v2LitNarTopics from './content/v2-catalog-lit-nar.json';
import v2MatFra002Topics from './content/v2-catalog-mat-fra-002.json';
import v2FilLogTopics from './content/v2-catalog-fil-log.json';
import v2SocDesTopics from './content/v2-catalog-soc-des.json';
import v2ArtComTopics from './content/v2-catalog-art-com.json';
import type {Lesson,TopicSummary,Question} from './model';
const v2Topics=[...v2BaseTopics,...v2ExtraTopics,...v2RedParTopics,...v2FisCinTopics,...v2GeoOriTopics,...v2MatFraTopics,...v2QuiMisTopics,...v2IngGraTopics,...v2PorFra002Topics,...v2LitNarTopics,...v2MatFra002Topics,...v2FilLogTopics,...v2SocDesTopics,...v2ArtComTopics];
export const topics=[...v2Topics,...legacyTopics] as TopicSummary[];
export const questionCount=topics.reduce((n,t)=>n+t.exercises.length,0);
export const subjects=[['MAT','Matemática'],['POR','Língua Portuguesa'],['RED','Redação'],['LIT','Literatura'],['FIS','Física'],['QUI','Química'],['BIO','Biologia'],['HIS','História'],['GEO','Geografia'],['FIL','Filosofia'],['SOC','Sociologia'],['ING','Inglês'],['ART','Arte'],['EDF','Educação Física']];
export const levels=['Fundamentos Essenciais','Ensino Fundamental II','Ensino Médio','Aprofundamento de Vestibular','Consolidação','Ponte Universitária'];
const lessons={...import.meta.glob<Lesson>('./content/lessons/*.json',{import:'default'}),...import.meta.glob<Lesson>('./content/lessons/*.mjs',{import:'default'})};
export async function loadLesson(id:string){const loader=lessons[`./content/lessons/${id}.json`]||lessons[`./content/lessons/${id}.mjs`];if(!loader)throw new Error('Aula ainda não disponível.');return loader();}
const questionBanks={...import.meta.glob<Question[]>('./content/questions/*.json',{import:'default'}),...import.meta.glob<Question[]>('./content/questions/*.mjs',{import:'default'})};
export async function loadQuestions(id:string){const loader=questionBanks[`./content/questions/${id}.json`]||questionBanks[`./content/questions/${id}.mjs`];if(!loader)throw new Error('Exercícios ainda não disponíveis.');return loader();}
