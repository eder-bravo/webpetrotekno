import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useServicios } from '../hooks/useApi';
import { serviciosFallback } from '../data/serviciosFallback';
import './Services.css';

// Mapeo de nombres de iconos a componentes
const iconMap = {
    Buildings: PhosphorIcons.Buildings,
    Truck: PhosphorIcons.Truck,
    Hammer: PhosphorIcons.Hammer,
    Ruler: PhosphorIcons.Ruler,
    Wrench: PhosphorIcons.Wrench,
    HardHat: PhosphorIcons.HardHat,
    Crane: PhosphorIcons.Crane,
    Factory: PhosphorIcons.Factory,
    Bridge: PhosphorIcons.Bridge,
    Path: PhosphorIcons.Path,
    // Iconos ambientales
    Leaf: PhosphorIcons.Leaf,
    Plant: PhosphorIcons.Plant,
    Tree: PhosphorIcons.Tree,
    Wind: PhosphorIcons.Wind,
    Sun: PhosphorIcons.Sun,
    Drop: PhosphorIcons.Drop,
    Recycle: PhosphorIcons.Recycle,
};



const Services = () => {
    const { data: servicios, loading, error } = useServicios();
    const navigate = useNavigate();
    
    // Usar datos de la API o fallback
    const displayData = servicios && servicios.length > 0 ? servicios : serviciosFallback;

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || PhosphorIcons.Wrench;
        return <IconComponent size={40} weight="duotone" />;
    };

    const handleServiceClick = (e, service) => {
        e.preventDefault();
        if (service.slug) {
            navigate(`/servicios/${service.slug}`);
        }
    };

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Nuestros <span className="text-primary">Servicios</span></h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Soluciones integrales para desafíos de ingeniería complejos.</p>
                </div>

                <div className="services-grid">
                    {displayData.map((service) => (
                        <a
                            key={service.id}
                            href={service.slug ? `/servicios/${service.slug}` : '#'}
                            className="service-card"
                            onClick={(e) => handleServiceClick(e, service)}
                        >
                            <div className="service-icon">
                                {getIcon(service.icono)}
                            </div>
                            <h3>{service.titulo}</h3>
                            <p>{service.descripcion_corta}</p>
                            <span className="service-link">LEER MÁS →</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
