const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var contactSchema = new Schema({
  name: String,
  number: Number,
  message: String,
});

module.exports = mongoose.model("message", contactSchema);
