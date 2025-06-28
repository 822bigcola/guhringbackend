const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/Schema");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    let { username, password, role } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    username = username.toLowerCase();
    const exisUser = await User.findOne({ username });
    if (exisUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create news", details: error.message });
  }
});

module.exports = router;
