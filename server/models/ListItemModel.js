const mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = Item = mongoose.model("item", ListItemSchema);
