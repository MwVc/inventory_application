const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("stock").notEmpty().withMessage("Stock cannot be empty"),
];

module.exports = { validateBook };
