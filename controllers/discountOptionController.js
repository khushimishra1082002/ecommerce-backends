const DiscountOption = require("../models/DiscountOptionModel");

const getDiscountOptions = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const discountOptions = await DiscountOption.findOne({ categoryId });

    if (!discountOptions) {
      return res.status(404).json({ message: "Discount Option not found" });
    }

    res.status(200).json(discountOptions);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const createDiscountOptions = async (req, res) => {
  const { categoryId, options } = req.body;

  console.log("categoryId", categoryId);

  try {
    const exists = await DiscountOption.findOne({ categoryId });
    console.log(exists, "exist data");
    if (exists) {
      return res
        .status(400)
        .json({ message: "Discount Option already exists for this category" });
    }

    const newDiscountOption = await DiscountOption.create({
      categoryId,
      options,
    });

    console.log("newDiscountOption", newDiscountOption);

    res.status(201).json({
      message: "Discount Option Created Successfully",
      discountOption: newDiscountOption,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  getDiscountOptions,
  createDiscountOptions,
};
