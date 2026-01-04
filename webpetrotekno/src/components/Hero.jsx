import React, { useState } from 'react';
import { motion } from 'framer-motion';
// heroBg import removed as it is no longer needed for poster
import './Hero.css';

import videoBg from '../assets/video_petro.mp4';

const normalizeApiBaseUrl = (rawBaseUrl) => {
    if (!rawBaseUrl) return '/api';
    const trimmed = String(rawBaseUrl).trim().replace(/\/+$/, '');
    if (!trimmed) return '/api';
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const Hero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
    const cvUrl = `${apiBaseUrl}/config/cv-empresa`;

    const handleCvClick = async (e) => {
        e.preventDefault();
        
        try {
            // Hacer petición HEAD para obtener el tipo de contenido
            const response = await fetch(cvUrl, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');
            
            // Tipos que se pueden previsualizar en el navegador
            const previewTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            const canPreview = previewTypes.some(type => contentType?.includes(type));
            
            if (canPreview) {
                // Abrir en nueva pestaña para previsualización
                window.open(cvUrl, '_blank', 'noopener,noreferrer');
            } else {
                // Descargar directamente
                const link = document.createElement('a');
                link.href = cvUrl;
                link.download = 'CV-Empresa-Petrotekno';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error al procesar el CV:', error);
            // En caso de error, abrir en nueva pestaña
            window.open(cvUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id="hero" className="hero">
            {/* Video Background */}
            <div className="hero-video-container" style={{ backgroundColor: 'black' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`hero-video ${videoLoaded ? 'video-loaded' : ''}`}
                    onLoadedData={() => setVideoLoaded(true)}
                    style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                >
                    {/* Switching to local asset */}
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="text-white">CONSTRUYENDO</span> <br />
                    <span className="text-primary">EL FUTURO</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a href="#" onClick={handleCvClick} className="btn">Descargar CV</a>
                    <a href="/contacto" className="btn btn-outline">Contáctanos</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
