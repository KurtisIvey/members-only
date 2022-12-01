const mongoose = require("mongoose");
const userSchema = require("../models/userSchema.js");

exports.getSignup = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};
