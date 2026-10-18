import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('MAT-FUN-009 integra modelagem contextualizada, 64 seções e 26 questões',async({page})=>{
 await page.goto('./#aula/MAT-FUN-009');
 await expect(page.getByRole('heading',{level:1,name:'Sistemas lineares: modelagem, interpretação e problemas integrados'})).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"] section')).toHaveCount(64);
 await expect(page.locator('.lesson-gallery img')).toHaveCount(5);
 await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('heading',{name:'Vídeo complementar',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();
 await expect(page.getByRole('link',{name:'← Aula anterior'})).toHaveAttribute('href','#aula/MAT-FUN-008');
 await expect(page.getByRole('link',{name:'Próxima aula →'})).toHaveCount(0);
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 await expect(page.getByRole('option',{name:'consolidado',exact:true})).toHaveAttribute('disabled','');
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});
test('MAT-FUN-009 mantém SVGs acessíveis, links válidos e layout responsivo',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('./#aula/MAT-FUN-009');
 await expect(page.locator('.lesson-body')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const img of await page.locator('.lesson-gallery img').all()){
  expect(await img.getAttribute('alt')).toBeTruthy();
  const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);
 }
});

test('MAT-FUN-009 usa cinco infográficos coloridos com seis painéis cada',async({page})=>{
 await page.goto('./#aula/MAT-FUN-009');
 const imgs=page.locator('.lesson-gallery img');
 await expect(imgs).toHaveCount(5);
 for(const img of await imgs.all()){
  const src=await img.getAttribute('src');
  expect(src).toBeTruthy();
  const response=await page.request.get(src!);
  expect(response.ok()).toBe(true);
  const svg=await response.text();
  expect(svg).toContain('viewBox="0 0 1600 955"');
  expect(svg).toContain('aria-labelledby="title desc"');
  expect(svg).toContain('<title id="title">');
  expect(svg).toContain('<desc id="desc">');
  expect((svg.match(/opacity=".22"/g)||[]).length).toBe(6);
  for(const color of ['#0767bc','#07844d','#dc5a13','#773cc4','#cf3352','#088d9f']){
   expect(svg).toContain(color);
  }
 }
});
