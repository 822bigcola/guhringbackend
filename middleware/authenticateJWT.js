const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Kiểm tra token và giải mã nó
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || process.env.SECRET_KEY
    );
    req.user = decoded; // Lưu thông tin người dùng vào request để dùng trong các route sau
    next(); // Tiếp tục thực hiện route
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateJWT;
