import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useServicio } from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ServicioDetalle.css';

const reveal = { duration: .75, ease: [0.22, 1, 0.36, 1] };

function splitTitle(title = '') {
    const words = title.trim().split(/\s+/).filter(Boolean);
    const middle = Math.ceil(words.length / 2);
    return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')];
}

export default function ServicioDetalle() {
    const { slug } = useParams();
    const { data: servicio, loading, error } = useServicio(slug);
    const reduceMotion = useReducedMotion();

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);
    useEffect(() => {
        if (!servicio) return;
        document.title = servicio.meta_title || `${servicio.titulo} | Petrotekno`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = servicio.meta_description || servicio.descripcion_corta || '';
        return () => { document.title = 'Petrotekno'; };
    }, [servicio]);

    const [titleFirst, titleSecond] = splitTitle(servicio?.titulo);

    return <>
        <Navbar overlayOnTop={Boolean(servicio)} />
        <main className="servicio-detalle-page">
            {loading || error || !servicio ? <section className="servicio-detalle-state">
                <div className="container">
                    <p>{loading ? 'Cargando servicio...' : 'Servicio no encontrado'}</p>
                    {!loading && <Link to="/servicios" className="servicio-detalle-back"><ArrowLeft size={18} /> Volver a servicios</Link>}
                </div>
            </section> : <>
                <section className={`servicio-portada ${servicio.imagen ? 'servicio-portada-con-imagen' : ''}`} aria-labelledby="servicio-portada-titulo">
                    {servicio.imagen && <motion.img className="servicio-portada-imagen" src={servicio.imagen} alt={servicio.titulo} loading="eager"
                        initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease: reveal.ease }} />}
                    <div className="servicio-portada-sombra" aria-hidden="true" />
                    <div className="container servicio-portada-contenido">
                        <div className="servicio-portada-principal">
                            <motion.nav className="servicio-portada-kicker" aria-label="Ruta de navegación"
                                initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...reveal, delay: .1 }}>
                                <Link to="/servicios">Servicios</Link><span aria-hidden="true"> / </span><span>Petrotekno</span>
                            </motion.nav>
                            <h1 id="servicio-portada-titulo" className="servicio-portada-titulo">
                                <motion.span initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...reveal, delay: .2 }}>{titleFirst}</motion.span>
                                {titleSecond && <motion.span className="servicio-portada-destacado" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...reveal, delay: .3 }}>{titleSecond}</motion.span>}
                            </h1>
                            {servicio.descripcion_corta && <motion.p className="servicio-portada-resumen"
                                initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...reveal, delay: .42 }}>
                                {servicio.descripcion_corta}
                            </motion.p>}
                        </div>
                        <motion.a href="#servicio-contenido" className="servicio-portada-explorar"
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...reveal, delay: .55 }}>
                            Explorar el servicio <ArrowDown size={17} aria-hidden="true" />
                        </motion.a>
                    </div>
                </section>
                <section id="servicio-contenido" className="servicio-detalle-content-section">
                    <div className="container servicio-detalle-content-grid">
                        <motion.div className="servicio-detalle-content-heading" initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={reveal}>
                            <span className="servicio-detalle-section-label">Lo que hacemos</span>
                            <h2>El servicio</h2>
                        </motion.div>
                        <div className="servicio-detalle-rich-text">
                            {servicio.contenido ? <div dangerouslySetInnerHTML={{ __html: servicio.contenido }} /> : <p>{servicio.descripcion_corta}</p>}
                        </div>
                    </div>
                </section>
                <section className="servicio-detalle-contact">
                    <div className="container servicio-detalle-contact-inner">
                        <div><span className="servicio-detalle-section-label">Hablemos de tu proyecto</span><h2>¿Necesitas más información?</h2></div>
                        <Link to="/contacto" className="servicio-detalle-contact-link">Contáctanos <ArrowUpRight size={20} aria-hidden="true" /></Link>
                    </div>
                </section>
            </>}
        </main>
        <Footer />
    </>;
}
