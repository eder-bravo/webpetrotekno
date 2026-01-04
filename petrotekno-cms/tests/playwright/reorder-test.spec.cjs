// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8000';
const ACCESS_CODE = 'petrotekno2024';

// Función helper para login
async function login(page) {
    await page.goto(`${BASE_URL}/panel/login`);
    
    // Si ya está logueado, redirige al panel
    if (page.url().includes('/panel') && !page.url().includes('/login')) {
        return;
    }
    
    await page.getByRole('textbox', { name: 'Código de Acceso' }).fill(ACCESS_CODE);
    await page.getByRole('button', { name: 'Ingresar al Panel' }).click();
    await page.waitForURL(`${BASE_URL}/panel`);
}

test.describe('Reordenar Obras - Vista Paginada', () => {
    
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Acceder a la vista de reordenamiento desde listado de obras', async ({ page }) => {
        // Navegar al listado de obras
        await page.goto(`${BASE_URL}/panel/obras`);
        await page.waitForLoadState('networkidle');

        // Buscar y hacer click en el botón de reordenar
        const reorderButton = page.getByRole('link', { name: /Reordenar/i });
        await expect(reorderButton).toBeVisible();
        await reorderButton.click();

        // Verificar que estamos en la vista de reordenar
        await page.waitForURL(`${BASE_URL}/panel/obras/reorder**`);
        await expect(page.getByRole('heading', { name: 'Reordenar obras', exact: true })).toBeVisible();
    });

    test('La vista de reordenamiento muestra obras correctamente', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // Verificar título y descripción
        await expect(page.getByRole('heading', { name: 'Reordenar obras', exact: true })).toBeVisible();
        await expect(page.getByText('Arrastra y suelta las obras para cambiar su orden')).toBeVisible();

        // Verificar que hay elementos arrastrables (grip icons)
        const gripIcons = page.locator('[data-testid="grip-vertical"], svg.lucide-grip-vertical, [class*="GripVertical"]');
        
        // Al menos debería haber obras para arrastrar (si hay datos)
        // El texto de contador debería estar visible
        await expect(page.getByText(/Mostrando \d+-\d+ de \d+ obras/)).toBeVisible();
    });

    test('Botón Guardar está deshabilitado sin cambios', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // El botón de guardar debería estar deshabilitado inicialmente
        const saveButton = page.getByRole('button', { name: /Guardar orden/i });
        await expect(saveButton).toBeVisible();
        await expect(saveButton).toBeDisabled();
    });

    test('Link de volver funciona correctamente', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // Click en volver
        await page.getByRole('link', { name: /Volver a obras/i }).click();

        // Debe redirigir al listado
        await page.waitForURL(`${BASE_URL}/panel/obras`);
    });

    test('Paginación funciona en vista de reordenamiento', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // Verificar información de paginación
        const paginationInfo = page.getByText(/Mostrando \d+-\d+ de \d+ obras/);
        await expect(paginationInfo).toBeVisible();

        // Si hay más de 10 obras, debería haber paginación
        const paginationText = await paginationInfo.textContent();
        const match = paginationText?.match(/de (\d+) obras/);
        
        if (match && parseInt(match[1]) > 10) {
            // Verificar que hay botones de paginación
            const nextButton = page.locator('button').filter({ has: page.locator('svg.lucide-chevron-right') });
            await expect(nextButton).toBeVisible();
            
            // Navegar a la página 2
            await nextButton.click();
            await page.waitForURL(/page=2/);
            
            // Verificar que la URL cambió
            expect(page.url()).toContain('page=2');
        }
    });

    test('Drag and drop funciona correctamente', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // Obtener los primeros dos items arrastrables
        const items = page.locator('.space-y-2 > div');
        const itemCount = await items.count();

        if (itemCount >= 2) {
            const firstItem = items.nth(0);
            const secondItem = items.nth(1);

            // Obtener el texto del primer elemento antes
            const firstItemText = await firstItem.locator('h3').textContent();

            // Buscar el grip handle del primer elemento
            const gripHandle = firstItem.locator('button').first();
            
            // Realizar drag and drop
            await gripHandle.dragTo(secondItem);

            // Ahora el botón de guardar debería estar habilitado
            const saveButton = page.getByRole('button', { name: /Guardar orden/i });
            
            // Esperar un momento para que el estado se actualice
            await page.waitForTimeout(500);
            
            // Verificar que hay cambios pendientes (botón habilitado o con estilo diferente)
            // El botón cambia a amarillo cuando hay cambios
            await expect(saveButton).not.toBeDisabled();
        }
    });

    test('Guardar orden funciona correctamente', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        const items = page.locator('.space-y-2 > div');
        const itemCount = await items.count();

        if (itemCount >= 2) {
            // Hacer un cambio de orden
            const firstItem = items.nth(0);
            const secondItem = items.nth(1);
            const gripHandle = firstItem.locator('button').first();
            
            await gripHandle.dragTo(secondItem);
            await page.waitForTimeout(500);

            // Guardar
            const saveButton = page.getByRole('button', { name: /Guardar orden/i });
            await saveButton.click();

            // Esperar respuesta - debería mostrar "Guardado"
            await expect(page.getByRole('button', { name: /Guardado/i })).toBeVisible({ timeout: 5000 });
        }
    });

    test('Muestra correctamente las obras destacadas con estrella', async ({ page }) => {
        await page.goto(`${BASE_URL}/panel/obras/reorder`);
        await page.waitForLoadState('networkidle');

        // Verificar que el mensaje sobre destacadas está visible
        await expect(page.getByText(/Las obras con .* están marcadas como destacadas/)).toBeVisible();
    });
});
