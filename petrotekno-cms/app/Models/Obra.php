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
        'contenido',
        'destacado',
        'activo',
        'orden',
        'meta_title',
        'meta_description',
        'meta_image',
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
}
