const express = require("express");
const mongoose = require("mongoose");
const NewsSchema = require("../models/news");
const router = express.Router();
const News = mongoose.model("News", NewsSchema);

router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
      filepath,
      bodycontent,
      path,
      hashtag,
      pathUrl,
      key,
    } = req.body;

    const news = new News({
      title,
      content,
      filepath,
      bodycontent,
      path,
      hashtag,
      pathUrl,
      key,
    });
    await news.save();

    res.status(201).json({ message: "User created successfully", news: news });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});
module.exports = router;
