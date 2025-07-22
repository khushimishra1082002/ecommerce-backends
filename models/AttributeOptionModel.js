const mongoose = require("mongoose");

const attributeOptionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    attributes: {
      type: Map,
      of: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AttributeOption", attributeOptionSchema);
