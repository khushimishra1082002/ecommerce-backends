const validator = require("validator");

const ValidateBrandData = (data) => {
  const errors = [];

  if(!data.name || validator.isEmpty(data.name.trim())){
    errors.push("Name is required")
  }

  if(!data.category  || validator.isEmpty(data.category.trim())){
    errors.push("category is required")
  }

  return errors;
};

module.exports = ValidateBrandData;

