const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);

    if (!allUsers) {
      res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(
   
    singleUser,
    );
  } catch (error) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneNo, address } = req.body;

    const image = req.file ? req.file.filename : "";
    const errors = ValidateSubcategoryData({
      fullname,
      email,
      password,
    });
    if (errors.length > 0) {
      res.status(400).json({ errors });
    }
    const newUser = await User.create({
      fullname,
      email,
      password,
      image,
      phoneNo,
      address,
    });

    res.status(201).json({
      ok: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Delete User Successfully", deleteUser });
  } catch (error) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let updatedData = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof updatedData.address === "string") {
      try {
        updatedData.address = JSON.parse(updatedData.address);
      } catch (err) {
        return res.status(400).json({ message: "Invalid address format" });
      }
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
};
