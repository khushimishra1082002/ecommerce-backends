const express = require("express");
const router = express.Router();
const {
  postdeliveryInfoUser,
  getDeliveryInfoUser,
} = require("../controllers/deliveryInfoController");
const { authMiddlewares } = require("../middlewares/authMiddleWare");

router.post("/postdeliveryInfoUser", authMiddlewares, postdeliveryInfoUser);
router.get("/getDeliveryInfoUser", authMiddlewares, getDeliveryInfoUser);


module.exports = router;
