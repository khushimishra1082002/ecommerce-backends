const DeliveryInfo = require("../models/DeliveryInfoModel");

const getDeliveryInfoUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const info = await DeliveryInfo.findOne({ userId });

    if (!info) {
      return res.status(404).json({ message: "Delivery info not found" });
    }

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const postdeliveryInfoUser = async (req, res) => {
  const { fullname, email, phoneNo, address1, address2, city, state, zip } =
    req.body;

  try {
    const userId = req.user.id;

    const existingInfo = await DeliveryInfo.findOne({ userId });
    if (existingInfo) {
      await DeliveryInfo.deleteOne({ userId });
    }

    const info = await DeliveryInfo.create({
      userId,
      fullname,
      email,
      phoneNo,
      address1,
      address2,
      city,
      state,
      zip,
    });

    res.status(201).json({ message: "Delivery info saved successfully", info });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  postdeliveryInfoUser,
  getDeliveryInfoUser,
};
