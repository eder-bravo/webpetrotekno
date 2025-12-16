<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\RedSocial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RedSocialController extends Controller
{
    /**
     * Mostrar listado de redes sociales
     */
    public function index()
    {
        $redes = RedSocial::ordenadas()->get();

        return Inertia::render('Panel/Redes/Index', [
            'redes' => $redes,
            'iconos' => RedSocial::iconosDisponibles(),
        ]);
    }

    /**
     * Guardar nueva red social
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'icono' => 'required|string|max:50',
            'url' => 'required|url|max:500',
            'activo' => 'boolean',
        ]);

        $validated['orden'] = RedSocial::max('orden') + 1;

        RedSocial::create($validated);

        return redirect()->route('panel.redes.index')
            ->with('success', 'Red social creada exitosamente.');
    }

    /**
     * Actualizar red social
     */
    public function update(Request $request, RedSocial $red)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'icono' => 'required|string|max:50',
            'url' => 'required|url|max:500',
            'activo' => 'boolean',
        ]);

        $red->update($validated);

        return redirect()->route('panel.redes.index')
            ->with('success', 'Red social actualizada exitosamente.');
    }

    /**
     * Eliminar red social
     */
    public function destroy(RedSocial $red)
    {
        $red->delete();

        return redirect()->route('panel.redes.index')
            ->with('success', 'Red social eliminada exitosamente.');
    }

    /**
     * Reordenar redes sociales
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'orden' => 'required|array',
            'orden.*' => 'integer|exists:redes_sociales,id',
        ]);

        foreach ($request->orden as $index => $id) {
            RedSocial::where('id', $id)->update(['orden' => $index]);
        }

        return response()->json(['success' => true]);
    }
}
