const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtSecret = "my-new-idea-phone";

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "90d" });
};

const createToken = (user, req, res) => {
  try {
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    user.password = undefined;
    res.locals.user = user;

    res.status(201).json({ status: "Success", token, data: { user } });
  } catch (err) {
    res.starts(500).json({
      status: "Fail",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm, photo } = req.body;
    if (!(name && email && password && passwordConfirm))
      return res
        .status(400)
        .json({ status: "Fail", message: "Invalid email or password" });
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      photo,
    });
    createToken(user, req, res);
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};

exports.isLoggedIn = async (req, res) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(400).json({
        status: "Fail",
        compile: "notLoggedIn",
        message: "Not logged in",
      });
    }
    res.status(200).json({ status: "success", message: "Already Logged in" });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, req.body);
    if (!email || !password) {
      return res.status(401).json({
        status: "Error",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "Fail",
        compile: "notFound",
        message: "Invalid email or password",
      });
    }

    createToken(user, req, res);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An error occurred while processing your request",
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token)
      return res.status(401).json({
        status: "Error",
        compile: "login",
        message: "You are not logged in, so please log in and try again",
      });
    const decoded = await promisify(jwt.verify)(token, jwtSecret);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "Error",
        message: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};

exports.commentSection = async (req, res) => {
  try {
    const postID = req.body.id;
    const { comment } = req.body;
    const { name, photo } = await User.findById(req.user._id);
    let updatedComment = "";
    const post = await Post.findById(postID);
    const userComment = post.comment.find((e) =>
      e.personID == req.user._id
    );
    if(comment && userComment){
      return res.status(201).json({
        "status": "Fail",
        "compile": "alreadyComment",
        message: "You are already did comment on this post"
      })
    }
    if (comment) {
      updatedComment = await Post.findByIdAndUpdate(
        postID,
        {
          $push: {
            comment: {
              personID: req.user._id,
              comment,
              personName: name,
              personImg: photo,
            },
          },
        },
        { new: true }
      );
    } else {
      updatedComment = await Post.findById(postID);
    }
    if (!updatedComment) {
      return res.status(404).json({
        status: "error",
        message: "Post not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};
