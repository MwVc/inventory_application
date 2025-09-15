const { dbGetBooks, dbGetBookById } = require("../db/queries");

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

module.exports = { getAllBooks, getBookById };
