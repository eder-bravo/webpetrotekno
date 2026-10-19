<?php

namespace Database\Seeders;

use App\Models\Configuracion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ConfiguracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Configuracion::where('clave', 'codigo_acceso')->exists()) {
            $initialCode = env('PANEL_ACCESS_CODE');
            if (!is_string($initialCode) || strlen($initialCode) < 12) {
                throw new \RuntimeException('Configura PANEL_ACCESS_CODE con al menos 12 caracteres para crear el panel.');
            }
            Configuracion::firstOrCreate(
                ['clave' => 'codigo_acceso'],
                ['valor' => Hash::make($initialCode), 'tipo' => 'text']
            );
        }

        $configuraciones = [
            // Logo
            ['clave' => 'logo', 'valor' => '', 'tipo' => 'image'],
            
            // Contacto
            ['clave' => 'contacto_direccion', 'valor' => '', 'tipo' => 'text'],
            ['clave' => 'contacto_email', 'valor' => 'contacto@petrotekno.mx', 'tipo' => 'text'],
            ['clave' => 'contacto_telefono', 'valor' => '', 'tipo' => 'text'],
            ['clave' => 'contacto_horario', 'valor' => '', 'tipo' => 'text'],
            
            // SEO Global
            ['clave' => 'site_title', 'valor' => 'Petrotekno Ingeniería y Construcción', 'tipo' => 'text'],
            ['clave' => 'site_description', 'valor' => 'Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.', 'tipo' => 'text'],
            
            // Slogan
            ['clave' => 'slogan', 'valor' => 'Ingeniería que transforma el paisaje.', 'tipo' => 'text'],
            ['clave' => 'hero_titulo', 'valor' => 'CONSTRUYENDO', 'tipo' => 'text'],
            ['clave' => 'hero_destacado', 'valor' => 'EL FUTURO', 'tipo' => 'text'],
            ['clave' => 'hero_subtitulo', 'valor' => 'Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.', 'tipo' => 'text'],
            
            // CV de la Empresa
            ['clave' => 'cv_empresa', 'valor' => '', 'tipo' => 'file'],
        ];

        foreach ($configuraciones as $config) {
            Configuracion::firstOrCreate(
                ['clave' => $config['clave']],
                ['valor' => $config['valor'], 'tipo' => $config['tipo']]
            );
        }
    }
}
