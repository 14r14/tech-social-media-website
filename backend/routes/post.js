const express = require("express");

const postControllers = require("../controllers/post");

const router = express.Router();

router.post("/blog/add-post", postControllers.postAddPost);

router.get("/blog/get-all-posts", postControllers.getAllPosts);

router.get("/blog/get-individual-post", postControllers.getIndividualPost);

module.exports = router;
