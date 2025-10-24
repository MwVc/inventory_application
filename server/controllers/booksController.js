const { validationResult, matchedData } = require("express-validator");

const {
  dbGetBooks,
  dbGetBookById,
  dbAddBook,
  dbDeleteBook,
  dbUpdateBook,
} = require("../db/bookQueries");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await dbGetBooks();
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
    return;
  }
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await dbGetBookById(bookId);
    res.status(200).json({
      success: false,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
    return;
  }
};

const createBook = async (req, res, next) => {
  const result = validationResult(req);
  const bookData = matchedData(req);

  try {
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "validation error",
        errors: result.array(),
      });
    }

    const newBook = await dbAddBook(bookData);
    res.status(200).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

const updateBook = async (req, res, next) => {
  const result = validationResult(req);
  const bookData = { ...matchedData(req), id: req.params.id };

  try {
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "validation error",
        errors: result.array(),
      });
    }

    const updatedBook = await dbUpdateBook(bookData);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
    return;
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    await dbDeleteBook(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
    return;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};
