import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

import videoBg from '../assets/video_petro.mp4';
import videoPoster from '../assets/video_poster.jpg';
import { useConfig } from '../hooks/useApi';

const normalizeApiBaseUrl = (rawBaseUrl) => {
    if (!rawBaseUrl) return '/api';
    const trimmed = String(rawBaseUrl).trim().replace(/\/+$/, '');
    if (!trimmed) return '/api';
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const Hero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const reduceMotion = useReducedMotion();
    const { data: config } = useConfig();
    const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
    const cvUrl = `${apiBaseUrl}/config/cv-empresa`;
    const portfolioUrl = config?.portafolio_url || '/obras';
    const isExternalPortfolio = /^https?:\/\//i.test(portfolioUrl);

    return (
        <section id="hero" className="hero">
            {/* Video Background */}
            <div className="hero-video-container" style={{ backgroundColor: 'black' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={videoPoster}
                    className={`hero-video ${videoLoaded ? 'video-loaded' : ''}`}
                    onLoadedData={() => setVideoLoaded(true)}
                    style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
                >
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <motion.h1
                    className="hero-title"
                    initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-white">{config?.hero_titulo || 'CONSTRUYENDO'}</span> <br />
                    <span className="text-primary">{config?.hero_destacado || 'EL FUTURO'}</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                    {config?.hero_subtitulo || 'Infraestructura de clase mundial, ingeniería de precisión y compromiso sólido.'}
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                >
                    {config?.cv_disponible && <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        Descargar CV
                    </a>}
                    {!config?.cv_disponible && <a
                        href={portfolioUrl}
                        target={isExternalPortfolio ? '_blank' : undefined}
                        rel={isExternalPortfolio ? 'noopener noreferrer' : undefined}
                        className="btn"
                    >
                        Ver portafolio
                    </a>}
                    <a href="/contacto" className="btn btn-outline">Contáctanos</a>
                </motion.div>
            </div>

            <motion.div
                className="hero-scroll-cue"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25, duration: 0.7 }}
            >
                <span>Explora Petrotekno</span>
                <span className="hero-scroll-track"><span /></span>
            </motion.div>
        </section>
    );
};

export default Hero;
