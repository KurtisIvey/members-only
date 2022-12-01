const express = require("express");
const app = express();
const path = require("path");
const port = 3001;
// simplifies ejs by using layouts
const expressLayouts = require("express-ejs-layouts");

//routes
const indexRouter = require("./routes/index.route");

// hide api key
require("dotenv").config();
// API_KEY will come in through process.env as process.env.API_KEY
//console.log(process.env);

//mongodb
const mongoose = require("mongoose");
// setting the uri for the mongodb connection to mongoDB variable to hide user and pass
var mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
