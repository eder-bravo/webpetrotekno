import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useConfig } from '../hooks/useApi';
import LogoLink from './LogoLink';
import logo from '../assets/logo_blanco.png';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: config } = useConfig();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Si no estamos en la home, el navbar siempre debe tener fondo
    const isHome = location.pathname === '/';
    const shouldHaveBackground = !isHome || scrolled;

    const logoSrc = config?.logo || logo;

    const handleNavigation = (path) => {
        setMenuOpen(false);
        if (path === '/') {
            // Si ya estamos en home, scroll al top
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Si no, navegar a home y scroll al top
                navigate('/');
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }, 150);
            }
        } else if (path.startsWith('#')) {
            if (location.pathname === '/') {
                // Scroll to section if on home page
                const element = document.querySelector(path);
                element?.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate to home and then scroll to section
                navigate('/');
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    setTimeout(() => {
                        const element = document.querySelector(path);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                }, 150);
            }
        } else {
            navigate(path);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 0);
        }
    };

    return (
        <nav className={`navbar ${shouldHaveBackground ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <LogoLink className="logo">
                    <img src={logoSrc} alt="Petrotekno Logo" className="logo-img" />
                </LogoLink>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <button onClick={() => handleNavigation('/')} className="nav-button">Inicio</button>
                    <button onClick={() => handleNavigation('#services')} className="nav-button">Servicios</button>
                    <button onClick={() => handleNavigation('#portfolio')} className="nav-button">Obras</button>
                    <button onClick={() => handleNavigation('/contacto')} className="nav-button btn btn-nav">Contacto</button>
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
