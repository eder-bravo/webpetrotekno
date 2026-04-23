import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Globe, Link2, MessageCircle, Send } from 'lucide-react';
import { useConfig, useRedes } from '../hooks/useApi';
import LogoLink from './LogoLink';
import logoFallback from '../assets/logo_blanco.png';
import './Footer.css';

const normalizeApiBaseUrl = (rawBaseUrl) => {
    if (!rawBaseUrl) return '';
    const trimmed = String(rawBaseUrl).trim().replace(/\/+$/, '');
    if (!trimmed) return '';
    return trimmed.replace(/\/api$/, '');
};

// Mapeo de nombres de iconos a componentes
const socialIconMap = {
    Facebook: Facebook,
    Twitter: Twitter,
    Linkedin: Linkedin,
    Instagram: Instagram,
    Youtube: Youtube,
    Globe: Globe,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Globe,
    whatsapp: MessageCircle,
    telegram: Send,
    otro: Link2,
};

// Datos de fallback
const fallbackConfig = {
    contacto_direccion: 'Av. Reforma 222, CDMX',
    contacto_email: 'contacto@petrotekno.mx',
    contacto_telefono: '+52 (55) 1234 5678',
    slogan: 'Ingeniería que transforma el paisaje.',
};

const fallbackRedes = [
    { id: 1, nombre: 'Facebook', icono: 'Facebook', url: '#' },
    { id: 2, nombre: 'LinkedIn', icono: 'Linkedin', url: '#' },
    { id: 3, nombre: 'Twitter', icono: 'Twitter', url: '#' },
    { id: 4, nombre: 'Instagram', icono: 'Instagram', url: '#' },
];

const Footer = () => {
    const { data: config } = useConfig();
    const { data: redes } = useRedes();
    const [logoSrc, setLogoSrc] = useState(logoFallback);

    const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
    const currentMinute = Math.floor(Date.now() / 60000);
    const logoUrl = apiBaseUrl ? `${apiBaseUrl}/images/logo.png?v=${currentMinute}` : `/images/logo.png?v=${currentMinute}`;

    useEffect(() => {
        const img = new Image();
        img.onload = () => setLogoSrc(logoUrl);
        img.onerror = () => setLogoSrc(logoFallback);
        img.src = logoUrl;
    }, [logoUrl]);

    const displayConfig = config || fallbackConfig;
    const displayRedes = redes && redes.length > 0 ? redes : fallbackRedes;

    const getSocialIcon = (iconName) => {
        const IconComponent = socialIconMap[iconName] || Globe;
        return <IconComponent size={24} />;
    };

    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <LogoLink>
                            <img src={logoSrc} alt="Petrotekno Logo" className="footer-logo-img" />
                        </LogoLink>
                        <p>{displayConfig.slogan}</p>
                    </div>

                    <div className="footer-contact">
                        <h3>Contacto</h3>
                        <p>{displayConfig.contacto_direccion}</p>
                        <p><a href={`mailto:${displayConfig.contacto_email}`}>{displayConfig.contacto_email}</a></p>
                        <p><a href={`tel:${displayConfig.contacto_telefono?.replace(/\s/g, '')}`}>{displayConfig.contacto_telefono}</a></p>
                    </div>

                    <div className="footer-social" style={{ textAlign: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}>Síguenos</h3>
                        <div className="social-icons" style={{ justifyContent: 'center' }}>
                            {displayRedes.map((red) => (
                                <a key={red.id} href={red.url} target="_blank" rel="noopener noreferrer" title={red.nombre}>
                                    {getSocialIcon(red.icono)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {displayConfig.site_title || 'Petrotekno Ingeniería y Construcción'}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
