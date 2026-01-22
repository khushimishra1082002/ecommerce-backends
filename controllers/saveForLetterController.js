const { Types } = require("mongoose");
const SavedForLater = require("../models/SaveForLetterCartModel");
const Cart = require("../models/CartModel");
const CartSummary = require("../utils/calculateCartSummary");

const saveForLaterController = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  try {
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or productId" });
    }

    const userObjId = new Types.ObjectId(userId);
    const prodId = new Types.ObjectId(productId);

    await Cart.updateOne(
      { userId: userObjId },
      { $pull: { items: { productId: prodId } } },
    );

    const cart = await Cart.findOne({ userId: userObjId });
    if (cart) {
      await CartSummary(cart);
      await cart.save();
    }

    const savedItem = await SavedForLater.findOne({
      userId: userObjId,
      productId: prodId,
    });
    if (savedItem) {
      savedItem.quantity = Number(quantity);
      await savedItem.save();
    } else {
      await SavedForLater.create({
        userId: userObjId,
        productId: prodId,
        quantity,
      });
    }

    const updatedCart = await Cart.findOne({ userId: userObjId }).populate(
      "items.productId",
    );
    const savedForLater = await SavedForLater.find({
      userId: userObjId,
    }).populate("productId");

    return res.status(200).json({
      success: true,
      message: "Product moved to Save for Later",
      cart: updatedCart || { items: [], summary: {} },
      savedForLater,
    });
  } catch (err) {
    console.error("Save for later error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const getSavedForLaterController = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const userObjId = new Types.ObjectId(userId);

    const savedItems = await SavedForLater.find({ userId: userObjId }).populate(
      "productId",
    );

    return res.status(200).json({
      success: true,
      count: savedItems.length,
      savedForLater: savedItems,
    });
  } catch (error) {
    console.error("Get Save For Later Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved products",
    });
  }
};

const removeSavedForLaterController = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }

    const userObjId = new Types.ObjectId(userId);
    const prodObjId = new Types.ObjectId(productId);

    const deletedItem = await SavedForLater.findOneAndDelete({
      userId: userObjId,
      productId: prodObjId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Saved product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from Save For Later",
    });
  } catch (error) {
    console.error("Remove Save For Later Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove saved product",
    });
  }
};

module.exports = {
  saveForLaterController,
  getSavedForLaterController,
  removeSavedForLaterController,
};
