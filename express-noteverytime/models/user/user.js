const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountId: { type: String, required : true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, trim: true, unique: true},
  isAuth: { type: Boolean, default: false },
  profileImage: { type: String }
});

const user = mongoose.model('User', userSchema);
module.exports = user;
