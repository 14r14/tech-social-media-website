const Posts = require("../models/post");

exports.postAddPost = (req, res) => {
  Posts.create({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  })
    .then((result) => {
      res.send({ success: true, msg: "Post was added successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, msg: "There was an error!" });
    });
};

exports.getAllPosts = (req, res) => {
  Posts.findAll()
    .then((posts) => {
      res.send({
        success: true,
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        success: false,
      });
    });
};

exports.getIndividualPost = (req, res) => {
  const postId = req.query.postId;
  Posts.findByPk(postId)
    .then((post) => {
      res.send({
        success: true,
        post,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        msg: "There was an error, try again in a few seconds.",
      });
      console.log(err);
    });
};
