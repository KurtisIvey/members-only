const mongoose = require("mongoose");
const User = require("../models/userSchema.js");

exports.login = (req, res) => {
  // home page for app. will designate directions to login, sign up, or guest view via links
  res.render("index", { title: "Home Page" });
};

exports.signup__get = (req, res) => {
  res.render("signup", { title: "Sign Up", passwordError: false });
};

exports.signup__post = async (req, res) => {
  console.log(req.body);
  if (req.body.password !== req.body.confirmPassword) {
    console.log("passwords do not match");
    res.render("signup", { title: "Sign Up", passwordError: true });
  } else {
    res.render("signup");
  }
};
