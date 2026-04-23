/**
 * Datos de prueba para las obras.
 * Se usan cuando el API no está disponible (modo local/desarrollo).
 * En producción, estos datos vienen del CMS via API.
 */
export const obrasFallback = [
    { 
        id: 1, 
        slug: 'puerto-matamoros',
        nombre: 'Construcción de vialidades internas para el inicio de operaciones del Puerto de Matamoros, Tamaulipas', 
        categoria: 'Infraestructura Vial', 
        estado: 'tam',
        destacado: true,
        descripcion: 'Construcción de vialidades internas y accesos para el inicio de operaciones del Puerto de Matamoros, un proyecto estratégico para el desarrollo económico de la región.',
    },
    { 
        id: 2, 
        slug: 'conservacion-nuevo-laredo',
        nombre: 'Conservación periódica mediante trabajos de fresado del pavimento existente y carpeta asfáltica de granulometría densa con una meta de 9.4 km, del km 35+000 al km 44+400, Carretera: Nuevo Laredo - Piedras Negras, Tramo: Nuevo Laredo - Lim. Edos. N.L./Coah', 
        categoria: 'Infraestructura Vial', 
        estado: 'tam',
        destacado: true,
        descripcion: 'Trabajos integrales de conservación periódica que incluyen fresado, nivelación y aplicación de carpeta asfáltica nueva en un tramo crítico de la carretera federal.',
    },
    { 
        id: 3, 
        slug: 'torre-zenith',
        nombre: 'Edificación vertical de centro corporativo de alto impacto', 
        categoria: 'Edificación Vertical', 
        estado: 'nle',
        destacado: true,
        descripcion: 'Diseño y construcción de un edificio corporativo de 20 niveles con tecnología de punta y estándares internacionales de sustentabilidad.',
    },
    { 
        id: 4, 
        slug: 'obra-industrial-norte',
        nombre: 'Construcción de naves industriales para sector energético', 
        categoria: 'Industrial', 
        estado: 'coa',
        destacado: true,
        descripcion: 'Desarrollo de naves industriales especializadas para el almacenamiento y proceso de equipos del sector energético.',
    },
    { 
        id: 5, 
        slug: 'puente-centenario',
        nombre: 'Rehabilitación estructural de puente vehicular de alta circulación', 
        categoria: 'Infraestructura', 
        estado: 'ver',
        destacado: false,
        descripcion: 'Trabajos de reforzamiento estructural y mantenimiento mayor a puente vehicular estratégico.',
    },
    { 
        id: 6, 
        slug: 'pavimentacion-rural',
        nombre: 'Programa de pavimentación y accesos en zonas rurales marginadas', 
        categoria: 'Infraestructura Vial', 
        estado: 'oax',
        destacado: false,
        descripcion: 'Mejoramiento de caminos rurales mediante pavimentación con concreto hidráulico artesanal.',
    },
];
