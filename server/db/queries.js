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

async function dbAddBook({ title, stock, author, genre_id }) {
  const { rows } = await pool.query(
    "INSERT INTO books (title, stock, author, genre_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, stock, author, genre_id]
  );

  console.log(rows);

  if (rows.length === 0) {
    throw new Error("Error adding book");
  }

  return rows;
}

module.exports = {
  dbGetBooks,
  dbGetBookById,
  dbAddBook,
};
