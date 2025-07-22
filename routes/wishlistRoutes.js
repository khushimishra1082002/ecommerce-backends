const express = require("express");
const router = express.Router();
const {
  getWishlistProduct,
  addProductInwishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");

router.get("/getWishlistProduct/:userId", getWishlistProduct);
router.post("/addProductInwishlist", addProductInwishlist);
router.delete(
  "/removeProductFromWishlist/:userId/:productId",
  removeProductFromWishlist
);

module.exports = router;
