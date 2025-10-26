const pool = require("./pool");

const dbGetGenres = async () => {
  const { rows } = await pool.query(
    "SELECT g.id, g.name, COUNT(b.id) AS books FROM genres g LEFT JOIN books b ON g.id = b.genre_id GROUP BY g.id, g.name;"
  );
  if (rows.length === 0) {
    const error = new Error("Books not found");
    error.statusCode = 404;
    throw error;
  }

  return rows;
};

const dbDeleteGenre = async (id) => {
  const { rowCount } = await pool.query("DELETE * FROM genres WHERE id = $1;", [
    id,
  ]);
  console.log(rowCount);
};

module.exports = { dbGetGenres, dbDeleteGenre };
