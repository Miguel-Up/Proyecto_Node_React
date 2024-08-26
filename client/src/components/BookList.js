import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BookContext } from '../context/BookContext';

const BookList = () => {
    const { books, setSelectedBook } = useContext(BookContext);

    return (
        <Row>
            {books.map(book => (
                <Col md={4} key={book._id} className="mb-4">
                    <Card onClick={() => setSelectedBook(book)} className="h-100">
                        <Card.Img variant="top" src={book.image} style={{ height: '300px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>{book.author}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BookList;
