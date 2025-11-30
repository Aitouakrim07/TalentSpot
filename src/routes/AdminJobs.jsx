import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialNewJob = {
    title: '',
    company: '',
    country: 'Maroc',
    city: '',
    contract: 'CDI',
    domain: '',
    salary: '',
    shortDescription: '',
    description: '',
    keywords: ''
};

const AdminJobs = () => {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();
    const [newJob, setNewJob] = useState(initialNewJob);
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleNewJobChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddJob = async (e) => {
        e.preventDefault();
        const keywordsArray = newJob.keywords.split(',').map((k) => k.trim()).filter(Boolean);
        
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...newJob, keywords: keywordsArray })
            });

            if (!res.ok) throw new Error('Failed to add job');
            
            setStatus({ type: 'success', msg: 'Offre ajoutée avec succès !' });
            setNewJob(initialNewJob);
        } catch (error) {
            setStatus({ type: 'error', msg: 'Erreur lors de l\'ajout de l\'offre.' });
        }
    };

    if (!user) return null;

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Administration - Ajouter une offre</h2>
                <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>Déconnexion</button>
            </div>

            {status.msg && (
                <div style={{ 
                    padding: '10px', 
                    marginBottom: '20px', 
                    backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: status.type === 'success' ? '#155724' : '#721c24' 
                }}>
                    {status.msg}
                </div>
            )}

            <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <form onSubmit={handleAddJob} className="grid grid-2 gap-20">
                    <div className="form-group">
                        <label>Titre</label>
                        <input name="title" value={newJob.title} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group">
                        <label>Entreprise</label>
                        <input name="company" value={newJob.company} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group">
                        <label>Pays</label>
                        <select name="country" value={newJob.country} onChange={handleNewJobChange}>
                            <option value="Maroc">Maroc</option>
                            <option value="France">France</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ville</label>
                        <input name="city" value={newJob.city} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contrat</label>
                        <select name="contract" value={newJob.contract} onChange={handleNewJobChange}>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Stage">Stage</option>
                            <option value="Alternance">Alternance</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Domaine</label>
                        <input name="domain" value={newJob.domain} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group">
                        <label>Salaire</label>
                        <input name="salary" value={newJob.salary} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mots-clés (ex: React, Vente)</label>
                        <input name="keywords" value={newJob.keywords} onChange={handleNewJobChange} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Résumé court</label>
                        <input name="shortDescription" value={newJob.shortDescription} onChange={handleNewJobChange} required />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Description détaillée</label>
                        <textarea name="description" rows="5" value={newJob.description} onChange={handleNewJobChange} required></textarea>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <button className="btn btn-secondary" type="submit" style={{ width: '100%' }}>Publier l'offre</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminJobs;

