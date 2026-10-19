import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './ContactForm.css';
import { postContacto } from '../services/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await postContacto(formData);

            setSubmitted(true);
            setFormData({
                nombre: '',
                email: '',
                asunto: '',
                mensaje: '',
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (err) {
            setError(err.message || 'Error al enviar el mensaje. Por favor intenta nuevamente.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-section">
            <h2>Envíanos tu mensaje</h2>
            <p className="form-description">Estaremos encantados de escucharte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>

            {submitted && (
                <div className="success-message">
                    <p>✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>✗ {error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre completo *</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="asunto">Asunto *</label>
                    <input
                        type="text"
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        placeholder="Asunto del mensaje"
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="mensaje">Mensaje *</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        placeholder="Cuéntanos cómo podemos ayudarte"
                        rows="6"
                    ></textarea>
                </div>

                <button type="submit" disabled={loading} className="btn btn-submit">
                    {loading ? (
                        <>
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Enviar mensaje
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
