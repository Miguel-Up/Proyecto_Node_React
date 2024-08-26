const Books = require('../models/books.models')
const { validationResult } = require('express-validator');
const cloudinary = require("cloudinary").v2;



const addBook = async (req, res) => {
    try {

        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Obtener datos del libro del cuerpo de la solicitud
        const { title, author, editorial, genre, opinion } = req.body;
        const image = req.file ? req.file.path : "";

        // Crear una nueva instancia de libro
        const newBook = new Books({
            title,
            author,
            editorial,
            genre,
            image,
            opinion
        });

        // Guardar el libro en la base de datos
        const createdBook = await newBook.save();

        return res.status(201).json({ message: "Libro agregado con éxito", data: createdBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al agregar el libro", error });
    }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).json({ message: "Error al obtener los libros" });
    }
};

// Obtener un libro por ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }
        res.status(200).json({ data: book });
    } catch (error) {
        console.error("Error al obtener el libro:", error);
        res.status(500).json({ message: "Error al obtener el libro" });
    }
};

// Añadir una opinión a un libro
const addOpinion = async (req, res) => {
    const { id } = req.params;
    const { opinion } = req.body;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        book.opinions.push(opinion);
        const updatedBook = await book.save();

        res.status(200).json({ message: "Opinión añadida", data: updatedBook });
    } catch (error) {
        console.error("Error al añadir la opinión:", error);
        res.status(500).json({ message: "Error al añadir la opinión" });
    }
};

// Eliminar un libro por ID
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        // Opcional: Eliminar la imagen de Cloudinary si existe
        if (deletedBook.image) {
            const imageId = deletedBook.image.split('/').pop().split('.')[0]; // Extrae el ID de la imagen
            cloudinary.uploader.destroy(imageId, (error, result) => {
                if (error) {
                    console.error("Error al eliminar la imagen de Cloudinary:", error);
                }
            });
        }

        res.status(200).json({ message: "Libro eliminado", data: deletedBook });
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
        res.status(500).json({ message: "Error al eliminar el libro" });
    }
};

module.exports = { addBook, getAllBooks, getBookById, addOpinion, deleteBook };