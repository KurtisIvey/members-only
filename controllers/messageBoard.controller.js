const Post = require("../models/postSchema");

/*const posts = [
  {
    title: "dogs",
    timestamp: "11-11-1111",
    textContent: "here are the dogs and they are eating",
    author: "Kurtis I",
  },
  {
    title: "cats",
    timestamp: "12-22-2222",
    textContent: "cats cats cats jump",
    author: "zoe I",
  },
];
*/

exports.welcome = async (req, res) => {
  const posts = await Post.find({}).populate("author").exec();
  res.render("messageBoard", {
    title: "Welcome",
    posts: posts,
    loggedIn: req.session.passport,
  });
};

exports.newPost = (req, res) => {
  res.render("new-post", {
    title: "New Post",
    loggedIn: req.session.passport,
  });
};

exports.newPost__post = async (req, res) => {
  try {
    const newPost = await new Post({
      title: req.body.title,
      textContent: req.body.textContent,
      author: req.user._id,
    }).save();
    res.redirect("/messageBoard");
  } catch (err) {
    console.log(err);
  }
};
