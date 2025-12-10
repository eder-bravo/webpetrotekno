import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h2>CONSTRUCT<span className="text-primary">X</span></h2>
                        <p>Ingeniería que transforma el paisaje.</p>
                    </div>

                    <div className="footer-contact">
                        <h3>Contacto</h3>
                        <p>Av. Reforma 222, CDMX</p>
                        <p>contacto@constructx.mx</p>
                        <p>+52 (55) 1234 5678</p>
                    </div>

                    <div className="footer-social">
                        <h3>Síguenos</h3>
                        <div className="social-icons">
                            <a href="#"><Facebook size={24} /></a>
                            <a href="#"><Linkedin size={24} /></a>
                            <a href="#"><Twitter size={24} /></a>
                            <a href="#"><Instagram size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ConstructX Ingeniería y Construcción. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
