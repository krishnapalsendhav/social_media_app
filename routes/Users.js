const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleWare");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    return res.json("User successfully created");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch)
      return res.json({ error: "Wrong Username and Password combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    return res.json({
      message: "You Logged In",
      token: accessToken,
    });
  });
});

router.get("/user", validateToken, async (req, res) => {
  const { username } = req.user;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User not Found" });
  return res.json(user);
});

module.exports = router;
