import { Head, useForm } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Save, Upload, X, Key } from 'lucide-react';
import { useState } from 'react';

export default function ConfiguracionIndex({ configuracion }) {
    const [logoPreview, setLogoPreview] = useState(
        configuracion.logo ? `/storage/${configuracion.logo}` : null
    );
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        contacto_direccion: configuracion.contacto_direccion || '',
        contacto_email: configuracion.contacto_email || '',
        contacto_telefono: configuracion.contacto_telefono || '',
        site_title: configuracion.site_title || '',
        site_description: configuracion.site_description || '',
        slogan: configuracion.slogan || '',
        logo: null,
    });

    const passwordForm = useForm({
        codigo_actual: '',
        codigo_nuevo: '',
        codigo_confirmacion: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/panel/configuracion', {
            forceFormData: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.post('/panel/configuracion/codigo', {
            onSuccess: () => {
                setShowPasswordModal(false);
                passwordForm.reset();
            },
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setData('logo', null);
        setLogoPreview(null);
    };

    return (
        <PanelLayout title="Configuración">
            <Head title="Configuración" />

            <div className="max-w-4xl space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Logo */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Logo del sitio
                        </h2>

                        <div className="flex items-start gap-6">
                            {logoPreview ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        alt="Logo"
                                        className="h-24 object-contain bg-gray-900 rounded-lg p-4"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-48 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors">
                                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Subir logo
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                    />
                                </label>
                            )}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <p>Recomendado: PNG con fondo transparente</p>
                                <p>Tamaño máximo: 2MB</p>
                            </div>
                        </div>
                    </div>

                    {/* SEO Global */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            SEO Global
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Título del sitio
                                </label>
                                <input
                                    type="text"
                                    value={data.site_title}
                                    onChange={(e) => setData('site_title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Petrotekno Ingeniería y Construcción"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Descripción del sitio
                                </label>
                                <textarea
                                    value={data.site_description}
                                    onChange={(e) => setData('site_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Descripción para buscadores..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Slogan
                                </label>
                                <input
                                    type="text"
                                    value={data.slogan}
                                    onChange={(e) => setData('slogan', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Ingeniería que transforma el paisaje."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Información de contacto
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    value={data.contacto_direccion}
                                    onChange={(e) => setData('contacto_direccion', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Av. Reforma 222, CDMX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.contacto_email}
                                    onChange={(e) => setData('contacto_email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="contacto@petrotekno.mx"
                                />
                                {errors.contacto_email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.contacto_email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    value={data.contacto_telefono}
                                    onChange={(e) => setData('contacto_telefono', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="+52 (55) 1234 5678"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Guardar */}
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {processing ? 'Guardando...' : 'Guardar configuración'}
                        </button>
                    </div>
                </form>

                {/* Cambiar código de acceso */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Seguridad
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Cambia el código de acceso al panel de administración.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowPasswordModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Key className="w-5 h-5 mr-2" />
                        Cambiar código de acceso
                    </button>
                </div>
            </div>

            {/* Modal cambiar código */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Cambiar código de acceso
                        </h3>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Código actual
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.codigo_actual}
                                    onChange={(e) => passwordForm.setData('codigo_actual', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                {passwordForm.errors.codigo_actual && (
                                    <p className="mt-1 text-sm text-red-500">{passwordForm.errors.codigo_actual}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nuevo código
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.codigo_nuevo}
                                    onChange={(e) => passwordForm.setData('codigo_nuevo', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                {passwordForm.errors.codigo_nuevo && (
                                    <p className="mt-1 text-sm text-red-500">{passwordForm.errors.codigo_nuevo}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirmar nuevo código
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.codigo_confirmacion}
                                    onChange={(e) => passwordForm.setData('codigo_confirmacion', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                {passwordForm.errors.codigo_confirmacion && (
                                    <p className="mt-1 text-sm text-red-500">{passwordForm.errors.codigo_confirmacion}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        passwordForm.reset();
                                    }}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                                >
                                    Cambiar código
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}
