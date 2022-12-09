const express = require("express");
const router = express.Router();
const MessageBoardController = require("../controllers/messageBoard.controller.js");

router.get("/message-board", MessageBoardController.welcome);

router.get("/new-post", MessageBoardController.newPost);

router.post("/post/new-post", MessageBoardController.newPost__post);

module.exports = router;
