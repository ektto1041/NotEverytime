const mongoose = require('mongoose');

const lectureDetailSchema = new mongoose.Schema({
  lecture_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  lecture_semester: { type: String, required: true, trim: true, unique: true },
  lecture_time: [{ type: String, required: true, trim: true }],
  lecture_code: { type: String, required: true, trim: true, unique: true },
  professor: { type: String, trim: true },
});

const lectureDetail = mongoose.model('LectureDetail', lectureDetailSchema);
export default lectureDetail;