import React, { useState } from 'react';
import { motion } from 'framer-motion';
// heroBg import removed as it is no longer needed for poster
import './Hero.css';

import videoBg from '../assets/video_petro.mp4';

const Hero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

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
                    <a href="/api/config/cv-empresa" target="_blank" rel="noopener noreferrer" className="btn">Descargar CV</a>
                    <a href="/contacto" className="btn btn-outline">Contáctanos</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
