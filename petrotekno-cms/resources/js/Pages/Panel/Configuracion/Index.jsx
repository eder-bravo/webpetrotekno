import { Head, useForm } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Save, Upload, X, Key } from 'lucide-react';
import { useState } from 'react';

export default function ConfiguracionIndex({ configuracion }) {
    // Estado para controlar si se está mostrando un preview temporal o el logo guardado
    const [isPreviewingNewLogo, setIsPreviewingNewLogo] = useState(false);
    const [logoPreview, setLogoPreview] = useState('/images/logo.png?' + Date.now());
    const [cvFileName, setCvFileName] = useState(
        configuracion.cv_empresa ? configuracion.cv_empresa.split('/').pop() : null
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
        cv_empresa: null,
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
            onSuccess: () => {
                // Después de guardar exitosamente, resetear el estado
                const newTimestamp = Date.now();
                setLogoPreview('/images/logo.png?' + newTimestamp);
                setIsPreviewingNewLogo(false);
                setData('logo', null);
            },
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
            setIsPreviewingNewLogo(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setData('logo', null);
        setIsPreviewingNewLogo(false);
        setLogoPreview('/images/logo.png?' + Date.now());
    };

    const handleCvChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cv_empresa', file);
            setCvFileName(file.name);
        }
    };

    const removeCv = () => {
        setData('cv_empresa', null);
        setCvFileName(null);
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
                            <div className="relative">
                                <img
                                    key={logoPreview}
                                    src={logoPreview}
                                    alt="Logo"
                                    className="h-24 object-contain bg-gray-900 rounded-lg p-4"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="inline-flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors">
                                    <Upload className="w-5 h-5 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {isPreviewingNewLogo ? 'Cambiar logo seleccionado' : 'Cambiar logo'}
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/png"
                                        onChange={handleLogoChange}
                                    />
                                </label>
                                {isPreviewingNewLogo && (
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                                    >
                                        Cancelar y usar logo actual
                                    </button>
                                )}
                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <p><strong>Formato requerido:</strong> PNG con fondo transparente</p>
                                    <p>Tamaño máximo: 2MB</p>
                                    <p className="text-xs mt-1 text-gray-400">Ruta: /images/logo.png</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CV de la Empresa */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            CV de la Empresa
                        </h2>

                        <div className="space-y-4">
                            {cvFileName ? (
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded">
                                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{cvFileName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">PDF</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeCv}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Subir CV de la empresa
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        PDF, máximo 10MB
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={handleCvChange}
                                    />
                                </label>
                            )}
                            {configuracion.cv_empresa && !data.cv_empresa && (
                                <a
                                    href={`/storage/${configuracion.cv_empresa}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-500"
                                >
                                    Ver CV actual
                                </a>
                            )}
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
