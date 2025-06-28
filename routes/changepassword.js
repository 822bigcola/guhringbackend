const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/Schema");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "⚠️ Vui lòng nhập đầy đủ thông tin" });
    }

    // Lấy username từ token đã được xác thực trong middleware
    const username = req.user.username.toLowerCase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "❌ Người dùng không tồn tại" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "❌ Mật khẩu cũ không đúng" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "✅ Đổi mật khẩu thành công" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Lỗi khi đổi mật khẩu",
      error: error.message,
    });
  }
});

module.exports = router;
