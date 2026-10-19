<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $anterior = '<p>El portafolio oficial de Petrotekno incluye la rehabilitación funcional del pavimento en carriles principales de la avenida Eugenio Garza Sada, en Monterrey, Nuevo León, con fecha de ejecución de 2023.</p>';
        $nuevo = '<p>Rehabilitación funcional del pavimento en los carriles principales de la avenida Eugenio Garza Sada, tramo II, en Monterrey, Nuevo León. El sector documentado va del Río La Silla a la avenida Ignacio Morones Prieto.</p><h2>Ubicación y alcance</h2><p>La intervención forma parte del portafolio de rehabilitación vial de Petrotekno y figura con fecha de ejecución en agosto de 2023.</p><ul><li><strong>Ubicación:</strong> avenida Eugenio Garza Sada, Monterrey, Nuevo León.</li><li><strong>Tramo:</strong> carriles principales, tramo II.</li><li><strong>Delimitación:</strong> del Río La Silla a la avenida Ignacio Morones Prieto.</li><li><strong>Tipo de trabajo:</strong> rehabilitación funcional del pavimento.</li><li><strong>Fecha registrada:</strong> agosto de 2023.</li></ul>';

        DB::table('obras')
            ->where('slug', 'rehabilitacion-pavimento-eugenio-garza-sada')
            ->where('contenido', $anterior)
            ->update(['contenido' => $nuevo, 'updated_at' => now()]);
    }

    public function down(): void
    {
        // El contenido puede haber sido editado desde el CMS.
    }
};
