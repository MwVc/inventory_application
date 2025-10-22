function passwordMiddleware(req, res, next) {
  console.log(req.body);
  const password = "plantcutter";
  if (!req.body.password || req.body.password !== password) {
    res.status(401).json({ success: false, message: "Wrong password" });
    return;
  }

  next();
}

module.exports = passwordMiddleware;
