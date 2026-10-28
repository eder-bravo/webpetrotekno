<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $settings = [
            'ahulados_titulo' => 'Asfaltos ahulados',
            'ahulados_subtitulo' => 'Asfalto modificado con caucho',
            'ahulados_descripcion' => 'Los asfaltos ahulados (o asfalto modificado con caucho) son mezclas asfálticas a las que se les incorpora polvo o caucho reciclado proveniente de neumáticos (llantas) en desuso.',
        ];

        foreach ($settings as $key => $value) {
            DB::table('configuracion')->insertOrIgnore([
                'clave' => $key,
                'valor' => $value,
                'tipo' => 'text',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        // Conservar los textos que la empresa haya editado desde el CMS.
    }
};
