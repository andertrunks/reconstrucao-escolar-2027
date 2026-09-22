import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
await page.goto(process.env.TEST_URL||'http://127.0.0.1:4173');await page.locator('h1').waitFor();
const result=await new AxeBuilder({page}).analyze();
console.log(JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))})),null,2));
await page.screenshot({path:'../../outputs/inicio.png',fullPage:true});await browser.close();
