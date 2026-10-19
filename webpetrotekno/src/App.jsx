import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Obras from './pages/Obras';
import ObraDetalle from './pages/ObraDetalle';
import Contacto from './pages/Contacto';
import ServicioDetalle from './pages/ServicioDetalle';
import Servicios from './pages/Servicios';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/obras/:slug" element={<ObraDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:slug" element={<ServicioDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
