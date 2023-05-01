const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  name: String,
  no: Number,
  address: String,
  instructions: String,
  price: Number,
  order: {
    type: Array,
    items: {
      name: String,
      crust: String,
      extra: String,
      flavor: String,
      drink: String,
      dip: String,
      size: String,
      qty: Number,
      price: Number,
      tprice: Number,
      img: String,
      id: String,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
