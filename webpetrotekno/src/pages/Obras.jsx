import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useObras } from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// Imágenes de fallback
import p1 from '../assets/img4.webp';
import p2 from '../assets/img6.webp';
import p3 from '../assets/img5.webp';
import p4 from '../assets/img1.webp';
import p5 from '../assets/img2.webp';
import p6 from '../assets/img3.webp';
import '../components/Portfolio.css';

const fallbackImages = [p1, p2, p3, p4, p5, p6];

function Obras() {
    const { data: obras, loading } = useObras();
    const navigate = useNavigate();

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

    const getImage = (obra, index) => {
        if (obra.imagen && typeof obra.imagen === 'string' && obra.imagen.startsWith('http')) {
            return obra.imagen;
        }
        return fallbackImages[index % fallbackImages.length];
    };

    return (
        <>
            <Navbar />
            <section className="portfolio section-padding" style={{ paddingTop: '120px', minHeight: '100vh' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <a 
                            href="/"
                            onClick={handleGoHome}
                            style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                color: '#f0c400',
                                textDecoration: 'none',
                                marginBottom: '1rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            <ArrowLeft size={18} />
                            Volver al inicio
                        </a>
                        <h1 className="section-title" style={{ textAlign: 'left' }}>
                            Todas Nuestras <span className="text-primary">Obras</span>
                        </h1>
                        <p style={{ color: '#999', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                            Conoce todos los proyectos que hemos realizado a lo largo de nuestra trayectoria.
                        </p>
                    </div>

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                            Cargando obras...
                        </div>
                    )}

                    {/* Grid de obras */}
                    <div className="portfolio-grid" style={{ paddingBottom: '4rem' }}>
                        {obras && obras.map((obra, index) => (
                            <div key={obra.id || index} className="portfolio-item">
                                <img
                                    src={getImage(obra, index)}
                                    alt={obra.nombre}
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="portfolio-overlay">
                                    <span className="portfolio-cat">{obra.categoria}</span>
                                    <h3 className="portfolio-title">{obra.nombre}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mensaje si no hay obras */}
                    {!loading && (!obras || obras.length === 0) && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                            No hay obras disponibles en este momento.
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Obras;
