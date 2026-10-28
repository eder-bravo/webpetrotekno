import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Button.css';

/** Shared action styles for route links, downloads and form buttons. */
export default function Button({ to, href, variant = 'primary', size = 'regular', arrow = false, className = '', children, type = 'button', ...props }) {
    const classes = `action-button action-button--${variant} action-button--${size} ${className}`.trim();
    const content = <><span className="action-button__label">{children}</span>{arrow && <ArrowRight className="action-button__arrow" size={20} aria-hidden="true" />}</>;

    if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
    if (href) return <a href={href} className={classes} {...props}>{content}</a>;
    return <button type={type} className={classes} {...props}>{content}</button>;
}
