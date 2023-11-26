const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  personID: { type: String, required: [true, "Person details are necessary"] },
  comment: { type: String, required: [true, "Comment is necessary"] },
  date: { type: Date, default: Date.now() },
  personImg: { type: String, default: "default.png" },
  personName: { type: String, required: [true, "Person Nmae is necessary"] },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
    subheading: {
      type: String,
      required: [true, "Subheading is required"],
    },
    photo: { type: String, required: [true, "Photo is required"] },
    description: { type: String, required: [true, "Descriptive is required"] },
    comment: [commentSchema],
    date: { type: Date, default: Date.now() },
    categories: [
      { type: String, required: [true, "Categories are necessary"] },
    ],
  },
  { sort: { date: -1 } }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
