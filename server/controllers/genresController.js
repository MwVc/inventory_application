const { dbGetGenres, dbDeleteGenre } = require("../db/genresQueries");

const getAllGenres = async (req, res) => {
  try {
    const genres = await dbGetGenres();
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params.id;
    const response = await dbDeleteGenre(id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllGenres, deleteGenre };
