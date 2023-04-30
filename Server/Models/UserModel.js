const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltround = 10;
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  no: Number,
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltround);
  next();
});

module.exports = mongoose.model("Users", userSchema);
