<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Configuracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ConfiguracionController extends Controller
{
    /**
     * Mostrar formulario de configuración
     */
    public function index()
    {
        $configuracion = Configuracion::todas();

        return Inertia::render('Panel/Configuracion/Index', [
            'configuracion' => $configuracion,
        ]);
    }

    /**
     * Actualizar configuración
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'contacto_direccion' => 'nullable|string|max:500',
            'contacto_email' => 'nullable|email|max:255',
            'contacto_telefono' => 'nullable|string|max:50',
            'site_title' => 'nullable|string|max:255',
            'site_description' => 'nullable|string|max:500',
            'slogan' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ]);

        // Guardar configuraciones de texto
        foreach ($validated as $clave => $valor) {
            if ($clave !== 'logo' && $valor !== null) {
                Configuracion::establecer($clave, $valor, 'text');
            }
        }

        // Subir logo si se proporciona
        if ($request->hasFile('logo')) {
            $logoActual = Configuracion::obtener('logo');
            if ($logoActual) {
                Storage::disk('public')->delete($logoActual);
            }
            $logoPath = $request->file('logo')->store('config', 'public');
            Configuracion::establecer('logo', $logoPath, 'image');
        }

        return redirect()->route('panel.configuracion.index')
            ->with('success', 'Configuración actualizada exitosamente.');
    }

    /**
     * Actualizar código de acceso
     */
    public function updateCodigo(Request $request)
    {
        $request->validate([
            'codigo_actual' => 'required|string',
            'codigo_nuevo' => 'required|string|min:6',
            'codigo_confirmacion' => 'required|same:codigo_nuevo',
        ]);

        $codigoActual = Configuracion::obtener('codigo_acceso');

        if ($request->codigo_actual !== $codigoActual) {
            return back()->withErrors([
                'codigo_actual' => 'El código actual es incorrecto.',
            ]);
        }

        Configuracion::establecer('codigo_acceso', $request->codigo_nuevo, 'text');

        return redirect()->route('panel.configuracion.index')
            ->with('success', 'Código de acceso actualizado exitosamente.');
    }
}
