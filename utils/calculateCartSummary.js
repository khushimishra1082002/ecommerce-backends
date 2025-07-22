const CartSummary = async (cart) => {
  await cart.populate("items.productId");

  const items = cart.items;

  if (!items || items.length === 0) {
    cart.summary = {
      totalPrice: 0,
      totalDiscount: 0,
      totalTax: 0,
      finalTotal: 0,
    };

    cart.markModified("summary");
    return;
  }

  const totalPrice = items.reduce((acc, item) => {
    const price = item.productId.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const totalDiscount = items.reduce((acc, item) => {
    const price = item.productId.price || 0;
    const discount = item.productId.discount || 0;
    const discountAmount = (price * discount * item.quantity) / 100;
    return acc + discountAmount;
  }, 0);

  const totalTax = 0; // You can add GST etc. later
  const finalTotal = totalPrice - totalDiscount + totalTax;

  cart.summary = {
    totalPrice,
    totalDiscount,
    totalTax,
    finalTotal,
  };

  cart.markModified("summary");
};

module.exports = CartSummary;
