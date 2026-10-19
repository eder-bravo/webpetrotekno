<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('configuracion')
            ->where('clave', 'capacidad_descripcion')
            ->where('valor', 'Petrotekno integra personal especializado, maquinaria para pavimentación, transporte de asfaltos y plantas de mezclas asfálticas. Su proceso de reciclado incluye fresado, selección del material recuperado, evaluación en laboratorio, producción de mezcla, tendido y compactación. En 2011 recibió el Premio Jorge A. Cabezut Boo por investigación y desarrollo tecnológico en asfaltos.')
            ->update(['valor' => 'Petrotekno reúne personal especializado, maquinaria para pavimentación, transporte de asfaltos y plantas de mezclas asfálticas. En 2011 recibió el Premio Jorge A. Cabezut Boo por investigación y desarrollo tecnológico en asfaltos.']);
    }

    public function down(): void
    {
        // No sustituir contenido que ya pudo editarse desde el CMS.
    }
};
