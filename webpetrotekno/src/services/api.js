function normalizeApiBaseUrl(rawBaseUrl) {
    if (!rawBaseUrl) return '/api';

    const trimmed = String(rawBaseUrl).trim().replace(/\/+$/, '');
    if (!trimmed) return '/api';

    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const API_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

/**
 * Función base para hacer peticiones a la API
 */
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Obtener configuración del sitio
 */
export async function getConfig() {
    return fetchAPI('/config');
}

/**
 * Obtener todos los servicios activos
 */
export async function getServicios() {
    return fetchAPI('/servicios');
}

/**
 * Obtener un servicio por slug
 */
export async function getServicio(slug) {
    return fetchAPI(`/servicios/${slug}`);
}

/**
 * Obtener todas las obras activas
 */
export async function getObras(options = {}) {
    const params = new URLSearchParams();
    if (options.destacados) params.append('destacados', '1');
    if (options.limit) params.append('limit', options.limit);
    if (options.estado) params.append('estado', options.estado);
    
    const query = params.toString();
    return fetchAPI(`/obras${query ? `?${query}` : ''}`);
}

/**
 * Obtener estadísticas de obras por estado para el mapa
 */
export async function getObrasPorEstado() {
    return fetchAPI('/obras/por-estado');
}

/**
 * Obtener una obra por slug
 */
export async function getObra(slug) {
    return fetchAPI(`/obras/${slug}`);
}

/**
 * Obtener redes sociales activas
 */
export async function getRedes() {
    return fetchAPI('/redes');
}

/**
 * Obtener todos los datos necesarios para la página principal
 */
export async function getHomeData() {
    try {
        const [config, servicios, obras, redes] = await Promise.all([
            getConfig(),
            getServicios(),
            getObras(),
            getRedes()
        ]);
        return { config, servicios, obras, redes };
    } catch (error) {
        console.error('Error loading home data:', error);
        throw error;
    }
}
