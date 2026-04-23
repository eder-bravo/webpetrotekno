const { chromium } = require('playwright');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testBackend() {
    const screenshotsDir = '/Users/ebravo/proyectos/webpetrotekno/testing/screenshots';
    const results = [];
    
    console.log('🔧 Iniciando test completo del Backend CMS...\n');
    
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        slowMo: 100
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
    
    // ============ PASO 1: LOGIN ============
    console.log('1️⃣ Accediendo al login del panel...');
    await page.goto('http://localhost:8000/panel/login', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${screenshotsDir}/01-login-page.png` });
    console.log('   ✅ Login cargado');
    
    // Ingresar código
    console.log('2️⃣ Ingresando código de acceso...');
    const codigoInput = page.locator('input[type="password"]').or(page.locator('input[name="codigo"]')).or(page.locator('input')).first();
    await codigoInput.fill('petrotekno2024');
    await page.screenshot({ path: `${screenshotsDir}/02-login-filled.png` });
    
    // Click en login
    console.log('3️⃣ Enviando login...');
    const submitBtn = page.locator('button[type="submit"]').or(page.locator('button:has-text("Ingresar")')).or(page.locator('button')).first();
    await submitBtn.click();
    
    // Esperar navegación
    await page.waitForLoadState('networkidle');
    await delay(1500);
    await page.screenshot({ path: `${screenshotsDir}/03-dashboard.png` });
    console.log('   ✅ Dashboard cargado');
    
    // ============ PASO 2: NAVEGAR A OBRAS ============
    console.log('4️⃣ Navegando a Obras...');
    
    // Buscar link de obras
    const obraLink = page.locator('a:has-text("Obras")').or(page.locator('a[href*="obra"]')).first();
    if (await obraLink.isVisible().catch(() => false)) {
        await obraLink.click();
    } else {
        // Navegar directamente
        await page.goto('http://localhost:8000/panel/obras');
    }
    
    await page.waitForLoadState('networkidle');
    await delay(1500);
    await page.screenshot({ path: `${screenshotsDir}/04-obras-list.png` });
    console.log('   ✅ Lista de obras cargada');
    
    // ============ PASO 3: CREAR NUEVA OBRA ============
    console.log('5️⃣ Creando nueva obra...');
    
    // Buscar botón de crear
    const createBtn = page.locator('a:has-text("Nueva")')
        .or(page.locator('a:has-text("Crear")'))
        .or(page.locator('a:has-text("Agregar")'))
        .or(page.locator('button:has-text("Nueva")'))
        .first();
    
    if (await createBtn.isVisible().catch(() => false)) {
        await createBtn.click();
    } else {
        await page.goto('http://localhost:8000/panel/obras/create');
    }
    
    await page.waitForLoadState('networkidle');
    await delay(1500);
    await page.screenshot({ path: `${screenshotsDir}/05-obra-create.png` });
    console.log('   ✅ Formulario de obra cargado');
    
    // ============ PASO 4: LLENAR FORMULARIO ============
    console.log('6️⃣ Llenando formulario de obra...');
    
    // Generar datos de prueba
    const timestamp = Date.now();
    const obraData = {
        nombre: `Obra de Prueba Automática ${timestamp}`,
        slug: `obra-prueba-auto-${timestamp}`,
        categoria: 'Infraestructura',
        estado: 'Veracruz',
        contenido: '<p>Esta es una obra creada automáticamente para pruebas.</p>'
    };
    
    // Llenar campos según lo que encuentre
    const inputs = await page.locator('input, textarea, select').all();
    console.log(`   📋 Encontrados ${inputs.length} campos`);
    
    for (const input of inputs) {
        try {
            const name = await input.getAttribute('name');
            const type = await input.getAttribute('type');
            const tagName = await input.evaluate(el => el.tagName.toLowerCase());
            const isVisible = await input.isVisible().catch(() => false);
            
            if (!isVisible) continue;
            
            console.log(`   📝 Campo: ${name || '(sin nombre)'} (${tagName}${type ? ':' + type : ''})`);
            
            if (name?.includes('nombre') || name?.includes('name') || name?.includes('title')) {
                await input.fill(obraData.nombre);
            } else if (name?.includes('slug')) {
                await input.fill(obraData.slug);
            } else if (name?.includes('categoria') && tagName === 'select') {
                await input.selectOption({ label: obraData.categoria }).catch(() => {});
            } else if (name?.includes('estado') && tagName === 'select') {
                await input.selectOption({ label: obraData.estado }).catch(() => {});
            } else if (name?.includes('contenido') || name?.includes('content') || name?.includes('descripcion')) {
                if (tagName === 'textarea') {
                    await input.fill(obraData.contenido);
                } else {
                    // Intentar editor rich text
                    await input.evaluate((el, val) => { el.innerHTML = val; }, obraData.contenido);
                }
            }
        } catch (e) {
            // Ignorar errores de campos
        }
    }
    
    await delay(1000);
    await page.screenshot({ path: `${screenshotsDir}/06-obra-filled.png` });
    console.log('   ✅ Formulario llenado');
    
    // ============ PASO 5: GUARDAR ============
    console.log('7️⃣ Guardando obra...');
    const saveBtn = page.locator('button[type="submit"]:has-text("Guardar")')
        .or(page.locator('button:has-text("Crear")'))
        .or(page.locator('button:has-text("Guardar")'))
        .or(page.locator('button[type="submit"]'))
        .first();
    
    if (await saveBtn.isVisible().catch(() => false)) {
        await saveBtn.click();
        console.log('   📤 Submit enviado');
    } else {
        console.log('   ⚠️ Botón de guardar no encontrado');
    }
    
    await page.waitForLoadState('networkidle');
    await delay(2000);
    await page.screenshot({ path: `${screenshotsDir}/07-obra-saved.png` });
    
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
    
    // Verificar éxito
    const success = finalUrl.includes('obras') && !finalUrl.includes('create');
    if (success) {
        console.log('\n✅ OBRA CREADA EXITOSAMENTE');
    } else {
        console.log('\n⚠️ Revisar screenshot 07-obra-saved.png');
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
