<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\MensajeContacto;
use Inertia\Inertia;

class MensajeContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Panel/Mensajes/Index', [
            'mensajes' => MensajeContacto::latest()->paginate(20),
        ]);
    }
}
