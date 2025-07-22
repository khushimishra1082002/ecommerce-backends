const express = require("express");
const router = express.Router();
const { getAttributeOptions,createAttributeOptopns} = require("../controllers/attributeOptionController");

router.get("/getAttributeOptions", getAttributeOptions);
router.post("/createAttributeOptopns", createAttributeOptopns);

module.exports = router;
