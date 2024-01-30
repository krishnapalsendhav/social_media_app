const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleWare");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const userId = req.user.id;
  post.UserId = userId;
  await Posts.create(post);
  res.json({ message: "Post Successfully Created", post: post });
});

router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  Posts.destroy({ where: { id: id } });

  res.json({ message: "Post Deleted Successfully" });
});

module.exports = router;
