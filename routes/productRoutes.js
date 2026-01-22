const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  newArrivalsProduct,
  featuredProducts,
  getTrendingProducts,
  postRecentlyViwedProduct,
  getRecentlyViewdProduct,
  getSimilorProduct,
  getRecommendedProduct,
  getFilteredProducts,
  deleteMultipleProduct,
  deleteNullRecentlyViewed,
} = require("../controllers/productController");
const multipleUpload = require("../middlewares/MultipleUpload"); //
const singleUpload = require("../middlewares/singleUpload"); //

router.get("/getAllProducts", getAllProducts);
router.get("/getSingleProduct/:productId", getSingleProduct);
router.post("/createProduct", multipleUpload, createProduct);
router.put("/updateProduct/:productId", multipleUpload, updateProduct);
router.delete("/deleteProduct/:productId", deleteProduct);
router.get("/newArrivalsProduct", newArrivalsProduct);
router.get("/featuredProducts", featuredProducts);
router.get("/getTrendingProducts", getTrendingProducts);
router.post("/postrecentlyViwedProduct", postRecentlyViwedProduct);
router.get("/getRecentlyViewdProduct/:userId", getRecentlyViewdProduct);
router.get("/getSimilorProduct/:productId", getSimilorProduct);
router.get("/getRecommendedProduct/:userId", getRecommendedProduct);
router.get("/getFilteredProducts", getFilteredProducts);
router.delete("/deleteMultipleProduct", deleteMultipleProduct);
router.delete("/deleteNullRecentlyViewed/:userId", deleteNullRecentlyViewed);

module.exports = router;
