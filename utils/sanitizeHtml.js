// utils/sanitizeFeedback.js
const sanitizeHtml = require("sanitize-html");

/**
 * Làm sạch nội dung HTML người dùng nhập, loại bỏ các đoạn nguy hiểm.
 * @param {string} dirtyHtml - HTML từ người dùng.
 * @returns {string} - HTML đã được làm sạch.
 */
function sanitizeInputByRegex(input) {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>\/\\'"`%;(){}[\]]/g, "") // Xóa các ký tự nguy hiểm
    .replace(/\s+/g, " "); // Rút gọn khoảng trắng
}

function sanitizeCustom(dirtyHtml) {
  const dirtyInput = sanitizeInputByRegex(dirtyHtml);
  return sanitizeHtml(dirtyInput, {
    allowedTags: [
      "b",
      "i",
      "u",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "data"], // Cho ảnh base64
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },
  });
}

module.exports = sanitizeCustom;
