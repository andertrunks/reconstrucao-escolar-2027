import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests',use:{baseURL:process.env.TEST_URL||'http://127.0.0.1:4173',browserName:'chromium',channel:process.env.TEST_EDGE?'msedge':undefined},webServer:process.env.TEST_URL?undefined:{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true},reporter:'list'});
