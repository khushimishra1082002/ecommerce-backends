const express = require("express");
const router = express.Router();
const { saveForLaterController,getSavedForLaterController,removeSavedForLaterController } = require("../controllers/saveForLetterController");

router.post("/saveForLater", saveForLaterController);
router.get("/getSavedForLater/:userId", getSavedForLaterController);
router.delete(
  "/saveForLaterProductRemove/:userId/:productId",
  removeSavedForLaterController
);

module.exports = router;
