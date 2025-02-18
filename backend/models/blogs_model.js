const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    date: { type: Date, default: Date.now(), immutable: true }, 
    image: { type: String, required: true },
    category: { type: String, required: true },
    readingTime: { type: Number, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: [{ userId: String }], 
    comments: [{userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
        author: String,
         text: String,
          date: { type: Date,
             default: Date.now() }}
            ]
});

module.exports = mongoose.model('Blog', BlogSchema);
