import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/panel/login');
    };

    return (
        <>
            <Head title="Acceso al Panel" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 mb-4">
                                <Lock className="w-8 h-8 text-gray-900" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">
                                Petrotekno CMS
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Ingresa el código de acceso
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="codigo"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Código de Acceso
                                </label>
                                <div className="relative">
                                    <input
                                        id="codigo"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.codigo}
                                        onChange={(e) => setData('codigo', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="••••••••"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.codigo && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.codigo}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Verificando...' : 'Ingresar al Panel'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Panel de Gestión de Contenido
                    </p>
                </div>
            </div>
        </>
    );
}
