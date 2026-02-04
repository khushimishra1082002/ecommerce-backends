const express = require("express");
const router = express.Router();
const {
  getAllPoster,getSinglePoster,
  createPoster,
  deletePoster,updatePoster
} = require("../controllers/posterController");
const singleUpload = require("../middlewares/singleUpload");

router.get("/getAllPoster", getAllPoster);
router.get("/getSinglePoster/:posterId", getSinglePoster);
router.post("/createPoster", singleUpload, createPoster);
router.delete("/deletePoster/:posterId", deletePoster);
router.put("/updatePoster/:posterId", singleUpload, updatePoster);

module.exports = router;
