const mongoose = require('mongoose');

const userLectureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lectureDetailId: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureDetail" }],
});

const userLecture = mongoose.model('UserLecture', userLectureSchema);
module.exports = userLecture;