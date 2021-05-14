const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Post = require('./models/post');
const Comment = require('./models/comment');

const { PORT, DB_URL } = require('./utils/config');
const comment = require('./models/comment');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('We are here');
});

app.get('/api/v1/posts', async (req, res) => {
  const posts = await Post.find({});

  res.json(posts);
});

app.post('/api/v1/posts', async (req, res) => {
  const { title, body, author } = req.body;

  const post = new Post({
    title,
    body,
    author,
  });

  const savedPost = await post.save();

  res.status(201).json(savedPost);
});

app.get('/api/v1/posts/:id', async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate('comments');

  res.json(post);
});

// get all comments on a post
app.get('/api/v1/posts/:id/comments', async (req, res) => {
  const { id } = req.params;

  const comments = await Comment.find({ post: id });

  res.json(comments);
});

// post a comment on a post
app.post('/api/v1/posts/:id/comments', async (req, res) => {
  const { body, author } = req.body;
  const post = req.params.id;

  const comment = new Comment({
    body,
    author,
    post,
  });

  const updatedPost = await Post.findByIdAndUpdate(post, {
    $push: { comments: comment },
  });

  const savedComment = await comment.save();

  res.status(201).json(savedComment);
});

app.delete('/api/v1/posts/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    post: postId,
  });

  console.log(deletedComment);
  if (deletedComment) {
    res.json({
      status: 'success',
      action: `deleted comment ${commentId}`,
    });
  } else {
    res.status(404).end();
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
