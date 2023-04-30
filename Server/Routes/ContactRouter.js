var express = require("express");
const router = express.Router();
var contactController = require("../Controller/ContactController");

router.post("/addMessage", contactController.create);
router.get("/messages", contactController.getAll);

module.exports = router;
