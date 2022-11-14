const mongoose = require('mongoose');

const userLectureSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lecture_detail_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "LectureDetail" }],
});

const userLecture = mongoose.model('UserLecture', userLectureSchema);
export default userLecture;