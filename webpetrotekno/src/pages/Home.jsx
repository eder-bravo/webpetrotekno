import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import TechnicalCapacity from '../components/TechnicalCapacity';
import MexicoMap from '../components/MexicoMap';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <TechnicalCapacity />
            <Stats />
            <MexicoMap />
            <Portfolio />
            <Footer />
        </>
    );
}

export default Home;
