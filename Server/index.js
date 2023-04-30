const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("./db/database");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/Uploads", express.static("Uploads"));
app.set("secretKey", "Mein Nai Bataon Ga");

app.get("/", (req, res) => {
  res.send("Server is Running");
});
const userRoute = require("./Routes/UserRouter");
app.use("/user", userRoute);

const orderRoute = require("./Routes/OrderRouter");
app.use("/order", orderRoute);

const productRoute = require("./Routes/ProductRouter");
app.use("/product", productRoute);

const contactRoute = require("./Routes/ContactRouter");
app.use("/contact", contactRoute);

app.listen(5000, () => {
  console.log("your server is running on port# 5000");
});
