const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/news");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Wrong username or password" });
    }
    bcrypt.compare(password, user.password, function (error, result) {
      if (result) {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET || process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        res.status(201).json({ message: "Login successfully", token: token });
      } else {
        res.status(400).json({ message: "Wrong username or password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login faild", error: error.message });
  }
});

module.exports = router;
