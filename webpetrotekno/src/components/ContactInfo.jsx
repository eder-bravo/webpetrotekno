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
                <div className="info-card">
                    <div className="icon-box">
                        <Phone size={32} />
                    </div>
                    <h3>Teléfono</h3>
                    <p>{displayConfig.contacto_telefono}</p>
                    <a href={`tel:${displayConfig.contacto_telefono?.replace(/\s/g, '')}`} className="contact-link">
                        Llamar ahora
                    </a>
                </div>

                <div className="info-card">
                    <div className="icon-box">
                        <Mail size={32} />
                    </div>
                    <h3>Email</h3>
                    <p>{displayConfig.contacto_email}</p>
                    <a href={`mailto:${displayConfig.contacto_email}`} className="contact-link">
                        Enviar email
                    </a>
                </div>

                <div className="info-card">
                    <div className="icon-box">
                        <MapPin size={32} />
                    </div>
                    <h3>Ubicación</h3>
                    <p>{displayConfig.contacto_direccion}</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                        Ver en mapa
                    </a>
                </div>

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
