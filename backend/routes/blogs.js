const express = require('express');
const Blog = require('../models/Blog');

const blog_router = express.Router();

// Get all blogs
blog_router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

blog_router.post('/add',verifyToken, async(req,res)=>{
    const {title, content} = req.body

    await Blog.create({title, content, author: req.user.userId})
})

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
module.exports = blog_router;
