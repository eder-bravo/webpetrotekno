import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { useServicio } from '../hooks/useApi';
import { serviciosFallback } from '../data/serviciosFallback';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ServicioDetalle.css';

// Mapeo de nombres de iconos a componentes (igual que en Services.jsx)
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

// Colores semánticos por icono — misma paleta que Services.jsx
const iconColors = {
    Leaf:      '#2d7d46',
    Plant:     '#22863a',
    Tree:      '#1d6b35',
    Recycle:   '#2d7d46',
    Drop:      '#1a6fa8',
    Wind:      '#4b8fa8',
    Sun:       '#d4860a',
    Path:      '#c47a1a',
    Bridge:    '#8b6914',
    Buildings: '#1e5f8e',
    Crane:     '#1e5f8e',
    Ruler:     '#2c4a6b',
    Factory:   '#3a4f6b',
    Hammer:    '#7c5a2e',
    Wrench:    '#5c4a8a',
    Truck:     '#4a6080',
    HardHat:   '#b8710a',
};


function ServicioDetalle() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: apiServicio, loading, error } = useServicio(slug);

    // Si el API falla o no está disponible, buscar en el fallback local
    const servicio = apiServicio || serviciosFallback.find((s) => s.slug === slug) || null;

    // Scroll al inicio
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Meta tags SEO
    useEffect(() => {
        if (servicio) {
            document.title = servicio.meta_title || `${servicio.titulo} | Petrotekno`;

            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content =
                servicio.meta_description ||
                `Conoce más sobre nuestro servicio: ${servicio.titulo}`;
        }

        return () => {
            document.title = 'Petrotekno';
        };
    }, [servicio]);

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/#services');
        setTimeout(() => {
            const section = document.getElementById('services');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const getIconColor = (iconName) => iconColors[iconName] || '#1e5f8e';

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || PhosphorIcons.Wrench;
        const color = getIconColor(iconName);
        return <IconComponent size={48} weight="duotone" color={color} />;
    };

    // Genera el estilo del bubble de icono según el color semántico
    const getIconBubbleStyle = (iconName) => {
        const color = getIconColor(iconName);
        // Convierte hex a RGB para generar fondo translucido
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return {
            background: `rgba(${r}, ${g}, ${b}, 0.15)`,
            border: `1.5px solid rgba(${r}, ${g}, ${b}, 0.35)`,
        };
    };


    if (loading && !servicio) {
        return (
            <>
                <Navbar />
                <section className="servicio-detalle-page">
                    <div className="container">
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Cargando servicio...</p>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (!servicio) {
        return (
            <>
                <Navbar />
                <section className="servicio-detalle-page">
                    <div className="container">
                        <div className="error-state">
                            <h2>Servicio no encontrado</h2>
                            <p>El servicio que buscas no existe o ha sido eliminado.</p>
                            <Link to="/#services" className="btn-back">
                                <ArrowLeft size={18} />
                                Volver a servicios
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="servicio-detalle-page">
                <Navbar />

                {/* ── Hero Banner ── */}
                <div className="servicio-hero">
                    <div className="servicio-hero-inner">
                        <a href="/#services" onClick={handleGoBack} className="back-link">
                            <ArrowLeft size={16} />
                            Volver a servicios
                        </a>

                        <div className="servicio-hero-content">
                            {servicio.icono && (
                                <div className="servicio-icon-grande">
                                    {getIcon(servicio.icono)}
                                </div>
                            )}
                            <div>
                                <h1 className="servicio-titulo">{servicio.titulo}</h1>
                                {servicio.descripcion_corta && (
                                    <p className="servicio-subtitulo-hero">
                                        {servicio.descripcion_corta}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="servicio-hero-divider" />

                {/* ── Cuerpo ── */}
                <div className="servicio-body">
                    {/* Imagen hero opcional */}
                    {servicio.imagen && (
                        <div className="servicio-imagen-hero">
                            <img src={servicio.imagen} alt={servicio.titulo} loading="eager" />
                        </div>
                    )}

                    {/* Contenido */}
                    {servicio.contenido ? (
                        <div
                            className="servicio-contenido"
                            dangerouslySetInnerHTML={{ __html: servicio.contenido }}
                        />
                    ) : (
                        <p className="servicio-descripcion-intro">{servicio.descripcion_corta}</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );

}

export default ServicioDetalle;
