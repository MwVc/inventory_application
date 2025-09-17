const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 2 })
    .withMessage("Title must be at keast 2 characters long"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or higher"),
  body("genre_id")
    .notEmpty()
    .withMessage("Genre is required")
    .isInt({ min: 1 })
    .withMessage("Genre must be a positive number"),
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string")
    .isLength({ min: 2 })
    .withMessage("Author name must be at least  characters long"),
];

module.exports = { validateBook };
