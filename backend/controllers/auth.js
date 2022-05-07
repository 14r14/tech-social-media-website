const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const User = require("../models/user");

const generateAccessToken = async (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: 3600,
  });
};

const hashPassword = async (pwd) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(pwd, salt);
};

const checkPassword = async (correctPwd, pwd) => {
  return bcrypt.compare(pwd, correctPwd);
};

exports.postLoginController = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const paramsExist = Object.keys(req.query).length > 0;
  if (!paramsExist) {
    User.findAll({
      where: {
        email,
      },
    }).then((users) => {
      checkPassword(users[0].password, password).then((result) => {
        if (result) {
          generateAccessToken(email).then((token) => {
            return res.status(200).json({ success: true, accessToken: token });
          });
        } else {
          return res
            .status(200)
            .json({ success: false, msg: "Invalid email or password." });
        }
      });
    });
  }
};

exports.postRegisterController = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    hashPassword(password).then((hashedPass) => {
      generateAccessToken(email).then((token) => {
        User.create({
          username,
          email,
          password: hashedPass,
        })
          .then((result) => {
            res.status(200).json({
              success: true,
              username,
              token,
            });
          })
          .catch((err) => {
            res.status(505).json({
              msg: "There was a problem, try again later.",
              errType: "dberr",
            });
            console.log(err);
          });
      });
    });
  } else {
    res.status(200).json({
      success: false,
      msg: "Passwords don't match.",
      errType: "pwdmm",
    });
  }
};

exports.postLogoutController = (req, res) => {
  req.user = null;

  res.send({ msg: "Logged out." });
};
