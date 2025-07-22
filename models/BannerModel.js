const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, required: false },
  location: { type: String, required: true }, 
  displayOrder: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Banner",bannerSchema );
