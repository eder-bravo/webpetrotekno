import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useServicios } from '../hooks/useApi';
import { ServiceCard } from '../components/Services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
                        <Link to="/" className="servicios-back"><ArrowLeft size={17} aria-hidden="true" /> Volver al inicio</Link>
                        {!loading && !error && <span className="servicios-count">{String(servicios?.length || 0).padStart(2, '0')} servicios</span>}
                    </div>
                    <span className="services-eyebrow">Lo que hacemos</span>
                    <h1>Todos Nuestros <span>Servicios</span></h1>
                    <p>Soluciones para construir, rehabilitar y conservar infraestructura vial.</p>
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
