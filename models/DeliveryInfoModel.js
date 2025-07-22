const mongoose = require("mongoose");

const deliveryInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  fullname: String,
  email: String,
  phoneNo: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
});

module.exports = mongoose.model("DeliveryInfo", deliveryInfoSchema);
