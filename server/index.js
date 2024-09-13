const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

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

db.sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database or start the server:", err);
  });
