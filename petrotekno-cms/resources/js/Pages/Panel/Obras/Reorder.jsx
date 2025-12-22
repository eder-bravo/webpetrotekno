import { Head, Link, router } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { ArrowLeft, GripVertical, Check, Star, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

function SortableItem({ obra, index }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: obra.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow ${
                isDragging ? 'shadow-lg ring-2 ring-yellow-500' : ''
            }`}
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
                <GripVertical className="w-5 h-5" />
            </button>

            <span className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                {index + 1}
            </span>

            <div className="w-12 h-12 flex-shrink-0">
                {obra.imagen ? (
                    <img
                        src={`/storage/${obra.imagen}`}
                        alt={obra.nombre}
                        className="w-full h-full object-cover rounded"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">—</span>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {obra.nombre}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {obra.categoria || 'Sin categoría'}
                    {obra.estado && (
                        <span className="text-blue-500 dark:text-blue-400">
                            {' '}• {ESTADOS_MEXICO[obra.estado] || obra.estado}
                        </span>
                    )}
                </p>
            </div>

            {obra.destacado && (
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="currentColor" />
            )}
        </div>
    );
}

export default function ObrasReorder({ obras: paginatedObras, estados = [], estadosConObras = [], filtroEstado = '' }) {
    const [obras, setObras] = useState(paginatedObras.data);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Calcular el offset basado en la página actual
    const currentPage = paginatedObras.current_page;
    const perPage = paginatedObras.per_page;
    const indexOffset = (currentPage - 1) * perPage;

    // Actualizar obras cuando cambie la paginación
    useEffect(() => {
        setObras(paginatedObras.data);
        setHasChanges(false);
        setSaved(false);
    }, [paginatedObras.data]);

    const handleFilterChange = (estado) => {
        if (hasChanges && !confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?')) {
            return;
        }
        const params = estado ? { estado } : {};
        router.get('/panel/obras/reorder', params, { preserveState: false });
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setObras((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
            setHasChanges(true);
            setSaved(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Calcular las posiciones globales basadas en el offset de la página
            const orden = obras.map((item, index) => ({
                id: item.id,
                orden: indexOffset + index + 1
            }));

            await fetch('/panel/obras/reorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ orden }),
            });
            setSaved(true);
            setHasChanges(false);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving order:', error);
        } finally {
            setSaving(false);
        }
    };

    const goToPage = (url) => {
        if (url && !hasChanges) {
            router.get(url);
        } else if (url && hasChanges) {
            if (confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?')) {
                router.get(url);
            }
        }
    };

    return (
        <PanelLayout title="Reordenar Obras">
            <Head title="Reordenar Obras" />

            <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link
                            href="/panel/obras"
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Volver a obras
                        </Link>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Reordenar obras
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Arrastra y suelta las obras para cambiar su orden de aparición
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving || !hasChanges}
                        className={`inline-flex items-center px-4 py-2 font-medium rounded-lg transition-colors ${
                            saved
                                ? 'bg-green-500 text-white'
                                : hasChanges
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {saved ? (
                            <>
                                <Check className="w-5 h-5 mr-2" />
                                Guardado
                            </>
                        ) : saving ? (
                            'Guardando...'
                        ) : (
                            'Guardar orden'
                        )}
                    </button>
                </div>

                {/* Filtro por estado */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Filtrar:</span>
                    </div>
                    <div className="relative">
                        <select
                            value={filtroEstado}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                            <option value="">Todos los estados</option>
                            {estadosConObras.map((codigo) => (
                                <option key={codigo} value={codigo}>
                                    {ESTADOS_MEXICO[codigo] || codigo}
                                </option>
                            ))}
                        </select>
                    </div>
                    {filtroEstado && (
                        <button
                            onClick={() => handleFilterChange('')}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                            <X className="w-3 h-3" />
                            Limpiar
                        </button>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={obras.map((o) => o.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {obras.map((obra, index) => (
                                    <SortableItem
                                        key={obra.id}
                                        obra={obra}
                                        index={indexOffset + index}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                {/* Paginación */}
                {paginatedObras.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            onClick={() => goToPage(paginatedObras.prev_page_url)}
                            disabled={!paginatedObras.prev_page_url}
                            className={`p-2 rounded-lg ${
                                paginatedObras.prev_page_url
                                    ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-1">
                            {paginatedObras.links.slice(1, -1).map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToPage(link.url)}
                                    disabled={!link.url}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                        link.active
                                            ? 'bg-yellow-500 text-gray-900'
                                            : link.url
                                            ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                            : 'text-gray-400'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(paginatedObras.next_page_url)}
                            disabled={!paginatedObras.next_page_url}
                            className={`p-2 rounded-lg ${
                                paginatedObras.next_page_url
                                    ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
                    Mostrando {paginatedObras.from || 0}-{paginatedObras.to || 0} de {paginatedObras.total} obras • Las obras con ⭐ están marcadas como destacadas
                </p>
            </div>
        </PanelLayout>
    );
}
