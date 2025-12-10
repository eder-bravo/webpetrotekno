import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './Stats.css';

const StatCircle = ({ percentage, label, sublabel, color = "var(--primary)" }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = inView ? circumference - (percentage / 100) * circumference : circumference;

    return (
        <div className="stat-item" ref={ref}>
            <div className="circle-chart">
                <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle
                        className="progress-ring__circle-bg"
                        cx="60" cy="60" r={radius}
                    />
                    <circle
                        className="progress-ring__circle"
                        stroke={color}
                        strokeDasharray={`${circumference} ${circumference}`}
                        style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s ease-in-out" }}
                        cx="60" cy="60" r={radius}
                    />
                </svg>
                <div className="stat-number">
                    {inView ? <CountUp end={percentage} duration={2} /> : 0}%
                </div>
            </div>
            <div className="stat-info">
                <h3>{label}</h3>
                <p>{sublabel}</p>
            </div>
        </div>
    );
};

const Stats = () => {
    // Data inspired by generic corporate stats or the user's reference
    const statsData = [
        { percentage: 98, label: "Clientes Satisfechos", sublabel: "Proyectos entregados a tiempo", color: "#FFD700" },
        { percentage: 45, label: "Fuerza Laboral", sublabel: "Mujeres en el sector construcción", color: "#007BFF" },
        { percentage: 85, label: "Sustentabilidad", sublabel: "Materiales reciclados en obras", color: "#28a745" }
    ];

    return (
        <section id="stats" className="stats section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Nuestro <span className="text-primary">Impacto</span></h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Datos que respaldan nuestro compromiso con la excelencia y la sociedad.</p>
                </div>

                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <StatCircle key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
