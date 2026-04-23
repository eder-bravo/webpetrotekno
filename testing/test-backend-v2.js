const { chromium } = require('playwright');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testBackend() {
    const screenshotsDir = '/Users/ebravo/proyectos/webpetrotekno/testing/screenshots';
    
    console.log('🔧 Test completo del Backend CMS (corregido)\n');
    
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        slowMo: 50
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 }
    });
    
    const page = await context.newPage();
    
    // Capturar errores
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', error => consoleErrors.push(error.message));
    page.on('response', response => {
        if (response.status() >= 400) {
            console.log(`   ⚠️ Response error: ${response.status()} ${response.url()}`);
        }
    });
    
    // ============ PASO 1: LOGIN ============
    console.log('1️⃣ Accediendo al login del panel...');
    await page.goto('http://localhost:8000/panel/login', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${screenshotsDir}/01-login.png` });
    console.log('   ✅ Login cargado');
    
    // Llenar campo código - usar fill en el input específico
    console.log('2️⃣ Ingresando código de acceso...');
    await page.fill('#codigo', 'petrotekno2024');
    await delay(500);
    await page.screenshot({ path: `${screenshotsDir}/02-login-filled.png` });
    console.log('   ✅ Código ingresado');
    
    // Enviar formulario
    console.log('3️⃣ Enviando login...');
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.click('button[type="submit"]')
    ]);
    
    await delay(1000);
    await page.screenshot({ path: `${screenshotsDir}/03-after-login.png` });
    
    const currentUrl = page.url();
    console.log(`   📍 URL después de login: ${currentUrl}`);
    
    if (currentUrl.includes('/panel/login')) {
        console.log('   ❌ Login falló - sigue en la página de login');
        const errorText = await page.locator('text=obligatorio').or(page.locator('text=incorrecto')).or(page.locator('.text-red-400')).first().textContent().catch(() => '');
        console.log(`   📝 Error: ${errorText}`);
        await browser.close();
        return { success: false, step: 'login' };
    }
    
    console.log('   ✅ Login exitoso!');
    
    // ============ PASO 2: DASHBOARD ============
    console.log('4️⃣ Dashboard...');
    await page.screenshot({ path: `${screenshotsDir}/04-dashboard.png` });
    console.log('   ✅ Dashboard capturado');
    
    // ============ PASO 3: NAVEGAR A OBRAS ============
    console.log('5️⃣ Navegando a Obras...');
    await page.goto('http://localhost:8000/panel/obras');
    await page.waitForLoadState('networkidle');
    await delay(1000);
    await page.screenshot({ path: `${screenshotsDir}/05-obras-list.png` });
    console.log('   ✅ Lista de obras cargada');
    
    // ============ PASO 4: CREAR NUEVA OBRA ============
    console.log('6️⃣ Creando nueva obra...');
    await page.goto('http://localhost:8000/panel/obras/create');
    await page.waitForLoadState('networkidle');
    await delay(1000);
    await page.screenshot({ path: `${screenshotsDir}/06-obra-create.png` });
    console.log('   ✅ Formulario de obra cargado');
    
    // ============ PASO 5: LLENAR FORMULARIO ============
    console.log('7️⃣ Llenando formulario...');
    
    const timestamp = Date.now();
    
    // Listar todos los inputs visibles
    const inputs = await page.locator('input:visible, textarea:visible, select:visible, [contenteditable]:visible').all();
    console.log(`   📋 Campos visibles encontrados: ${inputs.length}`);
    
    for (const input of inputs) {
        try {
            const tag = await input.evaluate(el => el.tagName.toLowerCase());
            const name = await input.getAttribute('name');
            const id = await input.getAttribute('id');
            const type = await input.getAttribute('type');
            const placeholder = await input.getAttribute('placeholder');
            const label = await input.evaluate(el => {
                const id = el.id;
                if (id) {
                    const lbl = document.querySelector(`label[for="${id}"]`);
                    if (lbl) return lbl.textContent.trim();
                }
                return '';
            });
            
            const identifier = name || id || placeholder || label || '(sin identificador)';
            console.log(`   📝 ${tag}${type ? ':' + type : ''} - "${identifier}"`);
            
            if (identifier.toLowerCase().includes('nombre') || identifier.toLowerCase().includes('name') || identifier.toLowerCase().includes('título') || identifier.toLowerCase().includes('title')) {
                await input.fill(`Obra Automática ${timestamp}`);
            } else if (identifier.toLowerCase().includes('slug')) {
                await input.fill(`obra-automatica-${timestamp}`);
            } else if (tag === 'select' && identifier.toLowerCase().includes('categoria')) {
                await input.selectOption({ index: 1 }).catch(() => {});
            } else if (tag === 'select' && identifier.toLowerCase().includes('estado')) {
                await input.selectOption({ label: 'Veracruz' }).catch(() => {});
            } else if (tag === 'textarea' && (identifier.toLowerCase().includes('contenido') || identifier.toLowerCase().includes('content') || identifier.toLowerCase().includes('descripcion'))) {
                await input.fill('<p>Obra creada automáticamente mediante testing automatizado.</p>');
            } else if (type === 'checkbox') {
                // No tocar checkboxes por ahora
            }
        } catch (e) {
            // Ignorar errores
        }
    }
    
    // Intentar llenar editor rich text si existe
    const editor = page.locator('[contenteditable="true"]').or(page.locator('.ProseMirror')).first();
    if (await editor.isVisible().catch(() => false)) {
        await editor.fill('<p>Contenido de prueba para obra automatizada.</p>');
        console.log('   📝 Editor rich text llenado');
    }
    
    await delay(1000);
    await page.screenshot({ path: `${screenshotsDir}/07-obra-filled.png` });
    console.log('   ✅ Formulario llenado');
    
    // ============ PASO 6: GUARDAR ============
    console.log('8️⃣ Guardando obra...');
    const saveBtn = page.locator('button[type="submit"]').or(page.locator('button:has-text("Guardar")')).or(page.locator('button:has-text("Crear")')).first();
    
    if (await saveBtn.isVisible().catch(() => false)) {
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {}),
            saveBtn.click()
        ]);
        console.log('   📤 Submit enviado');
    } else {
        console.log('   ⚠️ Botón de guardar no encontrado');
    }
    
    await delay(2000);
    await page.screenshot({ path: `${screenshotsDir}/08-obra-saved.png` });
    
    // ============ RESULTADO ============
    const finalUrl = page.url();
    const pageTitle = await page.title();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESULTADOS DEL TEST');
    console.log('='.repeat(60));
    console.log(`URL final: ${finalUrl}`);
    console.log(`Título: ${pageTitle}`);
    console.log(`Errores de consola: ${consoleErrors.length}`);
    
    if (consoleErrors.length > 0) {
        console.log('\n❌ Errores:');
        consoleErrors.forEach(e => console.log(`   - ${e}`));
    }
    
    const isListPage = finalUrl.includes('/panel/obras') && !finalUrl.includes('/create');
    const isEditPage = finalUrl.includes('/panel/obras/') && !finalUrl.includes('/create');
    const success = isListPage || isEditPage;
    
    if (success) {
        console.log('\n✅ OBRA CREADA EXITOSAMENTE');
    } else {
        console.log('\n⚠️ Revisar screenshot 08-obra-saved.png');
    }
    
    await browser.close();
    
    return {
        success,
        url: finalUrl,
        title: pageTitle,
        errors: consoleErrors
    };
}

testBackend()
    .then(result => {
        console.log('\n✨ Test finalizado');
        process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
