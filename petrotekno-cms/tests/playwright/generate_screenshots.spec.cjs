const { test, expect } = require('@playwright/test');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '../../../docs/screenshots');
const FRONTEND_URL = 'http://localhost:5174';

test('Generate Screenshots', async ({ page, request }) => {
  test.setTimeout(60000); // Increase timeout

  // --- Backend Screenshots ---
  console.log('Taking Backend Screenshots...');
  await page.goto('/panel/login');
  
  // Check if already logged in or need login
  if (await page.isVisible('input[name="codigo_acceso"]')) {
      await page.fill('input[name="codigo_acceso"]', 'petrotekno2024');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/panel');
  }
  
  // Dashboard
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-dashboard.png'), fullPage: true });

  // Obras Editor (Create New)
  await page.goto('/panel/obras/create');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-obras-editor.png'), fullPage: true });

  // --- Frontend Screenshots ---
  console.log('Taking Frontend Screenshots...');
  
  // Homepage
  await page.goto(FRONTEND_URL);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'homepage.png'), fullPage: true });

  // Mapa Interactivo (on Obras page)
  await page.goto(`${FRONTEND_URL}/obras`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mapa-interactivo.png'), fullPage: true });

  // Contacto
  await page.goto(`${FRONTEND_URL}/contacto`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'contacto.png'), fullPage: true });

  // Obra Detalle
  // Fetch one obra slug from API
  try {
      const response = await request.get('/api/obras');
      const obras = await response.json();
      
      if (obras.length > 0) {
        const slug = obras[0].slug;
        await page.goto(`${FRONTEND_URL}/obras/${slug}`);
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'obra-detalle.png'), fullPage: true });
      } else {
        console.log('No obras found, skipping obra-detalle.png');
      }
  } catch (e) {
      console.error('Error fetching obras for detail screenshot:', e);
  }
});
