const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  like_count: { type: Number, required: true, default: 0 },
  is_image: { type: Boolean, required: true, default: false },
  created_at: { type: Date },
  modified_at: { type: Date }, 
});

const article = mongoose.model('Article', articleSchema);
module.exports = article;