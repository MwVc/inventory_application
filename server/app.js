const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

// import routes
const booksRouter = require("./routes/booksRouter");

// import error handler
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use("/api", booksRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
