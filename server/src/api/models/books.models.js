const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, require: true },
    author: { type: String, require: true },
    editorial: { type: String, require: true },
    genre: { type: String, require: true },
    image: { type: String, require: true },
    opinions: [{ type: String }]
},
    {

        collection: 'books',
        timestamps: true //createAt---.
    })
const Books = mongoose.model('books', bookSchema);
module.exports = Books;





