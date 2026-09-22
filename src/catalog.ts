import rawTopics from './content/topics.json';
import rawQuestions from './content/questions.json';
import type {Lesson,Topic,Question} from './model';
export const topics=rawTopics as Topic[];
export const questions=rawQuestions as Question[];
export const subjects=[['MAT','Matemática'],['POR','Língua Portuguesa'],['RED','Redação'],['LIT','Literatura'],['FIS','Física'],['QUI','Química'],['BIO','Biologia'],['HIS','História'],['GEO','Geografia'],['FIL','Filosofia'],['SOC','Sociologia'],['ING','Inglês'],['ART','Arte'],['EDF','Educação Física']];
export const levels=['Fundamentos Essenciais','Ensino Fundamental II','Ensino Médio','Aprofundamento de Vestibular','Consolidação','Ponte Universitária'];
const lessons=import.meta.glob<Lesson>('./content/lessons/*.json',{import:'default'});
export async function loadLesson(id:string){const loader=lessons[`./content/lessons/${id}.json`];if(!loader)throw new Error('Aula ainda não disponível.');return loader();}
