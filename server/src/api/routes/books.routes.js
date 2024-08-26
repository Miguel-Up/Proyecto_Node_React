const express = require("express");
const router = express.Router()
const { addBook, getAllBooks, getBookById, addOpinion, deleteBook } = require("../controllers/books.controllers");
const upload = require("../../middleware/upload");
const { isAuth, isAdmin } = require("../../middleware/auth");


router.post("/add", /* isAuth, */ upload.single('image'), addBook);


router.get("/", getAllBooks);


router.get("/:id", getBookById);

router.post("/books:id/opinions", isAuth, addOpinion);


router.delete("/:id", isAdmin, deleteBook);

module.exports = router;