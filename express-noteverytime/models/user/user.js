const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required : true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true, trim: true, unique: true},
  is_auth: { type: Boolean, default: false },
  profile_image: { type: String, required: true }
});

const user = mongoose.model('User', userSchema);
module.exports = user;
