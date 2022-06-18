const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require("mongoose");

const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const authHelper = require('./routes/authHelper');

app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3001']
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser(String(process.env.COOKIE_SECRET)));

app.use(indexRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);
app.use('/helpers', authHelper);

mongoose.connect("mongodb://localhost:27017/express-demo").then(() => {
  app.listen(3000, () => {
    console.log("Connected!");
    console.log("Listening on port: 3000");
  });
});