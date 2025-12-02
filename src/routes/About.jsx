import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Qui sommes-nous ?</h1>

                <section className="mb-20" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ marginBottom: '15px' }}>Notre Mission</h2>
                    <p style={{ marginBottom: '15px' }}>
                        TalentSpot est né d'une volonté simple : créer un pont solide entre les marchés de l'emploi marocain et français.
                        Nous croyons que le talent n'a pas de frontières et que la diversité des parcours est une richesse pour les entreprises.
                    </p>
                    <p>
                        Notre plateforme facilite la mise en relation entre des candidats qualifiés, souvent bilingues et biculturels, et des recruteurs à la recherche de compétences spécifiques.
                    </p>
                </section>

                <section>
                    <h2 className="text-center mb-20">Notre équipe</h2>
                    <div className="grid grid-1 gap-20" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div className="team-card text-center" style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#ddd', borderRadius: '50%', margin: '0 auto 15px auto' }}></div>
                            <h3>Mohamed Aitouakrim</h3>
                            <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>CEO & Fondateur</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Visionnaire passionné par la connexion des talents au-delà des frontières.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
