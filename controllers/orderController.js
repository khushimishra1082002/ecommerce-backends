const Order = require("../models/OrderModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email phoneNo address")
      .populate("items.productId", "name image price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to get all orders", error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email phoneNo address")
      .populate("items.productId", "name image price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      deliveryInfo,
      summary,
      paymentMethod,
      paymentDetails,
      status = "Pending",
    } = req.body;

    console.log(deliveryInfo);

    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !deliveryInfo ||
      !summary ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const newOrder = await Order.create({
      userId,
      items,
      deliveryInfo,
      summary,
      paymentMethod,
      paymentDetails,
      status,
    });

    const data = await User.findByIdAndUpdate(
      userId,
      {
        phoneNo: deliveryInfo.phoneNo,
        address: {
          street:
            deliveryInfo.address1 +
            (deliveryInfo.address2 ? `, ${deliveryInfo.address2}` : ""),
          city: deliveryInfo.city,
          state: deliveryInfo.state,
          zipCode: deliveryInfo.zip,
          country: deliveryInfo.country || "India",
        },
      },
      { new: true },
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error });
  }
};

const getFilteredOrders = async (req, res) => {
  try {
    const { q } = req.query;

    console.log("Search Query:", q);

    const filter = {};

    if (q) {
      const orFilters = [];

      // If q is a valid MongoDB ObjectId, add _id match
      if (mongoose.Types.ObjectId.isValid(q)) {
        orFilters.push({ _id: new mongoose.Types.ObjectId(q) });
      }

      // Search in string fields (case-insensitive)
      const regex = { $regex: q, $options: "i" };

      orFilters.push(
        { "userId.fullname": regex },
        { "userId.email": regex },
        { "deliveryInfo.fullname": regex },
        { "deliveryInfo.email": regex },
        { "deliveryInfo.phoneNo": regex },
        { "deliveryInfo.city": regex },
        { status: regex },
        { paymentMethod: regex },
      );

      filter.$or = orFilters;
    }

    const orders = await Order.find(filter).populate("userId");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching filtered orders:", err);
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: err.message });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  getUserOrders,
  deleteOrder,
  getFilteredOrders,
  updateOrderStatus,
};
