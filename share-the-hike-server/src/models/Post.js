const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, virtuals: true }
);

module.exports = mongoose.model("Post", PostSchema);
