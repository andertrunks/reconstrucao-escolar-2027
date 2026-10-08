import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('rotas, console, tema e acessibilidade',async({page})=>{
 test.setTimeout(60000);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const routes:[string,RegExp][]=[
  ['inicio',/Seu próximo passo/],['trilhas',/Trilhas de aprendizagem/],['materias',/^Matérias$/],['aulas',/^Aulas e conteúdos$/],['exercicios',/^Exercícios$/],['simulados',/^Simulados$/],['redacao',/^Redação$/],['leituras',/^Leituras$/],['progresso',/^Progresso$/],['erros',/^Caderno de Erros$/],
 ];
 for(const [route,heading] of routes){
  await page.goto('./#'+route);
  await expect(page.getByRole('heading',{level:1,name:heading})).toBeVisible();
  await expect(page.getByText('Carregando seu percurso…')).toHaveCount(0);
  const a=await new AxeBuilder({page}).analyze();
  expect(a.violations.map(x=>x.id+' '+x.description),`Acessibilidade da rota #${route}`).toEqual([]);
 }
 await page.getByRole('button',{name:'Ativar modo escuro'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','escuro');expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);expect(errors).toEqual([]);
});
test('salva diagnóstico, preserva retomada e mantém a trilha V2 como próximo estudo',async({page})=>{
 await page.goto('./#diagnostico/DIA-001-M1');await page.getByLabel('Sua resposta e os passos que utilizou').fill('85. Somei dezenas e unidades.');await page.getByRole('button',{name:'Próxima →'}).click();await expect(page.getByRole('heading',{name:'M2 · Registre seu raciocínio'})).toBeVisible();await page.getByLabel('Sua resposta e os passos que utilizou').fill('46');await page.waitForFunction(()=>new Promise(resolve=>{const r=indexedDB.open('reconstrucao-escolar');r.onsuccess=()=>{const q=r.result.transaction('study').objectStore('study').get('current');q.onsuccess=()=>{r.result.close();resolve(q.result?.answers?.['DIA-001-M2']==='46')}}}));await page.reload();await expect(page.getByLabel('Sua resposta e os passos que utilizou')).toHaveValue('46');
 await page.goto('./#inicio');await expect(page.getByRole('link',{name:'Abrir próxima aula'})).toHaveAttribute('href','#aula/MAT-NUM-001');await page.getByRole('link',{name:'Abrir próxima aula'}).click();await expect(page).toHaveURL(/#aula\/MAT-NUM-001$/);await expect(page.getByRole('heading',{level:1,name:'Sistema de numeração decimal e valor posicional'})).toBeVisible();
 await page.goto('./#inicio');await page.getByRole('link',{name:'Abrir diagnóstico inicial'}).click();await expect(page).toHaveURL(/DIA-001-M2/);
 await page.goto('./#erros');await page.getByLabel('Questão ou tópico').fill('DIA-001-M2');await page.getByLabel('Tipo de erro').selectOption('cálculo');await page.getByLabel('O que revisar e como tentar novamente').fill('Rever o reagrupamento.');await page.getByRole('button',{name:'Registrar erro'}).click();await expect(page.getByRole('heading',{name:'DIA-001-M2 · cálculo'})).toBeVisible();
});
test('celular, teclado, trilha V2 e diagnóstico acessível',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('./#inicio');await expect(page.getByRole('link',{name:'Abrir próxima aula'})).toBeVisible();await expect(page.getByRole('link',{name:'Abrir diagnóstico inicial'})).toBeVisible();await expect(page.getByText('Carregando seu percurso…')).toHaveCount(0);await page.keyboard.press('Tab');await expect(page.getByText('Pular para o conteúdo')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.goto('./#diagnostico/DIA-001-P1');await expect(page.getByLabel('Sua resposta e os passos que utilizou')).toBeVisible();expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);});
