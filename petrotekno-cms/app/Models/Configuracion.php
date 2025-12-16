<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    protected $table = 'configuracion';

    protected $fillable = [
        'clave',
        'valor',
        'tipo',
    ];

    /**
     * Obtener un valor de configuración por clave
     */
    public static function obtener(string $clave, $default = null)
    {
        $config = static::where('clave', $clave)->first();
        return $config ? $config->valor : $default;
    }

    /**
     * Establecer un valor de configuración
     */
    public static function establecer(string $clave, $valor, string $tipo = 'text')
    {
        return static::updateOrCreate(
            ['clave' => $clave],
            ['valor' => $valor, 'tipo' => $tipo]
        );
    }

    /**
     * Obtener todas las configuraciones como array asociativo
     */
    public static function todas()
    {
        return static::all()->pluck('valor', 'clave')->toArray();
    }
}
