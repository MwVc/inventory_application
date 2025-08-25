require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DB_CONNECTION_STRING;

module.exports = new Pool({
  connectionString: connectionString,
});
