const mongoose = require("mongoose");

const userStatsSchema = mongoose.Schema({
  userId: { type: String, required: true },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  targetCalories: { type: String, required: false }
});

module.exports = UserStats = mongoose.model("userStats", userStatsSchema);
