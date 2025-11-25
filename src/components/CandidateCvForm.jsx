import React, { useRef, useState } from 'react';

const CandidateCvForm = () => {
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
            setStatus({ type: 'error', message: 'Veuillez sélectionner un CV.' });
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
        data.append('cv', cvFile);

        try {
            const response = await fetch('/api/candidature', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: result.message || 'Candidature envoyée avec succès !' });
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
        <div className="cv-form-container" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
            <h2 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Déposez votre CV</h2>

            {status.message && (
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
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
                        <input type="text" name="domain" value={formData.domain} onChange={handleChange} required placeholder="Ex: Informatique, Marketing..." />
                    </div>
                </div>

                <div className="form-group">
                    <label>Lettre de motivation</label>
                    <textarea
                        name="coverLetter"
                        rows="4"
                        placeholder="Expliquez votre motivation en quelques lignes"
                        value={formData.coverLetter}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Votre CV (PDF, DOC, DOCX)</label>
                    <input
                        ref={fileInputRef}
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
            </form>
        </div>
    );
};

export default CandidateCvForm;
