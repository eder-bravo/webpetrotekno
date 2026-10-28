import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import SectionHeading from './SectionHeading';
import { useObras } from '../hooks/useApi';
import './Portfolio.css';

const Portfolio = () => {
    // Solo cargar obras destacadas en la página principal
    const { data: obras, loading } = useObras({ destacados: true });
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    
    // Usar datos de la API o fallback
    const displayData = obras || [];

    const handleObraClick = (slug) => {
        navigate(`/obras/${slug}`);
    };

    return (
        <section id="portfolio" className="portfolio section-padding">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionHeading eyebrow="Nuestro trabajo" description="Proyectos documentados en el portafolio oficial de Petrotekno.">
                        Obras <span className="section-heading__accent">Destacadas</span>
                    </SectionHeading>
                </motion.div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                        Cargando obras...
                    </div>
                )}

                <div className="portfolio-grid">
                    {displayData.map((project, index) => (
                        <motion.div
                            key={project.id || index} 
                            className={`portfolio-item ${project.imagen ? '' : 'portfolio-item-no-image'}`}
                            onClick={() => project.slug && handleObraClick(project.slug)}
                            onKeyDown={(event) => {
                                if (project.slug && (event.key === 'Enter' || event.key === ' ')) {
                                    event.preventDefault();
                                    handleObraClick(project.slug);
                                }
                            }}
                            role={project.slug ? 'link' : undefined}
                            tabIndex={project.slug ? 0 : undefined}
                            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: Math.min(index, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            style={{ cursor: project.slug ? 'pointer' : 'default' }}
                        >
                            {project.imagen ? <img
                                src={project.imagen}
                                alt={project.nombre}
                                loading="lazy"
                                decoding="async"
                                width="800"
                                height="600"
                                style={{ objectFit: 'cover' }}
                            /> : null}
                            <div className="portfolio-overlay">
                                <span className="portfolio-cat">{project.categoria}</span>
                                <h3 className="portfolio-title">{project.nombre}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {!loading && displayData.length === 0 && <p className="section-subtitle">Próximamente publicaremos nuestras obras.</p>}

                {/* Botón Ver Más */}
                <div className="section-actions">
                    <Button to="/obras" variant="secondary" arrow>Ver todas las obras</Button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
