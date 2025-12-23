import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useConfig } from '../hooks/useApi';
import './ContactInfo.css';

const fallbackConfig = {
    contacto_direccion: 'Av. Reforma 222, CDMX',
    contacto_email: 'contacto@petrotekno.mx',
    contacto_telefono: '+52 (55) 1234 5678',
};

const ContactInfo = () => {
    const { data: config } = useConfig();
    const displayConfig = config || fallbackConfig;

    return (
        <div className="contact-info-section">
            <h2>Información de contacto</h2>

            <div className="info-cards">
                <a href={`tel:${displayConfig.contacto_telefono?.replace(/\s/g, '')}`} className="info-card">
                    <div className="icon-box">
                        <Phone size={32} />
                    </div>
                    <h3>Teléfono</h3>
                    <p>{displayConfig.contacto_telefono}</p>
                    <span className="contact-link">
                        Llamar ahora
                    </span>
                </a>

                <a href={`mailto:${displayConfig.contacto_email}`} className="info-card">
                    <div className="icon-box">
                        <Mail size={32} />
                    </div>
                    <h3>Email</h3>
                    <p>{displayConfig.contacto_email}</p>
                    <span className="contact-link">
                        Enviar email
                    </span>
                </a>

                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="info-card">
                    <div className="icon-box">
                        <MapPin size={32} />
                    </div>
                    <h3>Ubicación</h3>
                    <p>{displayConfig.contacto_direccion}</p>
                    <span className="contact-link">
                        Ver en mapa
                    </span>
                </a>

                <div className="info-card">
                    <div className="icon-box">
                        <Clock size={32} />
                    </div>
                    <h3>Horario de atención</h3>
                    <p>Lunes a Viernes<br />9:00 AM - 6:00 PM</p>
                    <p className="timezone">Hora de México</p>
                </div>
            </div>

            <div className="contact-message">
                <h3>¿Necesitas ayuda?</h3>
                <p>Contáctanos para consultas sobre nuestros servicios, proyectos o presupuestos. Nuestro equipo estará encantado de ayudarte.</p>
            </div>
        </div>
    );
};

export default ContactInfo;
