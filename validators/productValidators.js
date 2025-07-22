const validator = require("validator");

const ValidateProductData = (data) => {
  const errors = [];

  if (!data.name || validator.isEmpty(data.name.toString().trim())) {
    errors.push("Product name is required.");
  }

  if (!data.description || validator.isEmpty(data.description.toString().trim())) {
    errors.push("Product description is required.");
  }

  if (data.price === undefined || data.price === null || isNaN(data.price)) {
    errors.push("Valid price is required.");
  } else if (Number(data.price) < 0) {
    errors.push("Price cannot be negative.");
  }

  if (!data.category || validator.isEmpty(data.category.toString().trim())) {
    errors.push("Category is required.");
  }

  if (!data.subcategory || validator.isEmpty(data.subcategory.toString().trim())) {
    errors.push("Subcategory is required.");
  }

  // if (!data.brand || validator.isEmpty(data.brand.toString().trim())) {
  //   errors.push("Brand is required.");
  // }

  return errors;
};

module.exports = { ValidateProductData };
