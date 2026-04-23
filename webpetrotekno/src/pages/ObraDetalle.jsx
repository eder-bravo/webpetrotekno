import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight, Folder } from 'lucide-react';
import { useObra } from '../hooks/useApi';
import { obrasFallback } from '../data/obrasFallback';
// Imágenes locales para el fallback
import imgP1 from '../assets/img4.webp';
import imgP2 from '../assets/img6.webp';
import imgP3 from '../assets/img5.webp';
import imgP4 from '../assets/img1.webp';
import imgP5 from '../assets/img2.webp';
import imgP6 from '../assets/img3.webp';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ObraDetalle.css';

// Mapa de slug → imagen local
const localImages = {
    'puerto-matamoros': imgP2,
    'conservacion-nuevo-laredo': imgP6,
    'torre-zenith': imgP3,
    'obra-industrial-norte': imgP4,
    'puente-centenario': imgP5,
    'pavimentacion-rural': imgP1,
};

// Mapa de estados mexicanos
const ESTADOS_MEXICO = {
    'agu': 'Aguascalientes',
    'bcn': 'Baja California',
    'bcs': 'Baja California Sur',
    'cam': 'Campeche',
    'chp': 'Chiapas',
    'chh': 'Chihuahua',
    'coa': 'Coahuila',
    'col': 'Colima',
    'cmx': 'Ciudad de México',
    'dur': 'Durango',
    'gua': 'Guanajuato',
    'gro': 'Guerrero',
    'hid': 'Hidalgo',
    'jal': 'Jalisco',
    'mex': 'México',
    'mic': 'Michoacán',
    'mor': 'Morelos',
    'nay': 'Nayarit',
    'nle': 'Nuevo León',
    'oax': 'Oaxaca',
    'pue': 'Puebla',
    'que': 'Querétaro',
    'roo': 'Quintana Roo',
    'slp': 'San Luis Potosí',
    'sin': 'Sinaloa',
    'son': 'Sonora',
    'tab': 'Tabasco',
    'tam': 'Tamaulipas',
    'tla': 'Tlaxcala',
    'ver': 'Veracruz',
    'yuc': 'Yucatán',
    'zac': 'Zacatecas',
};

function ObraDetalle() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: apiObra, loading, error } = useObra(slug);

    // Si el API falla o no está disponible, buscar en el fallback local
    const obraFromFallback = obrasFallback.find((o) => o.slug === slug);
    
    // Mapear contenido si viene del fallback (para que se renderice bien)
    const obra = apiObra || (obraFromFallback ? {
        ...obraFromFallback,
        imagen: localImages[obraFromFallback.slug] || null,
        contenido: obraFromFallback.descripcion
            ? `<h2>Detalles del Proyecto</h2><p>${obraFromFallback.descripcion}</p>`
            : null,
    } : null);

    // Imagen a mostrar: API > fallback local > placeholder
    const imagenSrc = obra?.imagen || null;
    const imagenAlt = obra?.nombre || 'Obra';

    // Scroll al inicio cuando se carga la página o cambia el slug
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Actualizar meta tags para SEO
    useEffect(() => {
        if (obra) {
            document.title = obra.meta_title || `${obra.nombre} | Petrotekno`;
            
            // Meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = obra.meta_description || `Conoce más sobre ${obra.nombre}, uno de nuestros proyectos destacados.`;
        }
        
        return () => {
            document.title = 'Petrotekno';
        };
    }, [obra]);

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/obras');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
    };

    const handleNavigation = (navSlug) => {
        navigate(`/obras/${navSlug}`);
    };

    if (loading && !obra) {
        return (
            <>
                <Navbar />
                <section className="obra-detalle-page">
                    <div className="container">
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Cargando obra...</p>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (!obra) {
        return (
            <>
                <Navbar />
                <section className="obra-detalle-page">
                    <div className="container">
                        <div className="error-state">
                            <h2>Obra no encontrada</h2>
                            <p>La obra que buscas no existe o ha sido eliminada.</p>
                            <Link to="/obras" className="btn-back">
                                <ArrowLeft size={18} />
                                Volver a obras
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
            <section className="obra-detalle-page" key={slug}>
                <div className="container">
                    {/* Header */}
                    <div className="obra-detalle-header">
                        <a href="/obras" onClick={handleGoBack} className="back-link">
                            <ArrowLeft size={18} />
                            Volver a obras
                        </a>
                    </div>

                    {/* Imagen Principal */}
                    <div className="obra-imagen-hero">
                        {imagenSrc ? (
                            <img 
                                key={imagenSrc}
                                src={imagenSrc}
                                alt={imagenAlt}
                                loading="eager"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                                    e.target.parentElement.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;font-size:1.2rem;">${imagenAlt}</div>`;
                                }}
                            />
                        ) : (
                            <div className="obra-imagen-placeholder">
                                <span>{imagenAlt}</span>
                            </div>
                        )}
                    </div>

                    {/* Información de la Obra */}
                    <div className="obra-info">
                        <div className="obra-meta">
                            {obra.categoria && (
                                <span className="obra-categoria">
                                    <Folder size={16} />
                                    {obra.categoria}
                                </span>
                            )}
                            {obra.estado && (
                                <span className="obra-estado">
                                    <MapPin size={16} />
                                    {ESTADOS_MEXICO[obra.estado] || obra.estado}
                                </span>
                            )}
                        </div>

                        <h1 className="obra-titulo">{obra.nombre}</h1>

                        {/* Contenido Detallado */}
                        {obra.contenido && (
                            <div 
                                className="obra-contenido"
                                dangerouslySetInnerHTML={{ __html: obra.contenido }}
                            />
                        )}
                    </div>

                    {/* Navegación Anterior/Siguiente */}
                    {obra.navegacion && (obra.navegacion.anterior || obra.navegacion.siguiente) && (
                        <nav className="obra-navegacion">
                            <div className="nav-item nav-anterior">
                                {obra.navegacion.anterior ? (
                                    <button 
                                        onClick={() => handleNavigation(obra.navegacion.anterior.slug)}
                                        className="nav-button"
                                    >
                                        <ChevronLeft size={24} />
                                        <div className="nav-content">
                                            <span className="nav-label">Obra anterior</span>
                                            <span className="nav-title">{obra.navegacion.anterior.nombre}</span>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="nav-placeholder"></div>
                                )}
                            </div>

                            <div className="nav-item nav-siguiente">
                                {obra.navegacion.siguiente ? (
                                    <button 
                                        onClick={() => handleNavigation(obra.navegacion.siguiente.slug)}
                                        className="nav-button"
                                    >
                                        <div className="nav-content">
                                            <span className="nav-label">Siguiente obra</span>
                                            <span className="nav-title">{obra.navegacion.siguiente.nombre}</span>
                                        </div>
                                        <ChevronRight size={24} />
                                    </button>
                                ) : (
                                    <div className="nav-placeholder"></div>
                                )}
                            </div>
                        </nav>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ObraDetalle;
