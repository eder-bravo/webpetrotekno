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
                $slug = Str::slug($servicio->titulo);
                $originalSlug = $slug;
                $count = 1;

                while (static::where('slug', $slug)->exists()) {
                    $slug = $originalSlug . '-' . $count++;
                }

                $servicio->slug = $slug;
            }
        });

        static::updating(function ($servicio) {
            if ($servicio->isDirty('titulo') && !$servicio->isDirty('slug')) {
                $slug = Str::slug($servicio->titulo);
                $originalSlug = $slug;
                $count = 1;

                while (static::where('slug', $slug)->where('id', '!=', $servicio->id)->exists()) {
                    $slug = $originalSlug . '-' . $count++;
                }

                $servicio->slug = $slug;
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
