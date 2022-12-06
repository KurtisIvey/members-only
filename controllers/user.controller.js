const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

//const { genPassword } = require("../utilities/passwordUtils.js");

exports.login = (req, res) => {
  // home page for app. will designate directions to login, sign up, or guest view via links
  res.render("index", { title: "Log in", failureMessage: false });
};

exports.login__post = passport.authenticate("local", {
  failureRedirect: "/",
  failureMessage: true,
  successRedirect: "/signup",
});

exports.signup__get = (req, res) => {
  res.render("signup", { title: "Sign Up", passwordError: false });
};

exports.signup__post = async (req, res) => {
  //const saltHash = genPassword(req.body.password);
  //const salt = saltHash.salt;
  //const hash = saltHash.hash;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.body.password !== req.body.confirmPassword) {
    res.render("signup", { title: "Sign Up", passwordError: true });
  } else {
    try {
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save();
      res.send("sign up successful");
    } catch (err) {
      console.log(err);
    }
  }
};
