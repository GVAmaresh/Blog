const Post = require("../models/PostModel");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    console.log(post);
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({
      status: "error",
      message: "Failed to create the post.",
      error: error.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the post",
    });
  }
};
exports.getAllPost = async (req, res) => {
  const post = await Post.find();
  res.status(200).json({
    status: "success",
    data: post,
  });
};
exports.getPost = async (req, res) => {
  try {
    console.log(req.body.id);
    const post = await Post.findById(req.body.id);
    if (!post)
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    });
  }
};

exports.searchPost = async (req, res) => {
  try {
    const searchPhrase = req.params.title;
    const posts = await Post.find({
      title: { $regex: new RegExp(searchPhrase, "i") },
    });
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while searching for posts",
    });
  }
};

exports.deleteAllPost = async (req, res) => {
  try {
    await Post.deleteMany();
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};
