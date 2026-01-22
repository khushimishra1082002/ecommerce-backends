const Subcategory = require("../models/SubcategoryModel");
const {
  ValidateSubcategoryData,
} = require("../validators/subcategoryValidators");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");

const getAllSubcategoryByCategory = async (req, res) => {
  const { categoryId } = req.params;

  console.log("categoryId:", categoryId);

  try {
    const subcategories = await Subcategory.find({ category: categoryId });

    if (!subcategories || subcategories.length === 0) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category" });
    }

    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllSubcategory = async (req, res) => {
  try {
    const subcategories = await await Subcategory.find().populate(
      "category",
      "name",
    );

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found" });
    }

    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSingleSubcategory = async (req, res) => {
  const { subcategoryID } = req.params;

  try {
    const singleSubcategory = await Subcategory.findById(subcategoryID);
    if (!singleSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(singleSubcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createSubcategory = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      isActive,
      category,
      availableColors,
      availableGenders,
      availableSizes,
    } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const errors = ValidateSubcategoryData({
      name,
      isActive,
      category,
      slug,
      availableColors,
      availableGenders,
      availableSizes,
    });
    if (errors.length > 0) {
      res.status(400).json({ errors });
    }
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const newSubcategory = await Subcategory.create({
      name,
      isActive,
      category,
      slug,
      availableColors,
      availableGenders,
      availableSizes,
    });
    res.status(201).json({
      ok: true,
      message: "Subcategory added successfully",
      subcategory: newSubcategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatedSubcategory = async (req, res) => {
  try {
    const { subcategoryID } = req.params;
    const updatedData = req.body;
    const newUpdatedData = await Subcategory.findByIdAndUpdate(
      subcategoryID,
      updatedData,
      {
        new: true,
      },
    );
    res.status(200).json({
      message: "Subcategory edit successfully",
      updatedSubcategory: newUpdatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(subcategoryID)) {
      return res.status(400).json({ message: "Invalid subcategory ID format" });
    }

    const deleteSubcategoryData =
      await Subcategory.findByIdAndDelete(subcategoryID);

    if (!deleteSubcategoryData) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({
      message: "Subcategory deleted successfully",
      deleteSubcategoryData,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMultipleSubcategories = async (req, res) => {
  try {
    const ids = req.query.ids.split(",") || [];
    if (!ids) {
      return res.status(400).json({ message: "No subcategory IDs provided" });
    }
    const subcategories = await Subcategory.find({
      _id: { $in: ids },
    });
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

const deleteMultipleSubcategory = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Subcategory.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Subcateories deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

const getFilteredSubategories = async (req, res) => {
  try {
    const { q } = req.query;

    let subcategories = await Subcategory.find().populate("category", "name");

    if (q) {
      const lowerQ = q.toLowerCase();

      subcategories = subcategories.filter(
        (sub) =>
          sub.name.toLowerCase().includes(lowerQ) ||
          sub.category?.name?.toLowerCase().includes(lowerQ),
      );
    }

    console.log("Filtered Categories Count:", subcategories.length);
    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error filtering subcategories:", err.message);
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

module.exports = {
  getAllSubcategory,
  createSubcategory,
  getSingleSubcategory,
  deleteSubcategory,
  updatedSubcategory,
  getMultipleSubcategories,
  deleteMultipleSubcategory,
  getFilteredSubategories,
  getAllSubcategoryByCategory,
};
