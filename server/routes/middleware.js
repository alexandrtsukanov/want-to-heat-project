function authenticated(req, res, next) {
  if (req.session.userID) {
    return next();
  }
  return res.status(501);
}

module.exports = { authenticated };
