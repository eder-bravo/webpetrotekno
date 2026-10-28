import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, X, Filter, ChevronDown } from 'lucide-react';
import { useObras } from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MexicoMap from '../components/MexicoMap';
import SectionHeading from '../components/SectionHeading';
import BackLink from '../components/BackLink';
import '../components/Portfolio.css';
import './Obras.css';


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

const reveal = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

function ObraCard({ obra, index, reduceMotion, onOpen }) {
    return (
        <motion.a
            href={`/obras/${obra.slug}`}
            className={`portfolio-item obra-list-card ${obra.imagen ? '' : 'portfolio-item-no-image'}`}
            onClick={(event) => {
                if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                onOpen(obra.slug);
            }}
            aria-label={`Ver obra: ${obra.nombre}`}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ ...reveal, delay: Math.min(index, 3) * 0.075 }}
        >
            {obra.imagen && <img
                src={obra.imagen}
                alt={obra.nombre}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
            />}
            <div className="portfolio-overlay">
                <span className="portfolio-cat">{obra.categoria}</span>
                <h3 className="portfolio-title">{obra.nombre}</h3>
            </div>
            <span className="obra-card-corner" aria-hidden="true"><ArrowUpRight size={21} /></span>
        </motion.a>
    );
}

function Obras() {
    const [searchParams, setSearchParams] = useSearchParams();
    const estadoParam = searchParams.get('estado');
    const [selectedEstado, setSelectedEstado] = useState(estadoParam || '');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const { data: obras, loading, error } = useObras();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        document.title = 'Obras de pavimentación y reciclado | Petrotekno';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = 'Conoce obras de construcción, rehabilitación y reciclado de pavimentos asfálticos documentadas por Petrotekno.';
    }, []);

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

    // Filtrar obras por estado seleccionado
    const filteredObras = useMemo(() => {
        if (!obras) return [];
        if (!selectedEstado) return obras;
        return obras.filter(obra => obra.estado === selectedEstado);
    }, [obras, selectedEstado]);

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
        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            if (a === 'sin_estado') return 1;
            if (b === 'sin_estado') return -1;
            const nameA = ESTADOS_MEXICO[a] || a;
            const nameB = ESTADOS_MEXICO[b] || b;
            return nameA.localeCompare(nameB);
        });
        
        const sortedGrouped = {};
        sortedKeys.forEach(key => {
            sortedGrouped[key] = grouped[key];
        });
        
        return sortedGrouped;
    }, [filteredObras]);

    // Obtener estados únicos que tienen obras
    const estadosConObras = useMemo(() => {
        if (!obras) return [];
        const estados = [...new Set(obras.filter(o => o.estado).map(o => o.estado))];
        return estados.sort((a, b) => {
            const nameA = ESTADOS_MEXICO[a] || a;
            const nameB = ESTADOS_MEXICO[b] || b;
            return nameA.localeCompare(nameB);
        });
    }, [obras]);

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
            <section className="portfolio section-padding obras-page">
                <div className="container">
                    {/* Header */}
                    <motion.div
                        className="obras-header"
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={reveal}
                    >
                        <div className="obras-header-top">
                            <BackLink to="/" onClick={handleGoHome}>Volver al inicio</BackLink>
                            <span className="catalog-count">
                                <strong>{String(filteredObras.length).padStart(2, '0')}</strong>
                                {filteredObras.length === 1 ? ' obra' : ' obras'}
                            </span>
                        </div>
                        <SectionHeading as="h1" size="page" align="start" eyebrow="Portafolio / Petrotekno" description="Conoce todos los proyectos que hemos realizado a lo largo de nuestra trayectoria.">
                            Todas nuestras <span className="section-heading__accent">Obras</span>
                        </SectionHeading>

                        {/* Filtros */}
                        <div className="obras-filters">
                            <div className="filter-dropdown">
                                <button 
                                    className={`filter-button ${selectedEstado ? 'active' : ''}`}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    aria-expanded={isFilterOpen}
                                    aria-controls="obras-filter-menu"
                                    type="button"
                                >
                                    <Filter size={18} />
                                    <span>
                                        {selectedEstado 
                                            ? ESTADOS_MEXICO[selectedEstado] 
                                            : 'Filtrar por estado'}
                                    </span>
                                    <ChevronDown size={18} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        id="obras-filter-menu"
                                        className="filter-menu"
                                        initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
                                        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
                                    >
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
                                    </motion.div>
                                )}
                                </AnimatePresence>
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
                    </motion.div>

                    <details className="obras-map-disclosure">
                        <summary>Explorar obras en el mapa <ChevronDown size={18} aria-hidden="true" /></summary>
                        <MexicoMap heading="Obras por estado" />
                    </details>

                    {loading && (
                        <div className="loading-message">
                            Cargando obras...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="empty-message">
                            Error cargando obras: {error}
                        </div>
                    )}

                    {/* Contenido agrupado por estado */}
                    {!loading && !selectedEstado && Object.keys(obrasPorEstado).length > 0 && (
                        <div className="obras-grouped">
                            {Object.entries(obrasPorEstado).map(([estado, obrasEstado], sectionIndex) => (
                                <motion.section
                                    key={estado}
                                    className="estado-section"
                                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.06 }}
                                    transition={reveal}
                                >
                                    <div className="estado-header">
                                        <div className="estado-title">
                                            <span className="estado-index">{String(sectionIndex + 1).padStart(2, '0')}</span>
                                            <MapPin size={24} />
                                            <h2>{estado === 'sin_estado' ? 'Otras Obras' : ESTADOS_MEXICO[estado] || estado}</h2>
                                        </div>
                                        <span className="estado-count">
                                            {obrasEstado.length} {obrasEstado.length === 1 ? 'obra' : 'obras'}
                                        </span>
                                    </div>
                                    <div className="portfolio-grid">
                                        {obrasEstado.map((obra, index) => (
                                            <ObraCard key={obra.id || index} obra={obra} index={index} reduceMotion={reduceMotion} onOpen={handleObraClick} />
                                        ))}
                                    </div>
                                </motion.section>
                            ))}
                        </div>
                    )}

                    {/* Grid simple cuando hay filtro activo */}
                    {!loading && selectedEstado && (
                        <div className="portfolio-grid" style={{ paddingBottom: '4rem' }}>
                            {filteredObras.map((obra, index) => (
                                <ObraCard key={obra.id || index} obra={obra} index={index} reduceMotion={reduceMotion} onOpen={handleObraClick} />
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
