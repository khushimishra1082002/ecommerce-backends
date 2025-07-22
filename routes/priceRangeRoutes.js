const express = require("express");
const router = express.Router();
const {
  getPriceRanges,
  createPriceRange,
  deletePriceRange,
  getAllPriceRanges,
} = require("../controllers/priceRangeController");

router.get("/getPriceRanges/:categoryID", getPriceRanges);
router.post("/createPriceRange", createPriceRange);
router.delete("/deletePriceRange/:id", deletePriceRange);
router.get("/getAllPriceRanges", getAllPriceRanges);

module.exports = router;
