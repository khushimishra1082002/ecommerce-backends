const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory,
  getSingleCategory,
  deleteCategory,
  updatedCategory,
  getFilteredCategories,
  deleteMultipleCategory,
} = require("../controllers/categoryController");
const singleUpload = require("../middlewares/singleUpload");

router.get("/getAllCategory", getAllCategory);
router.get("/getSingleCategory/:categoryID", getSingleCategory);
router.post("/createCategory", singleUpload, createCategory);
router.put("/updatedCategory/:categoryID", singleUpload, updatedCategory);
router.delete("/deleteCategory/:categoryID", deleteCategory);
router.get("/getFilteredCategories", getFilteredCategories);
router.delete("/deleteMultipleCategory", deleteMultipleCategory);

module.exports = router;
