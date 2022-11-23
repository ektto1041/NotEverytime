const mongoose = require('mongoose');

const emailAuthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authenicatedAt: { type: Date }
});

const emailAuth = mongoose.model('EmailAuth', emailAuthSchema);
export default emailAuth;