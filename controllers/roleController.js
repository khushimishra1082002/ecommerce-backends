const Role = require("../models/RoleModel");

const createRole = async (req, res) => {
  try {
    const { name, permissions, description } = req.body;
    const role = await Role.create({ name, permissions, description });
    res
      .status(201)
      .json({ success: true, message: "Role created successfully", role });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: " ID does not exist" });
    }
    const singleRole = await Role.findById(id).populate("permissions");
    res.status(200).json(singleRole);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMultipleRole = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Role.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Roles deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id not found" });
    }

    const existingRole = await Role.findById(id);
    if (!existingRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    let { name, permissions, description } = req.body;

    if (typeof permissions === "string") {
      permissions = permissions.split(",").map((p) => p.trim());
    }

    const updatedData = {
      name,
      description,
      permissions,
    };

    const newUpdatedData = await Role.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Role updated successfully",
      newUpdatedData,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const getFilteredRoles = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    console.log("Filter Object:", JSON.stringify(filter, null, 2));

    const roles = await Role.find(filter).populate("permissions");

    console.log("Filtered Role Count:", roles.length);

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

module.exports = {
  createRole,
  getRoles,
  getSingleRole,
  deleteRole,
  deleteMultipleRole,
  updateRole,
  getFilteredRoles,
};
