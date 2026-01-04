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
        $obras = [
            // 5 Obras en Tamaulipas (tam)
            [
                'nombre' => 'Puerto Industrial de Altamira',
                'estado' => 'tam',
                'categoria' => 'Infraestructura',
                'contenido' => '<p>Desarrollo de infraestructura portuaria industrial con capacidad para grandes buques de carga.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Puerto Industrial de Altamira - Petrotekno',
                'meta_description' => 'Construcción de infraestructura portuaria en Altamira, Tamaulipas.',
            ],
            [
                'nombre' => 'Carretera Tampico-Mante',
                'estado' => 'tam',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<p>Construcción y modernización de carretera de 4 carriles.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Carretera Tampico-Mante',
                'meta_description' => 'Infraestructura vial en Tamaulipas.',
            ],
            [
                'nombre' => 'Planta Petroquímica Madero',
                'estado' => 'tam',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<p>Modernización de planta petroquímica con tecnología de punta.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Planta Petroquímica Madero',
                'meta_description' => 'Modernización industrial en Ciudad Madero.',
            ],
            [
                'nombre' => 'Centro Logístico Reynosa',
                'estado' => 'tam',
                'categoria' => 'Industrial',
                'contenido' => '<p>Centro de distribución y almacenamiento de última generación.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro Logístico Reynosa',
                'meta_description' => 'Infraestructura logística en Reynosa.',
            ],
            [
                'nombre' => 'Parque Industrial Victoria',
                'estado' => 'tam',
                'categoria' => 'Industrial',
                'contenido' => '<p>Desarrollo de parque industrial con naves de manufactura.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Parque Industrial Victoria',
                'meta_description' => 'Parque industrial en Ciudad Victoria.',
            ],
            
            // 5 Obras en Nuevo León (nle)
            [
                'nombre' => 'Torre Corporativa Monterrey',
                'estado' => 'nle',
                'categoria' => 'Edificación Vertical',
                'contenido' => '<p>Edificio de oficinas de 25 pisos en el centro de Monterrey.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Torre Corporativa Monterrey - Petrotekno',
                'meta_description' => 'Edificio corporativo de altura en Monterrey.',
            ],
            [
                'nombre' => 'Centro Comercial Apodaca',
                'estado' => 'nle',
                'categoria' => 'Edificación Pública',
                'contenido' => '<p>Plaza comercial de 3 niveles con estacionamiento subterráneo.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro Comercial Apodaca',
                'meta_description' => 'Desarrollo comercial en Apodaca.',
            ],
            [
                'nombre' => 'Autopista Monterrey-Saltillo',
                'estado' => 'nle',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<p>Ampliación de autopista a 6 carriles con tecnología inteligente.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Autopista Monterrey-Saltillo',
                'meta_description' => 'Modernización de infraestructura carretera.',
            ],
            [
                'nombre' => 'Planta Automotriz García',
                'estado' => 'nle',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<p>Ensambladora automotriz con capacidad de 200,000 unidades anuales.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Planta Automotriz García',
                'meta_description' => 'Planta industrial automotriz en García, NL.',
            ],
            [
                'nombre' => 'Hospital Regional San Nicolás',
                'estado' => 'nle',
                'categoria' => 'Edificación Pública',
                'contenido' => '<p>Hospital de especialidades con 200 camas y tecnología médica avanzada.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Hospital Regional San Nicolás',
                'meta_description' => 'Infraestructura de salud en San Nicolás.',
            ],
            
            // 5 Obras en Veracruz (ver)
            [
                'nombre' => 'Puerto de Veracruz - Modernización',
                'estado' => 'ver',
                'categoria' => 'Infraestructura',
                'contenido' => '<p>Ampliación y modernización del puerto más importante de México.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Puerto de Veracruz Modernización',
                'meta_description' => 'Modernización portuaria en Veracruz.',
            ],
            [
                'nombre' => 'Refinería Tula',
                'estado' => 'ver',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<p>Mantenimiento mayor y actualización de refinería petrolera.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Refinería Tula',
                'meta_description' => 'Modernización de refinería en Veracruz.',
            ],
            [
                'nombre' => 'Boulevard Costero Veracruz',
                'estado' => 'ver',
                'categoria' => 'Infraestructura Vial',
                'contenido' => '<p>Construcción de boulevard panorámico de 8 km frente al mar.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Boulevard Costero Veracruz',
                'meta_description' => 'Infraestructura vial costera.',
            ],
            [
                'nombre' => 'Parque Eólico La Venta',
                'estado' => 'ver',
                'categoria' => 'Industrial / Energía',
                'contenido' => '<p>Campo de generación eólica con 100 aerogeneradores.</p>',
                'destacado' => true,
                'activo' => true,
                'meta_title' => 'Parque Eólico La Venta',
                'meta_description' => 'Energía renovable en Veracruz.',
            ],
            [
                'nombre' => 'Centro de Convenciones Xalapa',
                'estado' => 'ver',
                'categoria' => 'Edificación Pública',
                'contenido' => '<p>Centro de convenciones con capacidad para 5,000 personas.</p>',
                'destacado' => false,
                'activo' => true,
                'meta_title' => 'Centro de Convenciones Xalapa',
                'meta_description' => 'Infraestructura para eventos en Xalapa.',
            ],
        ];

        foreach ($obras as $index => $obraData) {
            Obra::create([
                'nombre' => $obraData['nombre'],
                'slug' => Str::slug($obraData['nombre']),
                'estado' => $obraData['estado'],
                'categoria' => $obraData['categoria'],
                'contenido' => $obraData['contenido'],
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
