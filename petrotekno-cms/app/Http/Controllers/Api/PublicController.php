<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configuracion;
use App\Models\Obra;
use App\Models\RedSocial;
use App\Models\Servicio;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Obtener todas las obras activas
     */
    public function obras(Request $request)
    {
        $query = Obra::activos()->ordenados();

        // Filtrar solo destacados si se solicita
        if ($request->boolean('destacados')) {
            $query->destacados();
        }

        // Limitar resultados si se solicita
        if ($request->has('limit')) {
            $query->limit((int) $request->limit);
        }

        $obras = $query->get()->map(function ($obra) {
            return [
                'id' => $obra->id,
                'nombre' => $obra->nombre,
                'slug' => $obra->slug,
                'imagen' => $obra->imagen ? asset('storage/' . $obra->imagen) : null,
                'categoria' => $obra->categoria,
                'contenido' => $obra->contenido,
                'meta_title' => $obra->meta_title,
                'meta_description' => $obra->meta_description,
                'meta_image' => $obra->meta_image ? asset('storage/' . $obra->meta_image) : null,
            ];
        });

        return response()->json($obras);
    }

    /**
     * Obtener una obra por slug
     */
    public function obra(string $slug)
    {
        $obra = Obra::where('slug', $slug)->activos()->first();

        if (!$obra) {
            return response()->json(['error' => 'Obra no encontrada'], 404);
        }

        return response()->json([
            'id' => $obra->id,
            'nombre' => $obra->nombre,
            'slug' => $obra->slug,
            'imagen' => $obra->imagen ? asset('storage/' . $obra->imagen) : null,
            'categoria' => $obra->categoria,
            'contenido' => $obra->contenido,
            'meta_title' => $obra->meta_title,
            'meta_description' => $obra->meta_description,
            'meta_image' => $obra->meta_image ? asset('storage/' . $obra->meta_image) : null,
        ]);
    }

    /**
     * Obtener todos los servicios activos
     */
    public function servicios()
    {
        $servicios = Servicio::activos()->ordenados()->get()->map(function ($servicio) {
            return [
                'id' => $servicio->id,
                'titulo' => $servicio->titulo,
                'slug' => $servicio->slug,
                'icono' => $servicio->icono,
                'descripcion_corta' => $servicio->descripcion_corta,
                'contenido' => $servicio->contenido,
                'imagen' => $servicio->imagen ? asset('storage/' . $servicio->imagen) : null,
                'meta_title' => $servicio->meta_title,
                'meta_description' => $servicio->meta_description,
                'meta_image' => $servicio->meta_image ? asset('storage/' . $servicio->meta_image) : null,
            ];
        });

        return response()->json($servicios);
    }

    /**
     * Obtener un servicio por slug
     */
    public function servicio(string $slug)
    {
        $servicio = Servicio::where('slug', $slug)->activos()->first();

        if (!$servicio) {
            return response()->json(['error' => 'Servicio no encontrado'], 404);
        }

        return response()->json([
            'id' => $servicio->id,
            'titulo' => $servicio->titulo,
            'slug' => $servicio->slug,
            'icono' => $servicio->icono,
            'descripcion_corta' => $servicio->descripcion_corta,
            'contenido' => $servicio->contenido,
            'imagen' => $servicio->imagen ? asset('storage/' . $servicio->imagen) : null,
            'meta_title' => $servicio->meta_title,
            'meta_description' => $servicio->meta_description,
            'meta_image' => $servicio->meta_image ? asset('storage/' . $servicio->meta_image) : null,
        ]);
    }

    /**
     * Obtener configuración del sitio
     */
    public function config()
    {
        $config = Configuracion::todas();
        
        // Procesar imagen del logo
        if (!empty($config['logo'])) {
            $config['logo'] = asset('storage/' . $config['logo']);
        }

        // Eliminar código de acceso de la respuesta pública
        unset($config['codigo_acceso']);

        return response()->json($config);
    }

    /**
     * Obtener redes sociales activas
     */
    public function redes()
    {
        $redes = RedSocial::activas()->ordenadas()->get()->map(function ($red) {
            return [
                'id' => $red->id,
                'nombre' => $red->nombre,
                'icono' => $red->icono,
                'url' => $red->url,
            ];
        });

        return response()->json($redes);
    }
}
