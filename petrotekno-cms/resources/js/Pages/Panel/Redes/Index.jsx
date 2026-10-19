import { Head, useForm, router } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, X, Link2 } from 'lucide-react';
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

function SortableItem({ red, onEdit, onDelete, iconos }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: red.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Obtener el nombre del icono para mostrar
    const iconLabel = iconos[red.icono] || red.icono || 'Enlace';

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

            <div className="w-10 h-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {red.nombre}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {red.url}
                </p>
            </div>

            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                red.activo
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
            }`}>
                {red.activo ? (
                    <><Eye className="w-3 h-3 mr-1" /> Activo</>
                ) : (
                    <><EyeOff className="w-3 h-3 mr-1" /> Inactivo</>
                )}
            </span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(red)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                    <Edit className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(red)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default function RedesIndex({ redes: initialRedes, iconos }) {
    const [redes, setRedes] = useState(initialRedes);
    const [showModal, setShowModal] = useState(false);
    const [editingRed, setEditingRed] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, red: null });

    // Sincronizar estado local cuando cambian las props (después de crear/editar)
    useEffect(() => {
        setRedes(initialRedes);
    }, [initialRedes]);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombre: '',
        icono: '',
        url: '',
        activo: true,
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = redes.findIndex((item) => item.id === active.id);
            const newIndex = redes.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(redes, oldIndex, newIndex);
            setRedes(newItems);
            try {
                const response = await fetch('/panel/redes/reorder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        orden: newItems.map((item) => item.id),
                    }),
                });
                if (!response.ok) throw new Error('No se pudo guardar el orden');
            } catch (error) {
                setRedes(redes);
                alert('No se pudo guardar el orden de redes. Inténtalo de nuevo.');
            }
        }
    };

    const openCreateModal = () => {
        setEditingRed(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (red) => {
        setEditingRed(red);
        setData({
            nombre: red.nombre,
            icono: red.icono,
            url: red.url,
            activo: red.activo,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingRed(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingRed) {
            put(`/panel/redes/${editingRed.id}`, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
            });
        } else {
            post('/panel/redes', {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
            });
        }
    };

    const handleDelete = (red) => {
        setDeleteModal({ open: true, red });
    };

    const confirmDelete = () => {
        if (deleteModal.red) {
            router.delete(`/panel/redes/${deleteModal.red.id}`, {
                onSuccess: () => {
                    setRedes(redes.filter((r) => r.id !== deleteModal.red.id));
                    setDeleteModal({ open: false, red: null });
                },
            });
        }
    };

    return (
        <PanelLayout title="Redes Sociales">
            <Head title="Redes Sociales" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {redes.length} red{redes.length !== 1 ? 'es' : ''} configurada{redes.length !== 1 ? 's' : ''}
                </p>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Red Social
                </button>
            </div>

            {redes.length > 0 ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={redes.map((r) => r.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {redes.map((red) => (
                                <SortableItem
                                    key={red.id}
                                    red={red}
                                    iconos={iconos}
                                    onEdit={openEditModal}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No hay redes sociales configuradas
                    </p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar primera red
                    </button>
                </div>
            )}

            {/* Modal crear/editar */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingRed ? 'Editar red social' : 'Nueva red social'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Ej: Facebook"
                                />
                                {errors.nombre && (
                                    <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tipo de red social
                                </label>
                                <select
                                    value={data.icono}
                                    onChange={(e) => setData('icono', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">Seleccionar tipo</option>
                                    {Object.entries(iconos).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.icono && (
                                    <p className="mt-1 text-sm text-red-500">{errors.icono}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    URL
                                </label>
                                <input
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="https://facebook.com/petrotekno"
                                />
                                {errors.url && (
                                    <p className="mt-1 text-sm text-red-500">{errors.url}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.activo}
                                        onChange={(e) => setData('activo', e.target.checked)}
                                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Activo (visible en el sitio)
                                    </span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Guardando...' : (editingRed ? 'Actualizar' : 'Crear')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Eliminar red social
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            ¿Estás seguro de que deseas eliminar "{deleteModal.red?.nombre}"?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, red: null })}
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
