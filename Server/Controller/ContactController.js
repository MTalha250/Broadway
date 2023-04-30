const contactModel = require("../Models/ContactModel");

module.exports = {
  create: function (req, res) {
    contactModel
      .create(req.body)
      .then(() => {
        res.send({ message: "Your message has been received" });
      })
      .catch((err) => {
        res.send({ message: "Some Error Occurred" + err });
      });
  },
  getAll: function (req, res) {
    contactModel.find().then((results) => {
      res.send(results);
    });
  },
};
