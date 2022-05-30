const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

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

app.use(indexRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/express-demo").then(() => {
  app.listen(3000, () => {
    console.log("Connected!");
    console.log("Listening on port: 3000");
  })
});