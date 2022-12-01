const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
// imported user model
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  // home page for app. will designate directions to login, sign up, or guest view via links
  res.render("index", { title: "Home Page" });
});

router.get("/signUp", userController.getSignup);

router.get("/login", (req, res) => {
  res.send("login page");
});

module.exports = router;
