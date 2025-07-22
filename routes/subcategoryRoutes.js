const express = require("express");
const router = express.Router();
const {  getAllSubcategory,
  createSubcategory,
  getSingleSubcategory,
  deleteSubcategory,
  updatedSubcategory,getMultipleSubcategories,deleteMultipleSubcategory,getFilteredSubategories,
getAllSubcategoryByCategory} = require("../controllers/subcategoryController")

  router.get("/getAllSubcategory",getAllSubcategory)
  router.get("/getSingleSubcategory/:subcategoryID",getSingleSubcategory)
  router.post("/createSubcategory",createSubcategory)
  router.put("/updatedSubcategory/:subcategoryID",updatedSubcategory)
  router.delete("/deleteSubcategory/:subcategoryID",deleteSubcategory)
  router.get("/getMultipleSubcategories",getMultipleSubcategories)
  router.delete("/deleteMultipleSubcategory",deleteMultipleSubcategory)
  router.get("/getFilteredSubategories",getFilteredSubategories)
  router.get("/getAllSubcategoryByCategory/:categoryId",getAllSubcategoryByCategory)

module.exports = router;


