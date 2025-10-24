const { dbGetGenres } = require("../db/genresQueries");

const getAllGenres = async (req, res) => {
  try {
    const genres = await dbGetGenres();
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllGenres };
