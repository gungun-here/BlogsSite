const express = require("express");
const Blog = require("../models/blogs_model");
const User = require("../models/users_model");
const jwt = require("jsonwebtoken");
const users_model = require("../models/users_model");
const { mongoose } = require("mongoose");

const blog_router = express.Router();
const JWT_SECRET = "supersecretkey";

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ✅ Extract user ID from the token
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

blog_router.get("/", async (req, resp) => {
    const blogs = await Blog.find()
    return resp.json({ success: true, blogs: blogs })
})

blog_router.get("/getBlogs",verifyToken, async (req, resp) => {
    
    const id = req.user.userId;
    const blog = await Blog.find({ author: id })
    return resp.json({ success: true, 
        blogs: blog
     })
})

blog_router.get("/:id", async (req, resp) => {
    const {id} = req.params;
    const blog = await Blog.findById({ _id: id })

    if (!blog || !blog.author) return resp.status(404).json({message: "blog not found"})
        
        const authorData = await User.findOne({_id: blog.author});
        
     if (!authorData) return resp.status(404).json({message: "Author not found"})

        
    return resp.json({ success: true, 
        blog: {...blog?._doc, author: `${authorData.firstName} ${authorData.lastName}`} 
     })
})


// ✅ Fix: Get all blogs & populate author correctly
blog_router.get("/your", verifyToken, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.userId }) // ✅ Fix typo
        res.json({ blogs: blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Fix: Correctly save the logged-in user as the author
blog_router.post("/add", verifyToken, async (req, res) => {
    const { title, content, image, category, readingTime } = req.body;
    if (!title || !content || !image || !category || !readingTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        console.log("Äuthor is: ", req.user.userId)

        const newBlog = await Blog.create({
            title,
            content,
            image,
            category,
            readingTime,
            author: req.user.userId, // ✅ Correctly store author's ObjectId
        });

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = blog_router;
