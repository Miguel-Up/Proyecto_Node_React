import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const BookForm = ({ book, onSubmit }) => {
    const [title, setTitle] = useState(book ? book.title : '');
    const [author, setAuthor] = useState(book ? book.author : '');
    const [editorial, setEditorial] = useState(book ? book.editorial : '');
    const [genre, setGenre] = useState(book ? book.genre : '');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert('Debes estar logueado para agregar un libro');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('editorial', editorial);
        formData.append('genre', genre);
        if (image) formData.append('image', image);

        console.log(formData);

        fetch('http://localhost:3010/books/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`, // Asegúrate de que user.token es válido
            },

            body: formData,

        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    alert('Libro agregado con éxito');
                    navigate('/books');
                } else {
                    alert('Error al agregar el libro');
                }
            })
            .catch((error) => {
                console.error('Error al agregar el libro:', error);
            });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el título del libro" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEditorial">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control type="text" placeholder="Introduce la editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicGenre">
                    <Form.Label>Género</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el género" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicImage">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {book ? 'Actualizar Libro' : 'Agregar Libro'}
                </Button>
            </Form>
        </Container>
    );
};

export default BookForm;
