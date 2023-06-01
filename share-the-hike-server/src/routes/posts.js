const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();

// ----------GET POSTS BY FILTER----------
router.get("/", async (req, res) => {
  let query = {};

  // Apply filters
  if (req.query.userId) query.userId = req.query.userId;
  if (req.query.title) query.title = new RegExp(req.query.title, "i");
  const posts = await Post.find(query);

  res.json(posts);
});

// ----------CREATE POST----------
router.post("/", async (req, res) => {
  const { userName, title, body } = req.body;

  const post = new Post({
    userName,
    title,
    body,
  });

  const savedPost = await post.save();
  res.json(savedPost);
});

// ----------DELETE POST----------
router.delete("/delete/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Verify user ID from JWT matches post userId
  const token = req.cookies.auth;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (String(post.userId) !== String(decodedToken.userId)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await post.deleteOne({ _id: req.params.id });
  res.json({ message: "Post removed" });
});

// ----------LIKE (Or Unlike) POST----------
router.post("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  // Verify user ID from JWT
  const token = req.cookies.auth;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
  // Get the user
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Add or remove user's like
  const userIdIndex = post.likes.indexOf(decodedToken.userId);
  const postIdIndex = user.postsLiked.indexOf(req.params.id);
  if (userIdIndex === -1) {
    // User hasn't liked the post yet, so add their like
    post.likes.push(decodedToken.userId);
    user.postsLiked.push(req.params.id);
  } else {
    // User has already liked the post, so remove their like
    post.likes.splice(userIdIndex, 1);
    user.postsLiked.splice(postIdIndex, 1);
  }
  try {
    await user.save();
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----------LIKE (Or Unlike) MULTIPLE POSTS----------
router.post("/unLikeAll", async (req, res) => {
  const { postIds, likeAll } = req.body;
  try {
    const token = req.cookies.auth;
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedPosts = [];

    for (let postId of postIds) {
      const post = await Post.findById(postId);

      if (!post) {
        return res
          .status(404)
          .json({ message: `Post not found with ID: ${postId}` });
      }

      if (likeAll) {
        post.likes.addToSet(decodedToken.userId);
        user.postsLiked.addToSet(postId);
      } else {
        post.likes.pull(decodedToken.userId);
        user.postsLiked.pull(postId);
      }

      const updatedPost = await post.save();
      updatedPosts.push(updatedPost);
    }

    await user.save();
    res.json(updatedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
});

// ----------GET ALL POSTS CREATED BY A SPECIFIC USER----------
router.get("/myposts", async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const posts = await Post.find({ _id: { $in: user.postsCreated } });
  return res.json(posts);
});

// ----------GET ALL POSTS LIKED BY A SPECIFIC USER----------
router.get("/myfavorites", async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const posts = await Post.find({ _id: { $in: user.postsLiked } });
  return res.json(posts);
});

module.exports = router;
