const User = require("../models/UserModel");

const getMyProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    console.log("USER", req.user);
    console.log("BODY", req.body);

    const { fullname, email, phoneNo, address } = req.body;
    const updateData = {};

    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (phoneNo) updateData.phoneNo = phoneNo;

    if (address) {
      if (typeof address === "string") {
        updateData.address = JSON.parse(address);
      } else {
        updateData.address = address;
      }
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("UPDATE ERROR", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getMyProfile, updateMyProfile };
