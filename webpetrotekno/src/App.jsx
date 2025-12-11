import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import TechnicalCapacity from './components/TechnicalCapacity';
import MexicoMap from './components/MexicoMap';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <TechnicalCapacity />
      <Stats />
      <MexicoMap />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
