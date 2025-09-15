function errorHandler(err, req, res, next) {
  console.error("Error stack:", err); // logs stack trace to the console
  res.status(500).json({ error: error.message || "Internal Server Error" });
}

module.exports = errorHandler;
