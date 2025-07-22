const mongoose = require("mongoose");

const priceRangeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number }, 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("PriceRange", priceRangeSchema);
