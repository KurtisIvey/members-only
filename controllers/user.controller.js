const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const isLoggedIn = require("./authMiddleware").isLoggedIn;
const isAuth = require("./authMiddleware").isAuth;

exports.login = [
  isLoggedIn,
  (req, res) => {
    res.render("index", {
      title: "Log in",
      failureMessage: false,
      session: req.session,
      loggedIn: req.session.passport,
      message: req.flash("error"),
    });
  },
];

exports.login__post = [
  body("username").trim().escape(),
  body("password").trim().escape(),
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true,
    successRedirect: "/message-board",
  }),
];

exports.signup__get = [
  isLoggedIn,
  (req, res) => {
    res.render("signup", {
      title: "Sign Up",
      errors: [],
      loggedIn: req.session.passport,
    });
  },
];

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
    const usersWithSameUsername = await User.find({
      username: req.body.username,
    });
    if (usersWithSameUsername.length > 0) {
      errors.errors.push({ param: "username" });
      res.render("signup", {
        title: "Sign Up",
        errors: errors.errors,
        loggedIn: req.session.passport,
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        }).save();
        res.redirect("/");
        console.log(`sign up successful for user: ${newUser.username}`);
      } catch (err) {
        console.log(err);
      }
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

exports.accountSettings = [
  isAuth,
  async (req, res) => {
    const currentUser = await User.findById(req.session.passport.user);
    console.log(process.env.ADMINPASSWORD);
    res.render("accountSettings", {
      title: "Account Setting",
      errors: [],
      loggedIn: req.session.passport,
      currentUser: currentUser,
    });
  },
];

exports.accountSettings__put = async (req, res) => {
  let currentUser;
  try {
    currentUser = await User.findById(req.session.passport.user);
    currentUser.username = req.body.username;
    currentUser.email = req.body.email;
    if (req.body.adminPassword === process.env.ADMINPASSWORD) {
      currentUser.admin = true;
    }
    await currentUser.save();
    res.redirect("/message-board");
  } catch (err) {
    console.log(err);
  }
};
