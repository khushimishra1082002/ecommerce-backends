const express = require("express");
const router = express.Router();
const {  getAllBrand,
  createBrand,
  getSingleBrand,
  deleteBrand,
  updatedBrand,getFilteredBrand,deleteMultipleBrand,getAllBrandBySubcategory,
  getAllBrandByCategory,getAllBrandByMultipleSubcategory } = require("../controllers/brandController")

  router.get("/getAllBrand",getAllBrand)
  router.get("/getSingleBrand/:brandID",getSingleBrand)
  router.post("/createBrand",createBrand)
  router.put("/updatedBrand/:brandId",updatedBrand)
  router.delete("/deleteBrand/:BrandId",deleteBrand)
  router.get("/getFilteredBrand",getFilteredBrand)
  router.delete("/deleteMultipleBrand",deleteMultipleBrand)
  router.get("/getAllBrandBySubcategory/:subcategoryID",getAllBrandBySubcategory)
  router.get("/getAllBrandByCategory/:categoryID",getAllBrandByCategory)
  router.get("/getAllBrandByMultipleSubcategory",getAllBrandByMultipleSubcategory)

module.exports = router;


