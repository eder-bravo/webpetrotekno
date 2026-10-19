<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Solo sustituir los textos originales de plantilla; respetar ediciones del CMS.
        $replacements = [
            'site_title' => ['Petrotekno Ingeniería y Construcción', 'Petrotekno | Pavimentos asfálticos y reciclado en caliente'],
            'site_description' => ['Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.', 'Petrotekno, S.A. de C.V.: construcción y rehabilitación de pavimentos asfálticos, con especialidad en reciclado en caliente de material recuperado.'],
            'slogan' => ['Ingeniería que transforma el paisaje.', 'Construcción, rehabilitación y reciclado de pavimentos asfálticos.'],
            'hero_titulo' => ['CONSTRUYENDO', 'PAVIMENTOS'],
            'hero_destacado' => ['EL FUTURO', 'QUE RENUEVAN CAMINOS'],
            'hero_subtitulo' => ['Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.', 'Construimos y rehabilitamos pavimentos asfálticos. Nuestra especialidad es el reciclado en caliente del material recuperado.'],
            'contacto_email' => ['contacto@petrotekno.mx', 'info@petrotekno.com.mx'],
        ];

        foreach ($replacements as $key => [$old, $new]) {
            DB::table('configuracion')->where('clave', $key)->where('valor', $old)->update(['valor' => $new]);
            DB::table('configuracion')->insertOrIgnore([
                'clave' => $key, 'valor' => $new, 'tipo' => 'text',
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $additional = [
            'contacto_telefono' => '+52 81 8373 7373',
            'contacto_direccion' => 'Jerónimo Cardona 116, Col. Burócratas del Estado, Monterrey, Nuevo León, C.P. 64380',
            'capacidad_descripcion' => 'Petrotekno integra personal especializado, maquinaria para pavimentación, transporte de asfaltos y plantas de mezclas asfálticas. Su proceso de reciclado incluye fresado, selección del material recuperado, evaluación en laboratorio, producción de mezcla, tendido y compactación. En 2011 recibió el Premio Jorge A. Cabezut Boo por investigación y desarrollo tecnológico en asfaltos.',
        ];

        foreach ($additional as $key => $value) {
            DB::table('configuracion')->where('clave', $key)->where('valor', '')->update(['valor' => $value]);
            DB::table('configuracion')->insertOrIgnore([
                'clave' => $key, 'valor' => $value, 'tipo' => 'text',
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $services = [
            [
                'titulo' => 'Reciclado de pavimento asfáltico en caliente',
                'slug' => 'reciclado-de-pavimento-asfaltico-en-caliente',
                'icono' => 'Path',
                'descripcion_corta' => 'Reutilización del material recuperado de la carpeta existente para producir mezcla asfáltica en caliente.',
                'contenido' => '<p>Petrotekno se especializa en el reciclado en caliente de pavimentos asfálticos. El material recuperado se fresa, selecciona y evalúa en laboratorio antes de incorporarse a la nueva mezcla.</p><p>La mezcla se transporta a la obra, se tiende y se compacta. El aprovechamiento del material existente reduce la necesidad de agregados vírgenes.</p>',
                'orden' => 1,
            ],
            [
                'titulo' => 'Construcción de pavimentos asfálticos',
                'slug' => 'construccion-de-pavimentos-asfalticos',
                'icono' => 'HardHat',
                'descripcion_corta' => 'Construcción de carpetas y bases asfálticas en proyectos carreteros y vialidades.',
                'contenido' => '<p>El portafolio de Petrotekno documenta trabajos de construcción de carpetas de concreto asfáltico y bases asfálticas en caliente, así como pavimentación de vialidades.</p><p>El alcance técnico de cada proyecto se define según las condiciones de la vía y las especificaciones contratadas.</p>',
                'orden' => 2,
            ],
            [
                'titulo' => 'Rehabilitación y conservación de carreteras',
                'slug' => 'rehabilitacion-y-conservacion-de-carreteras',
                'icono' => 'Wrench',
                'descripcion_corta' => 'Fresado, recuperación, recarpeteo y conservación periódica de superficies de rodamiento.',
                'contenido' => '<p>Petrotekno ha participado en trabajos de rehabilitación y conservación de pavimentos asfálticos. Su portafolio incluye proyectos de fresado, reciclado de carpeta, recarpeteo y colocación de nueva mezcla.</p><p>El tratamiento se determina de acuerdo con el estado del pavimento y los requerimientos de cada obra.</p>',
                'orden' => 3,
            ],
        ];

        foreach ($services as $service) {
            DB::table('servicios')->insertOrIgnore($service + [
                'activo' => true, 'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $works = [
            [
                'nombre' => 'Reciclado de vialidades en Nuevo Laredo',
                'slug' => 'reciclado-vialidades-nuevo-laredo',
                'categoria' => 'Reciclado de pavimento',
                'estado' => 'tam',
                'contenido' => '<p>El portafolio oficial de Petrotekno registra dos etapas de reciclado de carpeta asfáltica en vialidades del primer cuadro de Nuevo Laredo, Tamaulipas, durante 2014.</p>',
                'destacado' => false,
                'orden' => 4,
            ],
            [
                'nombre' => 'Conservación de la carretera Valladolid–Río Lagartos',
                'slug' => 'conservacion-carretera-valladolid-rio-lagartos',
                'categoria' => 'Conservación carretera',
                'estado' => 'yuc',
                'contenido' => '<p>En Yucatán, el portafolio oficial registra trabajos de conservación periódica mediante reciclado en planta en caliente del material recuperado de la carpeta existente en la carretera Valladolid–Río Lagartos, en 2016.</p>',
                'destacado' => true,
                'orden' => 3,
            ],
            [
                'nombre' => 'Carpeta asfáltica en la carretera Monterrey–Nuevo Laredo',
                'slug' => 'carpeta-asfaltica-carretera-monterrey-nuevo-laredo',
                'categoria' => 'Construcción de pavimento',
                'estado' => 'nle',
                'contenido' => '<p>El portafolio oficial registra la construcción de carpeta de concreto asfáltico y base asfáltica en caliente en la carretera Monterrey–Nuevo Laredo, con fecha de ejecución de 2020.</p>',
                'destacado' => true,
                'orden' => 2,
            ],
            [
                'nombre' => 'Rehabilitación de pavimento en Eugenio Garza Sada',
                'slug' => 'rehabilitacion-pavimento-eugenio-garza-sada',
                'categoria' => 'Rehabilitación vial',
                'estado' => 'nle',
                'contenido' => '<p>Rehabilitación funcional del pavimento en los carriles principales de la avenida Eugenio Garza Sada, tramo II, en Monterrey, Nuevo León. El sector documentado va del Río La Silla a la avenida Ignacio Morones Prieto.</p><h2>Ubicación y alcance</h2><p>La intervención forma parte del portafolio de rehabilitación vial de Petrotekno y figura con fecha de ejecución en agosto de 2023.</p><ul><li><strong>Ubicación:</strong> avenida Eugenio Garza Sada, Monterrey, Nuevo León.</li><li><strong>Tramo:</strong> carriles principales, tramo II.</li><li><strong>Delimitación:</strong> del Río La Silla a la avenida Ignacio Morones Prieto.</li><li><strong>Tipo de trabajo:</strong> rehabilitación funcional del pavimento.</li><li><strong>Fecha registrada:</strong> agosto de 2023.</li></ul>',
                'destacado' => true,
                'orden' => 1,
            ],
        ];

        foreach ($works as $work) {
            DB::table('obras')->insertOrIgnore($work + [
                'activo' => true, 'created_at' => now(), 'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        // El contenido ya puede haber sido editado desde el CMS.
    }
};
