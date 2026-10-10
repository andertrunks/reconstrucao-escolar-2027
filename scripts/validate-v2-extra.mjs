import fs from 'node:fs';
import assert from 'node:assert/strict';

const catalog=JSON.parse(fs.readFileSync('src/content/v2-catalog-extra.json','utf8'));
assert(catalog.length>=1,'Catálogo V2 complementar vazio.');

const validateVisual=(v,label)=>{
  assert(v.url&&v.alt&&v.caption&&v.observe&&v.conclusion,`Visual incompleto: ${label}`);
  assert(!v.url.startsWith('/')&&!v.url.includes('..'),`Caminho inválido: ${v.url}`);
  assert(fs.existsSync('public/'+v.url),`Arquivo visual ausente: ${v.url}`);
};

for(const topic of catalog){
  const lesson=(await import(`../src/content/lessons/${topic.id}.mjs`)).default;
  const bank=(await import(`../src/content/questions/${topic.id}.mjs`)).default;

  assert.equal(topic.editorialStatus,'publicado');
  assert.equal(lesson.id,topic.id);
  assert(lesson.sections.length>0,`Aula sem seções: ${topic.id}`);
  assert.equal(lesson.visuals.length,topic.visualCount);
  assert.deepEqual(lesson.prerequisites,topic.prerequisites);
  assert.equal(lesson.next,topic.next);
  assert(lesson.audioVersion&&lesson.sources.length,`Aula complementar incompleta: ${topic.id}`);

  for(const v of lesson.visuals)validateVisual(v,v.url);
  for(const section of lesson.sections)for(const v of section.visuals||[])validateVisual(v,section.id);

  const complements=(lesson.videos||[lesson.video]).filter(Boolean);
  assert(complements.length,`Vídeo complementar ausente: ${topic.id}`);
  assert(complements.some(v=>v.checkedAt),`Vídeo complementar sem verificação: ${topic.id}`);
  for(const v of complements)assert(v.url.startsWith('https://')&&v.verification,`Vídeo complementar inválido: ${topic.id}`);
  for(const source of lesson.sources)assert(source.url?.startsWith('https://'),`Fonte inválida: ${topic.id}`);

  assert.equal(bank.length,topic.exercises.length,`Quantidade de questões divergente: ${topic.id}`);
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

  console.log(`${topic.id} válida: ${lesson.sections.length} seções, ${lesson.visuals.length} visuais e ${bank.length} questões.`);
}
