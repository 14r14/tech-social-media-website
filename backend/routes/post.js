const express = require("express");

const postControllers = require("../controllers/post");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/add-post", authenticateToken, postControllers.postAddPost);

router.get("/get-all-posts", postControllers.getAllPosts);

router.get("/get-individual-post",authenticateToken, postControllers.getIndividualPost);

module.exports = router;
