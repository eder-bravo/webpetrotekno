/**
 * Datos de prueba para los servicios.
 * Se usan cuando el API no está disponible (modo local/desarrollo).
 * En producción, estos datos vienen del CMS via API.
 */
export const serviciosFallback = [
    {
        id: 1,
        slug: 'especialidad-ambiental',
        icono: 'Leaf',
        titulo: 'Especialidad Ambiental',
        descripcion_corta:
            'Realizar de proyectos destinados al mejoramiento ambiental y energético, mediante la búsqueda de alternativas que permitan brindar soluciones adecuadas a las necesidades de nuestros clientes, dentro de la industria energética, presentes en distintas regiones de nuestro país.',
        contenido: `
            <h2>Especialidad Ambiental</h2>
            <p>
                Nos especializamos en el desarrollo de proyectos destinados al mejoramiento ambiental
                y energético, mediante la búsqueda de alternativas que permitan brindar soluciones
                adecuadas a las necesidades de nuestros clientes, dentro de la industria energética,
                presentes en distintas regiones de nuestro país.
            </p>
            <h3>Nuestros Servicios Ambientales</h3>
            <ul>
                <li>Estudios de impacto ambiental</li>
                <li>Proyectos de mejoramiento energético</li>
                <li>Soluciones sustentables para la industria</li>
                <li>Gestión de residuos industriales</li>
                <li>Monitoreo y control ambiental</li>
            </ul>
            <p>
                Contamos con un equipo de especialistas ambientales con amplia experiencia en
                proyectos de gran envergadura, cumpliendo siempre con la normativa vigente
                en materia ambiental.
            </p>
        `,
    },
    {
        id: 2,
        slug: 'infraestructura-vial',
        icono: 'Path',
        titulo: 'Infraestructura Vial',
        descripcion_corta:
            'Carreteras, puentes y pavimentación desarrollados para durar y conectar comunidades de todo el país.',
        contenido: `
            <h2>Infraestructura Vial</h2>
            <p>
                Desarrollamos proyectos de infraestructura vial con los más altos estándares de
                calidad, conectando comunidades y facilitando el movimiento de personas y mercancías
                en todo el país.
            </p>
            <h3>Especialidades</h3>
            <ul>
                <li>Construcción y rehabilitación de carreteras</li>
                <li>Puentes y pasos a desnivel</li>
                <li>Pavimentación y conservación de vialidades</li>
                <li>Señalización y dispositivos de seguridad vial</li>
                <li>Supervisión de obra vial</li>
            </ul>
        `,
    },
    {
        id: 3,
        slug: 'edificacion-vertical',
        icono: 'Buildings',
        titulo: 'Edificación Vertical',
        descripcion_corta:
            'Construcción de complejos corporativos y residenciales con los más altos estándares de calidad y seguridad.',
        contenido: `
            <h2>Edificación Vertical</h2>
            <p>
                Construimos edificios corporativos, residenciales e institucionales con diseños
                modernos y funcionales, cumpliendo con todas las normas de construcción y
                seguridad estructural.
            </p>
            <h3>Tipos de Proyectos</h3>
            <ul>
                <li>Edificios corporativos y de oficinas</li>
                <li>Desarrollos habitacionales</li>
                <li>Instalaciones institucionales</li>
                <li>Centros comerciales</li>
                <li>Hoteles y hospitales</li>
            </ul>
        `,
    },
    {
        id: 4,
        slug: 'obra-industrial',
        icono: 'Factory',
        titulo: 'Obra Industrial',
        descripcion_corta:
            'Naves industriales y plantas de manufactura optimizadas para la productividad y eficiencia operativa.',
        contenido: `
            <h2>Obra Industrial</h2>
            <p>
                Diseñamos y construimos instalaciones industriales optimizadas para maximizar
                la productividad y eficiencia operativa de nuestros clientes.
            </p>
            <h3>Nuestras Capacidades</h3>
            <ul>
                <li>Naves industriales y bodegas</li>
                <li>Plantas de manufactura</li>
                <li>Parques industriales</li>
                <li>Instalaciones de almacenamiento</li>
                <li>Remodelación y ampliación de plantas</li>
            </ul>
        `,
    },
    {
        id: 5,
        slug: 'proyectos-llave-en-mano',
        icono: 'HardHat',
        titulo: 'Proyectos Llave en Mano',
        descripcion_corta:
            'Gestión integral desde el diseño, construcción y supervisión hasta la entrega final operativa del proyecto.',
        contenido: `
            <h2>Proyectos Llave en Mano</h2>
            <p>
                Ofrecemos una gestión integral de proyectos, desde la concepción y diseño
                hasta la entrega final operativa, asumiendo la responsabilidad completa del
                desarrollo del proyecto.
            </p>
            <h3>¿Qué incluye?</h3>
            <ul>
                <li>Ingeniería y diseño</li>
                <li>Gestión de permisos y licencias</li>
                <li>Construcción y supervisión</li>
                <li>Instalaciones y equipamiento</li>
                <li>Puesta en marcha y entrega operativa</li>
            </ul>
            <p>
                Con nuestro modelo llave en mano, el cliente recibe un proyecto terminado
                y listo para operar, sin preocuparse por la coordinación de múltiples proveedores.
            </p>
        `,
    },
];
