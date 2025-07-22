const mongoose = require("mongoose");

const discountOptionSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  options: [
    {
      label: String,
      value: Number,
    },
  ],
});

module.exports = mongoose.model("DiscountOption", discountOptionSchema);
