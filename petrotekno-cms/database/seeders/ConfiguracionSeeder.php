<?php

namespace Database\Seeders;

use App\Models\Configuracion;
use Illuminate\Database\Seeder;

class ConfiguracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configuraciones = [
            // Código de acceso al panel
            ['clave' => 'codigo_acceso', 'valor' => 'petrotekno2024', 'tipo' => 'text'],
            
            // Logo
            ['clave' => 'logo', 'valor' => '', 'tipo' => 'image'],
            
            // Contacto
            ['clave' => 'contacto_direccion', 'valor' => 'Av. Reforma 222, CDMX', 'tipo' => 'text'],
            ['clave' => 'contacto_email', 'valor' => 'contacto@petrotekno.mx', 'tipo' => 'text'],
            ['clave' => 'contacto_telefono', 'valor' => '+52 (55) 1234 5678', 'tipo' => 'text'],
            
            // SEO Global
            ['clave' => 'site_title', 'valor' => 'Petrotekno Ingeniería y Construcción', 'tipo' => 'text'],
            ['clave' => 'site_description', 'valor' => 'Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.', 'tipo' => 'text'],
            
            // Slogan
            ['clave' => 'slogan', 'valor' => 'Ingeniería que transforma el paisaje.', 'tipo' => 'text'],
        ];

        foreach ($configuraciones as $config) {
            Configuracion::updateOrCreate(
                ['clave' => $config['clave']],
                ['valor' => $config['valor'], 'tipo' => $config['tipo']]
            );
        }
    }
}
