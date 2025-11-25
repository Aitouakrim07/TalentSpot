import React from 'react';
import CandidateCvForm from '../components/CandidateCvForm';

const Candidates = () => {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Espace Candidats</h1>
                <p className="text-center mb-20" style={{ fontSize: '1.1rem' }}>
                    Boostez votre carrière au Maroc et en France. Déposez votre CV et accédez à des opportunités exclusives.
                </p>

                <section className="advice-section mb-20">
                    <h2 style={{ marginBottom: '15px', color: 'var(--secondary-color)' }}>Nos conseils pour réussir</h2>
                    <div className="grid grid-3 gap-20">
                        <div className="advice-card" style={{ background: '#e3f2fd', padding: '15px', borderRadius: 'var(--radius)' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>CV Impactant</h3>
                            <p style={{ fontSize: '0.9rem' }}>Mettez en avant vos compétences clés et vos réalisations chiffrées.</p>
                        </div>
                        <div className="advice-card" style={{ background: '#e3f2fd', padding: '15px', borderRadius: 'var(--radius)' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Lettre de Motivation</h3>
                            <p style={{ fontSize: '0.9rem' }}>Personnalisez votre lettre pour chaque entreprise.</p>
                        </div>
                        <div className="advice-card" style={{ background: '#e3f2fd', padding: '15px', borderRadius: 'var(--radius)' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Mobilité</h3>
                            <p style={{ fontSize: '0.9rem' }}>Préparez votre projet de mobilité internationale avec soin.</p>
                        </div>
                    </div>
                </section>

                <CandidateCvForm />
            </div>
        </div>
    );
};

export default Candidates;
