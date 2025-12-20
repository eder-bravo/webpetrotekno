// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8000';
const ACCESS_CODE = 'petrotekno2024';

// Datos de prueba para Obras
const obrasData = [
    {
        nombre: 'Torre Corporativa Zenith',
        categoria: 'Edificación Vertical',
        destacado: true,
        meta_title: 'Torre Zenith - Construcción Premium',
        meta_description: 'Proyecto emblemático de edificación vertical de 45 pisos en zona empresarial.'
    },
    {
        nombre: 'Planta Petroquímica del Norte',
        categoria: 'Industrial / Energía',
        destacado: false,
        meta_title: 'Planta Petroquímica Industrial',
        meta_description: 'Construcción de planta de procesamiento con los más altos estándares de seguridad.'
    },
    {
        nombre: 'Puente Bicentenario',
        categoria: 'Infraestructura',
        destacado: true,
        meta_title: 'Puente Bicentenario - Obra Maestra',
        meta_description: 'Puente atirantado de 800 metros de longitud conectando dos ciudades importantes.'
    },
    {
        nombre: 'Hospital Regional del Sur',
        categoria: 'Edificación Pública',
        destacado: false,
        meta_title: 'Hospital Regional Moderno',
        meta_description: 'Centro hospitalario de tercer nivel con capacidad para 500 camas.'
    }
];

// Datos de prueba para Servicios
const serviciosData = [
    {
        titulo: 'Edificación Vertical',
        icono: 'Buildings',
        descripcion_corta: 'Construcción de edificios de gran altura con tecnología de punta y materiales de primera calidad.',
        meta_title: 'Servicios de Edificación Vertical',
        meta_description: 'Expertos en construcción de rascacielos y edificios corporativos de alta complejidad.'
    },
    {
        titulo: 'Infraestructura Vial',
        icono: 'Road',
        descripcion_corta: 'Diseño y construcción de carreteras, autopistas y vías de comunicación terrestre.',
        meta_title: 'Infraestructura Vial Premium',
        meta_description: 'Soluciones integrales para proyectos de infraestructura vial y transporte.'
    },
    {
        titulo: 'Construcción Industrial',
        icono: 'Factory',
        descripcion_corta: 'Plantas industriales, naves de manufactura y centros de distribución logística.',
        meta_title: 'Construcción Industrial Especializada',
        meta_description: 'Líderes en construcción de instalaciones industriales y plantas de producción.'
    },
    {
        titulo: 'Obras de Puentes',
        icono: 'Bridge',
        descripcion_corta: 'Diseño estructural y construcción de puentes vehiculares y peatonales.',
        meta_title: 'Construcción de Puentes',
        meta_description: 'Ingeniería especializada en puentes de concreto, acero y sistemas mixtos.'
    }
];

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

