const mongoose = require('mongoose');

const lectureDetailSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  lectureSemester: { type: String, required: true, trim: true },
  lectureTime: [{ type: String, required: true, trim: true }],
  lectureCode: { type: String, required: true, trim: true },
});

const lectureDetail = mongoose.model('LectureDetail', lectureDetailSchema);
module.exports = lectureDetail;