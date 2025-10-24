const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/booksController");
const { validateBook } = require("../middleware/validateMiddleware");
const passwordMiddleware = require("../middleware/passwordMiddleware");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/create", [validateBook, createBook]);
router.patch("/:id", [validateBook, updateBook]);
router.delete("/:id", [passwordMiddleware, deleteBook]);

module.exports = router;
