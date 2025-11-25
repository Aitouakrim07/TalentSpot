import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <header className="hero-section" style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Trouvez votre emploi idéal au Maroc et en France</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                        La plateforme de référence pour les talents et les recruteurs transfrontaliers.
                    </p>
                    <div>
                        <Link to="/jobs" className="btn btn-secondary" style={{ marginRight: '15px', padding: '15px 30px', fontSize: '1.1rem' }}>
                            Voir les offres
                        </Link>
                        <Link to="/recruiters" className="btn" style={{ background: 'white', color: 'var(--primary-color)', padding: '15px 30px', fontSize: '1.1rem' }}>
                            Je suis recruteur
                        </Link>
                    </div>
                </div>
            </header>

            <section className="features-section" style={{ padding: '60px 0' }}>
                <div className="container">
                    <h2 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Pourquoi nous choisir ?</h2>
                    <div className="grid grid-3 gap-20">
                        <div className="feature-card" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ marginBottom: '10px' }}>Double Marché</h3>
                            <p>Accédez aux meilleures opportunités au Maroc et en France sans frontières.</p>
                        </div>
                        <div className="feature-card" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ marginBottom: '10px' }}>Profils Vérifiés</h3>
                            <p>Des candidats et des entreprises de qualité pour des recrutements réussis.</p>
                        </div>
                        <div className="feature-card" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ marginBottom: '10px' }}>Simplicité</h3>
                            <p>Postulez en un clic et gérez vos candidatures facilement.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
