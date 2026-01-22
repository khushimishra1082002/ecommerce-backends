const Products = require("../models/ProductModel");
const { ValidateProductData } = require("../validators/productValidators");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");
const Subcategory = require("../models/SubcategoryModel");
const User = require("../models/UserModel");
const Brand = require("../models/BrandModel");

const getAllProducts = async (req, res) => {
  try {
    const allproduct = await Products.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    if (!allproduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(allproduct);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  const productID = req.params.productId;
  console.log("productID", productID);

  try {
    const singleProduct = await Products.findById(productID)
      .populate("brand", "name")
      .populate("category", "name")
      .populate("subcategory", "name");
    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    singleProduct.views = (singleProduct.views || 0) + 1;
    await singleProduct.save();
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  console.log("FILES:", req.files);

  try {
    let {
      name,
      description,
      price,
      category,
      subcategory,
      brand,
      discount,
      inStock,
      isActive,
      isFeatured,
      attributes,
      taxPercentage,
      taxRuppess,
      colors,
      gender,
      size,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const slug = slugify(name, { lower: true, strict: true });

    if (attributes && typeof attributes === "string") {
      try {
        attributes = JSON.parse(attributes);
      } catch (err) {
        return res.status(400).json({ message: "Invalid JSON in attributes" });
      }
    }

    const normalizeToArray = (value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    };

    const normalizedColors = normalizeToArray(colors);
    const normalizedGender = normalizeToArray(gender);
    const normalizedSize = normalizeToArray(size);

    // Validate
    const errors = ValidateProductData({
      name,
      description,
      price,
      category,
      subcategory,
      brand,
      discount,
      inStock,
      image: images,
      slug,
      taxPercentage,
      taxRuppess,
      isActive,
      isFeatured,
      colors: normalizedColors,
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newProduct = await Products.create({
      name,
      description,
      price,
      category,
      subcategory,
      brand,
      discount,
      inStock,
      image: images,
      slug,
      attributes,
      taxPercentage,
      taxRuppess,
      colors: normalizedColors,
      gender: normalizedGender,
      size: normalizedSize,
      isActive,
      isFeatured,
    });

    res.status(201).json({
      ok: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    console.log("BODY IMAGE:", req.body.image);
    console.log("FILES:", req.files);

    const existingProduct = await Products.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = req.body;

    if (updateData.attributes && typeof updateData.attributes === "string") {
      try {
        updateData.attributes = JSON.parse(updateData.attributes);
      } catch (err) {
        return res.status(400).json({ message: "Invalid attributes format" });
      }
    }

    if (req.files && req.files.length > 0) {
      updateData.image = req.files.map((file) => file.path);
    } else {
      updateData.image = existingProduct.image;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updateData,
      { new: true },
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const deletedProduct = await Products.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const newArrivalsProduct = async (req, res) => {
  try {
    const newProduct = await Products.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const featuredProducts = async (req, res) => {
  try {
    const product = await Products.find({ featured: true })
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const getTrendingProducts = async (req, res) => {
  try {
    const trending = await Products.find()
      .sort({ views: -1 })
      .limit(10)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    res.status(200).json(trending);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const postRecentlyViwedProduct = async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Invalid or missing productId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.productId?.toString() !== productId.toString(),
    );

    user.recentlyViewed.unshift({
      productId,
      viewedAt: new Date(),
    });

    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 10);
    }

    await user.save();
    res.status(200).json({ message: "Recently viewed products updated" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteRecentlyViewedProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.productId?.toString() !== productId,
    );

    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from recently viewed list" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting recently viewed product",
      error: error.message,
    });
  }
};

const getRecentlyViewdProduct = async (req, res) => {
  const { userId } = req.params;
  console.log("userIdmm", userId);

  try {
    const user = await User.findById(userId).populate(
      "recentlyViewed.productId",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const filteredRecentlyViewed = user.recentlyViewed.filter(
      (item) => item.productId !== null,
    );

    res.json(filteredRecentlyViewed);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const getSimilorProduct = async (req, res) => {
  const productId = req.params.productId;
  // console.log("productId from params:", productId);

  try {
    const product = await Products.findById(productId)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    // console.log("product", product);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    const similorProducts = await Products.find({
      _id: { $ne: productId },
      subcategory: product.subcategory,
    }).limit(10);
    // console.log("similorProducts", similorProducts);

    res.status(200).json(similorProducts);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const getRecommendedProduct = async (req, res) => {
  const { userId } = req.params;
  console.log("kiii", userId);

  try {
    const user = await User.findById(userId)
      .populate("recentlyViewed.productId")
      .lean();

    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recent = user.recentlyViewed
      .filter((item) => item.productId)
      .slice(-5);

    console.log("recent", recent);

    const viewedIds = recent.map((item) => item.productId._id.toString());

    console.log("viewedIds", viewedIds);

    const categoryIds = [
      ...new Set(recent.map((item) => item.productId.category.toString())),
    ];

    const recommendedProducts = await Products.find({
      _id: { $nin: viewedIds },
      category: { $in: categoryIds },
    })
      .limit(10)
      .populate("category")
      .populate("brand")
      .populate("subcategory")
      .lean();

    console.log("recommendedProducts", recommendedProducts);

    res.status(200).json(recommendedProducts);
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      brand,
      gender,
      size,
      minPrice,
      maxPrice,
      q,
      colors,
      // availability,
      discount,
      inStock,
    } = req.query;

    const filter = {};

    console.log("bfilter", filter);

    console.log("bhai", category);

    console.log("discountng", discount);

    console.log("inStock", inStock);

    if (category) {
      let categoryDoc = null;
      console.log("categoryDoc", categoryDoc);

      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryDoc = await Category.findById(category);
      }

      if (!categoryDoc) {
        categoryDoc = await Category.findOne({
          name: new RegExp("^" + category + "$", "i"),
        });
      }

      if (!categoryDoc)
        return res.status(400).json({ message: "Invalid category" });

      filter.category = categoryDoc._id;
    }

    if (subcategory) {
      const subcategories = Array.isArray(subcategory)
        ? subcategory
        : [subcategory];

      const subcategoryIds = [];

      for (const sub of subcategories) {
        let subDoc = null;

        if (mongoose.Types.ObjectId.isValid(sub)) {
          subDoc = await Subcategory.findById(sub);
        }

        if (!subDoc) {
          subDoc = await Subcategory.findOne({
            name: new RegExp("^" + sub + "$", "i"),
          });
        }

        if (subDoc) {
          subcategoryIds.push(subDoc._id);
        }
      }

      if (subcategoryIds.length > 0) {
        filter.subcategory = { $in: subcategoryIds };
      } else {
        return res.status(400).json({ message: "Invalid subcategories" });
      }
    }

    if (brand) {
      const brandArray = Array.isArray(brand) ? brand : [brand];
      const brandIds = [];

      for (const b of brandArray) {
        let brandDoc = null;

        if (mongoose.Types.ObjectId.isValid(b)) {
          brandDoc = await Brand.findById(b);
        }

        if (!brandDoc) {
          brandDoc = await Brand.findOne({
            name: new RegExp("^" + b + "$", "i"),
          });
        }

        if (brandDoc) {
          brandIds.push(brandDoc._id);
        }
      }

      if (brandIds.length > 0) {
        filter.brand = { $in: brandIds };
      }
    }

    if (q) {
      const regex = new RegExp(q, "i");

      const matchedCategory = await Category.findOne({ name: regex });
      const matchedSubcategory = await Subcategory.findOne({ name: regex });
      const matchedBrand = await Brand.findOne({ name: regex });

      const orConditions = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];

      if (matchedCategory) {
        orConditions.push({ category: matchedCategory._id });
      }

      if (matchedSubcategory) {
        orConditions.push({ subcategory: matchedSubcategory._id });
      }

      if (matchedBrand) {
        orConditions.push({ brand: matchedBrand._id });
      }

      filter.$or = orConditions;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice.replace(/,/g, ""));
      if (maxPrice) filter.price.$lte = Number(maxPrice.replace(/,/g, ""));
    }

    if (discount) {
      const discountValues = Array.isArray(discount) ? discount : [discount];
      const parsed = discountValues
        .map((d) => {
          const num = Number(d);
          return isNaN(num) ? null : num;
        })
        .filter((d) => d !== null);

      if (parsed.length > 0) {
        const maxDiscount = Math.min(...parsed);
        filter.discount = { $gte: maxDiscount };
      } else {
        return res.status(400).json({ message: "Invalid discount values" });
      }
    }

    if (gender)
      filter["attributes.Gender"] = Array.isArray(gender)
        ? { $in: gender }
        : gender;

    if (size)
      filter["attributes.Size"] = Array.isArray(size) ? { $in: size } : size;

    if (colors)
      filter["attributes.Color"] = Array.isArray(colors)
        ? { $in: colors }
        : colors;

    //  Stock Filter
    if (inStock === "true") {
      filter.inStock = true;
    } else if (inStock === "false") {
      filter.inStock = false;
    }

    //  Final query
    const products = await Products.find(filter)
      .populate("category")
      .populate("subcategory")
      .populate("brand");

    res.status(200).json(products);
  } catch (error) {
    console.error("Error filtering products:", error.message);
    res
      .status(500)
      .json({ message: "Error filtering products", error: error.message });
  }
};

const deleteMultipleProduct = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Products.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting products", error: error.message });
  }
};

const deleteNullRecentlyViewed = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.productId !== null && item.productId !== undefined,
    );

    await user.save();

    res
      .status(200)
      .json({ message: "Null or missing productId entries removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  newArrivalsProduct,
  featuredProducts,
  postRecentlyViwedProduct,
  getTrendingProducts,
  getRecentlyViewdProduct,
  getSimilorProduct,
  getRecommendedProduct,
  getFilteredProducts,
  deleteMultipleProduct,
  deleteRecentlyViewedProduct,
  deleteNullRecentlyViewed,
};
