const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/booksController");
const { validateBook } = require("../middleware/validateMiddleware");
const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/books/create", [validateBook, createBook]);
router.patch("/books/:id", [validateBook, updateBook]);
router.delete("/books/:id", deleteBook);

module.exports = router;
