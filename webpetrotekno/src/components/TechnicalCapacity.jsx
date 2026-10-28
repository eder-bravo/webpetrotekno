import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Truck, Wrench, Car, Factory, UsersThree } from '@phosphor-icons/react';
import { useConfig } from '../hooks/useApi';
import SectionHeading from './SectionHeading';
import './TechnicalCapacity.css';

const TechnicalCapacity = () => {
    const { data: config } = useConfig();
    const reduceMotion = useReducedMotion();
    const metrics = [
        { key: 'maquinaria_mayor', label: 'Maquinaria mayor', Icon: Truck },
        { key: 'maquinaria_menor', label: 'Maquinaria menor', Icon: Wrench },
        { key: 'vehiculos', label: 'Vehículos', Icon: Car },
    ].filter(({ key }) => config?.[key] !== undefined && config[key] !== '');
    const resources = String(config?.capacidad_recursos || '')
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4);
    const resourceIcons = [Factory, Truck, UsersThree, Wrench];

    if (!config?.capacidad_descripcion && metrics.length === 0 && resources.length === 0) return null;

    return (
        <section className="technical-capacity section-padding">
            <div className="container">
                <div className="tech-layout">
                    {/* Left Column: Text */}
                    <motion.div
                        className="tech-text"
                        initial={reduceMotion ? false : { opacity: 0, x: -28 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <SectionHeading align="start" description={config.capacidad_descripcion}>
                            Capacidad <span className="section-heading__accent">Técnica</span>
                        </SectionHeading>
                    </motion.div>

                    {/* Right Column: Stats List */}
                    {metrics.length > 0 && <div className="tech-stats-list">
                        {metrics.map(({ key, label, Icon }, index) => <React.Fragment key={key}>
                            {index > 0 && <div className="tech-stat-divider" />}
                            <motion.div
                                className="tech-stat-row"
                                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="tech-icon-wrapper"><Icon size={60} weight="duotone" className="text-blue-light" /></div>
                                <div className="tech-stat-info">
                                    <span className="tech-stat-label">{label}</span>
                                    <span className="tech-stat-number">{config[key]}</span>
                                </div>
                            </motion.div>
                        </React.Fragment>)}
                    </div>}
                    {metrics.length === 0 && resources.length > 0 && <div className="tech-resources" aria-label="Recursos operativos">
                        <span className="tech-resources-label">Capacidad operativa</span>
                        {resources.map((resource, index) => {
                            const Icon = resourceIcons[index % resourceIcons.length];
                            return <motion.div
                                key={`${resource}-${index}`}
                                className="tech-resource"
                                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Icon size={30} weight="duotone" aria-hidden="true" />
                                <span>{resource}</span>
                            </motion.div>;
                        })}
                    </div>}
                </div>
            </div>
        </section>
    );
};

export default TechnicalCapacity;
