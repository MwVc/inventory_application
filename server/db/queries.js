const pool = require("./pool");

async function getData() {
  try {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

module.exports = {
  getData,
};
