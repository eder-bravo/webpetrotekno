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

// Colores semánticos por icono — armonizan con el estilo navy + dorado del sitio
const iconColors = {
    // Ambientales: verdes naturales
    Leaf:     '#2d7d46',   // verde bosque
    Plant:    '#22863a',   // verde hoja viva
    Tree:     '#1d6b35',   // verde oscuro
    Recycle:  '#2d7d46',   // verde reciclaje
    // Agua / Aire
    Drop:     '#1a6fa8',   // azul agua
    Wind:     '#4b8fa8',   // azul cielo
    Sun:      '#d4860a',   // ámbar solar (no tan saturado como el amarillo primario)
    // Infraestructura vial
    Path:     '#c47a1a',   // ámbar carretera
    Bridge:   '#8b6914',   // dorado oscuro
    // Construcción / Edificación
    Buildings:'#1e5f8e',   // azul acero
    Crane:    '#1e5f8e',   // azul grua
    Ruler:    '#2c4a6b',   // azul medición
    // Industrial
    Factory:  '#3a4f6b',   // azul industrial oscuro
    Hammer:   '#7c5a2e',   // café herramienta
    Wrench:   '#5c4a8a',   // lila mecánico
    Truck:    '#4a6080',   // gris-azul transporte
    // Proyectos llave en mano
    HardHat:  '#b8710a',   // naranja casco (ámbar cálido)
};

const Services = () => {
    const { data: servicios, loading, error } = useServicios();
    const navigate = useNavigate();
    
    // Usar datos de la API o fallback
    const displayData = servicios && servicios.length > 0 ? servicios : serviciosFallback;

    const getIconColor = (iconName) => iconColors[iconName] || '#1e5f8e';

    const getIcon = (iconName, size = 40) => {
        const IconComponent = iconMap[iconName] || PhosphorIcons.Wrench;
        const color = getIconColor(iconName);
        return <IconComponent size={size} weight="duotone" color={color} />;
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
