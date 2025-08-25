DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

create TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    stock INT,
    author REFERENCES author(id) ON DELETE CASCADE,
    category VARCHAR(100)


);  