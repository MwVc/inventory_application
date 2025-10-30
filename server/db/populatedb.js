#! /usr/bin/env node

const { books } = require("./data");
const pool = require("./pool");

// queries
const addGenreQuery = `INSERT INTO genres (name) VALUES ($1)`;
const addBookQuery = `INSERT INTO books(title, stock, author, genre_id) VALUES ($1, $2, $3, $4) `;

///////////// The Algorithm ///////////////
// insert all unique genres into the genres table in remote database
// get all genres and their ids from the genres table
// insert book matching the genre ids to the books genre name
// loop books in each book

// INSERT GENRES INTO DB function
const insertGenres = async () => {
  const genres = [...new Set(books.map((book) => book.category))];

  for (const genre of genres) {
    await pool.query(addGenreQuery, [genre]);
  }
};

// FETCH GENRES FROM DATABASE
const fetchGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
};

(async () => {
  // insert genres in db
  await insertGenres();

  // fetch genres from db to get genres and their ids
  const genres = await fetchGenres();

  const newBooks = books.map((book) => {
    // find genre that matches books category
    const matchedGenre = genres.find((genre) => genre.name === book.category);
    // add a property genre_id that matches the books genre into book while deleting category out of the book
    const { category, ...newBook } = { ...book, genre_id: matchedGenre.id };
    // return the new book with genre_id as a property
    return newBook;
  });

  // insert boooks into database

  for (const newBook of newBooks) {
    await pool.query(addBookQuery, [
      newBook.title,
      newBook.stock,
      newBook.author,
      newBook.genre_id,
    ]);
  }
})();
