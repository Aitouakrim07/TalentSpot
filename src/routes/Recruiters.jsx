import React from 'react';
import { Link } from 'react-router-dom';

const Recruiters = () => {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Espace Recruteurs</h1>
            <p className="text-center mb-20" style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.2rem' }}>
                Accédez à un vivier de talents qualifiés au Maroc et en France. Profils bilingues, experts techniques et cadres expérimentés.
            </p>

            <div className="grid grid-3 gap-20 mb-20">
                <div className="plan-card" style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    textAlign: 'center',
                    borderTop: '5px solid var(--secondary-color)'
                }}>
                    <h2 style={{ marginBottom: '10px' }}>Starter</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '20px' }}>99€ <span style={{ fontSize: '1rem', color: '#666' }}>/ mois</span></p>
                    <ul style={{ textAlign: 'left', marginBottom: '20px', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>✓ 5 offres d'emploi</li>
                        <li style={{ marginBottom: '10px' }}>✓ Visibilité standard</li>
                        <li style={{ marginBottom: '10px' }}>✓ Accès CVthèque limité</li>
                    </ul>
                    <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>Choisir</Link>
                </div>

                <div className="plan-card" style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    borderTop: '5px solid var(--primary-color)',
                    transform: 'scale(1.05)'
                }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', display: 'inline-block', padding: '5px 10px', borderRadius: '20px', marginBottom: '10px', fontSize: '0.8rem' }}>Populaire</div>
                    <h2 style={{ marginBottom: '10px' }}>Pro</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '20px' }}>299€ <span style={{ fontSize: '1rem', color: '#666' }}>/ mois</span></p>
                    <ul style={{ textAlign: 'left', marginBottom: '20px', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>✓ 20 offres d'emploi</li>
                        <li style={{ marginBottom: '10px' }}>✓ Visibilité prioritaire</li>
                        <li style={{ marginBottom: '10px' }}>✓ Accès CVthèque illimité</li>
                        <li style={{ marginBottom: '10px' }}>✓ Support dédié</li>
                    </ul>
                    <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>Choisir</Link>
                </div>

                <div className="plan-card" style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    textAlign: 'center',
                    borderTop: '5px solid var(--accent-color)'
                }}>
                    <h2 style={{ marginBottom: '10px' }}>Premium</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '20px' }}>Sur devis</p>
                    <ul style={{ textAlign: 'left', marginBottom: '20px', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>✓ Offres illimitées</li>
                        <li style={{ marginBottom: '10px' }}>✓ Marque employeur</li>
                        <li style={{ marginBottom: '10px' }}>✓ API d'intégration</li>
                        <li style={{ marginBottom: '10px' }}>✓ Chasse de tête</li>
                    </ul>
                    <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>Contacter</Link>
                </div>
            </div>

            <div className="text-center mt-20">
                <p style={{ marginBottom: '20px' }}>Vous avez des besoins spécifiques ?</p>
                <Link to="/contact" className="btn btn-secondary">Nous contacter pour publier une offre</Link>
            </div>
        </div>
    );
};

export default Recruiters;
