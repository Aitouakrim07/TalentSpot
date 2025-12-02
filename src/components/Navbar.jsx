import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser(); // Get user data to check role

    const toggleMenu = () => setIsOpen((open) => !open);

    const role = user?.publicMetadata?.role;
    const isAdminOrRecruiter = role === 'admin' || role === 'recruiter';

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
                    <span className="brand-text">TalentSpot</span>
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Mobile Menu Icon */}
                    <button className="menu-icon" onClick={toggleMenu} aria-label="Ouvrir le menu">
                        <span className={isOpen ? 'bar open' : 'bar'}></span>
                        <span className={isOpen ? 'bar open' : 'bar'}></span>
                        <span className={isOpen ? 'bar open' : 'bar'}></span>
                    </button>

                    {/* Desktop/Menu */}
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
                            <Link to="/about" className="nav-links" onClick={toggleMenu}>Qui sommes-nous ?</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-links" onClick={toggleMenu}>Contact</Link>
                        </li>
                        
                        {/* Admin Link - Only visible if role is correct */}
                        <SignedIn>
                            {isAdminOrRecruiter && (
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-links" onClick={toggleMenu} style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
                                        Admin
                                    </Link>
                                </li>
                            )}
                        </SignedIn>
                        
                        <SignedOut>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links" onClick={toggleMenu}>Connexion</Link>
                            </li>
                        </SignedOut>
                    </ul>

                    {/* User Button (Always Visible) */}
                    <SignedIn>
                         <div style={{ marginLeft: '10px' }}>
                             <UserButton />
                         </div>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
