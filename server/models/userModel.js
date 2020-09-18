const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  username: { type: String }
});

module.exports = User = mongoose.model("user", userSchema);
