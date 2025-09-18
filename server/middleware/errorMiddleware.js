function errorHandler(err, req, res, next) {
  console.error("Error stack:", err); // logs stack trace to the console
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Internal Server Error" });
}

module.exports = errorHandler;
