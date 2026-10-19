<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MensajeContacto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:120',
            'email' => 'required|email|max:255',
            'asunto' => 'required|string|max:200',
            'mensaje' => 'required|string|max:5000',
        ]);

        MensajeContacto::create($validated);

        return response()->json(['mensaje' => 'Mensaje recibido'], 201);
    }
}
