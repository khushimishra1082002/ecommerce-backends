const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  link: { type: String },
  location: {
    type: String,
    required: true,
    enum: [
      "herosection",
      "homepage_top",
    ],
  },
  displayOrder: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Poster', posterSchema);
