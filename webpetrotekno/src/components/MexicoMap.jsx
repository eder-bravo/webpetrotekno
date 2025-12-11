import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Mexico from '@svg-maps/mexico';
import { motion } from 'framer-motion';
import './MexicoMap.css';

// Project data mapped by state ID. 
// IDs strictly match those found in node_modules/@svg-maps/mexico/index.js ('tam', 'nle', etc.)
const projectData = {
    "tam": { count: 3, description: "Infraestructura portuaria" },
    "nle": { count: 5, description: "Edificios corporativos" }
};

const MexicoMap = () => {
    // hoveredLocation: Controls VISIBILITY only (true/false equivalent)
    const [hoveredLocation, setHoveredLocation] = useState(null);
    // tooltipContent: Controls CONTENT. Persists even when hoveredLocation is null to allow exit animation.
    const [tooltipContent, setTooltipContent] = useState(null);

    // Position starts off-screen
    const [tooltipPosition, setTooltipPosition] = useState({ x: -1000, y: -1000 });

    const handleLocationMouseOver = (event, location) => {
        const locationId = location.id;
        const locationName = location.name;
        // Check if we have data for this location
        const data = projectData[locationId] || {};

        // Update position immediately
        setTooltipPosition({ x: event.clientX, y: event.clientY });

        // Update content to be shown
        setTooltipContent({
            id: locationId,
            name: locationName,
            ...data
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

    const getLocationClassName = (locationId) => {
        if (projectData[locationId]) {
            return 'svg-map__location--highlighted';
        }
        return 'svg-map__location';
    };

    return (
        <section id="obras" className="mexico-map-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Obras más <span className="text-blue">Destacadas</span></h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">
                        Desde nuestros inicios hemos participado en grandes obras que van desde la construcción de naves industriales, la fabricación y ensamble de estructuras.
                    </p>
                </div>

                <div className="map-container" onMouseMove={handleMouseMove}>
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
                            />
                        ))}
                    </svg>
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
                                {tooltipContent.count ? (
                                    <>
                                        <p className="highlight-text">{tooltipContent.count} Obras</p>
                                        <p>{tooltipContent.description}</p>
                                    </>
                                ) : (
                                    <p>Cobertura disponible</p>
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
