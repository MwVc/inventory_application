const express = require("express");
const { getAllBooks, getBookById } = require("../controllers/booksController");
const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
// router.put("/books/create", createBook);

module.exports = router;
