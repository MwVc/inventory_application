const pool = require("./pool");

async function getBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

module.exports = {
  getBooks,
};
