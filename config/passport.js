const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");

passport.use(
  //same usernames collide
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username.trim() }, (err, user) => {
      //2nd argument mongoose findone is a callback function
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        console.log("reaching bcrypt compare");
        if (res) {
          //passwords match
          return done(null, user);
        } else {
          //passwords do not match
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
