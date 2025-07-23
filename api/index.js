const app = require("../server"); // Adjust path if needed
module.exports = (req, res) => {
  return app(req, res);
};
