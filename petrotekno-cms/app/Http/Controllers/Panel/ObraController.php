<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ObraController extends Controller
{
    /**
     * Mostrar listado de obras
     */
    public function index(Request $request)
    {
        $query = Obra::ordenados();

        // Filtrar por estado si se especifica
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $obras = $query->paginate(10)->withQueryString();
        $totalDestacados = Obra::where('destacado', true)->count();

        // Obtener estados que tienen obras para el filtro
        $estadosConObras = Obra::whereNotNull('estado')
            ->distinct()
            ->pluck('estado')
            ->toArray();

        return Inertia::render('Panel/Obras/Index', [
            'obras' => $obras,
            'totalDestacados' => $totalDestacados,
            'estados' => Obra::getEstadosMexico(),
            'estadosConObras' => $estadosConObras,
            'filtroEstado' => $request->estado,
        ]);
    }

    /**
     * Mostrar vista de reordenamiento
     */
    public function reorderView(Request $request)
    {
        $query = Obra::ordenados();

        // Filtrar por estado si se especifica
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $obras = $query->paginate(10)->withQueryString();

        // Obtener estados que tienen obras para el filtro
        $estadosConObras = Obra::whereNotNull('estado')
            ->distinct()
            ->pluck('estado')
            ->toArray();

        return Inertia::render('Panel/Obras/Reorder', [
            'obras' => $obras,
            'estados' => Obra::getEstadosMexico(),
            'estadosConObras' => $estadosConObras,
            'filtroEstado' => $request->estado,
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
            'estados' => Obra::getEstadosMexico(),
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
            'estado' => ['nullable', 'string', Rule::in(array_keys(Obra::getEstadosMexico()))],
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max (PHP limit)
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
            'estados' => Obra::getEstadosMexico(),
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
            'estado' => ['nullable', 'string', Rule::in(array_keys(Obra::getEstadosMexico()))],
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        // Subir nueva imagen principal
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior
            if ($obra->imagen) {
                Storage::disk('public')->delete($obra->imagen);
            }
            $validated['imagen'] = $request->file('imagen')->store('obras', 'public');
        } else {
            // Si no hay nueva imagen, no modificar la existente
            unset($validated['imagen']);
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
            'orden.*.id' => 'required|integer|exists:obras,id',
            'orden.*.orden' => 'required|integer|min:1',
        ]);

        foreach ($request->orden as $item) {
            Obra::where('id', $item['id'])->update(['orden' => $item['orden']]);
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
