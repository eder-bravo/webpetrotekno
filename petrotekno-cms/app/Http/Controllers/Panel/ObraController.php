<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ObraController extends Controller
{
    /**
     * Mostrar listado de obras
     */
    public function index(Request $request)
    {
        $filtroVisibilidad = $request->query('visibilidad') === 'inactivas' ? 'inactivas' : 'activas';
        $query = Obra::where('activo', $filtroVisibilidad === 'activas')->ordenados();

        // Filtrar por estado si se especifica
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $obras = $query->paginate(10)->withQueryString();
        $totalDestacados = Obra::where('activo', true)->where('destacado', true)->count();
        $totalInactivas = Obra::where('activo', false)->count();

        // Obtener estados que tienen obras para el filtro
        $estadosConObras = Obra::where('activo', $filtroVisibilidad === 'activas')->whereNotNull('estado')
            ->distinct()
            ->pluck('estado')
            ->toArray();

        return Inertia::render('Panel/Obras/Index', [
            'obras' => $obras,
            'totalDestacados' => $totalDestacados,
            'totalInactivas' => $totalInactivas,
            'estados' => Obra::getEstadosMexico(),
            'estadosConObras' => $estadosConObras,
            'filtroEstado' => $request->estado,
            'filtroVisibilidad' => $filtroVisibilidad,
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
            'estado' => ['required', 'string', Rule::in(array_keys(Obra::getEstadosMexico()))],
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'imagen_ilustrativa' => 'boolean',
        ]);

        $this->validarSlug($validated['nombre']);

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
            'categorias' => $this->getCategorias($obra),
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
            'estado' => ['required', 'string', Rule::in(array_keys(Obra::getEstadosMexico()))],
            'contenido' => 'nullable|string',
            'destacado' => 'boolean',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
            'imagen_ilustrativa' => 'boolean',
            'eliminar_imagen' => 'boolean',
        ]);

        $this->validarSlug($validated['nombre'], $obra->id);

        $eliminarImagen = (bool) ($validated['eliminar_imagen'] ?? false);
        unset($validated['eliminar_imagen']);
        $imagenAnterior = $obra->imagen;

        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('obras', 'public');
        } elseif ($eliminarImagen) {
            $validated['imagen'] = null;
            $validated['imagen_ilustrativa'] = false;
        } else {
            unset($validated['imagen']);
        }

        $obra->update($validated);

        if ($imagenAnterior && $imagenAnterior !== $obra->imagen) {
            Storage::disk('public')->delete($imagenAnterior);
        }

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
    private function getCategorias(?Obra $obra = null): array
    {
        $categorias = [
            'Rehabilitación vial',
            'Construcción de pavimento',
            'Conservación carretera',
            'Reciclado de pavimento',
            'Infraestructura vial',
        ];

        // Only offer asphalt-related categories for new work. An older record
        // can still retain its current category while it is being edited.
        if ($obra?->categoria && !in_array($obra->categoria, $categorias, true)) {
            $categorias[] = $obra->categoria;
        }

        return $categorias;
    }

    private function validarSlug(string $nombre, ?int $exceptoId = null): void
    {
        $query = Obra::where('slug', Str::slug($nombre));
        if ($exceptoId) {
            $query->where('id', '!=', $exceptoId);
        }
        if ($query->exists()) {
            throw ValidationException::withMessages([
                'nombre' => 'Ya existe una obra con este nombre o una dirección web equivalente.',
            ]);
        }
    }
}
