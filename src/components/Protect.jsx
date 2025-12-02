import React from 'react';
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export const Protect = ({ children, roles = [] }) => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    const userRole = user.publicMetadata.role;

    if (roles.length > 0 && !roles.includes(userRole)) {
        return (
            <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Accès Refusé</h2>
                <p>Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
                <p>Votre rôle actuel : <strong>{userRole || 'Aucun (Utilisateur standard)'}</strong></p>
            </div>
        );
    }

    return children;
};

