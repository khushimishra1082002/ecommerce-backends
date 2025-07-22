const PriceRange = require("../models/PriceRangesModel");

const getAllPriceRanges = async (req, res) => {
  try {
    const priceRanges = await PriceRange.find();
    res.status(200).json(priceRanges);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPriceRanges = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const priceRanges = await PriceRange.find({ category: categoryID });
    res.status(200).json(priceRanges);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createPriceRange = async (req, res) => {
  const { label, min, max, category } = req.body;
  try {
    const newPriceRange = await PriceRange.create({
      label,
      min,
      max,
      category,
    });
    res.status(201).json({
      message: "Price range added successfully",
      newPriceRange,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePriceRange = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPriceRange = await PriceRange.findByIdAndDelete(id);

    if (!deletedPriceRange) {
      return res.status(404).json({ message: "Price range not found" });
    }

    res.status(200).json({
      message: "Price range deleted successfully",
      deletedPriceRange,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getPriceRanges,
  createPriceRange,
  deletePriceRange,
  getAllPriceRanges,
};
