const User = require("../models/UserModel");

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate({
        path: "roleId",
        populate: { path: "permissions" }
      });

      if (!user || !user.roleId) {
        return res.status(403).json({ message: "Role not assigned" });
      }

      const userPermissions = user.roleId.permissions.map(p => p.name);

      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = checkPermission;
