const validator = require("validator");

const validateSignupData = (data) => {
  const errors = [];

  if (!data.fullname || typeof data.fullname !== "string") {
    errors.push("Full name is required and should be a string");
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

const validateLoginData = (data) => {
  const errors = [];

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

const ValidateUserData = (data) => {
  const errors = [];

  if (!data.fullname || typeof data.fullname !== "string") {
    errors.push("Full name is required and should be a string");
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

module.exports = { validateSignupData, validateLoginData ,ValidateUserData };
