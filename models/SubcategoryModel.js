const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
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
  availableColors: {
    type: [String],
    default: [],
  },
  availableGenders: {
    type: [String],
    enum: ["Men", "Women", "Boy", "Girl", "Unisex"],
    default: [],
  },
  availableSizes: {
    type: [String],
    default: [],
  },

});

module.exports = mongoose.model("Subcategory", subCategorySchema);
