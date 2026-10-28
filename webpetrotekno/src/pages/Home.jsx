import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
// import Stats from '../components/Stats';
import RubberAsphalt from '../components/RubberAsphalt';
import TechnicalCapacity from '../components/TechnicalCapacity';
import Process from '../components/Process';
import MexicoMap from '../components/MexicoMap';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useConfig } from '../hooks/useApi';
import './Home.css';

function Home() {
    const { data: config } = useConfig();
    const { hash } = useLocation();
    useEffect(() => {
        document.title = config?.site_title || 'Petrotekno | Infraestructura y pavimentación';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = config?.site_description || 'Petrotekno: soluciones de infraestructura y pavimentación.';
    }, [config]);
    useEffect(() => {
        if (!config || !hash) return;
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    }, [config, hash]);
    return (
        <>
            <Navbar />
            <main className="home-page">
                <Hero />
                <Services />
                <RubberAsphalt config={config} />
                <TechnicalCapacity />
                {/* Beneficios reservados: descomentar el import y esta llamada para restaurarlos. */}
                {/* <Stats /> */}
                <Process />
                <MexicoMap heading="Obras por estado" />
                <Portfolio />
            </main>
            <Footer />
        </>
    );
}

export default Home;
