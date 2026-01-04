const { test, expect } = require('@playwright/test');
const path = require('path');

test('Logo upload test', async ({ page }) => {
    console.log('🚀 Test de logo - Iniciando');
    
    const baseUrl = 'http://127.0.0.1:8000';
    
    // Step 1: Login
    console.log('🔐 Login...');
    await page.goto(`${baseUrl}/login`);
    
    // Rellenar credenciales (ajusta según tu base de datos)
    await page.fill('input[type="email"]', 'admin@petrotekno.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Esperar a que redirija al dashboard
    await page.waitForURL('**/panel/dashboard', { timeout: 10000 });
    console.log('✅ Login exitoso');
    
    // Step 2: Ir a configuración
    console.log('📍 Navegando a configuración...');
    await page.goto(`${baseUrl}/panel/configuracion`);
    await page.waitForLoadState('networkidle');
    
    // Step 3: Tomar screenshot del estado inicial
    await page.screenshot({ path: 'test-results/00-inicial.png', fullPage: true });
    console.log('📸 Screenshot inicial guardado');
    
    // Step 4: Verificar que existe el h2 "Logo del sitio"
    const logoHeading = page.locator('h2', { hasText: 'Logo del sitio' });
    await expect(logoHeading).toBeVisible({ timeout: 5000 });
    console.log('✅ Sección de logo encontrada');
    
    // Step 5: Buscar el input file
    const fileInput = page.locator('input[type="file"][accept="image/png"]');
    await expect(fileInput).toBeAttached();
    console.log('✅ Input de archivo encontrado');
    
    // Step 6: Subir imagen de prueba
    const testImagePath = path.join(__dirname, 'fixtures', 'test-logo.png');
    console.log('📂 Subiendo:', testImagePath);
    await fileInput.setInputFiles(testImagePath);
    
    // Step 7: Esperar un momento para que cargue el preview
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/01-preview.png', fullPage: true });
    console.log('📸 Screenshot con preview guardado');
    
    // Step 8: Guardar
    const saveButton = page.locator('button:has-text("Guardar configuración")');
    await expect(saveButton).toBeVisible();
    console.log('💾 Guardando configuración...');
    await saveButton.click();
    
    // Step 9: Esperar el mensaje de éxito o la recarga
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/02-guardado.png', fullPage: true });
    console.log('✅ Configuración guardada');
    
    // Step 10: Recargar la página para verificar persistencia
    console.log('🔄 Recargando página...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/03-recargado.png', fullPage: true });
    console.log('📸 Screenshot después de recargar');
    
    // Step 11: Verificar que el logo se muestra correctamente
    const logoImage = page.locator('img[alt="Logo"]').first();
    await expect(logoImage).toBeVisible();
    const logoSrc = await logoImage.getAttribute('src');
    console.log('🖼️  Logo src:', logoSrc);
    
    // Step 12: Verificar en el frontend
    console.log('🌐 Verificando en frontend...');
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/04-frontend.png', fullPage: true });
    
    // Buscar logo en el navbar
    const frontendLogo = page.locator('img[alt="Petrotekno Logo"]').first();
    await expect(frontendLogo).toBeVisible({ timeout: 5000 });
    const frontendSrc = await frontendLogo.getAttribute('src');
    console.log('🖼️  Frontend logo src:', frontendSrc);
    
    console.log('✅ Test completado exitosamente');
});
