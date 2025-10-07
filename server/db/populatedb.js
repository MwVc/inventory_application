#! /usr/bin/env node

const { books } = require("./data");
const pool = require("./pool");

const updatedBooks = books.map((book) => {
  if (book.category === "Technology") {
    book.category = 5;
  } else if (book.category === "Fiction") {
    book.category = 3;
  } else if (book.category === "Science") {
    book.category = 2;
  } else if (book.category === "History") {
    book.category = 4;
  } else {
    book.category = 1;
  }

  return book;
});

const createGenreTableQuery = `CREATE TABLE IF NOT EXISTS genres(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(100) NOT NULL
)`;

const createBookTableQuery = `CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(100) NOT NULL, stock INT NOT NULL DEFAULT 0, author VARCHAR(100) NOT NULL, genre_id INT REFERENCES genres(id) ON DELETE CASCADE)`;

const addGenreQuery = `INSERT INTO genres (name) VALUES ($1)`;

const addBookQuery = `INSERT INTO books(title, stock, author, genre_id) VALUES ($1, $2, $3, $4) `;

const categories = [
  ...new Set(
    books.map((book) => {
      return book.category;
    })
  ),
];

(async () => {
  try {
    const res = await pool.query(createBookTableQuery);
    console.log(`Table created successfully:${res.command}`);

    for (const book of updatedBooks) {
      pool.query(addBookQuery, [
        book.title,
        book.stock,
        book.author,
        book.category,
      ]);
    }
  } catch (error) {
    console.log(`Failed to create table: ${error}`);
  }
})();
