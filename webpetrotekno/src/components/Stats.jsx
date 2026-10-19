import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Recycle, Layers3, FlaskConical } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useConfig } from '../hooks/useApi';
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
    const { data: config } = useConfig();
    const reduceMotion = useReducedMotion();
    const statsData = [
        { key: 'impacto_clientes', label: 'Clientes satisfechos', color: '#004488' },
        { key: 'impacto_laboral', label: 'Fuerza laboral', color: '#007BFF' },
        { key: 'impacto_sustentabilidad', label: 'Sustentabilidad', color: '#28a745' },
    ].filter(({ key }) => config?.[`${key}_valor`] !== undefined && config[`${key}_valor`] !== '')
        .map(({ key, label, color }) => ({
            percentage: Number(config[`${key}_valor`]),
            label,
            sublabel: config[`${key}_texto`] || '',
            color,
        }));

    const benefits = String(config?.beneficios || '')
        .split(/\r?\n/)
        .map((line) => {
            const [title, ...description] = line.split('|');
            return { title: title?.trim(), description: description.join('|').trim() };
        })
        .filter(({ title }) => title)
        .slice(0, 6);

    if (statsData.length === 0 && benefits.length === 0) return null;

    if (statsData.length === 0) {
        const icons = [Recycle, Layers3, FlaskConical];
        return <section id="stats" className="stats benefits section-padding">
            <div className="container">
                <div className="section-header">
                    <span className="benefits-eyebrow">Nuestra especialidad</span>
                    <h2 className="section-title">{config?.beneficios_titulo || 'Valor del reciclado'}</h2>
                    <div className="section-line" />
                    {config?.beneficios_intro && <p className="section-subtitle">{config.beneficios_intro}</p>}
                </div>
                <div className="benefits-grid">
                    {benefits.map(({ title, description }, index) => {
                        const Icon = icons[index % icons.length];
                        return <motion.article
                            className="benefit-card"
                            key={`${title}-${index}`}
                            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.68, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="benefit-card-top">
                                <Icon size={31} strokeWidth={1.5} aria-hidden="true" />
                                <span>{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <h3>{title}</h3>
                            {description && <p>{description}</p>}
                        </motion.article>;
                    })}
                </div>
            </div>
        </section>;
    }

    return (
        <section id="stats" className="stats section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Nuestro <span className="text-blue">Impacto</span></h2>
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
