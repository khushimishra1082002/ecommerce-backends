const express = require("express");
const router = express.Router();
const { saveForLaterController } = require("../controllers/saveForLetterController");

router.post("/saveForLater", saveForLaterController);

module.exports = router;
