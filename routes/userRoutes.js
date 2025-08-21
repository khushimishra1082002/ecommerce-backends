const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  assignRoleToUser,
  getFilteredUsers
} = require("../controllers/userController");
const singleUpload = require("../middlewares/singleUpload");

router.get("/getUsers", getUsers);
router.get("/getSingleUser/:userId", getSingleUser);
router.get("/getFilteredUsers",getFilteredUsers)
router.post("/createUser", singleUpload, createUser);
router.put("/updateUser/:userId", singleUpload, updateUser);
router.delete("/deleteUser/:userId", deleteUser);
router.post("assignRoleToUser",assignRoleToUser)

module.exports = router;
