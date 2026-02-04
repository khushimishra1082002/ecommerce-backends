const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLoginData } = require("../validators/userValidators");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginData({ email, password });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existingUser = await User.findOne({ email }).populate(
      "roleId",
      "name",
    );

    if (!existingUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const roleName = existingUser.roleId ? existingUser.roleId.name : "User";
    const roleId = existingUser.roleId ? existingUser.roleId._id : null;

    const token = jwt.sign(
      {
        id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        role: roleName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Admin login successfully",
      token,
      user: {
        _id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        roleId,
        role: roleName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginAdmin };
