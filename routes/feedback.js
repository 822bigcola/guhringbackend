const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const { Feedback } = require("../models/Schema");
const sanitizeCustom = require("../utils/sanitizeHtml");

const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ message: "⚠️ Please enter feedback" });
    }

    const cleanFeedback = sanitizeCustom(feedback);

    const newFeedback = new Feedback({ feedback: cleanFeedback });
    await newFeedback.save();

    res.status(201).json({ message: "✅ Successful", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed", details: error.message });
  }
});

module.exports = router;
