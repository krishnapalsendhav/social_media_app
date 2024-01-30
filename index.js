const express = require("express");
const { useTreblle } = require("treblle");
const app = express();
const db = require("./models");

app.use(express.json());

//Treblle
useTreblle(app, {
  apiKey: "EJid56o8q9OxbUD13Smzge0Wga8wFfWm",
  projectId: "na906ECR4fZbbf7d",
});

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likeRouter = require("./routes/Likes");
app.use("/like", likeRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port : 3001");
  });
});
