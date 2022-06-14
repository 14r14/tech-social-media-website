const Post = require("../models/post");

exports.postAddPost = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;

  const post = new Post({
    userId: req.user._id,
    title: title,
    description: description,
    content: content,
  });

  post
    .save()
    .then((result) => {
      res.send({ success: true, msg: "Post was added successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, msg: "There was an error!" });
    });
};

exports.getAllPosts = (req, res) => {
  Post.find()
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
  Post.findById(postId)
    .populate("userId", "username points -_id")
    .exec()
    .then((post) => {
      res.status(200).json({
        success: true,
        post,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "There was an error, try again in a few seconds.",
      });
      console.log(err);
    });
};
