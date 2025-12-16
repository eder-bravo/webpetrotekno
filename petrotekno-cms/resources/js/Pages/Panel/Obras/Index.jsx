import { Head, Link, router, usePage } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, GripVertical, CheckCircle, X } from 'lucide-react';
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

function SortableItem({ obra, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: obra.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <GripVertical className="w-5 h-5" />
            </button>

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

export default function ObrasIndex({ obras: initialObras }) {
    const [obras, setObras] = useState(initialObras);
    const [deleteModal, setDeleteModal] = useState({ open: false, obra: null });
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(!!flash?.success);

    useEffect(() => {
        setObras(initialObras);
    }, [initialObras]);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setObras((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Guardar nuevo orden
                fetch('/panel/obras/reorder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify({
                        orden: newItems.map((item) => item.id),
                    }),
                });

                return newItems;
            });
        }
    };

    const handleDelete = (obra) => {
        setDeleteModal({ open: true, obra });
    };

    const confirmDelete = () => {
        if (deleteModal.obra) {
            router.delete(`/panel/obras/${deleteModal.obra.id}`, {
                onSuccess: () => {
                    setObras(obras.filter((o) => o.id !== deleteModal.obra.id));
                    setDeleteModal({ open: false, obra: null });
                },
            });
        }
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {obras.length} obra{obras.length !== 1 ? 's' : ''} en total
                </p>
                <Link
                    href="/panel/obras/create"
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Obra
                </Link>
            </div>

            {obras.length > 0 ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={obras.map((o) => o.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {obras.map((obra) => (
                                <SortableItem
                                    key={obra.id}
                                    obra={obra}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No hay obras registradas
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
