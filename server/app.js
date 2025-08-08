const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

const app = express();

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
