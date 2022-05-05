const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const sequelize = require("./utils/database");

const Posts = require("./models/post");
const Users = require("./models/user");

const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(indexRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);

Users.hasMany(Posts);

sequelize.sync().then(
  app.listen(8000, () => {
    console.log("Listening on 8000!");
  })
);
