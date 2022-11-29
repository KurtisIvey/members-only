const express = require("express");
const app = express();
const port = 3001;

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
app.set("views", (__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(process.env);
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
