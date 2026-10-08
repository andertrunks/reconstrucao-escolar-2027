import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const topics=read('src/content/topics.json'),catalog=read('src/content/catalog.json'),v2Catalog=read('src/content/v2-catalog.json'),questions=read('src/content/questions.json'),diag=read('src/content/diagnostic.json'),index=read('src/content/editorial-index.json'),refs=read('src/content/prerequisite-references.json');
const ids=new Set();
for(const item of [...topics,...questions,...diag.questions]){assert(!ids.has(item.id),`ID duplicado: ${item.id}`);ids.add(item.id);assert(item.source?.url,`Fonte ausente: ${item.id}`);}
for(const item of v2Catalog){assert(!ids.has(item.id),`ID V2 duplicado: ${item.id}`);ids.add(item.id);}
assert.equal(diag.questions.length,37);assert.equal(new Set(index.map(x=>x.id)).size,index.length);
assert.equal(catalog.length,topics.length);
for(const c of catalog){const t=topics.find(t=>t.id===c.id);assert(t,`Catálogo sem aula: ${c.id}`);assert.equal(c.title,t.title);assert.equal(c.visualCount,t.visuals.length);assert.deepEqual(c.exercises,t.exercises);assert.deepEqual(c.prerequisites,t.prerequisites);}
const byId=new Map(topics.map(t=>[t.id,t])),v2ById=new Map(v2Catalog.map(t=>[t.id,t])),refById=new Map(refs.map(t=>[t.id,t])),summaryById=new Map(questions.map(q=>[q.id,q]));
for(const ref of refs){assert(!byId.has(ref.id),`Referência substitui aula: ${ref.id}`);assert(ref.source.url&&ref.note&&['conteúdo a recuperar','planejado'].includes(ref.editorialStatus),`Referência sem proveniência: ${ref.id}`);}
const visited=new Set();
const visit=(id,path=[])=>{assert(!path.includes(id),`Ciclo de pré-requisitos: ${id}`);if(visited.has(id))return;const t=byId.get(id);if(!t){assert(refById.has(id)||v2ById.has(id),`Pré-requisito sem referência: ${id}`);return;}for(const p of t.prerequisites)visit(p,[...path,id]);visited.add(id);};
let totalQuestions=0,totalVisuals=0,shortAnswers=0;
const bankIds=new Set();
const asset=url=>{assert(!url.startsWith('/')&&!url.includes('..'),`Caminho inválido: ${url}`);assert(fs.existsSync('public/'+url),`Arquivo ausente: ${url}`);};
const validateVisual=(v,label)=>{asset(v.url);assert(v.alt&&v.caption&&v.observe&&v.conclusion,`Visual incompleto: ${label||v.url}`);};
for(const t of topics){
 visit(t.id);for(const id of [...t.related,...(t.next?[t.next]:[])])assert(byId.has(id)||refById.has(id)||v2ById.has(id),`Relação ausente: ${id}`);
 if(t.editorialStatus!=='publicado')continue;
 const l=read(`src/content/lessons/${t.id}.json`),bank=read(`src/content/questions/${t.id}.json`);
 assert.equal(l.id,t.id);assert(l.sections.length&&l.audioVersion&&l.sources.length,`Aula incompleta: ${t.id}`);
 assert.deepEqual(l.prerequisites,t.prerequisites);assert(l.publication,`Proveniência ausente: ${t.id}`);
 const original=fs.readFileSync('public/'+l.publication.original,'utf8');
 assert.equal(l.sections.map(s=>s.markdown).join(''),original,`Texto truncado: ${t.id}`);
 assert.equal(createHash('sha256').update(original).digest('hex'),l.publication.sourceSha256,`Hash divergente: ${t.id}`);
 const codepoints=Array.from(original);
 for(const s of l.sections)assert.equal(s.markdown,codepoints.slice(s.sourceStart,s.sourceEnd).join(''),`Seção divergente: ${s.id}`);
 for(const v of l.visuals){validateVisual(v);totalVisuals++;}
 for(const v of [...l.publication.editions,...l.publication.attachments])asset(v.url);
 assert(l.videos?.length,`Complemento ausente: ${t.id}`);
 assert(l.videos.some(v=>v.checkedAt),`Nenhum complemento disponível: ${t.id}`);
 for(const v of l.videos)assert(v.url.startsWith('https://')&&v.verification,`Complemento sem estado de verificação: ${t.id}`);
 assert.equal(bank.length,l.publication.questionCount);assert.equal(l.visuals.length,l.publication.visualCount);
 assert.deepEqual(bank.map(q=>q.id),t.exercises);
 const exerciseLayers=[...l.learning,...l.consolidation,...l.entrance,...(l.retest||[])];
 assert.equal(exerciseLayers.length,bank.length);assert.deepEqual(new Set(exerciseLayers),new Set(bank.map(q=>q.id)));
 for(const q of bank){
  assert(!bankIds.has(q.id),`Questão duplicada no banco: ${q.id}`);bankIds.add(q.id);
  assert(['oficial','autoral','adaptada'].includes(q.origin));assert(q.answer&&q.resolution&&q.statement,`Questão incompleta: ${q.id}`);
  assert.deepEqual(q.topics,[t.id]);assert.deepEqual(summaryById.get(q.id)?.topics,q.topics);
  assert.equal(summaryById.get(q.id)?.layer,q.layer);assert.equal(q.layer,q.id.match(/-EX-(APR|CON|VES|TRA|RET)-/)[1]);
  if(q.reviewNote)shortAnswers++;totalQuestions++;
 }
}
const legacyQuestions=totalQuestions;
assert.equal(legacyQuestions,questions.length);assert.deepEqual(bankIds,new Set(questions.map(q=>q.id)));
for(const t of v2Catalog){
 assert.equal(t.editorialStatus,'publicado',`Tópico V2 não publicável no catálogo ativo: ${t.id}`);
 assert(fs.existsSync(`src/content/lessons/${t.id}.json`),`Aula V2 ausente: ${t.id}`);assert(fs.existsSync(`src/content/questions/${t.id}.json`),`Banco V2 ausente: ${t.id}`);
 const l=read(`src/content/lessons/${t.id}.json`),bank=read(`src/content/questions/${t.id}.json`);
 assert.equal(l.id,t.id);assert(l.sections?.length&&l.audioVersion&&l.sources?.length,`Aula V2 incompleta: ${t.id}`);
 assert.deepEqual(l.prerequisites,t.prerequisites);assert.equal(l.next,t.next,`Próximo tópico divergente: ${t.id}`);
 for(const p of t.prerequisites)assert(byId.has(p)||v2ById.has(p)||refById.has(p),`Pré-requisito V2 sem referência: ${p}`);
 assert.equal(l.visuals.length,t.visualCount,`Contagem de visuais V2 divergente: ${t.id}`);
 for(const v of l.visuals){validateVisual(v);totalVisuals++;}
 for(const s of l.sections)for(const v of s.visuals||[])validateVisual(v,`${t.id}/${s.id}`);
 const complements=(l.videos||[l.video]).filter(Boolean);assert(complements.length,`Complemento V2 ausente: ${t.id}`);
 assert(complements.some(v=>v.checkedAt),`Nenhum complemento V2 verificado: ${t.id}`);
 for(const v of complements)assert(v.url.startsWith('https://')&&v.verification,`Complemento V2 sem verificação: ${t.id}`);
 for(const s of l.sources)assert(s.url?.startsWith('https://'),`Fonte V2 inválida: ${t.id}`);
 assert.equal(bank.length,t.exercises.length,`Contagem de questões V2 divergente: ${t.id}`);assert.deepEqual(bank.map(q=>q.id),t.exercises);
 const exerciseLayers=[...l.learning,...l.consolidation,...l.entrance,...(l.retest||[])];assert.equal(exerciseLayers.length,bank.length);assert.deepEqual(new Set(exerciseLayers),new Set(bank.map(q=>q.id)));
 for(const q of bank){
  assert(!bankIds.has(q.id),`Questão V2 duplicada no banco: ${q.id}`);assert(!ids.has(q.id),`ID V2 duplicado: ${q.id}`);bankIds.add(q.id);ids.add(q.id);
  assert(['oficial','autoral','adaptada'].includes(q.origin));assert(q.answer&&q.resolution&&q.statement,`Questão V2 incompleta: ${q.id}`);assert.deepEqual(q.topics,[t.id]);
  assert.equal(q.layer,q.id.match(/-EX-(APR|CON|VES|TRA|RET)-/)[1]);assert(q.source?.url,`Fonte da questão V2 ausente: ${q.id}`);totalQuestions++;
 }
}
console.log(`Conteúdo válido: ${topics.length+v2Catalog.length} aulas integrais, ${totalQuestions} questões, ${totalVisuals} visuais, ${diag.questions.length} itens diagnósticos; ${shortAnswers} respostas breves sinalizadas.`);