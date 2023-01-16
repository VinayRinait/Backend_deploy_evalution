const express = require("express");
const registerRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.register");

registerRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  const userPresent = await UserModel.findOne({ email });
  if (userPresent?.email) {
    res.send({ msg: "User already exist please login" });
  } else {
    try {
      bcrypt.hash(password, 3, async function (err, code) {
        const user = new UserModel({ email, password: code, name, gender });
        await user.save();
        res.send({ msg: "register sucessful" });
      });
    } catch (error) {
      res.send({ msg: "register Faild" });
      res.send(error);
    }
  }
});
registerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      const code_pass = user[0].password;
      bcrypt.compare(password, code_pass, async function (err, result) {
        const token = jwt.sign({ userId: user[0]._id }, "hush");
        res.send({ msg: "login sucessful", token: token });
      });
    } else {
      res.send({ msg: "Login faild" });
    }
  } catch (error) {
    res.send({ msg: "Login faild" });
    res.send(error);
  }
});
module.exports = {
  registerRouter,
};
