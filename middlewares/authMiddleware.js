const checkAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return redirect('/');
  }
  next();
};

module.exports = {
  checkAuth,
};
