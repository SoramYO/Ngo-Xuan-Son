const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

export const Category = mongoose.model('Category', CategorySchema);