import { Head } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Building2, Wrench, Share2, TrendingUp } from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        {
            title: 'Obras',
            value: stats.obras,
            subtitle: `${stats.obras_activas} activas`,
            icon: Building2,
            color: 'bg-blue-500',
            href: '/panel/obras',
        },
        {
            title: 'Servicios',
            value: stats.servicios,
            subtitle: `${stats.servicios_activos} activos`,
            icon: Wrench,
            color: 'bg-green-500',
            href: '/panel/servicios',
        },
        {
            title: 'Redes Sociales',
            value: stats.redes,
            subtitle: 'Configuradas',
            icon: Share2,
            color: 'bg-purple-500',
            href: '/panel/redes',
        },
    ];

    return (
        <PanelLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <a
                        key={card.title}
                        href={card.href}
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className={`${card.color} rounded-lg p-3`}>
                                    <card.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {card.title}
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                {card.subtitle}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Acciones rápidas */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Acciones Rápidas
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <a
                        href="/panel/obras/create"
                        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3">
                            <Building2 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                            Nueva Obra
                        </span>
                    </a>
                    <a
                        href="/panel/servicios/create"
                        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                            <Wrench className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                            Nuevo Servicio
                        </span>
                    </a>
                    <a
                        href="/panel/redes"
                        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
                            <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                            Agregar Red Social
                        </span>
                    </a>
                    <a
                        href="/panel/configuracion"
                        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                            SEO y Configuración
                        </span>
                    </a>
                </div>
            </div>

            {/* Info */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    💡 Consejo
                </h3>
                <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                    Las obras marcadas como "destacadas" aparecerán en la página principal. 
                    Puedes arrastrar y soltar las obras para cambiar su orden de aparición.
                </p>
            </div>
        </PanelLayout>
    );
}
