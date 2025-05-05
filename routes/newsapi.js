const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const { News } = require("../models/Schema");
const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const {
      title,
      content,
      filepath,
      bodycontent,
      path,
      hashtag,
      pathUrl,
      _id,
    } = req.body;

    const news = new News({
      title,
      content,
      filepath,
      bodycontent,
      path,
      hashtag,
      pathUrl,
      _id,
    });
    await news.save();

    res.status(201).json({ message: "News created successfully", news: news });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create news", details: error.message });
  }
});
module.exports = router;
