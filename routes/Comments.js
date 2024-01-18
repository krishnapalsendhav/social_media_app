const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleWare");

router.get("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  console.log(`post id : ${postId}`);
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json({
    message: "Comment added",
    comment: comment.commentBody,
  });
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  Comments.destroy({ where: { id: commentId } });

  res.json({ message: "Comment Deleted successfully" });
});

module.exports = router;

// f. e. n. s.
//flutter express nodejs sql
