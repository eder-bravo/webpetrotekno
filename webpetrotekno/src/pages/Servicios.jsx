import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useServicios } from '../hooks/useApi';
import { ServiceCard } from '../components/Services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import BackLink from '../components/BackLink';
import './Servicios.css';

export default function Servicios() {
    const { data: servicios, loading, error } = useServicios();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Servicios de pavimentación | Petrotekno';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = 'Conoce los servicios de construcción, rehabilitación y reciclado de pavimentos asfálticos de Petrotekno.';
        return () => { document.title = 'Petrotekno'; };
    }, []);

    return <>
        <Navbar />
        <main className="servicios-page">
            <div className="container">
                <header className="servicios-header">
                    <div className="servicios-header-top">
                        <BackLink to="/">Volver al inicio</BackLink>
                        {!loading && !error && <span className="catalog-count"><strong>{String(servicios?.length || 0).padStart(2, '0')}</strong> {servicios?.length === 1 ? 'servicio' : 'servicios'}</span>}
                    </div>
                    <SectionHeading as="h1" size="page" align="start" eyebrow="Lo que hacemos" description="Soluciones para construir, rehabilitar y conservar infraestructura vial.">
                        Todos nuestros <span className="section-heading__accent">Servicios</span>
                    </SectionHeading>
                </header>
                {loading && <p className="servicios-state">Cargando servicios...</p>}
                {error && <p className="servicios-state">No pudimos cargar los servicios. Inténtalo de nuevo más tarde.</p>}
                {!loading && !error && servicios?.length === 0 && <p className="servicios-state">Próximamente publicaremos nuestros servicios.</p>}
                {servicios?.length > 0 && <div className="services-grid">
                    {servicios.map((service, index) => <ServiceCard key={service.id} service={service} index={index} reduceMotion={reduceMotion} />)}
                </div>}
            </div>
        </main>
        <Footer />
    </>;
}
