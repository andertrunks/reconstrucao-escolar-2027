import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('HIS-HUM-001 publica teoria integral, cinco visuais, vídeo e 26 questões',async({page})=>{
 await page.goto('./#aula/HIS-HUM-001');
 await expect(page.getByRole('heading',{level:1,name:'Origens da humanidade: hipóteses científicas, mitos de origem e primeiros deslocamentos'})).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"]')).toBeVisible();
 await expect(page.locator('article[aria-label="Texto integral da aula"] section')).toHaveCount(75);
 await expect(page.locator('.lesson-gallery img')).toHaveCount(5);
 await expect(page.locator('.practice-question')).toHaveCount(26);
 await expect(page.getByRole('heading',{name:'Vídeo complementar',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Carregar vídeo'})).toBeVisible();
 await expect(page.getByRole('link',{name:'Próxima aula →'})).toHaveAttribute('href','#aula/RED-PAR-001');
 await expect(page.getByLabel('Estado de aprendizagem')).toHaveValue('não iniciado');
 const consolidated=page.getByRole('option',{name:'consolidado',exact:true});
 await expect(consolidated).toHaveAttribute('disabled','');
 expect((await new AxeBuilder({page}).analyze()).violations.map(v=>v.id)).toEqual([]);
});
