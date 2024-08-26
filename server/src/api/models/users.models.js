const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ['admin', 'client'], default: 'client' },
    opinions: [{ type: String }]
},
    {

        collection: 'users',
        timestamps: true //createAt---.
    })
const User = mongoose.model('user', userSchema);
module.exports = User;