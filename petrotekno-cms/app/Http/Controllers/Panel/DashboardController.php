<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Obra;
use App\Models\Servicio;
use App\Models\RedSocial;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Panel/Dashboard', [
            'stats' => [
                'obras' => Obra::count(),
                'obras_activas' => Obra::activos()->count(),
                'servicios' => Servicio::count(),
                'servicios_activos' => Servicio::activos()->count(),
                'redes' => RedSocial::count(),
            ],
        ]);
    }
}
