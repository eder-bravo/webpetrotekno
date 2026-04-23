<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Obra;
use Illuminate\Support\Str;

class ObrasSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Limpiar obras existentes
        Obra::truncate();

        $obras = [
            // 5 Obras en Tamaulipas (tam)
            [
                'nombre' => 'Puerto Industrial de Altamira',
                'estado' => 'tam',
                'categoria' => 'Infraestructura',
                'contenido' => '<h2>Visión General del Proyecto</h2><p>El Puerto Industrial de Altamira representa uno de los proyectos de infraestructura portuaria más importantes del noreste de México. Con una inversión significativa, este desarrollo cuenta con capacidad para recibir buques de carga de gran calado, incluyendo portacontenedores y buques graneleros.</p><h2>Alcance de la Obra</h2><p>El proyecto abarcó la construcción de muelles de atraque de 300 metros de longitud, áreas de almacenamiento de 50,000 metros cuadrados, y la instalación de grúas pórtico de última generación. Además, se desarrollaron vialidades internas de acceso y sistemas de control logístico automatizado.</p><h2>Impacto Económico</h2><p>Este puerto fortalece la conectividad marítima de la región, facilitando el comercio internacional y generando más de 2,000 empleos directos e indirectos en la zona.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Puerto Industrial de Altamira - Petrotekno',
                'meta_description' => 'Construcción de infraestructura portuaria en Altamira, Tamaulipas.',
                'imagen' => 'obras/43fddc12739253a35dff2b884c7ddbe7.jpg',
            ],
            [
                'nombre' => 'Carretera Tampico-Mante',
                'estado' => 'tam',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<h2>Modernización Vial Estratégica</h2><p>La carretera Tampico-Mante es una arteria vial fundamental que conecta la zona metropolitana de Tampico con la ciudad de Mante, atravesando una de las regiones más productivas del estado de Tamaulipas.</p><h2>Especificaciones Técnicas</h2><p>El proyecto incluyó la ampliación a 4 carriles en un tramo de 85 kilómetros, con pavimento de concreto hidráulico de alta resistencia. Se instalaron sistemas de drenaje pluvial, señalización inteligente, iluminación LED en zonas urbanas, y se construyeron 12 puentes vehiculares y peatonales.</p><h2>Beneficios</h2><p>La modernización reduce los tiempos de traslado en un 40%, mejora la seguridad vial con una disminución del 60% en accidentes, y potencia el desarrollo económico de las comunidades ribereñas.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Carretera Tampico-Mante',
                'meta_description' => 'Infraestructura vial en Tamaulipas.',
                'imagen' => 'obras/79ecdea408db3a66f922a9cf6abeccb6.jpg',
            ],
            [
                'nombre' => 'Planta Petroquímica Madero',
                'estado' => 'tam',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<h2>Complejo Petroquímico de Vanguardia</h2><p>La Planta Petroquímica Madero es un complejo industrial diseñado para el procesamiento de derivados del petróleo y la producción de materias primas para la industria plástica y química.</p><h2>Características del Proyecto</h2><p>Con una extensión de 120 hectáreas, la planta cuenta con unidades de destilación, cracking catalítico, y plantas de producción de polietileno y polipropileno. Toda la infraestructura cumple con los más altos estándares de seguridad y normativas ambientales internacionales.</p><h2>Sostenibilidad</h2><p>El proyecto incorpora tecnologías de reducción de emisiones, sistema de tratamiento de aguas residuales, y un programa de reforestación de 500 hectáreas en la zona de influencia.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Planta Petroquímica Madero',
                'meta_description' => 'Modernización industrial en Ciudad Madero.',
                'imagen' => 'obras/ac60b8fbac030c1076c21368febb99b3.jpg',
            ],
            [
                'nombre' => 'Centro Logístico Reynosa',
                'estado' => 'tam',
                'categoria' => 'Industrial',
                'contenido' => '<h2>Hub Logístico Binacional</h2><p>Ubicado estratégicamente en la zona metropolitana de Reynosa-McAllen, este centro logístico de última generación sirve como punto de distribución clave para el comercio transfronterizo entre México y Estados Unidos.</p><h2>Instalaciones</h2><p>El complejo cuenta con 80,000 metros cuadrados de bodegas climatizadas, muelles de carga y descarga automatizados, área de aduanas, y una flota de vehículos de transporte terrestre. El sistema de gestión de inventario opera en tiempo real mediante tecnología RFID.</p><h2>Capacidad Operativa</h2><p>Con capacidad para procesar 500,000 toneladas de carga anual, el centro conecta con los principales corredores comerciales de Norteamérica.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro Logístico Reynosa',
                'meta_description' => 'Infraestructura logística en Reynosa.',
                'imagen' => 'obras/33199924708377216e4581e12519648b.jpg',
            ],
            [
                'nombre' => 'Parque Industrial Victoria',
                'estado' => 'tam',
                'categoria' => 'Industrial',
                'contenido' => '<h2>Desarrollo Industrial Integral</h2><p>El Parque Industrial Victoria es un proyecto master-plan que reúne naves industriales, oficinas corporativas, y servicios auxiliares en un entorno diseñado para la productividad.</p><h2>Infraestructura</h2><p>El parque ofrece lotes industriales desde 2,000 metros cuadrados con servicios subterráneos de energía eléctrica, agua potable, gas natural, y fibra óptica. Las vialidades internas están diseñadas para soportar carga pesada continua.</p><h2>Empresas Ancla</h2><p>Actualmente alberga empresas del sector automotriz, electrónica, y metalmecánica, generando una cadena de valor que dinamiza la economía local.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Parque Industrial Victoria',
                'meta_description' => 'Parque industrial en Ciudad Victoria.',
                'imagen' => 'obras/d132d21d168da15a944b96d07dac9d1d.jpg',
            ],
            
            // 5 Obras en Nuevo León (nle)
            [
                'nombre' => 'Torre Corporativa Monterrey',
                'estado' => 'nle',
                'categoria' => 'Edificación Vertical',
                'contenido' => '<h2>Ícono Arquitectónico de Monterrey</h2><p>La Torre Corporativa Monterrey se alza como un referente de la arquitectura moderna en el centro de la ciudad. Con 25 niveles de oficinas de clase A, este edificio redefine el skyline regiomontano.</p><h2>Diseño y Tecnología</h2><p>La torre incorpora fachada de doble piel de vidrio de última generación, sistemas de climatización inteligente, y plantas libres de columnas de hasta 1,200 metros cuadrados. El edificio cuenta certificación LEED Oro por su eficiencia energética.</p><h2>Amenidades</h2><p>Incluye centro de convenciones, gimnasio, terraza panorámica, estacionamiento para 800 vehículos, y conectividad directa con el sistema de transporte público.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Torre Corporativa Monterrey - Petrotekno',
                'meta_description' => 'Edificio corporativo de altura en Monterrey.',
                'imagen' => 'obras/d44c707e132d4a95a79c10f9a3830e26.jpg',
            ],
            [
                'nombre' => 'Centro Comercial Apodaca',
                'estado' => 'nle',
                'categoria' => 'Edificación Pública',
                'contenido' => '<h2>Experiencia Comercial de Primer Nivel</h2><p>El Centro Comercial Apodaca es un desarrollo mixto que combina retail, entretenimiento, y gastronomía en un espacio de 45,000 metros cuadrados de construcción.</p><h2>Distribución</h2><p>La plaza cuenta con 3 niveles comerciales, 150 locales, 8 salas de cine, patio de comidas con capacidad para 800 personas, y estacionamiento subterráneo para 1,200 autos.</p><h2>Arquitectura Sostenible</h2><p>Diseñado con jardines verticales, iluminación natural cenital, y sistema de captación de agua pluvial, el centro comercial es un ejemplo de desarrollo comercial responsable.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro Comercial Apodaca',
                'meta_description' => 'Desarrollo comercial en Apodaca.',
                'imagen' => 'obras/01e31bcaefc44d8066c63203b6f182d9.jpg',
            ],
            [
                'nombre' => 'Autopista Monterrey-Saltillo',
                'estado' => 'nle',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<h2>Corredor Vial Metropolitano</h2><p>La ampliación de la autopista Monterrey-Saltillo transformó el principal corredor de conexión entre estas dos importantes ciudades del noreste, reduciendo drásticamente los tiempos de traslado.</p><h2>Especificaciones</h2><p>El proyecto amplió la carretera a 6 carriles en un tramo de 70 kilómetros, con pavimento de concreto de alta durabilidad. Se instalaron sistemas de peaje electrónico sin detención, cámaras de seguridad, y paneles solares en zonas de descanso.</p><h2>Conectividad Inteligente</h2><p>La autopista es monitoreada 24/7 desde un centro de control que gestiona el tráfico en tiempo real y coordina respuesta a emergencias.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Autopista Monterrey-Saltillo',
                'meta_description' => 'Modernización de infraestructura carretera.',
                'imagen' => 'obras/316cb2008ed4f34865ce0e6079bd56b7.jpg',
            ],
            [
                'nombre' => 'Planta Automotriz García',
                'estado' => 'nle',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<h2>Fábrica del Futuro</h2><p>La Planta Automotriz García es una ensambladora de clase mundial con capacidad para producir 200,000 unidades anuales de vehículos de última generación.</p><h2>Procesos y Tecnología</h2><p>La planta cuenta con líneas de soldadura robotizadas, pintura automatizada con sistema de recuperación de solventes, y ensamblaje final con monitoreo de calidad en línea. El 40% de la energía consumida proviene de paneles solares instalados en los techos.</p><h2>Capacitación y Empleo</h2><p>La operación genera 3,500 empleos directos y un programa de capacitación técnica continua en alianza con universidades locales.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Planta Automotriz García',
                'meta_description' => 'Planta industrial automotriz en García, NL.',
                'imagen' => 'obras/416b4e483923dfe2e0446b6f222f8db5.jpg',
            ],
            [
                'nombre' => 'Hospital Regional San Nicolás',
                'estado' => 'nle',
                'categoria' => 'Edificación Pública',
                'contenido' => '<h2>Infraestructura de Salud de Vanguardia</h2><p>El Hospital Regional San Nicolás es un centro médico de especialidades con 200 camas, diseñado para atender a la población de la zona metropolitana de Monterrey con los más altos estándares de calidad.</p><h2>Especialidades y Equipamiento</h2><p>Cuenta con unidades de terapia intensiva, quirófanos híbridos, centro de diagnóstico por imágenes con resonancia magnética y tomografía, y una unidad de oncología con acelerador lineal.</p><h2>Diseño Humanista</h2><p>El hospital fue diseñado pensando en el bienestar del paciente, con áreas verdes, iluminación natural, y espacios de descanso para familiares.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Hospital Regional San Nicolás',
                'meta_description' => 'Infraestructura de salud en San Nicolás.',
                'imagen' => 'obras/5735da2986a813914e91c46e135ec0d3.jpg',
            ],
            
            // 5 Obras en Veracruz (ver)
            [
                'nombre' => 'Puerto de Veracruz - Modernización',
                'estado' => 'ver',
                'categoria' => 'Infraestructura',
                'contenido' => '<h2>Transformación Portuaria Histórica</h2><p>La modernización del Puerto de Veracruz, el más antiguo y uno de los más importantes de México, representó una inversión estratégica para mantener la competitividad del comercio marítimo nacional.</p><h2>Obras Realizadas</h2><p>El proyecto incluyó la draga del canal de acceso para recibir buques Post-Panamax, construcción de una terminal de contenedores automatizada, y ampliación de patios de almacenamiento. Se instalaron grúas pórtico de super-post-panamax con alcance de 23 hileras.</p><h2>Capacidad Ampliada</h2><p>La capacidad de movimiento anual se incrementó a 2.5 millones de TEUs, posicionando al puerto entre los principales de América Latina.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Puerto de Veracruz Modernización',
                'meta_description' => 'Modernización portuaria en Veracruz.',
                'imagen' => 'obras/ebfc8e2fac1376603708ce3d9f1040b2.jpg',
            ],
            [
                'nombre' => 'Refinería Tula',
                'estado' => 'ver',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<h2>Mantenimiento Mayor Integral</h2><p>El proyecto de mantenimiento mayor y modernización de la Refinería Tula abarcó la rehabilitación de unidades de destilación, sistema de generación de energía, y planta de tratamiento de aguas.</p><h2>Alcance Técnico</h2><p>Se ejecutaron trabajos de reemplazo de tuberías críticas, mantenimiento de tanques de almacenamiento, actualización de sistemas de control distribuido, y modernización de la planta coquizadora para cumplir con normativas de azufre.</p><h2>Resultados</h2><p>La intervención incrementó la eficiencia operativa en un 15% y redujo las emisiones contaminantes en un 25%, alineando la refinería con estándares internacionales.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Refinería Tula',
                'meta_description' => 'Modernización de refinería en Veracruz.',
                'imagen' => 'obras/e8378f29d410347cae0a76fad1cdb6ad.jpg',
            ],
            [
                'nombre' => 'Boulevard Costero Veracruz',
                'estado' => 'ver',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<h2>Paseo Marítimo de Clase Mundial</h2><p>El Boulevard Costero Veracruz es una obra de infraestructura vial y urbana que recuperó 8 kilómetros de línea de costa para el disfrute de la ciudadanía, convirtiéndose en el paseo marítimo más importante del Golfo de México.</p><h2>Componentes del Proyecto</h2><p>La obra incluyó la construcción de un boulevard de 4 carriles con ciclovía, banquetas de granito, malecón peatonal con palmeras, miradores, áreas de ejercicio, y plazas públicas. Se instalaron 500 luminarias ornamentales de LED.</p><h2>Impacto Social</h2><p>El boulevard revitalizó el turismo local, mejoró la calidad de vida de los residentes, y se convirtió en el escenario de eventos culturales y deportivos que atraen a visitantes de todo el país.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Boulevard Costero Veracruz',
                'meta_description' => 'Infraestructura vial costera.',
                'imagen' => 'obras/9495addd537b817ec5e3eb5da62b5f87.jpg',
            ],
            [
                'nombre' => 'Parque Eólico La Venta',
                'estado' => 'ver',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<h2>Energía Limpia para el Futuro</h2><p>El Parque Eólico La Venta es uno de los proyectos de energía renovable más importantes del sureste mexicano, aprovechando los vientos constantes de la región istmeña para generar electricidad limpia.</p><h2>Infraestructura Instalada</h2><p>El parque cuenta con 100 aerogeneradores de 3 MW cada uno, distribuidos en una extensión de 8,000 hectáreas. Se construyeron 45 kilómetros de caminos de acceso, una subestación eléctrica de 400 kV, y líneas de transmisión de interconexión.</p><h2>Generación y Beneficios</h2><p>Con una capacidad instalada de 300 MW, el parque abastece el consumo eléctrico de 600,000 hogares y evita la emisión de 450,000 toneladas de CO2 anuales.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Parque Eólico La Venta',
                'meta_description' => 'Energía renovable en Veracruz.',
                'imagen' => 'obras/36fc2659aa1df59e140170808a022461.jpg',
            ],
            [
                'nombre' => 'Centro de Convenciones Xalapa',
                'estado' => 'ver',
                'categoria' => 'Edificación Pública',
                'contenido' => '<h2>Espacio para Grandes Eventos</h2><p>El Centro de Convenciones Xalapa es la infraestructura de eventos más grande del estado de Veracruz, con capacidad para recibir convenciones nacionales e internacionales, exposiciones, y espectáculos.</p><h2>Instalaciones</h2><p>El complejo cuenta con un salón principal de 10,000 metros cuadrados sin columnas, 20 salones modulares, área de exposiciones, estacionamiento para 2,000 vehículos, y un hotel boutique anexo de 150 habitaciones.</p><h2>Tecnología</h2><p>El centro está equipado con sistemas de audio de última generación, iluminación inteligente, traducción simultánea en 6 idiomas, y conectividad WiFi de alta velocidad para 10,000 usuarios simultáneos.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro de Convenciones Xalapa',
                'meta_description' => 'Infraestructura para eventos en Xalapa.',
                'imagen' => 'obras/54d12cad01701d3b0b207ae30769400d.jpg',
            ],
        ];

        foreach ($obras as $index => $obraData) {
            Obra::create([
                'nombre' => $obraData['nombre'],
                'slug' => Str::slug($obraData['nombre']),
                'estado' => $obraData['estado'],
                'categoria' => $obraData['categoria'],
                'contenido' => $obraData['contenido'],
                'imagen' => $obraData['imagen'],
                'destacado' => $obraData['destacado'],
                'activo' => $obraData['activo'],
                'orden' => $index,
                'meta_title' => $obraData['meta_title'],
                'meta_description' => $obraData['meta_description'],
            ]);
        }

        $this->command->info('✓ Se crearon 15 obras distribuidas en 3 estados');
        $this->command->info('  - Tamaulipas: 5 obras');
        $this->command->info('  - Nuevo León: 5 obras');
        $this->command->info('  - Veracruz: 5 obras');
    }
}
