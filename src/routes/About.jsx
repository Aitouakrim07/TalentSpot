import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Qui sommes-nous ?</h1>

                {/* Company logo hero (subtle, no frame) */}
                <div className="text-center mb-20 about-hero">
                    <img
                        src="/logo.png"
                        alt="Logo TalentSpot"
                        className="about-hero-logo"
                    />
                </div>

                <section className="mb-20" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ marginBottom: '15px' }}>Notre Mission</h2>
                    <p style={{ marginBottom: '15px' }}>
                        TalentSpot relie des talents ambitieux à des entreprises exigeantes au Maroc et en France.
                        Notre conviction est simple : <strong>le talent n’a pas de frontières</strong>. Nous déployons des outils modernes,
                        une sélection humaine et une approche éthique pour accélérer des rencontres professionnelles qui comptent.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        Concrètement, nous simplifions la détection de potentiels, la présentation de profils pertinents et le suivi de chaque candidature.
                        Candidats comme recruteurs bénéficient d’une expérience claire, rapide et transparente.
                    </p>
                </section>

                <section className="mb-20" style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <div className="about-ceo-grid">
                        <div className="about-ceo-photo">
                            <img src="/moham.png" alt="Mohamed Aitouakrim - CEO TalentSpot" />
                        </div>
                        <div className="about-ceo-text">
                            <h2 style={{ marginBottom: '10px' }}>Mohamed Aitouakrim</h2>
                            <p style={{ color: 'var(--primary-color)', marginBottom: '12px' }}>CEO & Fondateur</p>
                            <p style={{ marginBottom: '12px' }}>
                                Entrepreneur passionné par la transformation des carrières, Mohamed Aitouakrim a fondé TalentSpot pour
                                offrir une passerelle crédible entre les écosystèmes de l’emploi marocain et français.
                                Son expérience terrain et sa culture produit l’ont amené à défendre une approche data‑driven,
                                inclusive et centrée sur l’humain.
                            </p>
                            <p style={{ marginBottom: '12px' }}>
                                Sous son impulsion, TalentSpot place l’exigence au service de l’opportunité : des processus clairs, des
                                interactions soignées et des résultats mesurables pour chaque mission de recrutement.
                            </p>
                            <p>
                                Notre ambition est de faire émerger des parcours solides et durables à l’international, tout en respectant
                                l’identité et la trajectoire de chaque talent.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
