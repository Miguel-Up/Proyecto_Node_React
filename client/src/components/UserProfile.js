import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:3010/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                return response.json();
            })
            .then(data => setProfile(data))
            .catch(error => setError(error.message));
    }, [token]);

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    if (!profile) return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title className="text-center mb-3">User Profile</Card.Title>
                    <Card.Text>
                        <strong>Name:</strong> {profile.name}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {profile.email}
                    </Card.Text>
                    {/* Añadir más detalles del perfil si es necesario */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserProfile;
