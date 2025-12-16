<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Servicio extends Model
{
    protected $table = 'servicios';

    protected $fillable = [
        'titulo',
        'slug',
        'icono',
        'descripcion_corta',
        'contenido',
        'imagen',
        'activo',
        'orden',
        'meta_title',
        'meta_description',
        'meta_image',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'orden' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($servicio) {
            if (empty($servicio->slug)) {
                $servicio->slug = Str::slug($servicio->titulo);
            }
        });

        static::updating(function ($servicio) {
            if ($servicio->isDirty('titulo') && !$servicio->isDirty('slug')) {
                $servicio->slug = Str::slug($servicio->titulo);
            }
        });
    }

    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    public function scopeOrdenados($query)
    {
        return $query->orderBy('orden', 'asc');
    }
}
