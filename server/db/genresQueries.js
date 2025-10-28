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

const dbCreateGenre = async (name) => {
  const { rowCount } = await pool.query(
    "INSERT INTO genres (name) VALUES ($1);",
    [name]
  );

  if (rowCount === 0) {
    const error = new Error("Failed to add genre");
    error.statusCode = 422;
    throw error;
  }

  return;
};

const dbDeleteGenre = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM genres WHERE id = $1;", [
    id,
  ]);

  if (rowCount === 0) {
    const error = new Error("Error deleting book");
    error.statusCode = 404;
    throw error;
  }
  return;
};

module.exports = { dbGetGenres, dbDeleteGenre, dbCreateGenre };
