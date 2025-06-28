const express = require("express");
const connectDB = require("./db");
const apiRouter = require("./routes/api");
const homepage = require("./routes/homepage");
const apinews = require("./routes/newsapi");
const apiCreateUser = require("./routes/register");
const apiLogin = require("./routes/login");
const apiArticle = require("./routes/Article");
const apiChangePassword = require("./routes/changepassword");

require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const webAPI = express.Router();
webAPI.get("/", homepage);
// Routes
app.use("/", webAPI);

app.use("/v1/api", apiRouter);

app.use("/news", apinews);

app.use("/register", apiCreateUser);
app.use("/login", apiLogin);
app.use("/article", apiArticle);
app.use("/changepassword", apiChangePassword);

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
