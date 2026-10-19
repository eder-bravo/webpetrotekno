<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $settings = [
            'portafolio_url' => '/obras',
            'capacidad_recursos' => "Plantas móviles de mezclas asfálticas\nEquipo de transporte para asfaltos\nPersonal especializado en pavimentación",
            'beneficios_titulo' => 'Valor del reciclado',
            'beneficios_intro' => 'Aprovechamos el pavimento existente mediante un proceso técnico de selección, diseño y producción de mezcla.',
            'beneficios' => "Material recuperado|El pavimento existente se incorpora como insumo para una nueva mezcla asfáltica.\nMenos agregados vírgenes|El reciclado reduce la necesidad de materiales provenientes de bancos de agregados.\nControl del proceso|El material se selecciona y evalúa en laboratorio antes de fabricar la mezcla.",
            'proceso_titulo' => 'Así renovamos el pavimento',
            'proceso_intro' => 'Del fresado de la carpeta existente al tendido y compactación de la nueva mezcla.',
            'proceso_pasos' => "Fresado y perfilado\nCribado del material\nEvaluación en laboratorio\nProducción de mezcla\nTransporte a obra\nTendido y compactación",
        ];

        foreach ($settings as $key => $value) {
            DB::table('configuracion')->where('clave', $key)->where('valor', '')->update(['valor' => $value]);
            DB::table('configuracion')->insertOrIgnore([
                'clave' => $key,
                'valor' => $value,
                'tipo' => 'text',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::table('servicios')->insertOrIgnore([
            'titulo' => 'Infraestructura vial y obra civil',
            'slug' => 'infraestructura-vial-y-obra-civil',
            'icono' => 'BridgeIcon',
            'descripcion_corta' => 'Trabajos complementarios de infraestructura vial y estructuras documentados en el portafolio de la empresa.',
            'contenido' => '<p>Además de pavimentos, el portafolio oficial de Petrotekno documenta trabajos de obra civil vinculados con infraestructura vial, incluyendo pasos vehiculares, estructuras de concreto, drenaje y vialidades.</p><p>El alcance de cada proyecto depende de sus especificaciones técnicas y contractuales.</p>',
            'activo' => true,
            'orden' => 4,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $works = [
            [
                'nombre' => 'Reciclado de pavimento en la carretera Zacatepec–Oriental',
                'slug' => 'reciclado-carretera-zacatepec-oriental',
                'categoria' => 'Reciclado de pavimento',
                'estado' => 'pue',
                'contenido' => '<p>El portafolio oficial registra un proyecto de reciclado en planta del material recuperado de la carpeta asfáltica existente en la carretera Zacatepec–Oriental, Puebla, en 2014.</p>',
                'destacado' => false,
                'orden' => 8,
            ],
            [
                'nombre' => 'Conservación de la carretera Oaxaca–Puerto Ángel',
                'slug' => 'conservacion-carretera-oaxaca-puerto-angel',
                'categoria' => 'Conservación carretera',
                'estado' => 'oax',
                'contenido' => '<p>El portafolio oficial incluye trabajos de conservación mediante reciclado en planta en caliente del material recuperado de la carpeta existente en la carretera Oaxaca–Puerto Ángel, durante 2016.</p>',
                'destacado' => false,
                'orden' => 7,
            ],
            [
                'nombre' => 'Rehabilitación de camino a San Mateo en Cadereyta',
                'slug' => 'rehabilitacion-camino-san-mateo-cadereyta',
                'categoria' => 'Rehabilitación vial',
                'estado' => 'nle',
                'contenido' => '<p>El portafolio oficial registra la rehabilitación de pavimento en el camino a San Mateo, en Cadereyta Jiménez, Nuevo León, con fecha de ejecución de 2023.</p>',
                'destacado' => false,
                'orden' => 6,
            ],
            [
                'nombre' => 'Vialidades internas del Puerto de Matamoros',
                'slug' => 'vialidades-internas-puerto-matamoros',
                'categoria' => 'Infraestructura vial',
                'estado' => 'tam',
                'contenido' => '<p>El portafolio oficial de Petrotekno registra la construcción de vialidades internas para el inicio de operaciones del Puerto de Matamoros, Tamaulipas, en 2024.</p>',
                'destacado' => true,
                'orden' => 5,
            ],
        ];

        foreach ($works as $work) {
            DB::table('obras')->insertOrIgnore($work + [
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        // El contenido se puede editar en el CMS; un rollback no debe borrar esas ediciones.
    }
};
