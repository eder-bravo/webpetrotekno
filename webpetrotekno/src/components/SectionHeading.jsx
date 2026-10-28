import './SectionHeading.css';

export default function SectionHeading({ as: Tag = 'h2', eyebrow, children, description, align = 'center', size = 'section', inverse = false, className = '', id }) {
    return <div className={`section-heading section-heading--${align} section-heading--${size}${inverse ? ' section-heading--inverse' : ''} ${className}`.trim()}>
        {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
        <Tag id={id} className="section-heading__title">{children}</Tag>
        {description && <p className="section-heading__description">{description}</p>}
    </div>;
}
