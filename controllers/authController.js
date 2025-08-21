const User = require("../models/UserModel");
const {
  validateSignupData,
  validateLoginData,
} = require("../validators/userValidators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const errors = validateSignupData({
      fullname,
      email,
      password,
    });
    if (errors.length > 0) {
      res.status(400).json({ errors });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    console.log("newUser", newUser);
    res.status(201).json({ message: "Sign up successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "server error", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginData({ email, password });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existingUser = await User.findOne({ email }).populate(
      "roleId",
      "name"
    );
    if (!existingUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        role: existingUser.roleId.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        _id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        roleId: existingUser.roleId._id,
        role: existingUser.roleId.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup, login };
