const mongoose = require("mongoose");

const emailAuthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
});

const emailAuth = mongoose.model("EmailAuth", emailAuthSchema);
module.exports = emailAuth;