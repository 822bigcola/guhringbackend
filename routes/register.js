const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/Schema");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    let users = req.body;

    // Nếu chỉ gửi một user duy nhất (object), thì chuyển thành mảng
    if (!Array.isArray(users)) {
      users = [users];
    }

    console.log("Received users:", users);

    if (users.length === 0) {
      return res.status(400).json({ message: "User list is empty" });
    }

    const createdUsers = [];
    const skippedUsers = [];

    for (let user of users) {
      let { username, password, role } = user;

      if (!username || !password) {
        skippedUsers.push({ username, reason: "Missing username or password" });
        continue;
      }

      username = username.toLowerCase();

      const existing = await User.findOne({ username });
      if (existing) {
        skippedUsers.push({ username, reason: "Username already exists" });
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();
      createdUsers.push(username);
    }

    res.status(201).json({
      message: "User processing completed",
      created: createdUsers,
      skipped: skippedUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create users", details: error.message });
  }
});

module.exports = router;
