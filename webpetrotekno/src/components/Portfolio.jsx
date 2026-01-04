import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useObras } from '../hooks/useApi';
// Imágenes de fallback
import p1 from '../assets/img4.webp';
import p2 from '../assets/img6.webp';
import p3 from '../assets/img5.webp';
import p4 from '../assets/img1.webp';
import p5 from '../assets/img2.webp';
import p6 from '../assets/img3.webp';
import './Portfolio.css';

// Datos de fallback cuando la API no está disponible
const fallbackProjects = [
    { id: 1, imagen: p1, nombre: 'Torre Corporativa Zenith', categoria: 'Edificación Vertical', destacado: true },
    { id: 2, imagen: p2, nombre: 'Refinería del Norte', categoria: 'Industrial / Energía', destacado: true },
    { id: 3, imagen: p3, nombre: 'Puente Bicentenario', categoria: 'Infraestructura', destacado: true },
];

// Imágenes de fallback por índice
const fallbackImages = [p1, p2, p3, p4, p5, p6];

const Portfolio = () => {
    // Solo cargar obras destacadas en la página principal
    const { data: obras, loading } = useObras({ destacados: true });
    const navigate = useNavigate();
    
    // Usar datos de la API o fallback
    const displayData = obras && obras.length > 0 ? obras : fallbackProjects;

    const getImage = (obra, index) => {
        // Si la obra tiene imagen de la API, usarla
        if (obra.imagen && typeof obra.imagen === 'string' && obra.imagen.startsWith('http')) {
            return obra.imagen;
        }
        // Si no, usar imagen de fallback según índice
        return fallbackImages[index % fallbackImages.length];
    };

    const handleVerObras = (e) => {
        e.preventDefault();
        navigate('/obras');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
    };

    const handleObraClick = (slug) => {
        navigate(`/obras/${slug}`);
    };

    return (
        <section id="portfolio" className="portfolio section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Obras <span className="text-primary">Destacadas</span></h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">
                        Nuestros proyectos más representativos y de mayor impacto.
                    </p>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                        Cargando obras...
                    </div>
                )}

                <div className="portfolio-grid">
                    {displayData.map((project, index) => (
                        <div 
                            key={project.id || index} 
                            className="portfolio-item"
                            onClick={() => project.slug && handleObraClick(project.slug)}
                            style={{ cursor: project.slug ? 'pointer' : 'default' }}
                        >
                            <img
                                src={getImage(project, index)}
                                alt={project.nombre}
                                loading="lazy"
                                decoding="async"
                                width="800"
                                height="600"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="portfolio-overlay">
                                <span className="portfolio-cat">{project.categoria}</span>
                                <h3 className="portfolio-title">{project.nombre}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón Ver Más */}
                <div className="portfolio-cta">
                    <a href="/obras" onClick={handleVerObras} className="btn-ver-mas">
                        Ver todas las obras
                        <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
