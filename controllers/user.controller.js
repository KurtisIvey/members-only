const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");

exports.login = (req, res) => {
  res.render("index", {
    title: "Log in",
    failureMessage: false,
    loggedIn: req.session.passport,
  });
};

exports.login__post = passport.authenticate("local", {
  failureRedirect: "/",
  failureMessage: true,
  successRedirect: "/message-board",
});

exports.signup__get = (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    errors: [],
    loggedIn: req.session.passport,
  });
};

exports.signup__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  body("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup", {
        title: "Sign Up",
        errors: errors.errors,
        loggedIn: req.session.passport,
      });
      // had to add return due to constant [ERR_HTTP_HEADERS_SENT] error
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save();
      res.send("sign up successful");
    } catch (err) {
      console.log(err);
    }
  },
];

exports.logout__post = (req, res) => {
  console.log("trying to log out");
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
