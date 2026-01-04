import { test, expect } from '@playwright/test';
import path from 'path';

test('Logo upload and display test', async ({ page }) => {
    console.log('🚀 Iniciando test de carga de logo...');
    
    // Login al panel
    await page.goto('http://127.0.0.1:8000/panel');
    console.log('📍 Navegando al panel...');
    
    // Si hay login, ajusta según tu sistema
    // await page.fill('input[name="codigo"]', 'tu_codigo');
    // await page.click('button[type="submit"]');
    
    // Ir directamente a configuración
    await page.goto('http://127.0.0.1:8000/panel/configuracion');
    await page.waitForLoadState('networkidle');
    
    console.log('📄 Página de configuración cargada');
    
    // Verificar que existe la sección de logo
    await expect(page.locator('h2:has-text("Logo del sitio")')).toBeVisible();
    
    // Screenshot inicial
    await page.screenshot({ path: 'test-results/01-logo-inicial.png' });
    console.log('📸 Screenshot inicial tomado');
    
    // Verificar que el logo actual se está mostrando
    const logoImg = page.locator('img[alt="Logo"]').first();
    await expect(logoImg).toBeVisible();
    const currentSrc = await logoImg.getAttribute('src');
    console.log('🖼️  Logo actual:', currentSrc);
    
    // Preparar archivo de prueba
    const testImagePath = path.resolve(__dirname, 'fixtures/test-logo.png');
    console.log('📂 Usando imagen de prueba:', testImagePath);
    
    // Subir logo
    const fileInput = page.locator('input[type="file"][accept="image/png"]');
    await fileInput.setInputFiles(testImagePath);
    console.log('⬆️  Archivo seleccionado');
    
    // Esperar a que el preview cambie (debería mostrar data URL)
    await page.waitForTimeout(1000);
    
    // Verificar que el preview cambió
    const newPreviewSrc = await logoImg.getAttribute('src');
    console.log('🔄 Preview actualizado:', newPreviewSrc.substring(0, 50) + '...');
    
    // Screenshot después de seleccionar
    await page.screenshot({ path: 'test-results/02-logo-seleccionado.png' });
    console.log('📸 Screenshot con preview tomado');
    
    // Guardar cambios
    const saveButton = page.locator('button:has-text("Guardar configuración")');
    await saveButton.click();
    console.log('💾 Guardando configuración...');
    
    // Esperar a que se complete el guardado
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Screenshot después de guardar
    await page.screenshot({ path: 'test-results/03-logo-guardado.png' });
    console.log('📸 Screenshot después de guardar tomado');
    
    // Verificar que el logo ahora apunta a /images/logo.png
    const savedSrc = await logoImg.getAttribute('src');
    console.log('✅ Logo guardado:', savedSrc);
    expect(savedSrc).toContain('/images/logo.png');
    
    // Refrescar la página
    console.log('🔄 Refrescando página...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verificar que el logo persiste
    const reloadedSrc = await page.locator('img[alt="Logo"]').first().getAttribute('src');
    console.log('🔍 Logo después de refrescar:', reloadedSrc);
    expect(reloadedSrc).toContain('/images/logo.png');
    
    // Screenshot después de refrescar
    await page.screenshot({ path: 'test-results/04-logo-despues-refresh.png' });
    console.log('📸 Screenshot después de refrescar tomado');
    
    // Verificar en el frontend
    console.log('🌐 Verificando en el frontend...');
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Screenshot del frontend
    await page.screenshot({ path: 'test-results/05-frontend-logo.png', fullPage: true });
    console.log('📸 Screenshot del frontend tomado');
    
    // Verificar que el logo se carga en el frontend
    const frontendLogo = page.locator('img.logo-img').first();
    await expect(frontendLogo).toBeVisible();
    const frontendSrc = await frontendLogo.getAttribute('src');
    console.log('🖼️  Logo en frontend:', frontendSrc);
    
    console.log('✅ Test completado exitosamente!');
    console.log('📁 Revisa las capturas en test-results/');
});
