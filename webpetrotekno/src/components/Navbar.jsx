import React, { useState, useEffect } from 'react';
import { Menu, X, HardHat } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo">
                    <HardHat size={32} color="var(--primary)" />
                    <span>CONSTRUCT<span className="text-primary">X</span></span>
                </div>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
                    <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>
                    <a href="#portfolio" onClick={() => setMenuOpen(false)}>Proyectos</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-nav">Contacto</a>
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
