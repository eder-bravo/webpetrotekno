import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, MapPin, ChevronLeft, ChevronRight, Folder } from 'lucide-react';
import { useObra } from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ObraDetalle.css';

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

const reveal = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

function ObraDetalle() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: obra, loading, error } = useObra(slug);
    const reduceMotion = useReducedMotion();

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

    const titleWords = obra?.nombre?.trim().split(/\s+/) || [];
    const enIndex = titleWords.findIndex((word, index) => index > 1 && word.toLowerCase() === 'en');
    const titleBreak = titleWords.length > 1
        ? (enIndex > 1 ? enIndex : Math.ceil(titleWords.length / 2))
        : titleWords.length;
    const titleFirst = titleWords.slice(0, titleBreak).join(' ');
    const titleSecond = titleWords.slice(titleBreak).join(' ');

    if (loading) {
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

    if (error || !obra) {
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
            <Navbar overlayOnTop={Boolean(obra.imagen)} />
            {obra.imagen && (
                <section className="obra-portada" aria-labelledby="obra-portada-titulo">
                    <motion.img
                        className="obra-portada-imagen"
                        src={obra.imagen}
                        alt={obra.imagen_ilustrativa ? 'Imagen ilustrativa de trabajos de pavimentación' : `Vista de ${obra.nombre}`}
                        loading="eager"
                        initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="obra-portada-sombra" aria-hidden="true" />
                    <div className="container obra-portada-contenido">
                        <div className="obra-portada-principal">
                            <motion.nav
                                className="obra-portada-kicker"
                                aria-label="Ruta de navegación"
                                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...reveal, delay: 0.12 }}
                            >
                                <a href="/obras" onClick={handleGoBack} aria-label="Volver a obras">Obras</a>
                                <span aria-hidden="true"> / </span>
                                <span>Petrotekno</span>
                            </motion.nav>
                            <h1 id="obra-portada-titulo" className="obra-portada-titulo">
                                <motion.span
                                    initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ...reveal, delay: 0.2 }}
                                >{titleFirst}</motion.span>
                                {titleSecond && <motion.span
                                    className="obra-portada-destacado"
                                    initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ...reveal, delay: 0.3 }}
                                >{titleSecond}</motion.span>}
                            </h1>
                            <motion.div
                                className="obra-portada-meta"
                                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...reveal, delay: 0.46 }}
                            >
                                {obra.categoria && <span><Folder size={17} /> {obra.categoria}</span>}
                                {obra.estado && <span><MapPin size={17} /> {ESTADOS_MEXICO[obra.estado] || obra.estado}</span>}
                            </motion.div>
                        </div>
                        <div className="obra-portada-pie">
                            <motion.a
                                href="#obra-contenido"
                                className="obra-portada-explorar"
                                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...reveal, delay: 0.62 }}
                            >Explorar la obra <ArrowDown size={17} /></motion.a>
                        </div>
                    </div>
                </section>
            )}
            <section id="obra-contenido" className={`obra-detalle-page ${obra.imagen ? 'obra-detalle-con-portada' : ''}`}>
                <div className="container">
                    <div className="obra-info">
                        {obra.imagen ? (
                            <motion.div
                                className="obra-contenido-encabezado"
                                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={reveal}
                            >
                                <span>El proyecto</span>
                                <h2>Sobre esta obra</h2>
                            </motion.div>
                        ) : (
                            <>
                                <div className="obra-detalle-header">
                                    <a href="/obras" onClick={handleGoBack} className="back-link">
                                        <ArrowLeft size={18} /> Volver a obras
                                    </a>
                                </div>
                                <div className="obra-meta">
                                    {obra.categoria && <span className="obra-categoria"><Folder size={16} />{obra.categoria}</span>}
                                    {obra.estado && <span className="obra-estado"><MapPin size={16} />{ESTADOS_MEXICO[obra.estado] || obra.estado}</span>}
                                </div>
                                <h1 className="obra-titulo">{obra.nombre}</h1>
                            </>
                        )}

                        {obra.contenido && (
                            <motion.div
                                className="obra-contenido"
                                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0 }}
                                transition={{ ...reveal, delay: 0.1 }}
                                dangerouslySetInnerHTML={{ __html: obra.contenido }}
                            />
                        )}
                    </div>

                    {/* Navegación Anterior/Siguiente */}
                    {obra.navegacion && (obra.navegacion.anterior || obra.navegacion.siguiente) && (
                        <motion.nav
                            className="obra-navegacion"
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={reveal}
                        >
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
                        </motion.nav>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ObraDetalle;
