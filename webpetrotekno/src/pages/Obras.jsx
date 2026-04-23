import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, X, Filter, ChevronDown } from 'lucide-react';
import { useObras } from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// Imágenes de fallback
import p1 from '../assets/img4.webp';
import p2 from '../assets/img6.webp';
import p3 from '../assets/img5.webp';
import p4 from '../assets/img1.webp';
import p5 from '../assets/img2.webp';
import p6 from '../assets/img3.webp';
import { obrasFallback } from '../data/obrasFallback';
import '../components/Portfolio.css';
import './Obras.css';

const fallbackImages = [p1, p2, p3, p4, p5, p6];

// Mapa de estados mexicanos (mismo que en el backend)
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

function Obras() {
    const [searchParams, setSearchParams] = useSearchParams();
    const estadoParam = searchParams.get('estado');
    const [selectedEstado, setSelectedEstado] = useState(estadoParam || '');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const { data: obras, loading, error } = useObras();
    const navigate = useNavigate();

    // Actualizar selectedEstado cuando cambia el parámetro de URL
    useEffect(() => {
        setSelectedEstado(estadoParam || '');
    }, [estadoParam]);

    // Scroll al inicio cuando se carga la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleGoHome = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
    };

    const handleObraClick = (slug) => {
        navigate(`/obras/${slug}`);
    };

    const getImage = (obra, index) => {
        if (obra.imagen && typeof obra.imagen === 'string' && obra.imagen.startsWith('http')) {
            return obra.imagen;
        }
        return fallbackImages[index % fallbackImages.length];
    };

    // Usar datos de la API o fallback
    const allObras = obras && obras.length > 0 ? obras : obrasFallback;

    // Filtrar obras por estado seleccionado
    const filteredObras = useMemo(() => {
        if (!allObras) return [];
        if (!selectedEstado) return allObras;
        return allObras.filter(obra => obra.estado === selectedEstado);
    }, [allObras, selectedEstado]);

    // Agrupar obras por estado
    const obrasPorEstado = useMemo(() => {
        if (!filteredObras) return {};
        
        const grouped = {};
        filteredObras.forEach(obra => {
            const estado = obra.estado || 'sin_estado';
            if (!grouped[estado]) {
                grouped[estado] = [];
            }
            grouped[estado].push(obra);
        });
        
        // Ordenar por nombre de estado
        return filteredObras.reduce((acc, obra) => {
            const estado = obra.estado || 'Otros';
            if (!acc[estado]) acc[estado] = [];
            acc[estado].push(obra);
            return acc;
        }, {});
    }, [filteredObras]);

    // Obtener lista de estados que tienen obras
    const estadosConObras = useMemo(() => {
        if (!allObras) return [];
        const estados = [...new Set(allObras.map(o => o.estado))];
        return estados.filter(Boolean).sort((a, b) => 
            (ESTADOS_MEXICO[a] || a).localeCompare(ESTADOS_MEXICO[b] || b)
        );
    }, [allObras]);

    const handleEstadoChange = (estado) => {
        setSelectedEstado(estado);
        if (estado) {
            setSearchParams({ estado });
        } else {
            setSearchParams({});
        }
        setIsFilterOpen(false);
    };

    const clearFilter = () => {
        setSelectedEstado('');
        setSearchParams({});
    };

    return (
        <>
            <Navbar />
            <section className="portfolio section-padding obras-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
                <div className="container">
                    {/* Header */}
                    <div className="obras-header">
                        <a 
                            href="/"
                            onClick={handleGoHome}
                            className="back-link"
                        >
                            <ArrowLeft size={18} />
                            Volver al inicio
                        </a>
                        <h1 className="section-title" style={{ textAlign: 'left' }}>
                            Todas Nuestras <span className="text-primary">Obras</span>
                        </h1>
                        <p className="obras-description">
                            Conoce todos los proyectos que hemos realizado a lo largo de nuestra trayectoria.
                        </p>

                        {/* Filtros */}
                        <div className="obras-filters">
                            <div className="filter-dropdown">
                                <button 
                                    className={`filter-button ${selectedEstado ? 'active' : ''}`}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <Filter size={18} />
                                    <span>
                                        {selectedEstado 
                                            ? ESTADOS_MEXICO[selectedEstado] 
                                            : 'Filtrar por estado'}
                                    </span>
                                    <ChevronDown size={18} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
                                </button>
                                
                                {isFilterOpen && (
                                    <div className="filter-menu">
                                        <button 
                                            className={`filter-option ${!selectedEstado ? 'selected' : ''}`}
                                            onClick={() => handleEstadoChange('')}
                                        >
                                            Todos los estados
                                        </button>
                                        {estadosConObras.map(estado => (
                                            <button
                                                key={estado}
                                                className={`filter-option ${selectedEstado === estado ? 'selected' : ''}`}
                                                onClick={() => handleEstadoChange(estado)}
                                            >
                                                <MapPin size={14} />
                                                {ESTADOS_MEXICO[estado] || estado}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {selectedEstado && (
                                <button className="clear-filter" onClick={clearFilter}>
                                    <X size={16} />
                                    Limpiar filtro
                                </button>
                            )}
                        </div>

                        {/* Badge de resultados */}
                        {selectedEstado && (
                            <div className="filter-badge">
                                <MapPin size={16} />
                                Mostrando obras en <strong>{ESTADOS_MEXICO[selectedEstado]}</strong>
                                <span className="badge-count">{filteredObras.length} {filteredObras.length === 1 ? 'obra' : 'obras'}</span>
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="loading-message">
                            Cargando obras...
                        </div>
                    )}

                    {!loading && error && allObras.length === 0 && (
                        <div className="empty-message">
                            Error cargando obras: {error}
                        </div>
                    )}

                    {/* Contenido agrupado por estado */}
                    {!loading && !selectedEstado && Object.keys(obrasPorEstado).length > 0 && (
                        <div className="obras-grouped">
                            {Object.entries(obrasPorEstado).map(([estado, obrasEstado]) => (
                                <div key={estado} className="estado-section">
                                    <div className="estado-header">
                                        <div className="estado-title">
                                            <MapPin size={24} />
                                            <h2>{estado === 'sin_estado' ? 'Otras Obras' : ESTADOS_MEXICO[estado] || estado}</h2>
                                        </div>
                                        <span className="estado-count">
                                            {obrasEstado.length} {obrasEstado.length === 1 ? 'obra' : 'obras'}
                                        </span>
                                    </div>
                                    <div className="portfolio-grid">
                                        {obrasEstado.map((obra, index) => (
                                            <div 
                                                key={obra.id || index} 
                                                className="portfolio-item"
                                                onClick={() => handleObraClick(obra.slug)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    src={getImage(obra, index)}
                                                    alt={obra.nombre}
                                                    loading="lazy"
                                                    decoding="async"
                                                    width="800"
                                                    height="600"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div className="portfolio-overlay">
                                                    <span className="portfolio-cat">{obra.categoria}</span>
                                                    <h3 className="portfolio-title">{obra.nombre}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Grid simple cuando hay filtro activo */}
                    {!loading && selectedEstado && (
                        <div className="portfolio-grid" style={{ paddingBottom: '4rem' }}>
                            {filteredObras.map((obra, index) => (
                                <div 
                                    key={obra.id || index} 
                                    className="portfolio-item"
                                    onClick={() => handleObraClick(obra.slug)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={getImage(obra, index)}
                                        alt={obra.nombre}
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="600"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="portfolio-overlay">
                                        <span className="portfolio-cat">{obra.categoria}</span>
                                        <h3 className="portfolio-title">{obra.nombre}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mensaje si no hay obras */}
                    {!loading && !error && filteredObras.length === 0 && (
                        <div className="empty-message">
                            {selectedEstado 
                                ? `No hay obras disponibles en ${ESTADOS_MEXICO[selectedEstado]}.`
                                : 'No hay obras disponibles en este momento.'}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Obras;
