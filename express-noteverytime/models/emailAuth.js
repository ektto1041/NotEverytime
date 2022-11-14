const mongoose = require('mongoose');

const emailAuthSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authenicated_at: { type: Date }
});

const emailAuth = mongoose.model('EmailAuth', emailAuthSchema);
export default emailAuth;