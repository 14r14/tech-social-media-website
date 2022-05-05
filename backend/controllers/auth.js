const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const User = require("../models/user");

const generateAccessToken = async (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
};

const hashPassword = async (pwd) => {
  const saltRounds = 10;
  console.log(pwd);
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(pwd, salt);
};

const checkPassword = async (pwd) => {};

exports.postLoginController = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({
    where: {
      email,
    },
  }).then((users) => {});
};

exports.postRegisterController = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    hashPassword(password).then((hashedPass) => {
      generateAccessToken(username).then((token) => {
        User.create({
          username,
          email,
          password: hashedPass,
        })
          .then((result) => {
            res.send({
              success: true,
              username,
              token,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  } else {
    res.send({ success: false, msg: "Passwords don't match." });
  }
};

exports.postLogoutContoller = (req, res) => {
  res.send({
    defined: true,
  });
};
