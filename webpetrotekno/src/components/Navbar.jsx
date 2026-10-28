import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoLink from './LogoLink';
import Button from './Button';
import logoFallback from '../assets/logo_blanco.png';
import { useConfig } from '../hooks/useApi';
import './Navbar.css';

const normalizeApiBaseUrl = (rawBaseUrl) => {
    if (!rawBaseUrl) return '';
    const trimmed = String(rawBaseUrl).trim().replace(/\/+$/, '');
    if (!trimmed) return '';
    return trimmed.replace(/\/api$/, '');
};

const Navbar = ({ overlayOnTop = false }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoSrc, setLogoSrc] = useState(logoFallback);
    const { data: config } = useConfig();
    const navigate = useNavigate();
    const location = useLocation();
    
    const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
    const currentMinute = Math.floor(Date.now() / 60000);
    const logoUrl = config?.logo_url || (apiBaseUrl ? `${apiBaseUrl}/images/logo.png?v=${currentMinute}` : `/images/logo.png?v=${currentMinute}`);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setLogoSrc(logoUrl);
        img.onerror = () => setLogoSrc(logoFallback);
        img.src = logoUrl;
    }, [logoUrl]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';
    const shouldHaveBackground = !(isHome || overlayOnTop) || scrolled;

    const handleNavigation = (path) => {
        setMenuOpen(false);
        const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
        if (path === '/') {
            // Si ya estamos en home, scroll al top
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: scrollBehavior });
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
                element?.scrollIntoView({ behavior: scrollBehavior });
            } else {
                // Home resuelve el ancla cuando el contenido del CMS está disponible.
                navigate(`/${path}`);
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

                <div id="main-navigation" className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <button onClick={() => handleNavigation('/')} className="nav-button">Inicio</button>
                    <button onClick={() => handleNavigation(isHome ? '#services' : '/servicios')} className="nav-button">Servicios</button>
                    {/* El proceso se conserva en el inicio y en el detalle del servicio de reciclado. */}
                    {/* {config?.proceso_pasos && <button onClick={() => handleNavigation('#proceso')} className="nav-button">Proceso</button>} */}
                    <button onClick={() => handleNavigation('#portfolio')} className="nav-button">Obras</button>
                    <Button onClick={() => handleNavigation('/contacto')} variant="inverse" size="compact">Contacto</Button>
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
