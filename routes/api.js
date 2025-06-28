const express = require("express");
const routerAPI = express.Router();
const mongoose = require("mongoose");
const { News } = require("../models/Schema");

routerAPI.get("/", async (req, res) => {
  try {
    let news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: `Erro when getting data: ${err.message}` });
  }
});

module.exports = routerAPI;
