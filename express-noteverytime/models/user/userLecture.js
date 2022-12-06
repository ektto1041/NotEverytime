const mongoose = require('mongoose');

const userLectureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lectureDetailId: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureDetail" }],
  userAuthSemeter: { type: String },
});

const userLecture = mongoose.model('UserLecture', userLectureSchema);
module.exports = userLecture;