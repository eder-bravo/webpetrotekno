import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import TechnicalCapacity from '../components/TechnicalCapacity';
import Process from '../components/Process';
import MexicoMap from '../components/MexicoMap';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useConfig } from '../hooks/useApi';

function Home() {
    const { data: config } = useConfig();
    useEffect(() => {
        document.title = config?.site_title || 'Petrotekno | Infraestructura y pavimentación';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = config?.site_description || 'Petrotekno: soluciones de infraestructura y pavimentación.';
    }, [config]);
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <TechnicalCapacity />
            <Stats />
            <Process />
            <MexicoMap />
            <Portfolio />
            <Footer />
        </>
    );
}

export default Home;
