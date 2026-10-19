<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private array $demoSlugs = [
        'puerto-industrial-de-altamira',
        'carretera-tampico-mante',
        'planta-petroquimica-madero',
        'centro-logistico-reynosa',
        'parque-industrial-victoria',
        'torre-corporativa-monterrey',
        'centro-comercial-apodaca',
        'autopista-monterrey-saltillo',
        'planta-automotriz-garcia',
        'hospital-regional-san-nicolas',
        'puerto-de-veracruz-modernizacion',
        'refineria-tula',
        'boulevard-costero-veracruz',
        'parque-eolico-la-venta',
        'centro-de-convenciones-xalapa',
    ];

    public function up(): void
    {
        DB::table('obras')
            ->whereIn('slug', $this->demoSlugs)
            ->whereNull('imagen')
            ->whereColumn('created_at', 'updated_at')
            ->update(['activo' => false]);
    }

    public function down(): void
    {
        // No reactivar automáticamente obras que un editor pudo haber desactivado.
    }
};
