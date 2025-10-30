const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { Pool } = require("pg");

const connectionString = process.env.DB_CONNECTION_STRING;
console.log(connectionString);

module.exports = new Pool({
  connectionString: connectionString,
});
