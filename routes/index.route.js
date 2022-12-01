const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
// imported user model
const User = require("../models/userSchema");

router.get("/", userController.login);

router.get("/signUp", userController.signup__get);

router.post("/signUp", userController.signup__post);

router.get("/login", (req, res) => {
  res.send("login page");
});

module.exports = router;
