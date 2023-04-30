const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productSchema = new Schema({
  img: String,
  name: String,
  price: Number,
  prePrice: Number,
  sale: Number,
  no: Number,
  description: String,
  ingredients: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
