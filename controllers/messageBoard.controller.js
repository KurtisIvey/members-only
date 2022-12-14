const Post = require("../models/postSchema");
// isAuth implements a redirect through the validity of passport's req.isAuthenticated
const isAuth = require("./authMiddleware").isAuth;

exports.welcome = [
  isAuth,
  async (req, res) => {
    const posts = await Post.find({}).populate("author").exec();
    res.render("messageBoard", {
      title: "Welcome",
      posts: posts,
      loggedIn: req.session.passport,
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

exports.newPost__post = async (req, res) => {
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
};
