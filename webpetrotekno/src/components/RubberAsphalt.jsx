import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import SectionHeading from './SectionHeading';
import './RubberAsphalt.css';

function MaterialIllustration({ type }) {
    return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        {type === 'tire' && <>
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="23" />
            <circle cx="50" cy="50" r="30" strokeDasharray="5 5" />
            <path d="M44 27h12M44 73h12M27 44v12M73 44v12" />
        </>}
        {type === 'rubber' && <>
            <path d="m24 22 10-4 5 9-8 7-10-4Zm31-4 11 1 3 12-10 4-7-8Zm19 25 10 5-3 12-12 1-4-10ZM40 39l12-3 7 10-6 11-13-2-5-8ZM17 50l10-5 7 8-3 12-11 1-7-8ZM42 69l12-4 9 9-3 10-13 3-8-8ZM69 72l9-6 8 6-2 12-11 2Z" />
            <circle cx="47" cy="17" r="2" fill="currentColor" stroke="none" />
            <circle cx="15" cy="78" r="2" fill="currentColor" stroke="none" />
        </>}
        {type === 'asphalt' && <>
            <path d="m50 18 38 21-38 21L12 39Zm-38 37 38 21 38-21M12 71l38 21 38-21" />
            <path d="m39 33 4 2m10-7 4 2m7 10 4 2m-22 5 4 2m-21-8 4 2" strokeLinecap="round" />
        </>}
    </svg>;
}

const materials = [
    { type: 'tire', label: 'Neumáticos', detail: 'Llantas en desuso' },
    { type: 'rubber', label: 'Caucho reciclado', detail: 'Polvo o caucho' },
    { type: 'asphalt', label: 'Mezcla asfáltica', detail: 'Asfalto modificado' },
];

export default function RubberAsphalt({ config }) {
    const reduceMotion = useReducedMotion();
    const description = config?.ahulados_descripcion?.trim();
    if (!description) return null;

    return <section id="asfaltos-ahulados" className="rubber-asphalt section-padding" aria-labelledby="rubber-asphalt-title">
        <div className="container rubber-asphalt-layout">
            <motion.div
                className="rubber-asphalt-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
                <SectionHeading id="rubber-asphalt-title" align="start" eyebrow="Tecnología de materiales">
                    {config.ahulados_titulo || 'Asfaltos ahulados'}
                </SectionHeading>
                {config.ahulados_subtitulo && <p className="rubber-asphalt-subtitle">{config.ahulados_subtitulo}</p>}
                <p className="rubber-asphalt-description">{description}</p>
                <Button to="/contacto" variant="secondary" arrow className="rubber-asphalt-action">Consultar sobre asfaltos ahulados</Button>
            </motion.div>

            <motion.div
                className="rubber-asphalt-diagram"
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="rubber-asphalt-diagram-header">
                    <span>Del neumático a la mezcla</span>
                    <span aria-hidden="true">PETROTEKNO</span>
                </div>
                <ol className="rubber-asphalt-materials" aria-label="Origen y uso del caucho reciclado">
                    {materials.map(({ type, label, detail }, index) => <li className="rubber-asphalt-material" key={type}>
                        <div className="rubber-asphalt-icon"><MaterialIllustration type={type} /></div>
                        <div className="rubber-asphalt-material-copy">
                            <span className="rubber-asphalt-material-number" aria-hidden="true">0{index + 1}</span>
                            <h3>{label}</h3>
                            <p>{detail}</p>
                        </div>
                        {index < materials.length - 1 && <ArrowRight className="rubber-asphalt-arrow" size={18} aria-hidden="true" />}
                    </li>)}
                </ol>
                <p className="rubber-asphalt-diagram-caption">Caucho de llantas en desuso, incorporado a la mezcla asfáltica.</p>
            </motion.div>
        </div>
    </section>;
}
