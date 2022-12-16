const Post = require("../models/postSchema");
// isAuth implements a redirect through the validity of passport's req.isAuthenticated
const isAuth = require("./authMiddleware").isAuth;
const { body, validationResult } = require("express-validator");

exports.messageBoard = [
  isAuth,
  async (req, res) => {
    const posts = await Post.find({}).populate("author").exec();
    res.render("messageBoard", {
      title: "Welcome",
      posts: posts,
      loggedIn: req.session.passport,
      user: res.locals.currentUser,
    });
  },
];

exports.newPost = [
  isAuth,
  (req, res) => {
    res.render("new-post", {
      title: "New Post",
      loggedIn: req.session.passport,
    });
  },
];

exports.newPost__post = [
  body("title").trim().escape(),
  body("textContent").trim().escape(),
  async (req, res) => {
    try {
      const newPost = await new Post({
        title: req.body.title,
        textContent: req.body.textContent,
        author: req.user._id,
      }).save();
      res.redirect("/message-board");
    } catch (err) {
      console.log(err);
    }
  },
];

exports.post__delete = async (req, res) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (
      res.locals.currentUser._id === post.author ||
      res.locals.currentUser.admin === true
    ) {
      await post.remove();
    }

    res.redirect("/message-board");
  } catch (err) {
    console.log(err);
  }
};
