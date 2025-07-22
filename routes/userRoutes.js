const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const singleUpload = require("../middlewares/singleUpload");

router.get("/getUsers", getUsers);
router.get("/getSingleUser/:userId", getSingleUser);
router.post("/createSingleUser", singleUpload, createUser);
router.put("/updateUser/:userId", singleUpload, updateUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
