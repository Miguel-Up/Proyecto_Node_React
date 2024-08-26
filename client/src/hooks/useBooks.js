import { useState, useCallback } from 'react';

export const useBooks = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(() => {
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => setBooks(data.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const deleteBook = (id) => {
        fetch(`http://localhost:3010/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => fetchBooks())
            .catch(error => console.error('Error deleting book:', error));
    };

    return { books, fetchBooks, deleteBook };
};