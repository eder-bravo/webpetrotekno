<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Obra extends Model
{
    protected $table = 'obras';

    protected $fillable = [
        'nombre',
        'slug',
        'imagen',
        'categoria',
        'estado',
        'contenido',
        'destacado',
        'activo',
        'orden',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'destacado' => 'boolean',
        'activo' => 'boolean',
        'orden' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($obra) {
            if (empty($obra->slug)) {
                $obra->slug = Str::slug($obra->nombre);
            }
        });

        static::updating(function ($obra) {
            if ($obra->isDirty('nombre') && !$obra->isDirty('slug')) {
                $obra->slug = Str::slug($obra->nombre);
            }
        });
    }

    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    public function scopeDestacados($query)
    {
        return $query->where('destacado', true);
    }

    public function scopeOrdenados($query)
    {
        return $query->orderBy('orden', 'asc');
    }

    public function scopeByEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    /**
     * Lista de estados mexicanos con sus IDs (compatibles con @svg-maps/mexico)
     */
    public static function getEstadosMexico(): array
    {
        return [
            'agu' => 'Aguascalientes',
            'bcn' => 'Baja California',
            'bcs' => 'Baja California Sur',
            'cam' => 'Campeche',
            'chp' => 'Chiapas',
            'chh' => 'Chihuahua',
            'coa' => 'Coahuila',
            'col' => 'Colima',
            'cmx' => 'Ciudad de México',
            'dur' => 'Durango',
            'gua' => 'Guanajuato',
            'gro' => 'Guerrero',
            'hid' => 'Hidalgo',
            'jal' => 'Jalisco',
            'mex' => 'México',
            'mic' => 'Michoacán',
            'mor' => 'Morelos',
            'nay' => 'Nayarit',
            'nle' => 'Nuevo León',
            'oax' => 'Oaxaca',
            'pue' => 'Puebla',
            'que' => 'Querétaro',
            'roo' => 'Quintana Roo',
            'slp' => 'San Luis Potosí',
            'sin' => 'Sinaloa',
            'son' => 'Sonora',
            'tab' => 'Tabasco',
            'tam' => 'Tamaulipas',
            'tla' => 'Tlaxcala',
            'ver' => 'Veracruz',
            'yuc' => 'Yucatán',
            'zac' => 'Zacatecas',
        ];
    }
}
