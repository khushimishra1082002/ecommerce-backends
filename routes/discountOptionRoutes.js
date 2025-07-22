const express = require("express");
const router = express.Router();
const { getDiscountOptions,createDiscountOptions} = require("../controllers/discountOptionController");

router.get("/getDiscountOptions/:categoryId", getDiscountOptions);
router.post("/createDiscountOptions", createDiscountOptions);

module.exports = router;
