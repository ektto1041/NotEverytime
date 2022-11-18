const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lecture_id: { type: String, required : true, trim: true },
  lecture_name: { type: String, required: true, trim: true },
  lecture_professor: { type: String, required: true, trim: true}
});

const lecture = mongoose.model('Lecture', lectureSchema);
export default lecture;