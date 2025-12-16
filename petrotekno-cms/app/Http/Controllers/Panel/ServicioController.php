<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'imagen' => 'nullable|image|max:5120',
            'meta_image' => 'nullable|image|max:2048',
        ]);

        // Subir imagen principal
        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('servicios', 'public');
        }

        // Subir imagen SEO
        if ($request->hasFile('meta_image')) {
            $validated['meta_image'] = $request->file('meta_image')->store('servicios/seo', 'public');
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
            'iconos' => $this->getIconos(),
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
            'imagen' => 'nullable|image|max:5120',
            'meta_image' => 'nullable|image|max:2048',
        ]);

        // Subir nueva imagen principal
        if ($request->hasFile('imagen')) {
            if ($servicio->imagen) {
                Storage::disk('public')->delete($servicio->imagen);
            }
            $validated['imagen'] = $request->file('imagen')->store('servicios', 'public');
        }

        // Subir nueva imagen SEO
        if ($request->hasFile('meta_image')) {
            if ($servicio->meta_image) {
                Storage::disk('public')->delete($servicio->meta_image);
            }
            $validated['meta_image'] = $request->file('meta_image')->store('servicios/seo', 'public');
        }

        $servicio->update($validated);

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
        if ($servicio->meta_image) {
            Storage::disk('public')->delete($servicio->meta_image);
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
    private function getIconos(): array
    {
        return [
            'Buildings' => 'Edificios',
            'Truck' => 'Camión',
            'Hammer' => 'Martillo',
            'Ruler' => 'Regla',
            'Wrench' => 'Llave',
            'HardHat' => 'Casco',
            'Crane' => 'Grúa',
            'Factory' => 'Fábrica',
            'Road' => 'Carretera',
            'Bridge' => 'Puente',
        ];
    }
}
