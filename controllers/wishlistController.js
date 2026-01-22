const Wishlist = require("../models/wishlistModel");

const getWishlistProduct = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId",
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addProductInwishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [{ productId }],
      });
    } else {
      if (!wishlist.products) {
        wishlist.products = [];
      }

      // Check if the product already exists in wishlist
      const alreadyExists = wishlist.products.some(
        (item) => item.productId.toString() === productId,
      );

      if (alreadyExists) {
        return res.status(200).json({ message: "Product already in wishlist" });
      }

      // Add product
      wishlist.products.push({ productId });
    }

    await wishlist.save();

    return res.status(200).json({
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== productId,
    );
    await wishlist.save();
    res.status(200).json({ message: "Product deleted successfully", wishlist });
  } catch (err) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

module.exports = {
  getWishlistProduct,
  addProductInwishlist,
  removeProductFromWishlist,
};
