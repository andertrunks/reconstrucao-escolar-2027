import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('MAT-FUN-003 publica aula, cinco SVGs, vídeo e 26 questões',async({page})=>{await page.goto('./#aula/MAT-FUN-003');await expect(page.getByRole('heading',{level:1,name:"Função afim: valor inicial, taxa de variação e construção de gráficos"})).toBeVisible();await expect(page.locator('article[aria-label="Texto integral da aula"] section')).toHaveCount(64);await expect(page.locator('.lesson-gallery img')).toHaveCount(5);await expect(page.locator('.practice-question')).toHaveCount(26);await expect(page.getByRole('heading',{name:'Vídeo complementar',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();await expect(page.getByRole('link',{name:'← Aula anterior'})).toHaveAttribute('href','#aula/MAT-FUN-002');await expect(page.getByRole('link',{name:'Próxima aula →'})).toHaveAttribute('href','#aula/MAT-FUN-004');await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');await expect(page.getByRole('option',{name:'consolidado',exact:true})).toHaveAttribute('disabled','');expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);});
test('MAT-FUN-003 mantém gráficos e conteúdo em celular',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('./#aula/MAT-FUN-003');await expect(page.locator('.lesson-body')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);for(const img of await page.locator('.lesson-gallery img').all()){const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);}});

test('MAT-FUN-003 — lote 4: cinco infográficos coloridos, descritos e ampliáveis',async({page})=>{
 await page.goto('./#aula/MAT-FUN-003');
 const imgs=page.locator('.lesson-gallery img');
 await expect(imgs).toHaveCount(5);
 const zoom=page.locator('.lesson-gallery .visual-zoom-link a');
 await expect(zoom).toHaveCount(5);
 for(let i=0;i<5;i++){
  const img=imgs.nth(i);expect(await img.getAttribute('alt')).toBeTruthy();
  const src=await img.getAttribute('src');expect(src).toBeTruthy();
  const res=await page.request.get(src!);expect(res.ok()).toBe(true);
  const svg=await res.text();
  expect(svg).toContain('viewBox="0 0 1600 955"');
  expect(svg).toContain('aria-labelledby="title desc"');
  expect(svg).toContain('<title id="title">');
  expect(svg).toContain('<desc id="desc">');
  expect((svg.match(/opacity=".22"/g)||[]).length).toBe(6);
  for(const color of ['#075bbb','#078a55','#ec7616','#853ec9','#d63851','#07889b'])expect(svg).toContain(color);
  await expect(zoom.nth(i)).toHaveAttribute('href',src!);
 }
});
