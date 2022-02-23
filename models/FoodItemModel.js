const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: String, required: true },
  carbs: { type: String, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  weight: { type: String, required: true }
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
