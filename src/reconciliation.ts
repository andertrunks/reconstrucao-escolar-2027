import type {StudyState,StudyHistory,Revision} from './model';

// Sort object keys so equality and tie-breaking do not depend on device order.
function canonical(value:unknown):string{
 if(value===null||typeof value!=='object')return JSON.stringify(value);
 if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;
 return `{${Object.entries(value).sort(([a],[b])=>a.localeCompare(b,'en')).map(([k,v])=>`${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
}
function union<T>(...lists:Revision<T>[][]):Revision<T>[] {
 const revisions=new Map<string,Revision<T>>();
 for(const revision of lists.flat()){
  // Equal values are the same semantic version even when two devices stamped
  // them at different instants. Keep the newest stamp and avoid history bloat.
  const key=canonical(revision.value),existing=revisions.get(key);
  if(!existing||Date.parse(revision.at)>Date.parse(existing.at))revisions.set(key,structuredClone(revision));
 }
 return [...revisions.values()].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at)||(canonical(a.value)<canonical(b.value)?-1:canonical(a.value)>canonical(b.value)?1:0));
}
function seed<T>(values:Record<string,T>,history:Record<string,Revision<T>[]>,at:string){
 const result:Record<string,Revision<T>[]>=Object.assign(Object.create(null),structuredClone(history));
 for(const [id,value] of Object.entries(values)){
  const existing=result[id]??[];
  // A snapshot may have a newer global timestamp solely because another item changed.
  result[id]=existing.some(r=>canonical(r.value)===canonical(value))?union(existing):union(existing,[{at,value}]);
 }
 return result;
}
export function studyHistory(state:StudyState):StudyHistory{
 return {
  answers:seed(state.answers,state.history?.answers??{},state.updatedAt),
  topics:seed(state.topics,state.history?.topics??{},state.updatedAt),
  errors:seed(Object.fromEntries(state.errors.map(e=>[e.id,e])),state.history?.errors??{},state.updatedAt),
 };
}
function join<T>(a:Record<string,Revision<T>[]>,b:Record<string,Revision<T>[]>){
 return Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].sort().map(id=>[id,union(a[id]??[],b[id]??[])]));
}
function latest<T>(entries:Record<string,Revision<T>[]>,accept:(value:T)=>boolean=()=>true):Record<string,T>{
 return Object.fromEntries(Object.entries(entries).map(([id,versions])=>{
  const eligible=versions.filter(r=>accept(r.value));
  return [id,structuredClone((eligible.length?eligible:versions).at(-1)!.value)];
 }));
}
/** Preserve observed versions; never add counters from snapshots (that double-counts attempts). */
export function reconcileStudy(a:StudyState,b:StudyState):StudyState{
 const ah=studyHistory(a),bh=studyHistory(b);
 const history:StudyHistory={answers:join(ah.answers,bh.answers),topics:join(ah.topics,bh.topics),errors:join(ah.errors,bh.errors)};
 const newer=Date.parse(a.updatedAt)>Date.parse(b.updatedAt)?a:Date.parse(a.updatedAt)<Date.parse(b.updatedAt)?b:canonical(a)<canonical(b)?b:a;
 return {...structuredClone(newer),history,answers:latest(history.answers,v=>Boolean(v.trim())),topics:latest(history.topics),errors:Object.values(latest(history.errors))};
}
/** Stamp only real edits. Seeding the previous snapshot protects untouched legacy items. */
export function recordStudyUpdate(previous:StudyState,next:StudyState,at=new Date().toISOString()):StudyState{
 const history=studyHistory(previous);
 if(next.history){
  history.answers=join(history.answers,next.history.answers);
  history.topics=join(history.topics,next.history.topics);
  history.errors=join(history.errors,next.history.errors);
 }
 function changed<T>(old:Record<string,T>,values:Record<string,T>,entries:Record<string,Revision<T>[]>) {
  for(const [id,value] of Object.entries(values)){
   const hadPrevious=Object.hasOwn(old,id);
   if(hadPrevious&&canonical(old[id])===canonical(value))continue;
   const existing=Object.hasOwn(entries,id)?entries[id]:[];
   // The value that was active in `previous` is a proven causal parent of this
   // edit and may be compacted. Other observed versions stay: they can represent
   // unresolved concurrent edits and must not be discarded as mere ancestors.
   const retained=hadPrevious?existing.filter(r=>canonical(r.value)!==canonical(old[id])):existing;
   Object.defineProperty(entries,id,{value:union(retained,[{at,value}]),enumerable:true,writable:true,configurable:true});
  }
 }
 changed(previous.answers,next.answers,history.answers);
 changed(previous.topics,next.topics,history.topics);
 changed(Object.fromEntries(previous.errors.map(e=>[e.id,e])),Object.fromEntries(next.errors.map(e=>[e.id,e])),history.errors);
 return {...next,history,updatedAt:at};
}
