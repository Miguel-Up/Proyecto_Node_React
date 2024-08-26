import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { BookContext } from '../context/BookContext';

const BookDetail = () => {
    const { selectedBook } = useContext(BookContext);

    if (!selectedBook) return <p>Selecciona un libro para ver los detalles</p>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Img variant="top" src={selectedBook.image} />
                <Card.Body>
                    <Card.Title>{selectedBook.title}</Card.Title>
                    <Card.Text>{selectedBook.description}</Card.Text>
                    <Card.Text><strong>Author:</strong> {selectedBook.author}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookDetail;
