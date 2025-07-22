const validator = require("validator");

const ValidateCategoryData = (data) => {
  const errors = [];

  const name = data.name?.trim();
  const image = data.image?.trim?.(); 
  const isActive = data.isActive; 

  if (!name || name.length === 0) {
    errors.push("Category name is required");
  } else if (!validator.isLength(name, { min: 2, max: 50 })) {
    errors.push("Category name must be between 2 and 50 characters");
  }

  if (!image || image.length === 0) {
    errors.push("Image is required");
  }

  if (typeof isActive !== "boolean") {
    errors.push("IsActive must be true or false");
  }

  return errors;
};

module.exports = { ValidateCategoryData };
