var express = require("express");
const router = express.Router();
var userController = require("../Controller/UserController");

router.post("/signup", userController.create);
router.post("/login", userController.authenticate);

module.exports = router;
