const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  personID: { type: String, required: [true, "Person details are necessary"] },
  comment: { type: String, required: [true, "Comment is necessary"] },
  date: { type: Date, default:Date.now() },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], maxlength: 25 },
  summary: {
    type: String,
    required: [true, "Summary is required"],
    maxlength: 100,
  },
  subheading: {
    type: String,
    required: [true, "Subheading is required"],
    maxlength: 50,
  },
  description: { type: String, required: [true, "Descriptive is required"] },
  comment: [commentSchema],
  date: { type: Date, default: Date.now() },
  categories: [{ type: String, required: [true, "Categories are necessary"] }],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
