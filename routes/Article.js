const express = require("express");
const { Article } = require("../models/Schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { code = "", page = 1, limit = 20 } = req.query;

    const query = {
      $or: [
        { Code: { $regex: code, $options: "i" } },
        { Description: { $regex: code, $options: "i" } },
      ],
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const articles = await Article.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    // Optional: total count for frontend
    // const total = await Article.countDocuments(query);

    res.status(200).json(articles);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error when getting articles: ${err.message}` });
  }
});

module.exports = router;
