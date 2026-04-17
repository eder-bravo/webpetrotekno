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

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || PhosphorIcons.Wrench;
        return <IconComponent size={48} weight="duotone" />;
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
            <Navbar />
            <section className="servicio-detalle-page">
                <div className="container">
                    {/* Header con link de regreso */}
                    <div className="servicio-detalle-header">
                        <a href="/#services" onClick={handleGoBack} className="back-link">
                            <ArrowLeft size={18} />
                            Volver a servicios
                        </a>
                    </div>

                    {/* Imagen Principal */}
                    {servicio.imagen && (
                        <div className="servicio-imagen-hero">
                            <img
                                src={servicio.imagen}
                                alt={servicio.titulo}
                                loading="eager"
                            />
                        </div>
                    )}

                    {/* Información del Servicio */}
                    <div className="servicio-info">
                        {/* Icono + Título */}
                        <div className="servicio-titulo-block">
                            {servicio.icono && (
                                <div className="servicio-icon-grande">
                                    {getIcon(servicio.icono)}
                                </div>
                            )}
                            <h1 className="servicio-titulo">{servicio.titulo}</h1>
                        </div>

                        {/* Descripción corta como intro */}
                        {servicio.descripcion_corta && !servicio.contenido && (
                            <p className="servicio-descripcion-intro">
                                {servicio.descripcion_corta}
                            </p>
                        )}

                        {/* Contenido Detallado */}
                        {servicio.contenido ? (
                            <div
                                className="servicio-contenido"
                                dangerouslySetInnerHTML={{ __html: servicio.contenido }}
                            />
                        ) : (
                            <div className="servicio-contenido">
                                <p>{servicio.descripcion_corta}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ServicioDetalle;
