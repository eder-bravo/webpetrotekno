import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero.png'; // Fallback
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            {/* Video Background */}
            <div className="hero-video-container">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={heroBg}
                    className="hero-video"
                >
                    {/* Switching to a reliable CDN source for construction/cityscape */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" type="video/mp4" />
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
                    <a href="#portfolio" className="btn">Ver Proyectos</a>
                    <a href="#contact" className="btn btn-outline">Contáctanos</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
