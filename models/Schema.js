const express = require("express");
const mongoose = require("mongoose");

// Định nghĩa News Schema
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

// Định nghĩa User Schema
const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "sales", "product", "accounting", "hr", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const ArticleSchema = new mongoose.Schema(
  {
    Code: String,
    Description: String,
    PriceDealer: String,
    PriceEnduser: String,
  },
  { timestamps: true }
);
// Export Models
const News = mongoose.models.News || mongoose.model("News", NewsSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

module.exports = {
  News,
  User,
  Article,
};
