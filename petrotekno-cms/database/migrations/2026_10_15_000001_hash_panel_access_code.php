<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    public function up(): void
    {
        $config = DB::table('configuracion')->where('clave', 'codigo_acceso')->first();
        if ($config && $config->valor && !str_starts_with($config->valor, '$2') && !str_starts_with($config->valor, '$argon2')) {
            DB::table('configuracion')->where('clave', 'codigo_acceso')->update([
                'valor' => Hash::make($config->valor),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        // Un hash no se puede revertir a texto sin conocer el código original.
    }
};
