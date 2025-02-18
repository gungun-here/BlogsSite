const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users_model"); // Import User model
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        let existingUser;
        const userlist = await User.find();
        if (userlist.length > 0) {
            existingUser = await User.findOne({ email });
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const userlist = await User.find();
        let user;
        if (userlist.length > 0) {
            user = await User.findOne({ email }) || {};
        }
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        // Prevent password check for Google users
        if (!user.password) {
            return res.status(400).json({ message: "This account does not exist." });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);


        res.status(200).json({ message: "User logged in successfully", token, user: { email: user.email, userId: user._id } });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/update-profile", verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, phnumber, profilepic, about } = req.body;
        // Update user details (except email)
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user.userId },
            { firstName: firstName, lastName: lastName, phnumber: phnumber, profilepic: profilepic, about: about },
            { new: true, runValidators: true }
        );
        console.log("updated user", updatedUser);
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// **Protected Route**
router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Unauthorized" });
    }
});


router.post("/google-login", async (req, res) => {
    try {
        const { email, displayName } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Create user without a password for Google login
            user = new User({ email, displayName });
            await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ message: "User logged in successfully", token, user: { email: user.email, userId: user._id } });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/getUserData", verifyToken, async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    if (!user.email) {
        return res.status(404).json({ message: "credentials required!!" })
    }

    const userdata = await User.findOne({ email: user.email });

    if (!userdata) {
        return res.status(404).json({ message: "user not found" })
    }


    return res.status(200).json({ message: 'user found sucessfully', user: userdata });
})

router.get("/user/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

// **Middleware to Verify Token**
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = router;
