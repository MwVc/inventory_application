const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5050;

const app = express();

// import routes
const booksRouter = require("./routes/booksRouter");
const genresRouter = require("./routes/genresRouter");

// import error handler
const errorHandler = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/genres", genresRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
