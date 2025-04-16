const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replaceAll(" ", "-")); // đổi tên file cho duy nhất
  },
});

const upload = multer({ storage });
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

router.post("/", upload.single("thumbnail"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imageUrl: `http://localhost:8080${imagePath}` });
  } catch (err) {
    console.error("Upload error:", err); // 👈 xem lỗi ở đây
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
