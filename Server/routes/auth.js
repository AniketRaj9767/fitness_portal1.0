const express = require("express");
const Authrouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
Authrouter.use(express.json());

Authrouter.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mpassword,
      role,
      phoneNo,
      dob,
    } = req.body.User;
    console.log(role)
    if(!name || !email || !mpassword  ||!phoneNo){
      return res.status(401).send({
        type: 0,
        message: "Missing Credentials",
        data: null,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        type: 0,
        message: "User email already registered",
        data: null,
      });
    }
    const password = await bcrypt.hash(mpassword, 12);
    const user = new User({
      name,
      role,
      email,
      password,
      phoneNo,
      dob,
    });
    await user.save();
    res.status(200).send({
      type: 0,
      message: "User registered.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      type: 1,
      message: "Internal Server Error",
      data: error,
    });
  }
});

Authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.User;
    const user = await User.findOne({ email: email });
    const authentication = await bcrypt.compare(password,user.password);
    if(!authentication){
      return res.status(401).send({
        type: 1,
        message: "Invalid Credentials",
        data: null,
      });
    }
    const usr = user.toObject();
    delete usr["password"];
    const key = "Thisismykey@123";
    const Token = jwt.sign({ id: user._id }, key);
    res.cookie("Token", Token);
    res.status(201).json({
      type: 0,
      message: "Login successful",
      data: {usr,Token},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

Authrouter.post("/paymentgateway", async (req, res) => {
  try {
    res.status(200).send({
      type: 1,
      message: "Payemtgateway",
      data: req.user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = Authrouter;

