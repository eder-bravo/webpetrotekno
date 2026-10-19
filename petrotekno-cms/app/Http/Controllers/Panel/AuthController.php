<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Middleware\CodigoAcceso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Mostrar formulario de login
     */
    public function showLogin()
    {
        if (session('panel_autenticado')) {
            return redirect()->route('panel.dashboard');
        }

        return Inertia::render('Panel/Auth/Login');
    }

    /**
     * Procesar login con código de acceso
     */
    public function login(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string',
        ]);

        $key = 'panel-login:'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors(['codigo' => 'Demasiados intentos. Espera un minuto e intenta de nuevo.']);
        }

        if (CodigoAcceso::verificar($request->codigo)) {
            RateLimiter::clear($key);
            $request->session()->regenerate();
            session(['panel_autenticado' => true]);
            return redirect()->route('panel.dashboard');
        }

        RateLimiter::hit($key, 60);
        return back()->withErrors([
            'codigo' => 'El código de acceso es incorrecto.',
        ]);
    }

    /**
     * Cerrar sesión
     */
    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('panel.login');
    }
}
