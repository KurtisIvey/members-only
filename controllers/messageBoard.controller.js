const posts = [
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

exports.welcome = (req, res) => {
  res.render("welcome", {
    title: "Welcome",
    posts: posts,
    loggedIn: req.session.passport,
  });
};
