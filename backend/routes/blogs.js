const express = require('express');
const Blog = require('../models/blogs_model');
const jwt = require('jsonwebtoken');
const blog_router = express.Router();

const JWT_SECRET = "supersecretkey";

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

// Get all blogs
blog_router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

blog_router.post('/add', verifyToken, async (req, res) => {
    const { title, content, image, category, readingTime } = req.body;

    if (!title || !content || !image || !category || !readingTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newBlog = new Blog({
            title,
            content,
            image,
            category,
            readingTime,  // Save readingTime
            author: req.user.userId
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = blog_router;
