import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#333', color: '#fff', padding: '2rem 0', marginTop: 'auto' }}>
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} TalentSpot. Tous droits réservés.</p>
                <p style={{ marginTop: '0.5rem' }}>
                    Tel : +212 638 197 397<br />
                    Tel : +33 758 240 120<br />
                    Mail : contact@talentspot.ma
                </p>
                <div style={{ marginTop: '1rem' }}>
                    <a href="/mentions-legales" style={{ color: '#fff', margin: '0 10px' }}>Mentions légales</a>
                    <a href="/confidentialite" style={{ color: '#fff', margin: '0 10px' }}>Confidentialité</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
