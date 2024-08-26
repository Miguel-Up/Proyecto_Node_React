

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [opinions, setOpinions] = useState({});
    const [newOpinions, setNewOpinions] = useState({});

    useEffect(() => {
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data.data);

                const initialOpinions = {};
                const initialNewOpinions = {};
                data.data.forEach(book => {
                    initialOpinions[book._id] = book.opinions || [];
                    initialNewOpinions[book._id] = '';
                });
                setOpinions(initialOpinions);
                setNewOpinions(initialNewOpinions);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleOpinionChange = (bookId, e) => {
        const { value } = e.target;
        setNewOpinions(prev => ({ ...prev, [bookId]: value }));
    };

    const handleOpinionSubmit = (bookId) => {
        const opinion = newOpinions[bookId];

        fetch(`http://localhost:3010/books/${bookId}/opinion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ opinion }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Opinión añadida") {

                    setOpinions(prev => ({
                        ...prev,
                        [bookId]: [...(prev[bookId] || []), opinion]
                    }));
                    setNewOpinions(prev => ({ ...prev, [bookId]: '' }));
                } else {
                    console.error('Error adding opinion:', data.message);
                }
            })
            .catch(error => console.error('Error adding opinion:', error));
    };

    return (
        <Container className="mt-5">
            <Row>
                {books.map(book => (
                    <Col md={4} key={book._id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={book.image} alt={book.title} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.author}</Card.Text>

                                <div>
                                    <h5>Opiniones</h5>
                                    <ul>
                                        {(opinions[book._id] || []).map((op, index) => (
                                            <li key={index}>{op}</li>
                                        ))}
                                    </ul>
                                </div>

                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleOpinionSubmit(book._id);
                                }}>
                                    <Form.Group controlId={`formOpinion-${book._id}`} className="mb-3">
                                        <Form.Label>Tu reseña</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={newOpinions[book._id] || ''}
                                            onChange={(e) => handleOpinionChange(book._id, e)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Subir Reseña</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

export default BookPage;

