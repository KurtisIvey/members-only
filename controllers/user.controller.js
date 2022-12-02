const mongoose = require("mongoose");
const User = require("../models/userSchema.js");
const { genPassword } = require("../utilities/passwordUtils.js");

exports.login = (req, res) => {
  // home page for app. will designate directions to login, sign up, or guest view via links
  res.render("index", { title: "Home Page" });
};

exports.signup__get = (req, res) => {
  res.render("signup", { title: "Sign Up", passwordError: false });
};

exports.signup__post = async (req, res) => {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  if (req.body.password !== req.body.confirmPassword) {
    res.render("signup", { title: "Sign Up", passwordError: true });
  } else {
    try {
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        salt: salt,
        hash: hash,
      }).save();
    } catch (err) {
      console.log(err);
    }
  }
};
