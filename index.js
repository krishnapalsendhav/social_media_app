const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

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
