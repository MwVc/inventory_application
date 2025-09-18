const { validationResult, matchedData } = require("express-validator");
const {
  dbGetBooks,
  dbGetBookById,
  dbAddBook,
  dbDeleteBook,
} = require("../db/queries");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await dbGetBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await dbGetBookById(bookId);
    res.status(200).json({ book: book });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBook = async (req, res, next) => {
  const result = validationResult(req);
  const bookData = matchedData(req);

  if (result.isEmpty()) {
    try {
      const book = await dbAddBook(bookData);
      res.status(200).json(book);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  return res.status(400).json({ errors: result.array() });
};

const deleteBook = async (req, res, next) => {
  const { book_id } = req.params;
  try {
    const response = await dbDeleteBook(book_id);
    res
      .status(200)
      .json({ message: "Book deleted successfully", data: response });
  } catch (error) {
    next(error);
    return;
  }
};

module.exports = { getAllBooks, getBookById, createBook, deleteBook };
