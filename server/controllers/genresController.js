const { validationResult, matchedData } = require("express-validator");
const {
  dbGetGenres,
  dbDeleteGenre,
  dbCreateGenre,
} = require("../db/genresQueries");

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await dbGetGenres();
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req, res, next) => {
  const result = validationResult(req);
  const { name } = matchedData(req);

  try {
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "validation error",
        errors: result.array(),
      });
    }

    await dbCreateGenre(name);
    res.status(200).json({
      success: true,
      message: "Genre added successfully",
    });
    return;
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

module.exports = { getAllGenres, deleteGenre, createGenre };
