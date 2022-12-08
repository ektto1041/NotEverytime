const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  accountId: { type: String, required : true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, trim: true, unique: true},
  isAuth: { type: Boolean, default: false },
  profileImage: { type: String }
});

userSchema.pre('save', async function() {
  if(this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 5);
  }
}); 

const user = mongoose.model('User', userSchema);
module.exports = user;
