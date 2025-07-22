const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    deliveryInfo: {
      fullname: String,
      email: String,
      phoneNo: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
    },
    summary: {
      totalPrice: Number,
      totalDiscount: Number,
      totalTax: Number,
      finalTotal: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    paymentDetails: {
      upiId: String,
      cardNumber: String,
      expiry: String,
      cvv: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
