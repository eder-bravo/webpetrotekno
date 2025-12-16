import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import TiptapEditor from '@/Components/TiptapEditor';
import { ArrowLeft, Save, Upload, X, CheckCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ObraForm({ obra, categorias }) {
    const isEditing = !!obra;
    const [imagePreview, setImagePreview] = useState(obra?.imagen ? `/storage/${obra.imagen}` : null);
    const [seoImagePreview, setSeoImagePreview] = useState(obra?.meta_image ? `/storage/${obra.meta_image}` : null);
    const { flash } = usePage().props;
    const imageInputRef = useRef(null);
    const seoImageInputRef = useRef(null);

    const { data, setData, post, put, processing, errors, recentlySuccessful } = useForm({
        nombre: obra?.nombre || '',
        categoria: obra?.categoria || '',
        contenido: obra?.contenido || '',
        destacado: obra?.destacado || false,
        activo: obra?.activo ?? true,
        meta_title: obra?.meta_title || '',
        meta_description: obra?.meta_description || '',
        imagen: null,
        meta_image: null,
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

    const handleImageChange = (e, type) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(type, file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'imagen') {
                    setImagePreview(e.target.result);
                } else {
                    setSeoImagePreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (type) => {
        setData(type, null);
        if (type === 'imagen') {
            setImagePreview(null);
        } else {
            setSeoImagePreview(null);
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
                                    placeholder="Ej: Torre Corporativa Zenith"
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

                            <div className="flex items-center gap-6">
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
                            Imagen principal
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
                                    onClick={() => removeImage('imagen')}
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
                                    PNG, JPG, WebP hasta 5MB
                                </span>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'imagen')}
                                />
                            </div>
                        )}
                        {errors.imagen && (
                            <p className="mt-2 text-sm text-red-500">{errors.imagen}</p>
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Imagen para redes sociales (Open Graph)
                                </label>
                                {seoImagePreview ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={seoImagePreview}
                                            alt="SEO Preview"
                                            className="max-w-xs h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage('meta_image')}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={() => seoImageInputRef.current?.click()}
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                                    >
                                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Imagen 1200x630 recomendado
                                        </span>
                                        <input
                                            ref={seoImageInputRef}
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'meta_image')}
                                        />
                                    </div>
                                )}
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
