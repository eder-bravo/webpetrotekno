import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as PhosphorIcons from '@phosphor-icons/react';
import { useServicios } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from './Button';
import SectionHeading from './SectionHeading';
import './Services.css';

const iconMap = {
    Buildings: PhosphorIcons.Buildings,
    Truck: PhosphorIcons.Truck,
    Hammer: PhosphorIcons.Hammer,
    Ruler: PhosphorIcons.Ruler,
    Wrench: PhosphorIcons.Wrench,
    HardHat: PhosphorIcons.HardHat,
    Crane: PhosphorIcons.Crane,
    Factory: PhosphorIcons.Factory,
    Road: PhosphorIcons.Path,
    Bridge: PhosphorIcons.Bridge,
    Path: PhosphorIcons.Path,
    BridgeIcon: PhosphorIcons.Bridge,
};

export function ServiceCard({ service, index = 0, reduceMotion }) {
    const Icon = service.icono ? (iconMap[service.icono] || PhosphorIcons.Wrench) : null;
    return <motion.div
        className="service-motion"
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: .985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: .12 }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ duration: .7, delay: Math.min(index, 3) * .075, ease: [0.22, 1, 0.36, 1] }}
    >
        <Link to={`/servicios/${service.slug}`} className={`service-card ${service.imagen ? 'service-card-photo' : ''}`}>
            {service.imagen && <img className="service-card-image" src={service.imagen} alt="" loading="lazy" decoding="async" />}
            <span className="service-card-shade" aria-hidden="true" />
            <div className="service-card-top">
                {Icon && <span className="service-icon"><Icon size={32} weight="regular" aria-hidden="true" /></span>}
                <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="service-card-bottom">
                <h3>{service.titulo}</h3>
                {service.descripcion_corta && <p>{service.descripcion_corta}</p>}
                <span className="service-link">Conocer servicio <ArrowUpRight size={19} aria-hidden="true" /></span>
            </div>
        </Link>
    </motion.div>;
}

const Services = () => {
    const { data: servicios, loading, error } = useServicios();
    const reduceMotion = useReducedMotion();
    
    const displayData = servicios || [];

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionHeading eyebrow="Lo que hacemos" description="Especialistas en construcción, rehabilitación y reciclado de pavimentos asfálticos.">
                        Nuestros <span className="section-heading__accent">Servicios</span>
                    </SectionHeading>
                </motion.div>

                <div className="services-grid">
                    {displayData.map((service, index) => <ServiceCard key={service.id} service={service} index={index} reduceMotion={reduceMotion} />)}
                </div>
                {!loading && !error && displayData.length === 0 && <p className="section-subtitle">Próximamente publicaremos nuestros servicios.</p>}
                {error && <p className="section-subtitle">No pudimos cargar los servicios. Inténtalo de nuevo más tarde.</p>}
                {displayData.length > 0 && <div className="section-actions"><Button to="/servicios" variant="secondary" arrow>Ver todos los servicios</Button></div>}
            </div>
        </section>
    );
};

export default Services;
