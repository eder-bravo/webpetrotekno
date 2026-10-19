import React from 'react';
import './ContactHero.css';

const ContactHero = () => {
    return (
        <section className="contact-hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <span className="contact-hero-eyebrow">Hablemos de tu proyecto</span>
                <h1>Contáctanos</h1>
                <p>Cuéntanos qué necesita tu proyecto. Estamos listos para escuchar tus ideas y encontrar la mejor solución.</p>
            </div>
        </section>
    );
};

export default ContactHero;
