import React from 'react';
import p1 from '../assets/img4.webp';
import p2 from '../assets/img6.webp';
import p3 from '../assets/img5.webp';
import p4 from '../assets/img1.webp';
import p5 from '../assets/img2.webp';
import p6 from '../assets/img3.webp';
import './Portfolio.css';

const projects = [
    { img: p1, title: 'Torre Corporativa Zenith', cat: 'Edificación Vertical' },
    { img: p2, title: 'Refinería del Norte', cat: 'Industrial / Energía' },
    { img: p3, title: 'Puente Bicentenario', cat: 'Infraestructura' },
    { img: p4, title: 'Planta Procesadora', cat: 'Industrial' },
    { img: p5, title: 'Complejo Deportivo Central', cat: 'Edificación Pública' },
    { img: p6, title: 'Carretera Interestatal', cat: 'Infraestructura Vial' },
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="portfolio section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Obras <span className="text-primary">Realizadas</span></h2>
                    <div className="section-line"></div>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="portfolio-item">
                            <img src={project.img} alt={project.title} />
                            <div className="portfolio-overlay">
                                <span className="portfolio-cat">{project.cat}</span>
                                <h3 className="portfolio-title">{project.title}</h3>
                                <a href="#" className="portfolio-btn">+</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
