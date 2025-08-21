const express = require("express");
const router = express.Router();
const { getPermissions,createPermission,deletePermission,deleteMultiplePermission
    ,getFilteredPermission,getSinglePermission,updatePermission} =
 require("../controllers/permissionController")

router.get("/getPermissions", getPermissions);
router.get("/getFilteredPermission",getFilteredPermission)
router.get("/getSinglePermission/:id",getSinglePermission)
router.post("/createPermission", createPermission);
router.delete("/deletePermission/:id",deletePermission)
router.delete("/deleteMultiplePermission", deleteMultiplePermission)
router.put("/updatePermission/:id",updatePermission)

module.exports = router;
