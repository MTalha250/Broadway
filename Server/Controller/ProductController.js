const productModel = require("../Models/ProductModel");

module.exports = {
  create: function (req, res) {
    productModel
      .create({
        img: req.file.path,
        name: req.body.name,
        price: req.body.price,
        prePrice: req.body.prePrice,
        sale: req.body.sale,
        no: req.body.no,
        description: req.body.description,
        ingredients: req.body.ingredients,
        category: req.body.category,
      })
      .then(() => {
        res.send({ message: "Item Inserted Successfully" });
      })
      .catch((err) => {
        res.send({ message: "Some Error Occurred" + err });
      });
  },
  getAll: function (req, res) {
    productModel.find().then((results) => {
      res.send(results);
    });
  },
};
