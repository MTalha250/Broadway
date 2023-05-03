const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res) {
    userModel
      .create(req.body)
      .then(() => {
        res.send({ message: "Registered Successfully", alert: true });
      })
      .catch((err) => {
        res.send({
          message: "Email is already registered",
          alert: false,
        });
      });
  },
  authenticate: function (req, res) {
    userModel.findOne({ email: req.body.email }).then((userInfo, err) => {
      if (userInfo) {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "10m" }
          );
          const userData = {
            name: userInfo.name,
            email: userInfo.email,
            address: userInfo.address,
            no: userInfo.no,
            token: token,
          };
          res.send({
            message: "Logged In as " + userData.name,
            alert: true,
            userData: userData,
          });
        } else {
          res.send({ message: "Incorrect Password", alert: false });
        }
      } else {
        res.send({ message: "Email not found" });
      }
    });
  },
  getAll: function (req, res) {
    userModel.find().then((results) => {
      res.send(results);
    });
  },
  delete: function (req, res) {
    userModel
      .findByIdAndDelete(req.params.id)
      .then(() => {
        res.send({ message: "User Deleted" });
      })
      .catch((err) => {
        res.send("Something went wrong!!!!" + err);
      });
  },
};
