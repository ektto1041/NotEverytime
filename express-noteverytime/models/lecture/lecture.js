const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lectureSubjectId: { type: String, required : true, trim: true },
  lectureName: { type: String, required: true, trim: true },
  lectureProfessor: { type: String, required: true, trim: true}
});

lectureSchema.index({ lectureName: 'text', lectureProfessor: 'text' });
const lecture = mongoose.model('Lecture', lectureSchema);
lecture.createIndexes();
module.exports = lecture;