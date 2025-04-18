const express = require("express");
const routerAPI = express.Router();
const mongoose = require("mongoose");
const NewsSchema = require("../models/news");
const News = mongoose.model("News", NewsSchema);

routerAPI.get("/", async (req, res) => {
  try {
    let news = await News.find().sort({ createdAt: -1 });
    console.log(news);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: `Erro when getting data: ${err.message}` });
  }
});

module.exports = routerAPI;
