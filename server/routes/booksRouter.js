const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/booksController");
const { validateBook } = require("../middleware/validateMiddleware");
const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/books/create", [validateBook, createBook]);

module.exports = router;
