const User = require("../models/user");

const generateToken = require("../utils/AuthMethods").generateAccessToken;
const hashPassword = require("../utils/AuthMethods").hashPassword;
const checkPassword = require("../utils/AuthMethods").checkPassword;

exports.postLoginController = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const paramsExist = Object.keys(req.query).length > 0;
  if (!paramsExist) {
    User.findAll({
      where: {
        email,
      },
    })
      .then((users) => {
        checkPassword(users[0].password, password).then((result) => {
          if (result) {
            generateToken(email)
              .then((token) => {
                return res
                  .status(200)
                  .json({ success: true, token, username: users[0].username });
              })
              .catch((err) => {
                console.log(err);
                return res.status(505).json({
                  success: false,
                  errType: "tkngenerr",
                  msg: "Internal Server Error.",
                });
              });
          } else {
            return res.status(200).json({
              success: false,
              msg: "Invalid email or password.",
              errType: "lgnfail",
            });
          }
        });
      })
      .catch((err) => {
        res.status(505).json({
          success: false,
          msg: "Internal Server Error.",
          errType: "dberr",
        });
        console.log(err);
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
      generateToken(email)
        .then((token) => {
          User.findAll({
            where: {
              email,
            },
          })
            .then((users) => {
              if (users.length > 0) {
                return res.status(200).json({
                  success: false,
                  msg: "Email already exists.",
                  errType: "emalex",
                });
              } else {
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
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(505).json({
                success: false,
                errType: "dberr",
                msg: "Internal Server Error.",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(505).json({
            success: false,
            errType: "tkngenerr",
            msg: "Internal Server Error.",
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
