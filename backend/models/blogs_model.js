const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.String, ref: "Users", required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: true },
    category: { type: String, required: true },  // Add category field
    readingTime: { type: Number, required: true }  // Add readingTime field
});

module.exports = mongoose.model('Blog', BlogSchema);
