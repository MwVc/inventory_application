const express = require("express");
const router = express.Router();

// importing controllers
const {
  getAllGenres,
  deleteGenre,
  createGenre,
} = require("../controllers/genresController");
const { validateGenre } = require("../middleware/validateMiddleware");

router.get("/", getAllGenres);
router.post("/create", [validateGenre, createGenre]);
router.delete("/:id", [deleteGenre]);

module.exports = router;
