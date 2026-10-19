import { Head, Link, useForm } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import TiptapEditor from '@/Components/TiptapEditor';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ObraForm({ obra, categorias, estados }) {
    const isEditing = !!obra;
    const [imagePreview, setImagePreview] = useState(obra?.imagen ? `/storage/${obra.imagen}` : null);
    const [imageError, setImageError] = useState(null);
    const imageInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        nombre: obra?.nombre || '',
        categoria: obra?.categoria || '',
        estado: obra?.estado || '',
        contenido: obra?.contenido || '',
        destacado: obra?.destacado || false,
        activo: obra?.activo ?? true,
        meta_title: obra?.meta_title || '',
        meta_description: obra?.meta_description || '',
        imagen: null,
        imagen_ilustrativa: obra?.imagen_ilustrativa ?? false,
        eliminar_imagen: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            forceFormData: true,
            preserveScroll: true,
        };

        if (isEditing) {
            post(`/panel/obras/${obra.id}?_method=PUT`, options);
        } else {
            post('/panel/obras', options);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageError(null);
        
        if (file) {
            // Validar tamaño (10MB máximo)
            const maxSize = 10 * 1024 * 1024; // 10MB en bytes
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
            
            setData((current) => ({ ...current, imagen: file, eliminar_imagen: false }));
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData((current) => ({
            ...current,
            imagen: null,
            imagen_ilustrativa: false,
            eliminar_imagen: Boolean(obra?.imagen),
        }));
        setImagePreview(null);
        setImageError(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    return (
        <PanelLayout title={isEditing ? 'Editar Obra' : 'Nueva Obra'}>
            <Head title={isEditing ? 'Editar Obra' : 'Nueva Obra'} />

            <div className="max-w-4xl">
                <Link
                    href="/panel/obras"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a obras
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
                                    Nombre de la obra *
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Ej: Rehabilitación de pavimento en Monterrey"
                                />
                                {errors.nombre && (
                                    <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Categoría
                                </label>
                                <select
                                    value={data.categoria}
                                    onChange={(e) => setData('categoria', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Estado *
                                </label>
                                <select
                                    value={data.estado}
                                    onChange={(e) => setData('estado', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">Seleccionar estado</option>
                                    {Object.entries(estados).map(([code, name]) => (
                                        <option key={code} value={code}>{name}</option>
                                    ))}
                                </select>
                                {errors.estado && (
                                    <p className="mt-1 text-sm text-red-500">{errors.estado}</p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.destacado}
                                        onChange={(e) => setData('destacado', e.target.checked)}
                                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Destacado en inicio
                                    </span>
                                </label>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 ml-6">
                                    Recomendado: mantener entre 3 y 6 obras destacadas para mejor presentación
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
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
                        </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Foto principal de la obra
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Aparece en la ficha y en las tarjetas de obras. Se puede cambiar o quitar cuando quieras.
                        </p>

                        <input
                            ref={imageInputRef}
                            id="obra-imagen"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                        />

                        {imagePreview ? (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="Vista previa de la foto de la obra"
                                    className="w-full max-w-xl aspect-video object-cover rounded-lg"
                                />
                                <div className="flex flex-wrap gap-3 mt-3">
                                    <button type="button" onClick={() => imageInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-medium">
                                        <Upload className="w-4 h-4" /> Cambiar foto
                                    </button>
                                    <button type="button" onClick={removeImage} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <X className="w-4 h-4" /> Quitar foto
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Elegir foto de la obra
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    PNG, JPG, WebP hasta 10MB
                                </span>
                            </button>
                        )}
                        {imagePreview && (
                            <label className="flex items-start gap-3 mt-5 max-w-xl cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.imagen_ilustrativa}
                                    onChange={(e) => setData('imagen_ilustrativa', e.target.checked)}
                                    className="w-4 h-4 mt-1 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Esta imagen es ilustrativa y no muestra la obra real.
                                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Esta indicación queda registrada en el CMS; no aparece una etiqueta sobre la foto pública.</span>
                                </span>
                            </label>
                        )}
                        {(errors.imagen || imageError) && (
                            <p className="mt-2 text-sm text-red-500">{errors.imagen || imageError}</p>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Contenido detallado
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Este contenido se mostrará en la página individual de la obra.
                        </p>
                        <TiptapEditor
                            content={data.contenido}
                            onChange={(content) => setData('contenido', content)}
                            placeholder="Describe la obra, agrega imágenes, videos..."
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
                                    placeholder="Título para buscadores (si está vacío usa el nombre)"
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
                            href="/panel/obras"
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
                            {processing ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear obra')}
                        </button>
                    </div>
                </form>
            </div>
        </PanelLayout>
    );
}
