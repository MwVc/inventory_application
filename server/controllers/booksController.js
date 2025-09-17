const { validationResult } = require("express-validator");
const { dbGetBooks, dbGetBookById, dbAddBook } = require("../db/queries");

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
  // try {
  //   const book = await dbAddBook(req.body);
  //   console.log(book);
  //   res.status(200).json(book);
  // } catch (error) {
  //   console.log(error);
  //   next();
  // }

  const result = validationResult(req);
  console.log(req.body, result.array());
};

module.exports = { getAllBooks, getBookById, createBook };
