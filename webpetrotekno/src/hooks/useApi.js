import { useState, useEffect } from 'react';

/**
 * Hook genérico para consumir la API
 * @param {Function} apiFn - Función de la API a llamar
 * @param {Array} deps - Dependencias para re-ejecutar
 */
export function useApi(apiFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const result = await apiFn();
                if (!cancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, loading, error };
}

/**
 * Hook para obtener la configuración del sitio
 */
export function useConfig() {
    return useApi(() => import('../services/api.js').then(m => m.getConfig()));
}

/**
 * Hook para obtener servicios
 */
export function useServicios() {
    return useApi(() => import('../services/api.js').then(m => m.getServicios()));
}

/**
 * Hook para obtener un servicio por slug
 */
export function useServicio(slug) {
    return useApi(
        () => import('../services/api.js').then(m => m.getServicio(slug)),
        [slug]
    );
}

/**
 * Hook para obtener obras
 */
export function useObras(options = {}) {
    return useApi(
        () => import('../services/api.js').then(m => m.getObras(options)),
        [JSON.stringify(options)]
    );
}

/**
 * Hook para obtener estadísticas de obras por estado
 */
export function useObrasPorEstado() {
    return useApi(() => import('../services/api.js').then(m => m.getObrasPorEstado()));
}

/**
 * Hook para obtener una obra por slug
 */
export function useObra(slug) {
    return useApi(
        () => import('../services/api.js').then(m => m.getObra(slug)),
        [slug]
    );
}

/**
 * Hook para obtener redes sociales
 */
export function useRedes() {
    return useApi(() => import('../services/api.js').then(m => m.getRedes()));
}

/**
 * Hook para obtener todos los datos de la home
 */
export function useHomeData() {
    return useApi(() => import('../services/api.js').then(m => m.getHomeData()));
}
