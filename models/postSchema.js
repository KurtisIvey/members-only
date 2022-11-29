const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  textContent: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
