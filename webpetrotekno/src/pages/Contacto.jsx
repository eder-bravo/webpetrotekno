import React from 'react';
import Navbar from '../components/Navbar';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import Footer from '../components/Footer';
import './Contacto.css';

function Contacto() {
    return (
        <>
            <Navbar />
            <div className="contacto-page">
                <ContactHero />
                <div className="container contacto-content">
                    <div className="contacto-grid">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contacto;
