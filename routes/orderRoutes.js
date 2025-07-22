const express = require("express");
const router = express.Router();
const {getAllOrders,placeOrder,getUserOrders,deleteOrder,getFilteredOrders,
    updateOrderStatus
} = require("../controllers/orderController")

router.get("/getAllOrders",getAllOrders)
router.post("/placeOrder", placeOrder);
router.get("/getUserOrders/:userId", getUserOrders);
router.delete("/deleteOrder/:orderId",deleteOrder)
router.get("/getFilteredOrders",getFilteredOrders)
router.put("/updateOrderStatus/:id", updateOrderStatus);

module.exports = router;
