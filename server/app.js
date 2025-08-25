const express = require("express");
require("dotenv").config();
const { getBooks } = require("./getBooks");
const { getData } = require("./db/queries");
const indexRouter = require("./routes/indexRouter.js");

const PORT = process.env.PORT || 5050;

const app = express();

app.get("/", indexRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
