DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

create TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    published_year INT,
    author REFERENCES author(id) ON DELETE CASCADE,
    isbn VARCHAR(17) NOT NULL CHECK (isbn ~ '^[0-9\-]+$'),
    genre VARCHAR(100)


);  