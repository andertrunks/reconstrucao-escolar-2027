import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('FIL-FUN-001 publica teoria integral, quatro visuais, vídeo e 26 questões',async({page})=>{
 await page.goto('./#aula/FIL-FUN-001');
 await expect(page.getByRole('heading',{level:1,name:'Pergunta filosófica, conceito e argumento'})).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('.lesson-gallery img')).toHaveCount(4);
 await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('heading',{name:'Vídeo complementar',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();
 await expect(page.getByText('Próximo tópico: SOC-FUN-001 · ainda indisponível')).toBeVisible();
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 const consolidated=page.getByRole('option',{name:'consolidado',exact:true});
 await expect(consolidated).toHaveAttribute('disabled','');
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});
