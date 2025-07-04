const express = require("express");
const { Article } = require("../models/Schema");
const sanitizeHtml = require("../utils/sanitizeHtml");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    let { code = "", page = 1, limit = 20 } = req.query;

    const safeCode = sanitizeHtml(code.trim());
    const query = {
      $or: [
        { Code: { $regex: safeCode, $options: "i" } },
        { Description: { $regex: safeCode, $options: "i" } },
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
