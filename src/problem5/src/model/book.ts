const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    author : { type: String, required: true },
});

export const Book = mongoose.model('Book', BookSchema);