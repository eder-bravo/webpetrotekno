<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('configuracion')
            ->where('clave', 'portafolio_url')
            ->where('valor', 'https://www.petrotekno.com.mx/portafolio_petrotekno.pdf')
            ->update(['valor' => '/obras', 'updated_at' => now()]);
    }

    public function down(): void
    {
        // No restaurar el enlace que dejó de funcionar.
    }
};
