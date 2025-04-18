const express = require("express");
const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    filepath: String,
    bodycontent: String,
    path: String,
    hashtag: String,
    pathUrl: String,
    _id: Number,
  },
  { timestamps: true }
);
module.exports = NewsSchema;
