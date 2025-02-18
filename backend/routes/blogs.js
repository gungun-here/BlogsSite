const express = require("express");
const Blog = require("../models/blogs_model");
const User = require("../models/users_model");
const jwt = require("jsonwebtoken");
const users_model = require("../models/users_model");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const blog_router = express.Router();

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Extract user ID from the token
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

blog_router.get("/", async (req, resp) => {
  const blogs = await Blog.find();
  return resp.json({ success: true, blogs: blogs });
});

blog_router.get("/getBlogs", verifyToken, async (req, resp) => {
  const id = req.user.userId;
  const blog = await Blog.find({ author: id });
  return resp.json({ success: true, blogs: blog });
});

blog_router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  const blog = await Blog.findById({ _id: id });

  if (!blog || !blog.author)
    return resp.status(404).json({ message: "blog not found" });

  const authorData = await User.findOne({ _id: blog.author });

  if (!authorData)
    return resp.status(404).json({ message: "Author not found" });

  return resp.json({
    success: true,
    blog: {
      ...blog?._doc,
      author: `${authorData.firstName} ${authorData.lastName}`,
    },
  });
});

blog_router.get("/:id/views", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.views += 1; // Increment views
    await blog.save();
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle like functionality
blog_router.post("/:id/likes", async (req, res) => {
  try {
    const { userId } = req.body; // Assume you pass userId in the request body
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check if the user has already liked the blog
    const alreadyLiked = blog.likedBy.some((like) => like.userId === userId);

    if (alreadyLiked) {
      // Unlike the blog
      blog.likes -= 1;
      blog.likedBy = blog.likedBy.filter((like) => like.userId !== userId);
    } else {
      // Like the blog
      blog.likes += 1;
      blog.likedBy.push({ userId });
    }

    await blog.save();
    res.json({ likes: blog.likes, likedBy: blog.likedBy });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

blog_router.get("/:id/comments", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json({ comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

blog_router.post("/:id/comments", verifyToken, async (req, res) => {
  try {
    const user_data = req.user;

    const author = await User.findById({ _id: user_data.userId });
    if(!author){
        return res.status(500).json({ message: "author not found"})
    }
    
    const { text } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    const newComment = {
        date: Date.now(),
        text,
        userId: user_data.userId,
        author: `${author.firstName} ${author.lastName}`,
      }
    blog.comments.push(newComment);
    await blog.save();
    res.json({ comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fix: Get all blogs & populate author correctly
blog_router.get("/your", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId }); // ✅ Fix typo
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
    console.log("Author is: ", req.user.userId);

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

blog_router.get("/category/:category", async (req, res) => {
  try {
    const category = decodeURIComponent(req.params?.category);

    const AllBlogs = await Blog.find();

    const counts = AllBlogs.reduce((acc, blog) => {
      acc[blog.category] = (acc[blog.category] || 0) + 1;
      return acc;
    }, {});

    let blogs;
    if (category !== "All posts") {
      blogs = await Blog.find({ category });
    }

    const sortedBlogs = category === "All posts" ? AllBlogs : blogs;
    res.json({
      success: true,
      sortedBlogs,
      categoryCount: counts,
      blogCount: AllBlogs.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

blog_router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

blog_router.delete("/:blogId/comments/:commentId", verifyToken, async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const userId = req.user.userId; // Extract user ID from token

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const commentIndex = blog.comments.findIndex((comment) => comment._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the comment belongs to the logged-in user
    if (blog.comments[commentIndex].userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    // Remove the comment from the array
    blog.comments.splice(commentIndex, 1);
    await blog.save();

    res.json({ success: true, message: "Comment deleted", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = blog_router;
