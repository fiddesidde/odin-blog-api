const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: String,
  comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  postedAt: { type: Date, default: Date.now, required: true },
  published: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model('Post', postSchema);
