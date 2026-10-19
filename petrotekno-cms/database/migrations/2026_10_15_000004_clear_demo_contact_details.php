<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('configuracion')->where('clave', 'contacto_direccion')->where('valor', 'Av. Reforma 222, CDMX')->update(['valor' => '']);
        DB::table('configuracion')->where('clave', 'contacto_telefono')->where('valor', '+52 (55) 1234 5678')->update(['valor' => '']);
    }

    public function down(): void
    {
        // Los datos de plantilla no deben reaparecer automáticamente.
    }
};
