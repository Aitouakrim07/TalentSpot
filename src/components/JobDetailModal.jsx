import React, { useRef, useState } from 'react';

const JobDetailModal = ({ job }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: 'Maroc',
        city: '',
        domain: '',
        coverLetter: ''
    });
    const [cvFile, setCvFile] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    if (!job) {
        return (
            <div style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', minHeight: '400px' }}>
                <p>Sélectionnez une offre pour voir les détails et postuler.</p>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cvFile) {
            setStatus({ type: 'error', message: 'Veuillez ajouter votre CV.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('country', formData.country);
        data.append('city', formData.city);
        data.append('domain', formData.domain);
        data.append('coverLetter', formData.coverLetter);
        data.append('jobId', job.id);
        data.append('jobTitle', job.title);
        data.append('cv', cvFile);

        try {
            const response = await fetch('/api/candidature', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: result.message || 'Candidature envoyée avec succès.' });
                setFormData({ name: '', email: '', country: 'Maroc', city: '', domain: '', coverLetter: '' });
                setCvFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
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
        <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', minHeight: '400px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>{job.title}</h2>
                <h3 style={{ color: '#555', marginBottom: '10px' }}>{job.company}</h3>
                <p style={{ marginBottom: '10px' }}>{job.city}, {job.country} · {job.contract}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="badge">Salaire : {job.salary}</span>
                    <span className="badge">Domaine : {job.domain}</span>
                </div>
                <p style={{ marginBottom: '16px' }}>{job.shortDescription}</p>
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '8px' }}>Description détaillée</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {job.keywords && job.keywords.map((kw) => (
                        <span key={kw} style={{ background: '#f5f5f5', color: '#666', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>
                            {kw}
                        </span>
                    ))}
                </div>
            </div>

            <hr style={{ margin: '20px 0' }} />

            <div>
                <h3 style={{ marginBottom: '10px' }}>Postuler maintenant</h3>
                {status.message && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '12px',
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
                    <div className="grid grid-3 gap-20">
                        <div className="form-group">
                            <label>Pays</label>
                            <select name="country" value={formData.country} onChange={handleChange}>
                                <option value="Maroc">Maroc</option>
                                <option value="France">France</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ville</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Domaine ciblé</label>
                            <input type="text" name="domain" value={formData.domain} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Lettre de motivation</label>
                        <textarea
                            name="coverLetter"
                            rows="4"
                            placeholder="Expliquez votre motivation pour ce poste"
                            value={formData.coverLetter}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Votre CV (PDF, DOC, DOCX)</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Envoi...' : 'Envoyer ma candidature'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobDetailModal;
