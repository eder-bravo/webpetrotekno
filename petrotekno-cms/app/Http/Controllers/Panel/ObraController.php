<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ObraController extends Controller
{
    /**
     * Mostrar listado de obras
     */
    public function index()
    {
        $obras = Obra::ordenados()->get();

        return Inertia::render('Panel/Obras/Index', [
            'obras' => $obras,
        ]);
    }

    /**
     * Mostrar formulario de creación
     */
    public function create()
    {
        return Inertia::render('Panel/Obras/Form', [
            'obra' => null,
            'categorias' => $this->getCategorias(),
        ]);
    }

    /**
     * Guardar nueva obra
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria' => 'nullable|string|max:255',
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|max:5120', // 5MB max
        ]);

        // Subir imagen principal
        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('obras', 'public');
        }

        // Asignar orden
        $validated['orden'] = Obra::max('orden') + 1;

        Obra::create($validated);

        return redirect()->route('panel.obras.index')
            ->with('success', 'Obra creada exitosamente.');
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(Obra $obra)
    {
        return Inertia::render('Panel/Obras/Form', [
            'obra' => $obra,
            'categorias' => $this->getCategorias(),
        ]);
    }

    /**
     * Actualizar obra
     */
    public function update(Request $request, Obra $obra)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria' => 'nullable|string|max:255',
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|max:5120',
        ]);

        // Subir nueva imagen principal
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior
            if ($obra->imagen) {
                Storage::disk('public')->delete($obra->imagen);
            }
            $validated['imagen'] = $request->file('imagen')->store('obras', 'public');
        }

        $obra->update($validated);

        return redirect()->route('panel.obras.index')
            ->with('success', 'Obra actualizada exitosamente.');
    }

    /**
     * Eliminar obra
     */
    public function destroy(Obra $obra)
    {
        // Eliminar imágenes
        if ($obra->imagen) {
            Storage::disk('public')->delete($obra->imagen);
        }

        $obra->delete();

        return redirect()->route('panel.obras.index')
            ->with('success', 'Obra eliminada exitosamente.');
    }

    /**
     * Reordenar obras
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'orden' => 'required|array',
            'orden.*' => 'integer|exists:obras,id',
        ]);

        foreach ($request->orden as $index => $id) {
            Obra::where('id', $id)->update(['orden' => $index]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Obtener categorías existentes
     */
    private function getCategorias(): array
    {
        return [
            'Edificación Vertical',
            'Industrial / Energía',
            'Infraestructura',
            'Industrial',
            'Edificación Pública',
            'Infraestructura Vial',
        ];
    }
}
