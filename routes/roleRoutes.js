const express = require("express");
const router = express.Router();
const { getRoles,createRole, getSingleRole,deleteRole,deleteMultipleRole,updateRole,getFilteredRoles} =
 require("../controllers/roleController");

router.get("/getRoles", getRoles);
router.get("/getSingleRole/:id",getSingleRole)
router.post("/createRole", createRole);
router.delete("/deleteRole/:id",deleteRole)
router.delete("/deleteMultipleRole",deleteMultipleRole)
router.put("/updateRole/:id",updateRole)
router.get("/getFilteredRoles",getFilteredRoles)

module.exports = router;
