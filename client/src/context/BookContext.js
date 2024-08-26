import React, { createContext, useReducer, useEffect } from 'react';
import { BookReducer } from '../components/BookReducer';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BookReducer, {
        books: [],
        selectedBook: null,
    });

    useEffect(() => {
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_BOOKS', payload: data.data });
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const addBook = (book) => {
        dispatch({ type: 'ADD_BOOK', payload: book });
    };

    const updateBook = (book) => {
        dispatch({ type: 'UPDATE_BOOK', payload: book });
    };

    const deleteBook = (bookId) => {
        dispatch({ type: 'DELETE_BOOK', payload: bookId });
    };

    const setSelectedBook = (book) => {
        dispatch({ type: 'SET_SELECTED_BOOK', payload: book });
    };

    return (
        <BookContext.Provider
            value={{
                books: state.books,
                selectedBook: state.selectedBook,
                addBook,
                updateBook,
                deleteBook,
                setSelectedBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
