const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.get("/", userController.login);

router.post("/", userController.login__post);

router.delete("/logout", userController.logout__post);

router.get("/signUp", userController.signup__get);

router.post("/signUp", userController.signup__post);

router.get("/account-settings", userController.accountSettings);

module.exports = router;
