<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Middleware\CodigoAcceso;
use App\Models\Configuracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
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
            'contacto_horario' => 'nullable|string|max:120',
            'site_title' => 'nullable|string|max:255',
            'site_description' => 'nullable|string|max:500',
            'slogan' => 'nullable|string|max:255',
            'hero_titulo' => 'nullable|string|max:120',
            'hero_destacado' => 'nullable|string|max:120',
            'hero_subtitulo' => 'nullable|string|max:300',
            'capacidad_descripcion' => 'nullable|string|max:600',
            'capacidad_recursos' => 'nullable|string|max:800',
            'beneficios_titulo' => 'nullable|string|max:120',
            'beneficios_intro' => 'nullable|string|max:300',
            'beneficios' => 'nullable|string|max:1800',
            'ahulados_titulo' => 'nullable|string|max:120',
            'ahulados_subtitulo' => 'nullable|string|max:160',
            'ahulados_descripcion' => 'nullable|string|max:1000',
            'proceso_titulo' => 'nullable|string|max:120',
            'proceso_intro' => 'nullable|string|max:300',
            'proceso_pasos' => 'nullable|string|max:1200',
            'portafolio_url' => ['nullable', 'string', 'max:500', function ($attribute, $value, $fail) {
                $internalPath = preg_match('~^/(?!/)[a-zA-Z0-9/_-]*$~D', $value);
                $externalUrl = filter_var($value, FILTER_VALIDATE_URL)
                    && in_array(parse_url($value, PHP_URL_SCHEME), ['http', 'https'], true);
                if (!$internalPath && !$externalUrl) {
                    $fail('Usa una ruta del sitio como /obras o una URL con http o https.');
                }
            }],
            'maquinaria_mayor' => 'nullable|integer|min:0|max:100000',
            'maquinaria_menor' => 'nullable|integer|min:0|max:100000',
            'vehiculos' => 'nullable|integer|min:0|max:100000',
            'impacto_clientes_valor' => 'nullable|integer|between:0,100',
            'impacto_clientes_texto' => 'nullable|string|max:200',
            'impacto_laboral_valor' => 'nullable|integer|between:0,100',
            'impacto_laboral_texto' => 'nullable|string|max:200',
            'impacto_sustentabilidad_valor' => 'nullable|integer|between:0,100',
            'impacto_sustentabilidad_texto' => 'nullable|string|max:200',
            'logo' => 'nullable|image|mimes:png|max:2048',
            'cv_empresa' => 'nullable|file|mimes:pdf|max:10240',
            'eliminar_cv' => 'sometimes|boolean',
        ]);

        // Guardar configuraciones de texto
        foreach ($validated as $clave => $valor) {
            if (!in_array($clave, ['logo', 'cv_empresa', 'eliminar_cv'])) {
                Configuracion::establecer($clave, $valor ?? '', 'text');
            }
        }

        // El disco public está montado en un volumen persistente.
        if ($request->hasFile('logo')) {
            $logoAnterior = Configuracion::obtener('logo');
            $logoPath = $request->file('logo')->store('config/logos', 'public');
            Configuracion::establecer('logo', $logoPath, 'image');
            if ($logoAnterior) {
                Storage::disk('public')->delete($logoAnterior);
            }
        }

        // Subir CV de empresa si se proporciona
        if ($request->hasFile('cv_empresa')) {
            $cvActual = Configuracion::obtener('cv_empresa');
            $cvPath = $request->file('cv_empresa')->store('config/cv', 'public');
            Configuracion::establecer('cv_empresa', $cvPath, 'file');
            if ($cvActual) {
                Storage::disk('public')->delete($cvActual);
            }
        } elseif ($validated['eliminar_cv'] ?? false) {
            $cvActual = Configuracion::obtener('cv_empresa');
            Configuracion::establecer('cv_empresa', '', 'file');
            if ($cvActual) {
                Storage::disk('public')->delete($cvActual);
            }
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

        if (!CodigoAcceso::verificar($request->codigo_actual)) {
            return back()->withErrors([
                'codigo_actual' => 'El código actual es incorrecto.',
            ]);
        }

        Configuracion::establecer('codigo_acceso', Hash::make($request->codigo_nuevo), 'text');

        return redirect()->route('panel.configuracion.index')
            ->with('success', 'Código de acceso actualizado exitosamente.');
    }
}
