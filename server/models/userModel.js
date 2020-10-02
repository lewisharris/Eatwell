const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  username: { type: String, required: true },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  targetCalories: { type: String, required: false }
});

module.exports = User = mongoose.model("user", userSchema);
