import { Head, Link, router, usePage } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, ArrowUpDown, CheckCircle, X, ChevronLeft, ChevronRight, Filter, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mapa de estados mexicanos
const ESTADOS_MEXICO = {
    'agu': 'Aguascalientes',
    'bcn': 'Baja California',
    'bcs': 'Baja California Sur',
    'cam': 'Campeche',
    'chp': 'Chiapas',
    'chh': 'Chihuahua',
    'coa': 'Coahuila',
    'col': 'Colima',
    'cmx': 'Ciudad de México',
    'dur': 'Durango',
    'gua': 'Guanajuato',
    'gro': 'Guerrero',
    'hid': 'Hidalgo',
    'jal': 'Jalisco',
    'mex': 'México',
    'mic': 'Michoacán',
    'mor': 'Morelos',
    'nay': 'Nayarit',
    'nle': 'Nuevo León',
    'oax': 'Oaxaca',
    'pue': 'Puebla',
    'que': 'Querétaro',
    'roo': 'Quintana Roo',
    'slp': 'San Luis Potosí',
    'sin': 'Sinaloa',
    'son': 'Sonora',
    'tab': 'Tabasco',
    'tam': 'Tamaulipas',
    'tla': 'Tlaxcala',
    'ver': 'Veracruz',
    'yuc': 'Yucatán',
    'zac': 'Zacatecas',
};

function ObraItem({ obra, onDelete }) {
    return (
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="w-20 h-20 flex-shrink-0">
                {obra.imagen ? (
                    <img
                        src={`/storage/${obra.imagen}`}
                        alt={obra.nombre}
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {obra.nombre}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {obra.categoria || 'Sin categoría'}
                    {obra.estado && (
                        <span className="ml-2 text-xs text-gray-400">
                            • Estado: {ESTADOS_MEXICO[obra.estado] || obra.estado}
                        </span>
                    )}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    {obra.destacado && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            <Star className="w-3 h-3 mr-1" />
                            Destacado
                        </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        obra.activo
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                        {obra.activo ? (
                            <><Eye className="w-3 h-3 mr-1" /> Activo</>
                        ) : (
                            <><EyeOff className="w-3 h-3 mr-1" /> Inactivo</>
                        )}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href={`/panel/obras/${obra.id}/edit`}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                    <Edit className="w-5 h-5" />
                </Link>
                <button
                    onClick={() => onDelete(obra)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

function Pagination({ links, meta }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {meta.from} a {meta.to} de {meta.total} obras
            </p>
            <div className="flex items-center gap-1">
                {links.map((link, index) => {
                    if (link.label.includes('Previous')) {
                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`p-2 rounded-lg transition-colors ${
                                    link.url
                                        ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                        : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                }`}
                                preserveScroll
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                        );
                    }
                    if (link.label.includes('Next')) {
                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`p-2 rounded-lg transition-colors ${
                                    link.url
                                        ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                        : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                }`}
                                preserveScroll
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                link.active
                                    ? 'bg-yellow-500 text-gray-900 font-medium'
                                    : link.url
                                    ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                    : 'text-gray-300 dark:text-gray-600'
                            }`}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default function ObrasIndex({ obras: paginatedObras, totalDestacados, totalInactivas, estados, estadosConObras, filtroEstado, filtroVisibilidad }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, obra: null });
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(!!flash?.success);

    const obras = paginatedObras.data;
    const { links, ...meta } = paginatedObras;

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleDelete = (obra) => {
        setDeleteModal({ open: true, obra });
    };

    const confirmDelete = () => {
        if (deleteModal.obra) {
            router.delete(`/panel/obras/${deleteModal.obra.id}`, {
                onSuccess: () => {
                    setDeleteModal({ open: false, obra: null });
                },
            });
        }
    };

    const handleFilterChange = (estado) => {
        router.get('/panel/obras', {
            ...(estado ? { estado } : {}),
            ...(filtroVisibilidad === 'inactivas' ? { visibilidad: 'inactivas' } : {}),
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleVisibilityChange = (visibilidad) => {
        router.get('/panel/obras', {
            ...(visibilidad === 'inactivas' ? { visibilidad: 'inactivas' } : {}),
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PanelLayout title="Obras">
            <Head title="Obras" />

            {/* Flash Message */}
            {showFlash && flash?.success && (
                <div className="mb-6 flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {flash.success}
                    </div>
                    <button onClick={() => setShowFlash(false)} className="hover:opacity-70">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {meta.total} obra{meta.total !== 1 ? 's' : ''} {filtroVisibilidad === 'inactivas' ? 'inactivas' : 'publicadas'}
                        {filtroEstado && (
                            <span className="ml-1">
                                en <strong className="text-gray-700 dark:text-gray-300">{estados[filtroEstado]}</strong>
                            </span>
                        )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className={`font-medium ${
                            totalDestacados >= 3 && totalDestacados <= 6 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                            {totalDestacados} obras destacadas
                        </span>
                        {' '} • Recomendado: mantener entre 3 y 6 destacadas
                        {totalInactivas > 0 && ` • ${totalInactivas} inactivas`}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/panel/obras/reorder"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                    >
                        <ArrowUpDown className="w-5 h-5 mr-2" />
                        Reordenar
                    </Link>
                    <Link
                        href="/panel/obras/create"
                        className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Nueva Obra
                    </Link>
                </div>
            </div>

            {/* Filtro por estado */}
            <div className="mb-6 flex items-center gap-3">
                <select
                    aria-label="Visibilidad de las obras"
                    value={filtroVisibilidad}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                    <option value="activas">Publicadas</option>
                    <option value="inactivas">Inactivas</option>
                </select>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Filter className="w-4 h-4" />
                    <span>Filtrar por estado:</span>
                </div>
                <select
                    value={filtroEstado || ''}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                    <option value="">Todos los estados</option>
                    {estadosConObras.sort((a, b) => {
                        const nameA = estados[a] || a;
                        const nameB = estados[b] || b;
                        return nameA.localeCompare(nameB);
                    }).map((estadoCode) => (
                        <option key={estadoCode} value={estadoCode}>
                            {estados[estadoCode] || estadoCode}
                        </option>
                    ))}
                </select>
                {filtroEstado && (
                    <button
                        onClick={() => handleFilterChange('')}
                        className="inline-flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Limpiar
                    </button>
                )}
            </div>

            {obras.length > 0 ? (
                <>
                    <div className="space-y-3">
                        {obras.map((obra) => (
                            <ObraItem
                                key={obra.id}
                                obra={obra}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                    <Pagination links={links} meta={meta} />
                </>
            ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No hay obras {filtroVisibilidad === 'inactivas' ? 'inactivas' : 'publicadas'}
                    </p>
                    <Link
                        href="/panel/obras/create"
                        className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Crear primera obra
                    </Link>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Eliminar obra
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            ¿Estás seguro de que deseas eliminar "{deleteModal.obra?.nombre}"? 
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, obra: null })}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}
