const { chromium } = require('playwright');

async function testPage(url, name) {
    console.log(`\n🔍 Testing: ${name} (${url})`);
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ 
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    
    // Capturar errores de consola
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    
    // Capturar errores de página
    const pageErrors = [];
    page.on('pageerror', error => {
        pageErrors.push(error.message);
    });
    
    try {
        const response = await page.goto(url, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        console.log(`📊 Status: ${response.status()} ${response.statusText()}`);
        console.log(`📄 Title: ${await page.title()}`);
        
        // Tomar screenshot
        const screenshotPath = `/Users/ebravo/proyectos/webpetrotekno/testing/screenshots/${name.replace(/\s+/g, '-').toLowerCase()}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot: ${screenshotPath}`);
        
        // Verificar elementos clave
        const bodyText = await page.evaluate(() => document.body.innerText);
        console.log(`📝 Content length: ${bodyText.length} chars`);
        
        if (consoleErrors.length > 0) {
            console.log(`❌ Console errors (${consoleErrors.length}):`);
            consoleErrors.forEach(err => console.log(`   - ${err}`));
        } else {
            console.log('✅ No console errors');
        }
        
        if (pageErrors.length > 0) {
            console.log(`❌ Page errors (${pageErrors.length}):`);
            pageErrors.forEach(err => console.log(`   - ${err}`));
        } else {
            console.log('✅ No page errors');
        }
        
        return {
            success: true,
            status: response.status(),
            title: await page.title(),
            consoleErrors,
            pageErrors,
            screenshotPath
        };
        
    } catch (error) {
        console.error(`❌ Error testing ${name}:`, error.message);
        return {
            success: false,
            error: error.message
        };
    } finally {
        await browser.close();
    }
}

async function runTests() {
    const fs = require('fs');
    const screenshotsDir = '/Users/ebravo/proyectos/webpetrotekno/testing/screenshots';
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    console.log('🚀 Starting Web Tests...\n');
    
    // Test Frontend
    const frontendResult = await testPage('http://localhost:5173', 'Frontend Homepage');
    
    // Test Backend API
    const backendResult = await testPage('http://localhost:8000/api/config', 'Backend API Config');
    
    // Test Backend Panel Login
    const panelResult = await testPage('http://localhost:8000/panel/login', 'Backend Panel Login');
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Frontend: ${frontendResult.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Backend API: ${backendResult.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Panel Login: ${panelResult.success ? '✅ PASS' : '❌ FAIL'}`);
    
    // Guardar reporte JSON
    const report = {
        timestamp: new Date().toISOString(),
        tests: [frontendResult, backendResult, panelResult]
    };
    fs.writeFileSync('/Users/ebravo/proyectos/webpetrotekno/testing/test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📝 Report saved to: testing/test-report.json');
}

runTests().catch(console.error);
