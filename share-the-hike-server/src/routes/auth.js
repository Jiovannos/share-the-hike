const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ----------SIGNUP----------
router.post("/signup", async (req, res) => {
  const { password, userName } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Create a new user
  const user = new User({ password, userName });
  await user.save();

  res.status(201).json({ message: "User created successfully" });
});

// ----------LOGIN----------
router.post("/login", async (req, res) => {
  const { password, userName } = req.body;
  // Check if user exists
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  // Create JWT token
  const token = jwt.sign(
    { userId: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.cookie("auth", token, { httpOnly: true });
  res.json({ message: "Logged in successfully" });
});

// ----------CHECK IN----------
router.get("/checkin", async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.json({ isAuthenticated: false });
    } else {
      return res.json({
        isAuthenticated: true,
        userId: user._id,
        userName: user.userName,
        postsLiked: user.postsLiked,
        postsCreated: user.postsCreated,
      });
    }
  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
});

// ----------LOGOUT----------
router.post("/logout", (req, res) => {
  res.cookie("auth", "", { expires: new Date(0), httpOnly: true });
  res.sendStatus(200);
});

module.exports = router;
