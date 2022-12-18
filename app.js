require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;

// auth
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const passport = require("passport");
// simplifies ejs by using layouts
const expressLayouts = require("express-ejs-layouts");

//routes
const indexRouter = require("./routes/index.route");
const messageBoardRouter = require("./routes/messageBoard.route");

// hide api key
// API_KEY will come in through process.env as process.env.API_KEY
//console.log(process.env);

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //store sessions in mongo to avoid mem leaks reported on heroku
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);

//mongodb
const mongoose = require("mongoose");
// setting the uri for the mongodb connection to mongoDB variable to hide user and pass
var mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// use to allow update methods such as delete and put
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// passport setup and middleware
require("./config/passport.js");
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

// parse response from express-validator
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));

// custom middleware to keep track of session information for coding purposes
app.use((req, res, next) => {
  console.log(req.session.passport);
  //////////////////////////// having issues getting error messages to display on login page
  next();
});

// passport config
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  console.log(res.locals.currentUser);
  next();
});

app.use("/", indexRouter);
app.use("/message-board", messageBoardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    err: err,
    title: "error",
    loggedIn: req.session.passport,
  });
});

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
