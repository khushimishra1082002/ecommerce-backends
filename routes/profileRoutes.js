const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profileController");
const singleUpload = require("../middlewares/singleUpload");
const authtoken = require("../middlewares/authMiddleWare")

router.get("/me",authtoken, getMyProfile);
router.put("/updateProfile",authtoken, singleUpload, updateMyProfile);

module.exports = router;
