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
const authtoken = require("../middlewares/authMiddleWare")

router.get("/getAllCategory", getAllCategory);
router.get("/getSingleCategory/:categoryID", getSingleCategory);
router.post("/createCategory", authtoken,singleUpload, createCategory);
router.put("/updatedCategory/:categoryID",authtoken, singleUpload, updatedCategory);
router.delete("/deleteCategory/:categoryID", deleteCategory);
router.get("/getFilteredCategories", getFilteredCategories);
router.delete("/deleteMultipleCategory", deleteMultipleCategory);

module.exports = router;
