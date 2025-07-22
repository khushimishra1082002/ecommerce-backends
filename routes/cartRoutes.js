const express = require("express");
const router = express.Router();
const { getCartProduct } = require("../controllers/cartController")
const { addProductInCart } = require("../controllers/cartController")
const {deleteProductFromCart} = require("../controllers/cartController")
const {updateCartProductQuantity} = require("../controllers/cartController")

router.get("/getCartProduct/:userId",getCartProduct)
router.post("/addProductInCart",addProductInCart)
router.delete("/deleteProductFromCart/:userId/:productId",deleteProductFromCart)
router.put("/updateCartProductQuantity",updateCartProductQuantity)

module.exports = router;
