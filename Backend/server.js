let express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
dotenv.config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/tasksRoutes");

const PORT = process.env.PORT || 3000;
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.get("/", (req, res) => {
  res.send("ok app is running");
});
async function startServer() {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
startServer();
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
