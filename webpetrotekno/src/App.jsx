import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Obras from './pages/Obras';
import ObraDetalle from './pages/ObraDetalle';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/obras/:slug" element={<ObraDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
