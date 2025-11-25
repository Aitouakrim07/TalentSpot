import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'Candidat',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: result.message || 'Message envoyé.' });
                setFormData({ name: '', email: '', type: 'Candidat', message: '' });
            } else {
                setStatus({ type: 'error', message: result.message || 'Une erreur est survenue.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erreur de connexion au serveur.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Contactez-nous</h1>

                {status.message && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: 'var(--radius)',
                        background: status.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: status.type === 'success' ? '#155724' : '#721c24'
                    }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom complet</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Vous êtes</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="Candidat">Candidat</option>
                            <option value="Recruteur">Recruteur</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Envoi...' : 'Envoyer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
