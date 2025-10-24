const pool = require("./pool");

const dbGetGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres;");
  if (rows.length === 0) {
    const error = new Error("Books not found");
    error.statusCode = 404;
    throw error;
  }

  return rows;
};

module.exports = { dbGetGenres };
