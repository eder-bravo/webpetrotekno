import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Building2,
    Wrench,
    Settings,
    Share2,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
    ChevronDown,
    Mail,
} from 'lucide-react';

export default function PanelLayout({ children, title }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const navigation = [
        { name: 'Dashboard', href: '/panel', icon: LayoutDashboard },
        { name: 'Obras', href: '/panel/obras', icon: Building2 },
        { name: 'Servicios', href: '/panel/servicios', icon: Wrench },
        { name: 'Redes Sociales', href: '/panel/redes', icon: Share2 },
        { name: 'Mensajes', href: '/panel/mensajes', icon: Mail },
        { name: 'Configuración', href: '/panel/configuracion', icon: Settings },
    ];

    const isActive = (href) => {
        if (href === '/panel') {
            return url === '/panel';
        }
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar móvil */}
            <div
                className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}
            >
                <div
                    className="fixed inset-0 bg-gray-600/75"
                    onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
                    <div className="flex h-16 items-center justify-between px-4">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Petrotekno
                        </span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                                    isActive(item.href)
                                        ? 'bg-yellow-500 text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Sidebar desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            🏗️ Petrotekno
                        </span>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'bg-yellow-500 text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <Link
                            href="/panel/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    
                    <h1 className="flex-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h1>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                </header>

                {/* Main content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
