import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useConfig } from '../hooks/useApi';
import SectionHeading from './SectionHeading';
import './Process.css';

const Process = () => {
    const { data: config } = useConfig();
    const reduceMotion = useReducedMotion();
    const steps = String(config?.proceso_pasos || '')
        .split(/\r?\n/)
        .map((step) => step.trim())
        .filter(Boolean)
        .slice(0, 8);

    useEffect(() => {
        if (steps.length && window.location.hash === '#proceso') {
            document.getElementById('proceso')?.scrollIntoView({ behavior: 'instant' });
        }
    }, [steps.length]);

    if (steps.length === 0) return null;

    return <section className="process section-padding" id="proceso">
        <div className="container">
            <div className="process-heading">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: .4 }}
                    transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionHeading align="start" inverse eyebrow="Del pavimento existente a una nueva carpeta">
                        {config?.proceso_titulo || 'Nuestro proceso'}
                    </SectionHeading>
                </motion.div>
                {config?.proceso_intro && <p>{config.proceso_intro}</p>}
            </div>
            <div className="process-grid">
                {steps.map((step, index) => <motion.div
                    className="process-step"
                    key={`${step}-${index}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: .2 }}
                    transition={{ duration: .6, delay: Math.min(index, 5) * .07, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="process-rule" />
                    <h3>{step}</h3>
                </motion.div>)}
            </div>
        </div>
    </section>;
};

export default Process;
