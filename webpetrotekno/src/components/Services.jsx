import React from 'react';
import { Truck, Hammer, Building2, Ruler } from 'lucide-react';
import './Services.css';

const servicesData = [
    {
        icon: <Building2 size={40} />,
        title: "Edificación Vertical",
        description: "Construcción de complejos corporativos y residenciales con los más altos estándares de seguridad."
    },
    {
        icon: <Truck size={40} />,
        title: "Infraestructura Vial",
        description: "Carreteras, puentes y pavimentación desarrollados para durar y conectar comunidades."
    },
    {
        icon: <Hammer size={40} />,
        title: "Obra Industrial",
        description: "Naves industriales y plantas de manufactura optimizadas para la productividad."
    },
    {
        icon: <Ruler size={40} />,
        title: "Proyectos Llave en Mano",
        description: "Gestión integral desde el diseño hasta la entrega final operativa."
    }
];

const Services = () => {
    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Nuestros <span className="text-primary">Servicios</span></h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Soluciones integrales para desafíos de ingeniería complejos.</p>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href="#" className="service-link">Leer más &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
