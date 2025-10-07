const pool = require("./pool");

async function dbGetBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  if (rows.length === 0) {
    const error = new Error("Books not found");
    error.statusCode = 404;
    throw error;
  }

  return rows;
}

async function dbGetBookById(bookId) {
  const { rows } = await pool.query(
    "SELECT books.*, genres.name AS genre_name FROM books INNER JOIN genres ON books.genre_id = genres.id WHERE books.id = ($1);",
    [bookId]
  );
  if (rows.length === 0) {
    const error = new Error(`Book not found`);
    error.statusCode = 404;
    throw error;
  }

  return rows;
}

async function dbAddBook({ title, stock, author, genre_id }) {
  const { rows } = await pool.query(
    "INSERT INTO books (title, stock, author, genre_id) VALUES ($1, $2, $3, $4) RETURNING *;",
    [title, stock, author, genre_id]
  );

  if (rows.length === 0) {
    const error = new Error("Error adding book");
    error.statusCode = 422;
    throw error;
  }

  return rows;
}

async function dbUpdateBook({ title, stock, author, genre_id, book_id }) {
  const { rowCount } = await pool.query(
    "UPDATE books SET title=$1, stock=$2, author=$3, genre_id=$4 WHERE id=$5;",
    [title, stock, author, genre_id, book_id]
  );

  if (rowCount === 0) {
    const error = new Error("Error updating book");
    error.statusCode = 422;
    throw error;
  }
  return;
}

async function dbDeleteBook(id) {
  const { rowCount } = await pool.query("DELETE FROM books WHERE id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    const error = new Error("Cannot delete. Book not found");
    error.statusCode = 404;
    throw error;
  }

  return;
}

module.exports = {
  dbGetBooks,
  dbGetBookById,
  dbAddBook,
  dbDeleteBook,
  dbUpdateBook,
};
