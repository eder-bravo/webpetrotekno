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

        // Filtrar por estado si se solicita
        if ($request->has('estado') && $request->estado) {
            $query->byEstado($request->estado);
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
                'estado' => $obra->estado,
                'contenido' => $obra->contenido,
                'meta_title' => $obra->meta_title,
                'meta_description' => $obra->meta_description,
            ];
        });

        return response()->json($obras);
    }

    /**
     * Obtener estadísticas de obras por estado para el mapa
     */
    public function obrasPorEstado()
    {
        $estadosMexico = Obra::getEstadosMexico();
        
        $estadisticas = Obra::activos()
            ->whereNotNull('estado')
            ->selectRaw('estado, COUNT(*) as count')
            ->groupBy('estado')
            ->pluck('count', 'estado')
            ->toArray();

        // Formatear para el frontend con nombres de estados
        $resultado = [];
        foreach ($estadisticas as $estadoId => $count) {
            $resultado[$estadoId] = [
                'count' => $count,
                'name' => $estadosMexico[$estadoId] ?? $estadoId,
            ];
        }

        return response()->json($resultado);
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

        // Obtener obras anterior y siguiente (basado en orden e id)
        $anterior = Obra::activos()
            ->where(function ($query) use ($obra) {
                $query->where('orden', '<', $obra->orden)
                    ->orWhere(function ($q) use ($obra) {
                        $q->where('orden', '=', $obra->orden)
                          ->where('id', '<', $obra->id);
                    });
            })
            ->orderBy('orden', 'desc')
            ->orderBy('id', 'desc')
            ->first();

        $siguiente = Obra::activos()
            ->where(function ($query) use ($obra) {
                $query->where('orden', '>', $obra->orden)
                    ->orWhere(function ($q) use ($obra) {
                        $q->where('orden', '=', $obra->orden)
                          ->where('id', '>', $obra->id);
                    });
            })
            ->orderBy('orden', 'asc')
            ->orderBy('id', 'asc')
            ->first();

        return response()->json([
            'id' => $obra->id,
            'nombre' => $obra->nombre,
            'slug' => $obra->slug,
            'imagen' => $obra->imagen ? asset('storage/' . $obra->imagen) : null,
            'categoria' => $obra->categoria,
            'estado' => $obra->estado,
            'contenido' => $obra->contenido,
            'meta_title' => $obra->meta_title,
            'meta_description' => $obra->meta_description,
            'navegacion' => [
                'anterior' => $anterior ? [
                    'slug' => $anterior->slug,
                    'nombre' => $anterior->nombre,
                ] : null,
                'siguiente' => $siguiente ? [
                    'slug' => $siguiente->slug,
                    'nombre' => $siguiente->nombre,
                ] : null,
            ],
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

    /**
     * Descargar CV de la empresa
     */
    public function descargarCv()
    {
        $cvPath = Configuracion::obtener('cv_empresa');
        
        if (!$cvPath) {
            return response()->json(['error' => 'CV no disponible'], 404);
        }

        $fullPath = storage_path('app/public/' . $cvPath);
        
        if (!file_exists($fullPath)) {
            return response()->json(['error' => 'Archivo no encontrado'], 404);
        }

        return response()->download($fullPath, 'CV-Empresa-Petrotekno.pdf');
    }

}
