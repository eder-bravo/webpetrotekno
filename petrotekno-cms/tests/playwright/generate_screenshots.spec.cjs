const { test, expect } = require('@playwright/test');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '../../../docs/screenshots');
const FRONTEND_URL = 'http://localhost:5174';

test('Generate Screenshots', async ({ page, request }) => {
  test.setTimeout(90000);

  // --- Backend Screenshots ---
  console.log('Taking Backend Screenshots...');
  
  // Go to login page
  await page.goto('http://127.0.0.1:8000/panel/login');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  
  // Login with password petrotekno2024
  await page.locator('input[name="codigo_acceso"]').fill('petrotekno2024');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(4000);
  
  // Dashboard
  console.log('Capturing Dashboard...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-dashboard.png'), fullPage: true });

  // Obras List
  console.log('Capturing Obras List...');
  await page.goto('http://127.0.0.1:8000/panel/obras');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-obras-list.png'), fullPage: true });

  // Obras Editor
  console.log('Capturing Obras Editor...');
  await page.goto('http://127.0.0.1:8000/panel/obras/create');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-obras-editor.png'), fullPage: true });

  // Servicios List
  console.log('Capturing Servicios List...');
  await page.goto('http://127.0.0.1:8000/panel/servicios');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-servicios-list.png'), fullPage: true });

  // Servicios Editor
  console.log('Capturing Servicios Editor...');
  await page.goto('http://127.0.0.1:8000/panel/servicios/create');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-servicios-editor.png'), fullPage: true });

  // Configuración
  console.log('Capturing Configuracion...');
  await page.goto('http://127.0.0.1:8000/panel/configuracion');
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'panel-configuracion.png'), fullPage: true });

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
