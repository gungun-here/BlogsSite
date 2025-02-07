const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // Import auth routes
//const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Use the routes
app.use("/api/auth", authRoutes);

//app.use('/api/blogs', blogRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/users")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(4000, () => console.log("Server running on port 4000"));
