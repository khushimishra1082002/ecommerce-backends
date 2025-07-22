const AttributeOption = require("../models/AttributeOptionModel");

const getAttributeOptions = async (req, res) => {
  const { categoryId, subcategoryId } = req.query;
  try {
    const filter = {};
    if (categoryId) filter.category = categoryId;
    if (subcategoryId) filter.subcategory = subcategoryId;
    const options = await AttributeOption.find(filter)
      .populate("category")
      .populate("subcategory");
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createAttributeOptopns = async (req, res) => {
  const { attributes, categoryId, subcategoryId } = req.body;
  try {
    const newAttributeOption = new AttributeOption({
      category: categoryId,
      subcategory: subcategoryId,
      attributes,
    });
    const saved = await newAttributeOption.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

module.exports = {
  getAttributeOptions,
  createAttributeOptopns,
};
