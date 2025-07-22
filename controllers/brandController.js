const Brand = require("../models/BrandModel");
const ValidateBrandData = require("../models/BrandModel");
const Category = require("../models/CategoryModel");
const Subcategory = require("../models/SubcategoryModel");
const slugify = require("slugify");
const mongoose = require("mongoose");

const getAllBrandBySubcategory = async (req, res) => {
  const { subcategoryID } = req.params;
  try {
    const allBrand = await Brand.find({ subcategory: subcategoryID })
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!allBrand || allBrand.length === 0) {
      return res.status(404).json("Brand not available");
    }

    res.status(200).json(allBrand);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

const getAllBrandByCategory = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const allBrand = await Brand.find({ category: categoryID })
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!allBrand || allBrand.length === 0) {
      return res.status(404).json("Brand not available");
    }

    res.status(200).json(allBrand);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

const getAllBrand = async (req, res) => {
  try {
    const brand = await Brand.find()
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!brand || brand.length === 0) {
      return res.status(404).json({ message: "No brand found" });
    }

    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSingleBrand = async (req, res) => {
  const { brandID } = req.params;
  try {
    const singleBrand = await Brand.findById(brandID)
      .populate("category", "name")
      .populate("subcategory", "name");
    if (!singleBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(singleBrand);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name, isActive, category, subcategory } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const errors = ValidateBrandData({
      name,
      isActive,
      category,
      slug,
      subcategory,
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(subcategory)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    const existingSubcategory = await Subcategory.findById(subcategory);
    if (!existingSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const newBrand = await Brand.create({
      name,
      isActive,
      category,
      slug,
      subcategory,
    });

    res.status(201).json({
      ok: true,
      message: "Brand added successfully",
      brand: newBrand,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatedBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    console.log("", brandId);

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ message: "Invalid brand ID format" });
    }

    const updatedData = req.body;
    const newUpdatedData = await Brand.findByIdAndUpdate(brandId, updatedData, {
      new: true,
    });

    if (!newUpdatedData) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand edit successfully",
      updatedBrand: newUpdatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { BrandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(BrandId)) {
      return res.status(400).json({ message: "Invalid brand ID format" });
    }

    const deletedBrand = await Brand.findByIdAndDelete(BrandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand deleted successfully",
      deletedBrand,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getFilteredBrand = async (req, res) => {
  try {
    const { q } = req.query;

    let brands = await Brand.find()
      .populate("category", "name")
      .populate("subcategory", "name");

    if (q) {
      const lowerQ = q.toLowerCase();
      brands = brands.filter((brand) => {
        return (
          brand.name?.toLowerCase().includes(lowerQ) ||
          brand.category?.name?.toLowerCase().includes(lowerQ) ||
          brand.subcategory?.name?.toLowerCase().includes(lowerQ)
        );
      });
    }

    res.status(200).json(brands);
  } catch (err) {
    console.error("getFilteredBrand Error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const deleteMultipleBrand = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Brand.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Brands deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

const getAllBrandByMultipleSubcategory = async (req, res) => {
  try {
    const subcategoryIDs = req.query.ids?.split(",") || [];

    console.log("subcategoryIDs", subcategoryIDs);

    if (subcategoryIDs.length === 0) {
      return res.status(400).json({ message: "Subcategory IDs are required" });
    }

    const brands = await Brand.find({
      subcategory: { $in: subcategoryIDs },
    })
      .populate("category", "name")
      .populate("subcategory", "name");

    console.log("brands", brands);

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }

    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching brands by subcategories",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBrand,
  createBrand,
  getSingleBrand,
  deleteBrand,
  updatedBrand,
  getFilteredBrand,
  deleteMultipleBrand,
  getAllBrandBySubcategory,
  getAllBrandByCategory,
  getAllBrandByMultipleSubcategory,
};
