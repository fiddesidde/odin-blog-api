const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Post = require('./models/post');

const { PORT, DB_URL } = require('./utils/config');

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
  const posts = await Post.find({}).populate('comment');

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
