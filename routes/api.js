const express = require("express");
const routerAPI = express.Router();
const mongoose = require("mongoose");
const NewsSchema = require("../models/news");
const News = mongoose.model("News", NewsSchema);

routerAPI.get("/", async (req, res) => {
  try {
    const news = await News.find();
    news = news.reverse();
    console.log(news);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: "Erro when get data" });
  }
});

module.exports = routerAPI;
