import type {Topic} from './model';
export function mediaUrl(path:string){return /^https?:\/\//.test(path)?path:`${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;}
export function dependencyGaps(id:string, topics:Pick<Topic,'id'|'prerequisites'|'editorialStatus'>[]):string[]{
 const byId=new Map(topics.map(t=>[t.id,t])),visited=new Set<string>(),gaps=new Set<string>();
 const visit=(current:string)=>{if(visited.has(current))return;visited.add(current);const t=byId.get(current);if(!t||t.editorialStatus!=='publicado'){gaps.add(current);return;}t.prerequisites.forEach(visit);};
 visit(id);return [...gaps].sort();
}
