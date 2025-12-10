import React from 'react';
import p1 from '../assets/project1.png';
import p2 from '../assets/project2.png';
import p3 from '../assets/hero.png'; // Reusing hero for variety
import './Portfolio.css';

const projects = [
    { img: p1, title: 'Torre Corporativa Zenith', cat: 'Edificación Vertical' },
    { img: p2, title: 'Refinería del Norte', cat: 'Industrial / Energía' },
    { img: p3, title: 'Puente Bicentenario', cat: 'Infraestructura' },
    // Duplicate for grid fullness if needed, or stick to 3
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
