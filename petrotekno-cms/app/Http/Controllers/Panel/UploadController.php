<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * Subir imagen para el editor Tiptap
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        $path = $request->file('image')->store('contenido/imagenes', 'public');

        return response()->json([
            'url' => Storage::url($path),
        ]);
    }

    /**
     * Subir video para el editor Tiptap
     */
    public function uploadVideo(Request $request)
    {
        $request->validate([
            'video' => 'required|mimetypes:video/mp4,video/webm|max:51200', // 50MB max
        ]);

        $path = $request->file('video')->store('contenido/videos', 'public');

        return response()->json([
            'url' => Storage::url($path),
        ]);
    }

    /**
     * Eliminar archivo del storage
     */
    public function deleteFile(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        // Solo permitir eliminar archivos de la carpeta contenido
        $path = str_replace('/storage/', '', $request->path);
        
        if (str_starts_with($path, 'contenido/')) {
            Storage::disk('public')->delete($path);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 403);
    }
}
