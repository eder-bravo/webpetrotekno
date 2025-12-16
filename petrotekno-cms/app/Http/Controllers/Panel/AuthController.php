<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Middleware\CodigoAcceso;
use App\Models\Configuracion;
use Illuminate\Http\Request;
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

        if (CodigoAcceso::verificar($request->codigo)) {
            session(['panel_autenticado' => true]);
            return redirect()->route('panel.dashboard');
        }

        return back()->withErrors([
            'codigo' => 'El código de acceso es incorrecto.',
        ]);
    }

    /**
     * Cerrar sesión
     */
    public function logout(Request $request)
    {
        session()->forget('panel_autenticado');
        return redirect()->route('panel.login');
    }
}
