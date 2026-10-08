import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
function axeSummary(report:Awaited<ReturnType<AxeBuilder['analyze']>>){return report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,html:n.html}))}));}
test('catálogo integral, trilha V2, busca, pré-requisitos e simulado recuperado',async({page})=>{
 await page.goto('./#aulas');await expect(page.getByRole('heading',{name:'Aulas e conteúdos'})).toBeVisible();
 await expect(page.locator('.lesson-catalog li')).toHaveCount(50);
 await expect(page.getByRole('link',{name:'Começar a trilha ativa V2'})).toHaveAttribute('href','#aula/MAT-NUM-001');
 await page.getByRole('searchbox').fill('POR-LEI-001');await expect(page.locator('.lesson-catalog li')).toHaveCount(1);await expect(page.locator('.lesson-catalog h2 a')).toHaveText('Leitura literal: localizar informação explícita');
 await page.getByRole('searchbox').fill('MAT-EST-067');await expect(page.locator('.lesson-catalog li')).toHaveCount(1);
 await page.locator('.lesson-catalog h2 a').click();await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('.dependency-warning')).toBeVisible();await expect(page.locator('.lesson-gallery img')).toHaveCount(6);
 const axe=await new AxeBuilder({page}).analyze();expect(axeSummary(axe)).toEqual([]);
 await page.goto('./#simulados');await page.getByRole('link',{name:'Responder às questões'}).click();await expect(page.locator('.practice-question')).toHaveCount(48);
});
test('MAT-NUM-001 aponta para POR-LEI-001 sem consolidar automaticamente',async({page})=>{
 await page.goto('./#aula/MAT-NUM-001');
 await expect(page.getByRole('heading',{level:1,name:'Sistema de numeração decimal e valor posicional'})).toBeVisible();
 await expect(page.locator('.lesson-gallery img')).toHaveCount(5);await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('link',{name:'Próxima aula →'})).toHaveAttribute('href','#aula/POR-LEI-001');
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 const consolidated=page.getByRole('option',{name:'consolidado',exact:true});await expect(consolidated).toHaveAttribute('disabled','');expect(await consolidated.evaluate(el=>(el as HTMLOptionElement).disabled)).toBe(true);
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});
test('POR-LEI-001 publica teoria, quatro visuais, vídeo e 26 questões',async({page})=>{
 await page.goto('./#aula/POR-LEI-001');
 await expect(page.getByRole('heading',{level:1,name:'Leitura literal: localizar informação explícita'})).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('.lesson-gallery img')).toHaveCount(4);await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('heading',{name:'Vídeo complementar'})).toBeVisible();await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();
 await expect(page.getByText('Próximo tópico: BIO-FUN-001 · ainda indisponível')).toBeVisible();
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});
test('gabarito após tentativa, persistência e ausência de consolidação automática',async({page})=>{
 await page.goto('./#exercicios/MAT-EST-001');const first=page.locator('.practice-question').first();
 const answer=first.getByRole('textbox');await expect(answer).toBeVisible();
 const show=first.getByRole('button',{name:'Consultar gabarito'});await expect(show).toBeDisabled();await expect(first.locator('.solution')).toHaveCount(0);
 await answer.fill('A população contém todas as unidades; a amostra contém uma parte.');await expect(show).toBeDisabled();await first.getByRole('button',{name:'Salvar tentativa'}).click();await expect(show).toBeEnabled();await show.click();await expect(first.locator('.solution')).toBeVisible();
 await page.waitForFunction(()=>new Promise(resolve=>{const r=indexedDB.open('reconstrucao-escolar');r.onsuccess=()=>{const q=r.result.transaction('study').objectStore('study').get('current');q.onsuccess=()=>{r.result.close();resolve(q.result?.answers?.['MAT-EST-001-EX-APR-01']?.includes('população'))}}}));
 await page.reload();await expect(page.locator('.practice-question').first().getByRole('textbox')).toHaveValue('A população contém todas as unidades; a amostra contém uma parte.');
 await page.goto('./#aula/MAT-EST-001');await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 const consolidated=page.getByRole('option',{name:'consolidado',exact:true});await expect(consolidated).toHaveAttribute('disabled','');expect(await consolidated.evaluate(el=>(el as HTMLOptionElement).disabled)).toBe(true);
});
test('aulas, tabelas e recursos funcionam em celular e base de publicação',async({page})=>{
 test.setTimeout(60000);await page.setViewportSize({width:390,height:844});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of ['MAT-EST-001','MAT-EST-008','MAT-EST-011','MAT-EST-048','MAT-EST-067']){
  await page.goto('./#aula/'+id);await expect(page.locator('.lesson-body')).toBeVisible();await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const img of await page.locator('.lesson-gallery img').all()){const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);}const download=page.getByRole('link',{name:'Baixar texto integral'});expect((await page.request.get((await download.getAttribute('href'))!)).ok()).toBe(true);
 }
 for(const id of ['MAT-NUM-001','POR-LEI-001']){await page.goto('./#aula/'+id);await expect(page.locator('.lesson-body')).toBeVisible();await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);for(const img of await page.locator('.lesson-gallery img').all()){const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);}}
 expect(errors).toEqual([]);const axe=await new AxeBuilder({page}).analyze();expect(axeSummary(axe)).toEqual([]);await page.screenshot({path:'test-results/lesson-mobile.png'});
});