const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5050;

// import routes
const indexRouter = require("./routes/indexRouter");

const app = express();

app.get("/", indexRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
