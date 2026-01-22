const express = require("express");
const router = express.Router();
const {
  postdeliveryInfoUser,
  getDeliveryInfoUser,
} = require("../controllers/deliveryInfoController");
const authtoken = require("../middlewares/authMiddleWare");

router.post("/postdeliveryInfoUser", authtoken, postdeliveryInfoUser);
router.get("/getDeliveryInfoUser", authtoken, getDeliveryInfoUser);


module.exports = router;
