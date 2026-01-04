<?php

use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

// API pública (sin autenticación)
Route::get('/obras', [PublicController::class, 'obras']);
Route::get('/obras/por-estado', [PublicController::class, 'obrasPorEstado']);
Route::get('/obras/{slug}', [PublicController::class, 'obra']);
Route::get('/servicios', [PublicController::class, 'servicios']);
Route::get('/servicios/{slug}', [PublicController::class, 'servicio']);
Route::get('/config', [PublicController::class, 'config']);
Route::get('/config/cv-empresa', [PublicController::class, 'descargarCv']);
