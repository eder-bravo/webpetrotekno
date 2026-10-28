import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Mexico from '@svg-maps/mexico';
import { motion } from 'framer-motion';
import { useObrasPorEstado } from '../hooks/useApi';
import SectionHeading from './SectionHeading';
import './MexicoMap.css';

const MexicoMap = ({ heading }) => {
    const navigate = useNavigate();
    // Cargar datos dinámicos de obras por estado desde la API
    const { data: obrasPorEstado, loading } = useObrasPorEstado();
    
    // hoveredLocation: Controls VISIBILITY only (true/false equivalent)
    const [hoveredLocation, setHoveredLocation] = useState(null);
    // tooltipContent: Controls CONTENT. Persists even when hoveredLocation is null to allow exit animation.
    const [tooltipContent, setTooltipContent] = useState(null);

    // Position starts off-screen
    const [tooltipPosition, setTooltipPosition] = useState({ x: -1000, y: -1000 });

    const handleLocationMouseOver = (event, location) => {
        const locationId = location.id;
        const locationName = location.name;
        // Check if we have data for this location from the API
        const data = obrasPorEstado?.[locationId] || {};

        // Update position immediately
        setTooltipPosition({ x: event.clientX, y: event.clientY });

        // Update content to be shown
        setTooltipContent({
            id: locationId,
            name: data.name || locationName,
            count: data.count || 0,
        });

        // Trigger visibility
        setHoveredLocation(locationId);
    };

    const handleLocationMouseOut = () => {
        // Only clear visibility trigger, leave content for fade out
        setHoveredLocation(null);
    };

    const handleMouseMove = (event) => {
        // Update tooltip position to follow mouse
        if (hoveredLocation) {
            setTooltipPosition({ x: event.clientX, y: event.clientY });
        }
    };

    const handleLocationClick = (locationId) => {
        // Solo navegar si el estado tiene obras
        if (obrasPorEstado?.[locationId]?.count > 0) {
            navigate(`/obras?estado=${locationId}`);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 0);
        }
    };

    const getLocationClassName = (locationId) => {
        if (obrasPorEstado?.[locationId]?.count > 0) {
            return 'svg-map__location--highlighted';
        }
        return 'svg-map__location';
    };

    return (
        <section id="obras" className="mexico-map-section section-padding">
            <div className="container">
                <div className="section-header">
                    <SectionHeading eyebrow="Nuestra presencia" description="Explora las obras publicadas por estado.">
                        {heading || <>Obras más <span className="section-heading__accent">Destacadas</span></>}
                    </SectionHeading>
                </div>

                <div className="map-container" onMouseMove={handleMouseMove}>
                    {loading ? (
                        <div style={{ padding: '4rem', color: '#999' }}>Cargando mapa...</div>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox={Mexico.viewBox}
                            className="mexico-svg-map"
                            aria-label={Mexico.label}
                        >
                            {Mexico.locations.map((location) => (
                                <path
                                    key={location.id}
                                    id={location.id}
                                    name={location.name}
                                    d={location.path}
                                    className={getLocationClassName(location.id)}
                                    onMouseOver={(e) => handleLocationMouseOver(e, location)}
                                    onMouseOut={handleLocationMouseOut}
                                    onClick={() => handleLocationClick(location.id)}
                                    style={{ cursor: obrasPorEstado?.[location.id]?.count > 0 ? 'pointer' : 'default' }}
                                />
                            ))}
                        </svg>
                    )}
                </div>

                {/* Leyenda */}
                <div className="map-legend">
                    <div className="legend-item">
                        <span className="legend-color legend-highlighted"></span>
                        <span>Estados con obras (clic para ver)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color legend-default"></span>
                        <span>Próximamente</span>
                    </div>
                </div>

                {/* Persistent Tooltip: Always rendered, opacity toggled. */}
                {createPortal(
                    <motion.div
                        className="map-tooltip"
                        animate={{
                            opacity: hoveredLocation ? 1 : 0,
                            // Slide up slightly when appearing, down when disappearing
                            y: hoveredLocation ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                            left: tooltipPosition.x,
                            top: tooltipPosition.y,
                            position: 'fixed',
                            zIndex: 9999,
                            // Ensure it doesn't block mouse events when invisible
                            pointerEvents: 'none'
                        }}
                    >
                        {/* We render tooltipContent which persists during the fade out */}
                        {tooltipContent && (
                            <>
                                <h4>{tooltipContent.name}</h4>
                                {tooltipContent.count > 0 ? (
                                    <>
                                        <p className="highlight-text">{tooltipContent.count} {tooltipContent.count === 1 ? 'Obra' : 'Obras'}</p>
                                        <p className="tooltip-action">Clic para ver obras</p>
                                    </>
                                ) : (
                                    <p>Próximamente</p>
                                )}
                            </>
                        )}
                    </motion.div>,
                    document.body
                )}
            </div>
        </section>
    );
};

export default MexicoMap;
