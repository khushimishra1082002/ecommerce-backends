const express = require("express");
const router = express.Router();
const {
  getAllPoster,
  createPoster,
  deletePoster,
} = require("../controllers/posterController");
const singleUpload = require("../middlewares/singleUpload");

router.get("/getAllPoster", getAllPoster);
router.post("/createPoster", singleUpload, createPoster);
router.delete("/deletePoster/:posterId", deletePoster);

module.exports = router;
