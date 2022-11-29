const express = require("express");
const router = express.Router();

// imported user model
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  // home page for app. will designate directions to login, sign up, or guest view via links
  res.render("index");
});

router.get("/signUp", (req, res) => {
  res.send("sign up page");
});

router.get("/login", (req, res) => {
  res.send("login page");
});

module.exports = router;
