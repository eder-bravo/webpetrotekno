<?php

namespace App\Http\Middleware;

use App\Models\Configuracion;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CodigoAcceso
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!session('panel_autenticado')) {
            return redirect()->route('panel.login');
        }

        return $next($request);
    }

    /**
     * Verificar si el código de acceso es válido
     */
    public static function verificar(string $codigo): bool
    {
        $codigoGuardado = Configuracion::obtener('codigo_acceso', 'petrotekno2024');
        return $codigo === $codigoGuardado;
    }
}
