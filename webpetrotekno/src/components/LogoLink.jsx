import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente reutilizable para el logo que navega al inicio con scroll to top.
 * Funciona correctamente tanto si ya está en "/" como si viene de otra página.
 */
const LogoLink = ({ children, className = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        e.preventDefault();
        
        if (location.pathname === '/') {
            // Si ya estamos en la página principal, solo hacer scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Si estamos en otra página, navegar a "/" y luego scroll to top
            navigate('/');
            // Usar setTimeout para asegurar que la navegación se complete antes del scroll
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 0);
        }
    };

    return (
        <a href="/" onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export default LogoLink;
