const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleWare");

router.get("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  const found = await Likes.findOne({
    where: { UserId: userId, PostId: postId },
  });
  if (!found) {
    await Likes.create({
      PostId: postId,
      UserId: userId,
    });
    res.json({ message: "Liked" });
  } else {
    Likes.destroy({ where: { UserId: userId, PostId: postId } });
    res.json({ message: "Unliked" });
  }
});

module.exports = router;
