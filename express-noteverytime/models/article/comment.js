const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  depth: { type: Number, required: true, default: 0 },
  order: { type: Number, required: true },
  isAnonymous: { type: Boolean, required: true, default: false },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;