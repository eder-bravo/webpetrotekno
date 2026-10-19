import { Head, Link } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';

export default function MensajesIndex({ mensajes }) {
    return (
        <PanelLayout title="Mensajes de contacto">
            <Head title="Mensajes de contacto" />
            <div className="max-w-5xl space-y-4">
                {mensajes.data.length === 0 ? (
                    <div className="rounded-lg bg-white p-8 text-gray-600 shadow dark:bg-gray-800 dark:text-gray-300">
                        Aún no hay mensajes.
                    </div>
                ) : mensajes.data.map((mensaje) => (
                    <article key={mensaje.id} className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{mensaje.asunto}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{mensaje.nombre} · <a className="text-blue-600 underline" href={`mailto:${mensaje.email}`}>{mensaje.email}</a></p>
                            </div>
                            <time className="text-sm text-gray-500">{new Date(mensaje.created_at).toLocaleString('es-MX')}</time>
                        </div>
                        <p className="mt-4 whitespace-pre-wrap text-gray-800 dark:text-gray-200">{mensaje.mensaje}</p>
                    </article>
                ))}
                {mensajes.links.length > 3 && (
                    <nav className="flex flex-wrap gap-2" aria-label="Páginas de mensajes">
                        {mensajes.links.map((link, index) => link.url ? (
                            <Link key={index} href={link.url} preserveScroll className={`rounded px-3 py-2 ${link.active ? 'bg-yellow-500 text-gray-900' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-white'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : null)}
                    </nav>
                )}
            </div>
        </PanelLayout>
    );
}
