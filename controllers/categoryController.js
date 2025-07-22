const Category = require("../models/CategoryModel");
const slugify = require("slugify");
const { ValidateCategoryData } = require("../validators/categoryValidators");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;
    if (!categoryID) {
      return res.status(400).json({ message: "Category ID does not exist" });
    }
    const singleCategory = await Category.findById(categoryID);
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    let { name, description, isActive } = req.body;

    const image = req.file ? req.file.filename : "";

    const slug = slugify(name, { lower: true, strict: true });

    const newCategory = await Category.create({
      name,
      description,
      image,
      slug,
    });

    res.status(201).json({
      ok: true,
      message: "Category added successfully",
      product: newCategory,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;
    if (!categoryID) {
      return res.status(404).json({ message: "Category ID does not exist" });
    }
    const deleteCategory = await Category.findByIdAndDelete(categoryID);
    res.status(200).json({
      message: "Category deleted successfully",
      deleteCategory: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const updatedCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;
    if (!categoryID) {
      return res.status(404).json({ message: "CategoryID not found" });
    }

    const existingCategory = await Category.findById(categoryID);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name } = req.body;
    const isActive = req.body.isActive === "true";

    const image = req.file ? req.file.filename : existingCategory.image;

    const updatedData = {
      name,
      description: req.body.description,
      image,
      isActive,
    };

    // Validate
    const errors = ValidateCategoryData({ name, image, isActive });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newUpdatedData = await Category.findByIdAndUpdate(
      categoryID,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Category updated successfully",
      newUpdatedData,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const getFilteredCategories = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    console.log("Filter Object:", JSON.stringify(filter, null, 2));

    const categories = await Category.find(filter);

    console.log("Filtered Categories Count:", categories.length);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

const deleteMultipleCategory = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Category.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  getSingleCategory,
  deleteCategory,
  updatedCategory,
  getFilteredCategories,
  deleteMultipleCategory,
};
