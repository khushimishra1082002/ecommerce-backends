const Cart = require("../models/CartModel");
const CartSummary = require("../utils/calculateCartSummary");

const getCartProduct = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        items: [],
        summary: {
          totalPrice: 0,
          totalDiscount: 0,
          totalTax: 0,
          finalTotal: 0,
        },
      });
    }

    return res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const addProductInCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });

      await CartSummary(cart);
      await cart.save();
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await CartSummary(cart);
      await cart.save();
    }

    res.status(200).json({ message: "Product added in cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart not found",
        items: [],
        summary: {
          totalPrice: 0,
          totalDiscount: 0,
          totalTax: 0,
          finalTotal: 0,
        },
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await CartSummary(cart);
    await cart.save();

    res.status(200).json({
      message: "Product deleted from cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCartProductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      );
    } else {
      item.quantity = quantity;
    }

    await CartSummary(cart);
    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
    );

    res.status(200).json({
      message: "Cart Quantity Updated Successfully",
      cart: updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.summary = {
      totalPrice: 0,
      totalDiscount: 0,
      totalTax: 0,
      finalTotal: 0,
    };

    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getCartProduct,
  addProductInCart,
  deleteProductFromCart,
  updateCartProductQuantity,
  clearCart,
};
