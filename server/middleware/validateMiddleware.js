const { body } = require("express-validator");

const validateBook = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long"),
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
    .isLength({ min: 2 })
    .withMessage("Author name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Author must contain letters only"),
];

const validateGenre = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must me atleast 2 characters long ")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain letters only"),
];

module.exports = { validateBook, validateGenre };
