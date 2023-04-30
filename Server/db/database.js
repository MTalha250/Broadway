const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://talhabinay:talha126@cluster0.rxkz5zb.mongodb.net/Broadway"
  )
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log("Connection Error" + err));
