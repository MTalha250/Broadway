var express = require("express");
const router = express.Router();
var orderController = require("../Controller/OrderController");

router.post("/addOrder", orderController.create);
router.get("/orders", orderController.getAll);

module.exports = router;
