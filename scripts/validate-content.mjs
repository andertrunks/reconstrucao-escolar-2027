import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const topics=read('src/content/topics.json'),questions=read('src/content/questions.json'),diag=read('src/content/diagnostic.json'),index=read('src/content/editorial-index.json');
const ids=new Set();
for(const item of [...topics,...questions,...diag.questions]){assert(!ids.has(item.id),`ID duplicado: ${item.id}`);ids.add(item.id);assert(item.source?.url,`Fonte ausente: ${item.id}`);}
assert.equal(diag.questions.length,37);assert.equal(new Set(index.map(x=>x.id)).size,index.length);
const byId=new Map(topics.map(t=>[t.id,t]));
const visit=(id,path=[])=>{assert(!path.includes(id),`Ciclo de pré-requisitos: ${id}`);const t=byId.get(id);assert(t,`Pré-requisito ausente: ${id}`);for(const p of t.prerequisites)visit(p,[...path,id]);};
for(const t of topics){visit(t.id);for(const id of [...t.related,...(t.next?[t.next]:[])])assert(byId.has(id),`Relação ausente: ${id}`);if(t.editorialStatus==='publicado'){const file=`src/content/lessons/${t.id}.json`;assert(fs.existsSync(file),`Aula ausente: ${t.id}`);const l=read(file);assert.equal(l.id,t.id);assert(l.sections.length&&l.audioVersion&&l.sources.length,`Aula incompleta: ${t.id}`);if(l.video)assert(l.video.checkedAt&&l.video.url.startsWith('https://'),`Vídeo não validado: ${t.id}`);}}
for(const q of questions){assert(['oficial','autoral','adaptada'].includes(q.origin));for(const id of q.topics)assert(byId.has(id),`Tópico da questão ausente: ${id}`);if(q.reviewStatus==='revisado')assert(q.answer&&q.resolution,`Correção incompleta: ${q.id}`);}
console.log(`Conteúdo válido: ${topics.length} tópicos publicados/estruturados, ${diag.questions.length} itens diagnósticos, ${index.length} referências editoriais.`);
