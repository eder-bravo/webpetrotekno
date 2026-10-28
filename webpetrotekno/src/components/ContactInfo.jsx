import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useConfig } from '../hooks/useApi';
import './ContactInfo.css';
import SectionHeading from './SectionHeading';

const fallbackConfig = {
    contacto_direccion: '',
    contacto_email: '',
    contacto_telefono: '',
    contacto_horario: '',
};

const ContactInfo = () => {
    const { data: config } = useConfig();
    const displayConfig = config || fallbackConfig;

    return (
        <div className="contact-info-section">
            <SectionHeading align="start" size="content">Información de contacto</SectionHeading>

            <div className="info-cards">
                {displayConfig.contacto_telefono && <a href={`tel:${displayConfig.contacto_telefono.replace(/\s/g, '')}`} className="info-card">
                    <div className="icon-box">
                        <Phone size={32} />
                    </div>
                    <h3>Teléfono</h3>
                    <p>{displayConfig.contacto_telefono}</p>
                    <span className="contact-link">
                        Llamar ahora
                    </span>
                </a>}

                {displayConfig.contacto_email && <a href={`mailto:${displayConfig.contacto_email}`} className="info-card">
                    <div className="icon-box">
                        <Mail size={32} />
                    </div>
                    <h3>Email</h3>
                    <p>{displayConfig.contacto_email}</p>
                    <span className="contact-link">
                        Enviar email
                    </span>
                </a>}

                {displayConfig.contacto_direccion && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayConfig.contacto_direccion)}`} target="_blank" rel="noopener noreferrer" className="info-card">
                    <div className="icon-box">
                        <MapPin size={32} />
                    </div>
                    <h3>Ubicación</h3>
                    <p>{displayConfig.contacto_direccion}</p>
                    <span className="contact-link">
                        Ver en mapa
                    </span>
                </a>}

                {displayConfig.contacto_horario && <div className="info-card">
                    <div className="icon-box">
                        <Clock size={32} />
                    </div>
                    <h3>Horario de atención</h3>
                    <p>{displayConfig.contacto_horario}</p>
                </div>}
            </div>

            <div className="contact-message">
                <h3>¿Necesitas ayuda?</h3>
                <p>Contáctanos para consultas sobre nuestros servicios, proyectos o presupuestos. Nuestro equipo estará encantado de ayudarte.</p>
            </div>
        </div>
    );
};

export default ContactInfo;
