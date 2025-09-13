const { getBooks } = require("../db/queries");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBooks };
