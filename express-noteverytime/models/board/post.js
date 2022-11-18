const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  is_image: { type: Boolean, required: true },
  created_at: { type: Date },
  modified_at: { type: Date }, 
});

const post = mongoose.model('Post', postSchema);
export default post;