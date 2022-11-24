const mongoose = require('mongoose');

const articleImageSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  articleImageLink: { type: String, required: true },
  articleImageOrder: { type: Number, required: true, default: 0 },
});

const articleImage = mongoose.model('ArticleImage', articleImageSchema);
module.exports = articleImage;