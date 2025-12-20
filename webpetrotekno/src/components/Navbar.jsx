import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useConfig } from '../hooks/useApi';
import LogoLink from './LogoLink';
import logo from '../assets/logo_blanco.png';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: config } = useConfig();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoSrc = config?.logo || logo;

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <LogoLink className="logo">
                    <img src={logoSrc} alt="Petrotekno Logo" className="logo-img" />
                </LogoLink>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
                    <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>
                    <a href="#portfolio" onClick={() => setMenuOpen(false)}>Obras</a>
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
