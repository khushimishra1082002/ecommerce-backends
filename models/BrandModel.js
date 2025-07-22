const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }
});

module.exports = mongoose.model("Brand", brandSchema);
