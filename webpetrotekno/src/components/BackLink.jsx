import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackLink.css';

export default function BackLink({ to, inverse = false, children, ...props }) {
    return <Link to={to} className={`navigation-back${inverse ? ' navigation-back--inverse' : ''}`} {...props}>
        <ArrowLeft size={18} aria-hidden="true" />{children}
    </Link>;
}
