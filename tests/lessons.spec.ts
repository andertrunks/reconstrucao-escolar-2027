import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
function axeSummary(report:Awaited<ReturnType<AxeBuilder['analyze']>>){return report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,html:n.html}))}));}
const v2=[
 ['MAT-NUM-001',5,'POR-LEI-001'],['POR-LEI-001',4,'BIO-FUN-001'],['BIO-FUN-001',5,'HIS-FUN-001'],
 ['HIS-FUN-001',5,'RED-FRA-001'],['RED-FRA-001',5,'FIS-MED-001'],['FIS-MED-001',5,'GEO-FUN-001'],
 ['GEO-FUN-001',5,'MAT-OPE-001'],['MAT-OPE-001',5,'QUI-MAT-001'],['QUI-MAT-001',5,'ING-LEI-001'],
 ['ING-LEI-001',5,'POR-FRA-001'],['POR-FRA-001',5,'LIT-FUN-001'],['LIT-FUN-001',5,'MAT-OPE-002'],
 ['MAT-OPE-002',3,'FIL-FUN-001'],['FIL-FUN-001',4,'SOC-FUN-001'],['SOC-FUN-001',4,'ART-FUN-001'],
 ['ART-FUN-001',5,'MAT-DIV-001'],['MAT-DIV-001',5,'POR-LEI-002'],['POR-LEI-002',5,'BIO-CEL-001']
] as const;

test('catálogo integral, trilha V2, busca, pré-requisitos e simulado recuperado',async({page})=>{
 await page.goto('./#aulas');await expect(page.getByRole('heading',{name:'Aulas e conteúdos'})).toBeVisible();
 await expect(page.locator('.lesson-catalog li')).toHaveCount(67);
 await expect(page.getByRole('link',{name:'Começar a trilha ativa V2'})).toHaveAttribute('href','#aula/MAT-NUM-001');
 await page.getByRole('searchbox').fill('LIT-FUN-001');await expect(page.locator('.lesson-catalog li')).toHaveCount(1);await expect(page.locator('.lesson-catalog h2 a')).toHaveText('Texto literário, linguagem e efeito de sentido');
 await page.getByRole('searchbox').fill('MAT-EST-067');await expect(page.locator('.lesson-catalog li')).toHaveCount(1);
 await page.locator('.lesson-catalog h2 a').click();await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('.dependency-warning')).toBeVisible();await expect(page.locator('.lesson-gallery img')).toHaveCount(6);
 expect(axeSummary(await new AxeBuilder({page}).analyze())).toEqual([]);
 await page.goto('./#simulados');await page.getByRole('link',{name:'Responder às questões'}).click();await expect(page.locator('.practice-question')).toHaveCount(48);
});

test('trilha V2 publicada mantém conteúdo, questões, navegação e acessibilidade',async({page})=>{
 for(const [id,visuals,next] of v2){
  await page.goto('./#aula/'+id);
  await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
  await expect(page.locator('.lesson-gallery img')).toHaveCount(visuals);
  await expect(page.locator('.practice-question')).toHaveCount(26);
  await expect(page.getByRole('link',{name:'Próxima aula →'})).toHaveAttribute('href','#aula/'+next);
  await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
  const consolidated=page.getByRole('option',{name:'consolidado',exact:true});await expect(consolidated).toHaveAttribute('disabled','');
 }
 await page.goto('./#aula/BIO-CEL-001');
 await expect(page.getByText('Próximo tópico: HIS-HUM-001 · ainda indisponível')).toBeVisible();
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});

test('gabarito após tentativa, persistência e ausência de consolidação automática',async({page})=>{
 await page.goto('./#exercicios/MAT-EST-001');const first=page.locator('.practice-question').first();const answer=first.getByRole('textbox');await expect(answer).toBeVisible();const show=first.getByRole('button',{name:'Consultar gabarito'});await expect(show).toBeDisabled();await expect(first.locator('.solution')).toHaveCount(0);await answer.fill('A população contém todas as unidades; a amostra contém uma parte.');await expect(show).toBeDisabled();await first.getByRole('button',{name:'Salvar tentativa'}).click();await expect(show).toBeEnabled();await show.click();await expect(first.locator('.solution')).toBeVisible();await page.waitForFunction(()=>new Promise(resolve=>{const r=indexedDB.open('reconstrucao-escolar');r.onsuccess=()=>{const q=r.result.transaction('study').objectStore('study').get('current');q.onsuccess=()=>{r.result.close();resolve(q.result?.answers?.['MAT-EST-001-EX-APR-01']?.includes('população'))}}}));await page.reload();await expect(page.locator('.practice-question').first().getByRole('textbox')).toHaveValue('A população contém todas as unidades; a amostra contém uma parte.');await page.goto('./#aula/MAT-EST-001');await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');const consolidated=page.getByRole('option',{name:'consolidado',exact:true});await expect(consolidated).toHaveAttribute('disabled','');expect(await consolidated.evaluate(el=>(el as HTMLOptionElement).disabled)).toBe(true);
});

test('aulas, tabelas e recursos funcionam em celular e base de publicação',async({page})=>{
 test.setTimeout(60000);await page.setViewportSize({width:390,height:844});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of ['MAT-EST-001','MAT-EST-008','MAT-EST-011','MAT-EST-048','MAT-EST-067']){await page.goto('./#aula/'+id);await expect(page.locator('.lesson-body')).toBeVisible();await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);for(const img of await page.locator('.lesson-gallery img').all()){const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);}const download=page.getByRole('link',{name:'Baixar texto integral'});expect((await page.request.get((await download.getAttribute('href'))!)).ok()).toBe(true);}
 for(const [id] of [...v2,['BIO-CEL-001',5,'HIS-HUM-001'] as const]){await page.goto('./#aula/'+id);await expect(page.locator('.lesson-body')).toBeVisible();await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);for(const img of await page.locator('.lesson-gallery img').all()){const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);}}
 expect(errors).toEqual([]);expect(axeSummary(await new AxeBuilder({page}).analyze())).toEqual([]);await page.screenshot({path:'test-results/lesson-mobile.png'});
});
