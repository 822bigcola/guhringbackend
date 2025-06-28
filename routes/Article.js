const express = require("express");
const { Article } = require("../models/Schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { code } = req.query;

    const article = await Article.find({
      $or: [
        {
          Code: { $regex: code, $options: "i" },
        },
        { Description: { $regex: code, $options: "i" } },
      ],
    }); // Tìm nhiều kết quả tương tự
    if (!article || article.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.status(200).json(article); // ✅ trả về array
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error when getting articles: ${err.message}` });
  }
});
module.exports = router;