test.describe('CRUD Petrotekno CMS', () => {
    
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Crear 4 obras con datos diferentes', async ({ page }) => {
        for (const obra of obrasData) {
            // Navegar a crear obra
            await page.goto(`${BASE_URL}/panel/obras/create`);
            await page.waitForLoadState('networkidle');

            // Llenar formulario
            await page.getByRole('textbox', { name: 'Ej: Torre Corporativa Zenith' }).fill(obra.nombre);
            await page.getByRole('combobox').selectOption(obra.categoria);
            
            if (obra.destacado) {
                await page.getByRole('checkbox', { name: 'Destacado en inicio' }).check();
            }

            // SEO
            await page.getByRole('textbox', { name: 'Título para buscadores' }).fill(obra.meta_title);
            await page.getByRole('textbox', { name: 'Descripción para buscadores' }).fill(obra.meta_description);

            // Guardar
            await page.getByRole('button', { name: 'Crear obra' }).click();

            // Esperar redirección al listado
            await page.waitForURL(`${BASE_URL}/panel/obras`);
            
            // Verificar que la obra aparece en el listado
            await expect(page.getByRole('heading', { name: obra.nombre })).toBeVisible();
        }

        // Verificar que hay 4 obras
        await expect(page.getByText('4 obras en total')).toBeVisible();
    });

    test('Crear 4 servicios con datos diferentes', async ({ page }) => {
        for (const servicio of serviciosData) {
            // Navegar a crear servicio
            await page.goto(`${BASE_URL}/panel/servicios/create`);
            await page.waitForLoadState('networkidle');

            // Llenar formulario
            await page.getByRole('textbox', { name: 'Ej: Edificación Vertical' }).fill(servicio.titulo);
            await page.getByRole('combobox').selectOption(servicio.icono);
            await page.getByRole('textbox', { name: 'Descripción que aparece en la tarjeta' }).fill(servicio.descripcion_corta);

            // SEO
            await page.getByRole('textbox', { name: 'Título para buscadores' }).fill(servicio.meta_title);
            await page.getByRole('textbox', { name: 'Descripción para buscadores' }).fill(servicio.meta_description);

            // Guardar
            await page.getByRole('button', { name: 'Crear servicio' }).click();

            // Esperar redirección al listado
            await page.waitForURL(`${BASE_URL}/panel/servicios`);
            
            // Verificar que el servicio aparece en el listado
            await expect(page.getByRole('heading', { name: servicio.titulo })).toBeVisible();
        }

        // Verificar que hay 4 servicios
        await expect(page.getByText('4 servicios en total')).toBeVisible();
    });

    test('Verificar edición de obra', async ({ page }) => {
        // Primero crear una obra
        await page.goto(`${BASE_URL}/panel/obras/create`);
        await page.waitForLoadState('networkidle');
        
        await page.getByRole('textbox', { name: 'Ej: Torre Corporativa Zenith' }).fill('Obra para Editar');
        await page.getByRole('combobox').selectOption('Industrial');
        await page.getByRole('button', { name: 'Crear obra' }).click();
        await page.waitForURL(`${BASE_URL}/panel/obras`);

        // Editar la obra (click en el primer botón de editar)
        await page.locator('a[href*="/edit"]').first().click();
        await page.waitForLoadState('networkidle');
        
        await expect(page.getByRole('heading', { name: 'Editar Obra' })).toBeVisible();
        
        await page.getByRole('textbox', { name: 'Ej: Torre Corporativa Zenith' }).fill('Obra Editada Correctamente');
        await page.getByRole('button', { name: 'Actualizar' }).click();
        
        await page.waitForURL(`${BASE_URL}/panel/obras`);

        // Verificar
        await expect(page.getByRole('heading', { name: 'Obra Editada Correctamente' })).toBeVisible();
    });

    test('Verificar edición de servicio', async ({ page }) => {
        // Primero crear un servicio
        await page.goto(`${BASE_URL}/panel/servicios/create`);
        await page.waitForLoadState('networkidle');
        
        await page.getByRole('textbox', { name: 'Ej: Edificación Vertical' }).fill('Servicio para Editar');
        await page.getByRole('combobox').selectOption('Hammer');
        await page.getByRole('button', { name: 'Crear servicio' }).click();
        await page.waitForURL(`${BASE_URL}/panel/servicios`);

        // Editar el servicio
        await page.locator('a[href*="/edit"]').first().click();
        await page.waitForLoadState('networkidle');
        
        await expect(page.getByRole('heading', { name: 'Editar Servicio' })).toBeVisible();
        
        await page.getByRole('textbox', { name: 'Ej: Edificación Vertical' }).fill('Servicio Editado Correctamente');
        await page.getByRole('button', { name: 'Actualizar' }).click();
        
        await page.waitForURL(`${BASE_URL}/panel/servicios`);

        // Verificar
        await expect(page.getByRole('heading', { name: 'Servicio Editado Correctamente' })).toBeVisible();
    });

    test('Verificar eliminación de obra', async ({ page }) => {
        // Primero crear una obra
        await page.goto(`${BASE_URL}/panel/obras/create`);
        await page.waitForLoadState('networkidle');
        
        await page.getByRole('textbox', { name: 'Ej: Torre Corporativa Zenith' }).fill('Obra para Eliminar');
        await page.getByRole('combobox').selectOption('Infraestructura');
        await page.getByRole('button', { name: 'Crear obra' }).click();
        await page.waitForURL(`${BASE_URL}/panel/obras`);
        
        // Contar obras antes de eliminar
        const countBefore = await page.locator('h3:has-text("Obra para Eliminar")').count();
        expect(countBefore).toBe(1);

        // Eliminar la obra - buscar el botón de eliminar cerca del título
        const obraCard = page.locator('div').filter({ hasText: 'Obra para Eliminar' }).first();
        await obraCard.locator('button').last().click();
        
        // Confirmar eliminación
        await expect(page.getByRole('heading', { name: 'Eliminar obra' })).toBeVisible();
        await page.getByRole('button', { name: 'Eliminar' }).click();

        // Verificar que se eliminó
        await expect(page.getByText('Obra eliminada exitosamente')).toBeVisible();
    });

    test('Verificar eliminación de servicio', async ({ page }) => {
        // Primero crear un servicio
        await page.goto(`${BASE_URL}/panel/servicios/create`);
        await page.waitForLoadState('networkidle');
        
        await page.getByRole('textbox', { name: 'Ej: Edificación Vertical' }).fill('Servicio para Eliminar');
        await page.getByRole('combobox').selectOption('Truck');
        await page.getByRole('button', { name: 'Crear servicio' }).click();
        await page.waitForURL(`${BASE_URL}/panel/servicios`);

        // Eliminar el servicio
        const servicioCard = page.locator('div').filter({ hasText: 'Servicio para Eliminar' }).first();
        await servicioCard.locator('button').last().click();
        
        // Confirmar eliminación
        await expect(page.getByRole('heading', { name: 'Eliminar servicio' })).toBeVisible();
        await page.getByRole('button', { name: 'Eliminar' }).click();

        // Verificar que se eliminó
        await expect(page.getByText('Servicio eliminado exitosamente')).toBeVisible();
    });
});
