import fs from 'node:fs';
import assert from 'node:assert/strict';

const catalog=JSON.parse(fs.readFileSync('src/content/v2-catalog-extra.json','utf8'));
assert.equal(catalog.length,1,'Catálogo V2 complementar deve conter apenas a aula em integração.');
const topic=catalog[0];
const lesson=(await import('../src/content/lessons/FIL-FUN-001.mjs')).default;
const bank=(await import('../src/content/questions/FIL-FUN-001.mjs')).default;

assert.equal(topic.id,'FIL-FUN-001');
assert.equal(topic.editorialStatus,'publicado');
assert.equal(lesson.id,topic.id);
assert.equal(lesson.sections.length,48);
assert.equal(lesson.visuals.length,topic.visualCount);
assert.deepEqual(lesson.prerequisites,topic.prerequisites);
assert.equal(lesson.next,topic.next);
assert(lesson.audioVersion&&lesson.sources.length,'Aula complementar incompleta.');

const validateVisual=(v,label)=>{
 assert(v.url&&v.alt&&v.caption&&v.observe&&v.conclusion,`Visual incompleto: ${label}`);
 assert(!v.url.startsWith('/')&&!v.url.includes('..'),`Caminho inválido: ${v.url}`);
 assert(fs.existsSync('public/'+v.url),`Arquivo visual ausente: ${v.url}`);
};
for(const v of lesson.visuals)validateVisual(v,v.url);
for(const section of lesson.sections)for(const v of section.visuals||[])validateVisual(v,section.id);

const complements=(lesson.videos||[lesson.video]).filter(Boolean);
assert(complements.length,'Vídeo complementar ausente.');
assert(complements.some(v=>v.checkedAt),'Vídeo complementar sem verificação.');
for(const v of complements)assert(v.url.startsWith('https://')&&v.verification,'Vídeo complementar inválido.');
for(const source of lesson.sources)assert(source.url?.startsWith('https://'),'Fonte inválida.');

assert.equal(bank.length,26);
assert.deepEqual(bank.map(q=>q.id),topic.exercises);
const layers=[...lesson.learning,...lesson.consolidation,...lesson.entrance,...lesson.retest];
assert.deepEqual(layers,topic.exercises);
for(const q of bank){
 assert(['oficial','autoral','adaptada'].includes(q.origin),`Origem inválida: ${q.id}`);
 assert(q.statement&&q.answer&&q.resolution,`Questão incompleta: ${q.id}`);
 assert.deepEqual(q.topics,[topic.id]);
 assert.equal(q.layer,q.id.match(/-EX-(APR|CON|VES|TRA|RET)-/)[1]);
 assert(q.source?.url?.startsWith('https://'),`Fonte da questão inválida: ${q.id}`);
}

console.log('FIL-FUN-001 válida: 48 seções, 4 visuais e 26 questões.');
