export const BookReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return {
                ...state,
                books: action.payload,
            };
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map((book) =>
                    book._id === action.payload._id ? action.payload : book
                ),
            };
        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter((book) => book._id !== action.payload),
            };
        case 'SET_SELECTED_BOOK':
            return {
                ...state,
                selectedBook: action.payload,
            };
        default:
            return state;
    }
};