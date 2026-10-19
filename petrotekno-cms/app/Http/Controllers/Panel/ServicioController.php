<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ServicioController extends Controller
{
    /**
     * Mostrar listado de servicios
     */
    public function index()
    {
        $servicios = Servicio::ordenados()->get();

        return Inertia::render('Panel/Servicios/Index', [
            'servicios' => $servicios,
        ]);
    }

    /**
     * Mostrar formulario de creación
     */
    public function create()
    {
        return Inertia::render('Panel/Servicios/Form', [
            'servicio' => null,
            'iconos' => $this->getIconos(),
        ]);
    }

    /**
     * Guardar nuevo servicio
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'icono' => 'nullable|string|max:50',
            'descripcion_corta' => 'nullable|string|max:500',
            'contenido' => 'nullable|string',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        $this->validarSlug($validated['titulo']);

        // Subir imagen principal
        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('servicios', 'public');
        }

        // Asignar orden
        $validated['orden'] = Servicio::max('orden') + 1;

        Servicio::create($validated);

        return redirect()->route('panel.servicios.index')
            ->with('success', 'Servicio creado exitosamente.');
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(Servicio $servicio)
    {
        return Inertia::render('Panel/Servicios/Form', [
            'servicio' => $servicio,
            'iconos' => $this->getIconos($servicio),
        ]);
    }

    /**
     * Actualizar servicio
     */
    public function update(Request $request, Servicio $servicio)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'icono' => 'nullable|string|max:50',
            'descripcion_corta' => 'nullable|string|max:500',
            'contenido' => 'nullable|string',
            'activo' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
            'eliminar_imagen' => 'boolean',
        ]);

        $this->validarSlug($validated['titulo'], $servicio->id);

        $eliminarImagen = (bool) ($validated['eliminar_imagen'] ?? false);
        unset($validated['eliminar_imagen']);
        $imagenAnterior = $servicio->imagen;

        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('servicios', 'public');
        } elseif ($eliminarImagen) {
            $validated['imagen'] = null;
        } else {
            unset($validated['imagen']);
        }

        $servicio->update($validated);

        if ($imagenAnterior && $imagenAnterior !== $servicio->imagen) {
            Storage::disk('public')->delete($imagenAnterior);
        }

        return redirect()->route('panel.servicios.index')
            ->with('success', 'Servicio actualizado exitosamente.');
    }

    /**
     * Eliminar servicio
     */
    public function destroy(Servicio $servicio)
    {
        if ($servicio->imagen) {
            Storage::disk('public')->delete($servicio->imagen);
        }

        $servicio->delete();

        return redirect()->route('panel.servicios.index')
            ->with('success', 'Servicio eliminado exitosamente.');
    }

    /**
     * Reordenar servicios
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'orden' => 'required|array',
            'orden.*' => 'integer|exists:servicios,id',
        ]);

        foreach ($request->orden as $index => $id) {
            Servicio::where('id', $id)->update(['orden' => $index]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Iconos disponibles (Phosphor Icons)
     */
    private function getIconos(?Servicio $servicio = null): array
    {
        $iconos = [
            'Buildings' => 'Edificios',
            'Truck' => 'Camión',
            'Hammer' => 'Martillo',
            'Ruler' => 'Regla',
            'Wrench' => 'Llave',
            'HardHat' => 'Casco',
            'Crane' => 'Grúa',
            'Factory' => 'Fábrica',
            'Path' => 'Carretera',
            'BridgeIcon' => 'Puente',
        ];

        if ($servicio?->icono && !array_key_exists($servicio->icono, $iconos)) {
            $iconos[$servicio->icono] = match ($servicio->icono) {
                'Road' => 'Carretera (anterior)',
                'Bridge' => 'Puente (anterior)',
                default => $servicio->icono.' (anterior)',
            };
        }

        return $iconos;
    }

    private function validarSlug(string $titulo, ?int $exceptoId = null): void
    {
        $query = Servicio::where('slug', Str::slug($titulo));
        if ($exceptoId) {
            $query->where('id', '!=', $exceptoId);
        }
        if ($query->exists()) {
            throw ValidationException::withMessages([
                'titulo' => 'Ya existe un servicio con este título o una dirección web equivalente.',
            ]);
        }
    }
}
