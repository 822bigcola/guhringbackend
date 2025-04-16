require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://822bigcola:DmEKrRkJETyNnFys@cluster0.pzppl73.mongodb.net/guhring",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
};

module.exports = connectDB;
