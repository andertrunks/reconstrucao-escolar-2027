import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('ART-COM-001 publica teoria integral, cinco visuais, vídeo e 26 questões',async({page})=>{
 await page.goto('./#aula/ART-COM-001');
 await expect(page.getByRole('heading',{level:1,name:'Composição visual: equilíbrio, contraste, ritmo e ênfase'})).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"] section')).toHaveCount(64);
 await expect(page.locator('.lesson-gallery img')).toHaveCount(5);
 await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('heading',{name:'Vídeo complementar',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();
 await expect(page.getByRole('link',{name:'← Aula anterior'})).toHaveAttribute('href','#aula/SOC-DES-001');
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 const consolidated=page.getByRole('option',{name:'consolidado',exact:true});
 await expect(consolidated).toHaveAttribute('disabled','');
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});

test('ART-COM-001 não cria overflow horizontal no celular',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('./#aula/ART-COM-001');
 await expect(page.locator('.lesson-body')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const img of await page.locator('.lesson-gallery img').all()){
  const src=await img.getAttribute('src');expect((await page.request.get(src!)).ok()).toBe(true);
 }
});
