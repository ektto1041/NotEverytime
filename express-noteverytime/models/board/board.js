const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  lecture_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  board_type: { type: String, requried: true },
});

const board = mongoose.model('Board', boardSchema);
module.exports = board;