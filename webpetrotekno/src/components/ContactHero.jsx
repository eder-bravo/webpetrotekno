import React from 'react';
import './ContactHero.css';
import SectionHeading from './SectionHeading';

const ContactHero = () => {
    return (
        <section className="contact-hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <SectionHeading as="h1" size="page" align="start" inverse eyebrow="Hablemos de tu proyecto" description="Cuéntanos qué necesita tu proyecto. Estamos listos para escuchar tus ideas y encontrar la mejor solución.">Contáctanos</SectionHeading>
            </div>
        </section>
    );
};

export default ContactHero;
