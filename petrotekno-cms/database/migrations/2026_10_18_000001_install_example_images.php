<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    public function up(): void
    {
        $disk = Storage::disk('public');

        $examples = [
            ['servicios', 'reciclado-de-pavimento-asfaltico-en-caliente', 'reciclado-pavimento.webp', 'servicios/ejemplo-reciclado-pavimento.webp'],
            ['servicios', 'construccion-de-pavimentos-asfalticos', 'construccion-pavimentos.webp', 'servicios/ejemplo-construccion-pavimentos.webp'],
            ['servicios', 'rehabilitacion-y-conservacion-de-carreteras', 'rehabilitacion-carreteras.webp', 'servicios/ejemplo-rehabilitacion-carreteras.webp'],
            ['servicios', 'infraestructura-vial-y-obra-civil', 'infraestructura-vial.webp', 'servicios/ejemplo-infraestructura-vial.webp'],
            ['obras', 'rehabilitacion-pavimento-eugenio-garza-sada', 'rehabilitacion-vial-ilustrativa.png', 'obras/ejemplo-rehabilitacion-vial.png'],
        ];

        foreach ($examples as [$table, $slug, $asset, $destination]) {
            $record = DB::table($table)->where('slug', $slug)->whereNull('imagen')->first();
            if (!$record) {
                continue;
            }

            $source = database_path('seeders/assets/'.$asset);
            if (!is_file($source)) {
                throw new RuntimeException("Falta la imagen de ejemplo: {$source}");
            }

            if (!$disk->exists($destination) && !$disk->put($destination, file_get_contents($source))) {
                throw new RuntimeException("No se pudo instalar la imagen de ejemplo: {$destination}");
            }

            $changes = ['imagen' => $destination, 'updated_at' => now()];
            if ($table === 'obras') {
                $changes['imagen_ilustrativa'] = true;
            }

            DB::table($table)->where('id', $record->id)->whereNull('imagen')->update($changes);
        }
    }

    public function down(): void
    {
        // Una imagen pudo ser reemplazada o editada desde el CMS.
    }
};
