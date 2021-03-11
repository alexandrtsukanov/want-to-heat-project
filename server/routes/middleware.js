function authenticated(req, res, next) {
  console.log(req.session.passport.user);
  if (req.session.passport.user) {
    return next();
  }
  return res.status(501);
}

module.exports = { authenticated };
