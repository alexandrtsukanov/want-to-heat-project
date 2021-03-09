function authenticated(req, res, next) {
  console.log(req.session.userID);
  if (req.session.userID) {
    return next();
  }
  return res.status(501);
}

module.exports = { authenticated };
