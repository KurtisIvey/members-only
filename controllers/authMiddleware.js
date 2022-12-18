module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/message-board");
  } else {
    next();
  }
};
