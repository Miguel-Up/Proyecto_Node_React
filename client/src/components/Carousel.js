

import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { BookContext } from '../context/BookContext';
import "../Carousel.css"


const BookCarousel = () => {
    const [books, setBooks] = useState([]);
    const { setSelectedBook } = useContext(BookContext);

    useEffect(() => {
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => setBooks(data.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <Container className="mt-4">
            <Carousel className="book-carousel" interval={3000}>
                {books.map(book => (
                    <Carousel.Item key={book._id} onClick={() => setSelectedBook(book)}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={book.image}
                            alt={book.title}
                        />
                        <Carousel.Caption className="carousel-caption-bg">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                            <p>{book.genre}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default BookCarousel;