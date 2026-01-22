const Permission = require("../models/PermissionModel");

const createPermission = async (req, res) => {
  try {
    const { name, module, description } = req.body;
    const permission = await Permission.create({ name, module, description });
    res
      .status(201)
      .json({
        success: true,
        message: "Permission created successfully",
        permission,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSinglePermission = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: " ID does not exist" });
    }
    const singleRole = await Permission.findById(id);
    res.status(200).json(singleRole);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Permission.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMultiplePermission = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Permission.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting permission", error: error.message });
  }
};

const getFilteredPermission = async (req, res) => {
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

    const permission = await Permission.find(filter);

    console.log("Filtered permission Count:", permission.length);

    res.status(200).json(permission);
  } catch (err) {
    res.status(500).json({
      message: "An internal server error occurred",
      err: err.message,
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id not found" });
    }

    const existingPermission = await Permission.findById(id);
    if (!existingPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    let { name, module, description } = req.body;

    const updatedData = {
      name,
      description,
      module,
    };

    const newUpdatedData = await Permission.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Permission updated successfully",
      newUpdatedData,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

module.exports = {
  createPermission,
  getPermissions,
  deletePermission,
  deleteMultiplePermission,
  getFilteredPermission,
  getSinglePermission,
  updatePermission,
};
