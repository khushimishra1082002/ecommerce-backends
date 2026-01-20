const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().populate("roleId", "name permissions");
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
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneNo, address, roleId } = req.body;
    const image = req.file ? req.file.filePath : "default.png";

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email & password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let finalRoleId = roleId;
    if (!finalRoleId) {
      let defaultRole = await Role.findOne({ name: "User" });

      if (!defaultRole) {
        defaultRole = await Role.create({
          name: "User",
          description: "Default user role",
        });
      }

      finalRoleId = defaultRole._id;
    }

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      image,
      phoneNo,
      address,
      roleId: finalRoleId,
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
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
      updatedData.image = req.file.filePath;
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

const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    // check role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // assign role
    const user = await User.findByIdAndUpdate(
      userId,
      { roleId },
      { new: true }
    ).populate("roleId"); // populate role details

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role assigned successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { fullname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }
    console.log("Filter Object:", JSON.stringify(filter, null, 2));

    const user = await User.find(filter);

    console.log("Filtered user Count:", user.length);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  assignRoleToUser,
  getFilteredUsers,
};
