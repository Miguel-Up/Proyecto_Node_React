import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const { auth } = useContext(AuthContext);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Bienvenido, {auth.user}!</h1>
            <p>Este es tu perfil de usuario</p>
        </div>
    );
};

export default UserProfile;
