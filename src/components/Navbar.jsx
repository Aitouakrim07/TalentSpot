import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((open) => !open);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
                    JobMarocFrance
                </Link>
                <button className="menu-icon" onClick={toggleMenu} aria-label="Ouvrir le menu">
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                </button>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={toggleMenu}>Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/jobs" className="nav-links" onClick={toggleMenu}>Offres d'emploi</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/candidates" className="nav-links" onClick={toggleMenu}>Candidats</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/recruiters" className="nav-links" onClick={toggleMenu}>Recruteurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={toggleMenu}>Qui sommes-nous ?</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={toggleMenu}>Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
