const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// post routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

// comments routers
const commentsRouter = require('./routes/comments');
app.use("/comments", commentsRouter);

// users routers
const usersRouter = require('./routes/users');
app.use("/auth", usersRouter);

// likes routers
const likesRouter = require('./routes/likes');
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
