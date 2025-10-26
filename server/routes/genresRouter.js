const express = require("express");
const router = express.Router();

// importing controllers
const {
  getAllGenres,
  deleteGenre,
} = require("../controllers/genresController");

router.get("/", getAllGenres);
router.delete("/:id", deleteGenre);

module.exports = router;
