const pool = require("./pool");

async function dbGetBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

async function dbGetBookById(bookId) {
  const { rows } = await pool.query(
    "SELECT books.*, genres.name AS genre_name FROM books INNER JOIN genres ON books.genre_id = genres.id WHERE books.id = ($1)",
    [bookId]
  );
  if (rows.length === 0) {
    throw new Error(`Book not found`);
  }

  return rows;
}

module.exports = {
  dbGetBooks,
  dbGetBookById,
};
