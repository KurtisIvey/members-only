const express = require("express");
const router = express.Router();
const MessageBoardController = require("../controllers/messageBoard.controller.js");

router.get("/welcome", MessageBoardController.welcome);

module.exports = router;
