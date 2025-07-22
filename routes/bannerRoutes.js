const express = require("express");
const router = express.Router();
const {
  getAllBanner,
  createBanner,
  deleteBanner,
  updateBanner,
  getSingleBanner
} = require("../controllers/bannerController");
const singleupload = require("../middlewares/singleUpload");

router.get("/getAllBanner", getAllBanner);
router.get("/getSingleBanner/:bannerId", getSingleBanner);
router.post("/createBanner", singleupload, createBanner);
router.delete("/deleteBanner/:bannerId", deleteBanner);
router.put("/updateBanner/:bannerId",singleupload, updateBanner);

module.exports = router;
