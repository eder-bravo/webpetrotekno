import React from 'react';
import { Truck, HardHat, Cog } from 'lucide-react'; // Using approximate icons
import './TechnicalCapacity.css';

const TechnicalCapacity = () => {
    return (
        <section className="technical-capacity section-padding">
            <div className="container">
                <div className="tech-layout">
                    {/* Left Column: Text */}
                    <div className="tech-text">
                        <h2 className="tech-title">CAPACIDAD <span className="text-blue">TÉCNICA</span></h2>
                        <p className="tech-description">
                            Nuestra capacidad técnica y financiera, sumada al profesionalismo y seriedad con que emprendemos y ejecutamos cada proyecto, nos hace una empresa confiable y competitiva.
                        </p>

                        {/* Added styling for the "Operativa" part if needed, or keeping it simple based on image 1 */}
                        <div className="mt-large">
                            <h3 className="tech-subtitle">Capacidad operativa</h3>
                            <div className="tech-buttons">
                                <button className="btn-tech btn-blue">Empresas</button>
                                <button className="btn-tech btn-outline-blue">Certificaciones</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats List */}
                    <div className="tech-stats-list">
                        <div className="tech-stat-row">
                            <div className="tech-icon-wrapper">
                                {/* Placeholder SVG for heavy machinery */}
                                <Cog size={48} className="text-blue-light" />
                            </div>
                            <div className="tech-stat-info">
                                <span className="tech-stat-label">MAQUINARIA MAYOR</span>
                                <span className="tech-stat-number">365</span>
                            </div>
                        </div>

                        <div className="tech-stat-divider"></div>

                        <div className="tech-stat-row">
                            <div className="tech-icon-wrapper">
                                <Truck size={48} className="text-blue-light" />
                            </div>
                            <div className="tech-stat-info">
                                <span className="tech-stat-label">MAQUINARIA MENOR</span>
                                <span className="tech-stat-number">741</span>
                            </div>
                        </div>

                        <div className="tech-stat-divider"></div>

                        <div className="tech-stat-row">
                            <div className="tech-icon-wrapper">
                                <HardHat size={48} className="text-blue-light" />
                            </div>
                            <div className="tech-stat-info">
                                <span className="tech-stat-label">VEHÍCULOS</span>
                                <span className="tech-stat-number">618</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalCapacity;
