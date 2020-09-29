const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = Meal = mongoose.model("Meal", MealSchema);
