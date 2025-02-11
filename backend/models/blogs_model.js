const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    date: { type: Date, default: Date.now, immutable: true }, // ✅ Auto-set date, cannot be changed
    image: { type: String, required: true },
    category: { type: String, required: true },
    readingTime: { type: Number, required: true }
});

module.exports = mongoose.model('Blog', BlogSchema);
