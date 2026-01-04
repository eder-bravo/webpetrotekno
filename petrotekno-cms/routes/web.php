<?php

use App\Http\Controllers\Panel\AuthController;
use App\Http\Controllers\Panel\ConfiguracionController;
use App\Http\Controllers\Panel\DashboardController;
use App\Http\Controllers\Panel\ObraController;
use App\Http\Controllers\Panel\RedSocialController;
use App\Http\Controllers\Panel\ServicioController;
use App\Http\Controllers\Panel\UploadController;
use App\Http\Middleware\CodigoAcceso;
use Illuminate\Support\Facades\Route;

// Redirigir raíz al panel
Route::get('/', function () {
    return redirect()->route('panel.login');
});

// Rutas de autenticación del panel
Route::prefix('panel')->name('panel.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Rutas protegidas del panel
Route::prefix('panel')->name('panel.')->middleware(CodigoAcceso::class)->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Obras
    Route::get('obras/reorder', [ObraController::class, 'reorderView'])->name('obras.reorder.view');
    Route::resource('obras', ObraController::class)->except(['show']);
    Route::post('obras/reorder', [ObraController::class, 'reorder'])->name('obras.reorder');
    
    // Servicios
    Route::resource('servicios', ServicioController::class)->except(['show']);
    Route::post('servicios/reorder', [ServicioController::class, 'reorder'])->name('servicios.reorder');
    
    // Configuración
    Route::get('configuracion', [ConfiguracionController::class, 'index'])->name('configuracion.index');
    Route::post('configuracion', [ConfiguracionController::class, 'update'])->name('configuracion.update');
    Route::post('configuracion/codigo', [ConfiguracionController::class, 'updateCodigo'])->name('configuracion.codigo');
    
    // Redes Sociales
    Route::get('redes', [RedSocialController::class, 'index'])->name('redes.index');
    Route::post('redes', [RedSocialController::class, 'store'])->name('redes.store');
    Route::put('redes/{red}', [RedSocialController::class, 'update'])->name('redes.update');
    Route::delete('redes/{red}', [RedSocialController::class, 'destroy'])->name('redes.destroy');
    Route::post('redes/reorder', [RedSocialController::class, 'reorder'])->name('redes.reorder');
    
    // Uploads para editor Tiptap
    Route::post('upload/image', [UploadController::class, 'uploadImage'])->name('upload.image');
    Route::post('upload/video', [UploadController::class, 'uploadVideo'])->name('upload.video');
    Route::delete('upload/file', [UploadController::class, 'deleteFile'])->name('upload.delete');
});
