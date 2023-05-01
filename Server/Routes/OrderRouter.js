var express = require("express");
const router = express.Router();
var orderController = require("../Controller/OrderController");

router.post("/addOrder", orderController.create);
router.get("/orders", orderController.getAll);
router.get("/delete/:id", orderController.delete);

module.exports = router;
