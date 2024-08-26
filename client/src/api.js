const API_URL = 'http://localhost:3010';

export const fetchBooks = () => fetch(`${API_URL}/books`).then(res => res.json());
export const addBook = (book) => fetch(`${API_URL}/books/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
}).then(res => res.json());

export const updateBook = (book) => fetch(`${API_URL}/books/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
}).then(res => res.json());

export const deleteBook = (id) => fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
}).then(res => res.json());