import { Facebook, Twitter, Linkedin, Instagram, Youtube, Globe, Link2, MessageCircle, Send, Music2 } from 'lucide-react';
import { useConfig, useRedes } from '../hooks/useApi';
import LogoLink from './LogoLink';
import './Footer.css';

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
    tiktok: Music2,
    whatsapp: MessageCircle,
    telegram: Send,
    otro: Link2,
};

// Datos de fallback
const fallbackConfig = {
    contacto_direccion: '',
    contacto_email: '',
    contacto_telefono: '',
    slogan: '',
};

const Footer = () => {
    const { data: config } = useConfig();
    const { data: redes } = useRedes();

    const displayConfig = config || fallbackConfig;
    const displayRedes = redes || [];

    const getSocialIcon = (iconName) => {
        const IconComponent = socialIconMap[iconName] || Globe;
        return <IconComponent size={24} />;
    };

    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <LogoLink className="footer-wordmark">PETROTEKNO S.A. de C.V.</LogoLink>
                        <p>{displayConfig.slogan}</p>
                    </div>

                    <div className="footer-contact">
                        <h3>Contacto</h3>
                        {displayConfig.contacto_direccion && <p>{displayConfig.contacto_direccion}</p>}
                        {displayConfig.contacto_email && <p><a href={`mailto:${displayConfig.contacto_email}`}>{displayConfig.contacto_email}</a></p>}
                        {displayConfig.contacto_telefono && <p><a href={`tel:${displayConfig.contacto_telefono.replace(/\s/g, '')}`}>{displayConfig.contacto_telefono}</a></p>}
                    </div>

                    {displayRedes.length > 0 && <div className="footer-social">
                        <h3>Síguenos</h3>
                        <div className="social-icons">
                            {displayRedes.map((red) => (
                                <a key={red.id} href={red.url} target="_blank" rel="noopener noreferrer" title={red.nombre}>
                                    {getSocialIcon(red.icono)}
                                </a>
                            ))}
                        </div>
                    </div>}
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} PETROTEKNO S.A. de C.V. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
