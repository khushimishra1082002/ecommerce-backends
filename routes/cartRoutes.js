const express = require("express");
const router = express.Router();
const { getCartProduct } = require("../controllers/cartController")
const { addProductInCart } = require("../controllers/cartController")
const {deleteProductFromCart} = require("../controllers/cartController")
const {updateCartProductQuantity} = require("../controllers/cartController")
const {clearCart} = require("../controllers/cartController")

router.get("/getCartProduct/:userId",getCartProduct)
router.post("/addProductInCart",addProductInCart)
router.delete("/deleteProductFromCart/:userId/:productId",deleteProductFromCart)
router.put("/updateCartProductQuantity",updateCartProductQuantity)
router.delete("/clearCart/:userId", clearCart);

module.exports = router;
