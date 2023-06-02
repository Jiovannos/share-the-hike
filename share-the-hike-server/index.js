const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth");
const postRoutes = require("./src/routes/posts");
const initializeRoutes = require("./src/routes/initialize");
const port = process.env.PORT || 8000;
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("tiny"));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/server/auth", authRoutes);
app.use("/server/posts", postRoutes);
app.use("/server/initialize", initializeRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server after connecting to the database
    app.listen(port, () => console.log("Server running on port " + port));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
