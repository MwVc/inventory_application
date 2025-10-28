const express = require("express");
const router = express.Router();

// importing controllers
const {
  getAllGenres,
  deleteGenre,
  createGenre,
} = require("../controllers/genresController");
const { validateGenre } = require("../middleware/validateMiddleware");
const passwordMiddleware = require("../middleware/passwordMiddleware");

router.get("/", getAllGenres);
router.post("/create", [validateGenre, createGenre]);
router.delete("/:id", [passwordMiddleware, deleteGenre]);

module.exports = router;
