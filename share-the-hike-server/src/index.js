const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const initializeRoutes = require("./routes/initialize");
const port = process.env.PORT || 8000;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// For development purposes
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/initialize", initializeRoutes);

// Start the server
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/share_the_hike", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log("Server running on port " + port));
  })
  .catch((err) => {
    console.log(err);
  });
