import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import TiptapEditor from '@/Components/TiptapEditor';
import { ArrowLeft, Save, Upload, X, CheckCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ServicioForm({ servicio, iconos }) {
    const isEditing = !!servicio;
    const [imagePreview, setImagePreview] = useState(servicio?.imagen ? `/storage/${servicio.imagen}` : null);
    const [imageError, setImageError] = useState(null);
    const { flash } = usePage().props;
    const imageInputRef = useRef(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        titulo: servicio?.titulo || '',
        icono: servicio?.icono || '',
        descripcion_corta: servicio?.descripcion_corta || '',
        contenido: servicio?.contenido || '',
        activo: servicio?.activo ?? true,
        meta_title: servicio?.meta_title || '',
        meta_description: servicio?.meta_description || '',
        imagen: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            forceFormData: true,
            preserveScroll: true,
        };

        if (isEditing) {
            post(`/panel/servicios/${servicio.id}?_method=PUT`, options);
        } else {
            post('/panel/servicios', options);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageError(null);
        
        if (file) {
            // Validar tamaño (10MB máximo)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError('La imagen es demasiado grande. El tamaño máximo es 10MB.');
                e.target.value = '';
                return;
            }
            
            // Validar tipo de archivo
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setImageError('Tipo de archivo no permitido. Usa JPG, PNG, GIF o WebP.');
                e.target.value = '';
                return;
            }
            
            setData('imagen', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('imagen', null);
        setImagePreview(null);
        setImageError(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    return (
        <PanelLayout title={isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}>
            <Head title={isEditing ? 'Editar Servicio' : 'Nuevo Servicio'} />

            <div className="max-w-4xl">
                <Link
                    href="/panel/servicios"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a servicios
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información básica */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Información básica
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Título del servicio *
                                </label>
                                <input
                                    type="text"
                                    value={data.titulo}
                                    onChange={(e) => setData('titulo', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Ej: Edificación Vertical"
                                />
                                {errors.titulo && (
                                    <p className="mt-1 text-sm text-red-500">{errors.titulo}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Icono
                                </label>
                                <select
                                    value={data.icono}
                                    onChange={(e) => setData('icono', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">Seleccionar icono</option>
                                    {Object.entries(iconos).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.activo}
                                        onChange={(e) => setData('activo', e.target.checked)}
                                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Activo
                                    </span>
                                </label>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Descripción corta
                                </label>
                                <textarea
                                    value={data.descripcion_corta}
                                    onChange={(e) => setData('descripcion_corta', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Descripción que aparece en la tarjeta del servicio"
                                    maxLength={500}
                                />
                                <p className="mt-1 text-xs text-gray-400">
                                    {data.descripcion_corta.length}/500 caracteres
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Imagen del servicio
                        </h2>

                        {imagePreview ? (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-xs h-48 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div 
                                onClick={() => imageInputRef.current?.click()}
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Click para subir imagen
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    PNG, JPG, WebP hasta 10MB
                                </span>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                        {(errors.imagen || imageError) && (
                            <p className="mt-2 text-sm text-red-500">{errors.imagen || imageError}</p>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Contenido de la página del servicio
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Este contenido se mostrará en la página individual del servicio.
                        </p>
                        <TiptapEditor
                            content={data.contenido}
                            onChange={(content) => setData('contenido', content)}
                            placeholder="Describe el servicio en detalle, agrega imágenes, videos..."
                        />
                    </div>

                    {/* SEO */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            SEO y Meta Tags
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Meta Título
                                </label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Título para buscadores"
                                    maxLength={60}
                                />
                                <p className="mt-1 text-xs text-gray-400">
                                    {data.meta_title.length}/60 caracteres
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Meta Descripción
                                </label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Descripción para buscadores y redes sociales"
                                    maxLength={160}
                                />
                                <p className="mt-1 text-xs text-gray-400">
                                    {data.meta_description.length}/160 caracteres
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/panel/servicios"
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {processing ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear servicio')}
                        </button>
                    </div>
                </form>
            </div>
        </PanelLayout>
    );
}
