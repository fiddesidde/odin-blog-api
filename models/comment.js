const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  postedAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
