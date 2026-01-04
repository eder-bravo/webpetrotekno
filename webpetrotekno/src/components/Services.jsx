import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { useServicios } from '../hooks/useApi';
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
    Path: PhosphorIcons.Path,
    BridgeIcon: PhosphorIcons.Bridge,
};

// Datos de fallback cuando la API no está disponible
const fallbackData = [
    {
        id: 1,
        icono: 'Buildings',
        titulo: "Edificación Vertical",
        descripcion_corta: "Construcción de complejos corporativos y residenciales con los más altos estándares de seguridad."
    },
    {
        id: 2,
        icono: 'Truck',
        titulo: "Infraestructura Vial",
        descripcion_corta: "Carreteras, puentes y pavimentación desarrollados para durar y conectar comunidades."
    },
    {
        id: 3,
        icono: 'Hammer',
        titulo: "Obra Industrial",
        descripcion_corta: "Naves industriales y plantas de manufactura optimizadas para la productividad."
    },
    {
        id: 4,
        icono: 'Ruler',
        titulo: "Proyectos Llave en Mano",
        descripcion_corta: "Gestión integral desde el diseño hasta la entrega final operativa."
    }
];

const Services = () => {
    const { data: servicios, loading, error } = useServicios();
    
    // Usar datos de la API o fallback
    const displayData = servicios && servicios.length > 0 ? servicios : fallbackData;

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || PhosphorIcons.Wrench;
        return <IconComponent size={40} weight="duotone" />;
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
                        <a key={service.id} href="#" className="service-card">
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
