const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

const router = express.Router();

const names = [
  "Maria",
  "Giannis",
  "Giorgos",
  "Eleni",
  "Anna",
  "Nikos",
  "Dimitris",
  "Sofia",
  "Kostas",
  "Vasiliki",
];

router.post("/", async (req, res) => {
  try {
    // Delete all existing posts and users
    await Post.deleteMany({});
    await User.deleteMany({});

    // Fetch the posts from the endpoint
    const { data: postsData } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Create 10 Users
    const users = await Promise.all(
      names.map((name, index) => {
        const user = new User({
          userName: name,
          password: name,
          userId: index + 1,
        });

        return user.save();
      })
    );

    // Create a mapping from userId to MongoDB _id for the users
    const userMap = users.reduce((map, user) => {
      map[user.userId] = user._id;
      return map;
    }, {});

    // Create 100 posts
    const posts = await Promise.all(
      postsData.map((postData) => {
        const post = new Post({
          ...postData,
          userName: names[postData.userId - 1],
          userId: postData.userId,
        });

        // Push the post _id to the postsCreated array of the corresponding user
        users[postData.userId - 1].postsCreated.push(post._id);

        return post.save();
      })
    );

    // For each post, loop through each user and make the user randomly like or not the post
    for (const post of posts) {
      for (const user of users) {
        if (Math.random() > 0.5) {
          // 50% chance of liking a post
          post.likes.push(user._id);
          user.postsLiked.push(post._id);
        }
      }
      await post.save();
    }

    await Promise.all(users.map((user) => user.save()));

    res.json({ message: "Data initialized successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
