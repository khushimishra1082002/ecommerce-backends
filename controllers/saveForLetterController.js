const { Types } = require("mongoose"); // safer import
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

    // ✅ Convert string IDs to ObjectId
    const userObjId = new Types.ObjectId(userId);
    const prodId = new Types.ObjectId(productId);

    // 1️⃣ Remove product from cart using $pull
    await Cart.updateOne(
      { userId: userObjId },
      { $pull: { items: { productId: prodId } } }
    );

    // 2️⃣ Re-fetch cart and recalc summary
    const cart = await Cart.findOne({ userId: userObjId });
    if (cart) {
      await CartSummary(cart);
      await cart.save();
    }

    // 3️⃣ Add or update in SavedForLater
    const savedItem = await SavedForLater.findOne({ userId: userObjId, productId: prodId });
    if (savedItem) {
      savedItem.quantity = Number(quantity);
      await savedItem.save();
    } else {
      await SavedForLater.create({ userId: userObjId, productId: prodId, quantity });
    }

    // 4️⃣ Return updated data
    const updatedCart = await Cart.findOne({ userId: userObjId }).populate("items.productId");
    const savedForLater = await SavedForLater.find({ userId: userObjId }).populate("productId");

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

module.exports = { saveForLaterController };
