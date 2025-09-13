const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

// import routes
const indexRouter = require("./routes/indexRouter");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use("/api", indexRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
