const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  _id: { type: String, required : true, trim: true, unique: true },
  lecture_name: { type: String, required: true, trim: true, unique: true },
});

const lecture = mongoose.model('Lecture', lectureSchema);
export default lecture;