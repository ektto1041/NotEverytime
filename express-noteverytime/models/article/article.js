const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  category: { type: Number, required: true, default: 1 },
  likeCount: { type: Number, required: true, default: 0 },
  isImage: { type: Boolean, required: true, default: false },
  isAnonymous: { type: Boolean, required: true, default: false },
  createdAt: { type: Date },
  modifiedAt: { type: Date }, 
});

articleSchema.index({ title: 'text', content: 'text' });
const article = mongoose.model('Article', articleSchema);
article.createIndexes();
module.exports = article;